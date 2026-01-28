import Hostel from "../models/hostels.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFilesToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { sendPropertyRegistrationEmail, sendPropertyVerifiedEmail } from "../utils/sendEmail.js";

export const createHostel = asyncHandler(async (req, res) => {
  const hostelData = req.body;
  if (!hostelData) {
    throw new ApiError(400, "Fields are required for property to be listed");
  }
  const propertyPhotosUrls = [];
  if (req.files?.property_photos && Array.isArray(req.files?.property_photos)) {
    for (let i = 0; i < Math.min(req.files.property_photos.length, 5); i++) {
      const photosLocalPath = req.files.property_photos[i].path;
      const propertyPhoto = await uploadFilesToCloudinary(photosLocalPath);
      if (!propertyPhoto) {
        throw new ApiError(400, "Failed to upload property photo");
      }
      propertyPhotosUrls.push(propertyPhoto.url);
    }
  }
  if (propertyPhotosUrls.length === 0) {
    throw new ApiError(400, "Please provide property photos");
  }

  const hostel = await Hostel.create({
    ...hostelData,
    property_photos: propertyPhotosUrls,
  });
  if (!hostel) {
    throw new ApiError(500, "Something went wrong while listing the property");
  }
  sendPropertyRegistrationEmail(hostelData.owner_email);

  return res
    .status(201)
    .json(new ApiResponse(201, hostel, "Hostel Property listed successfully"));
});

export const updateHostel = asyncHandler(async (req, res) => {
  const {
    hostelName,
    typeOfHostel,
    locality,
    rentAmount,
    securityDeposit,
    verified,
    city,
    ownerName,
    ownerEmail,
    ownerPhoneNumber,
    pincode,
    address,
    distanceFromRailwayStation,
    distanceFromBusStop,
    description,
  } = req.body;

  // Handle photo uploads if new photos are provided
  let propertyPhotosUrls;
  if (req.files?.property_photos && Array.isArray(req.files.property_photos) && req.files.property_photos.length > 0) {
    // Get current hostel to delete old photos
    const currentHostel = await Hostel.findById(req.query.id);
    if (currentHostel?.property_photos?.length > 0) {
      // Delete old photos from Cloudinary (non-blocking, don't fail if delete fails)
      await Promise.all(currentHostel.property_photos.map(url => deleteFromCloudinary(url)));
    }

    propertyPhotosUrls = [];
    for (let i = 0; i < Math.min(req.files.property_photos.length, 5); i++) {
      const photosLocalPath = req.files.property_photos[i].path;
      const propertyPhoto = await uploadFilesToCloudinary(photosLocalPath);
      if (propertyPhoto) {
        propertyPhotosUrls.push(propertyPhoto.url);
      }
    }
  }

  const updateData = {
    hostel_name: hostelName,
    type_of_hostel: typeOfHostel,
    locality,
    rent_amount: rentAmount,
    security_deposit: securityDeposit,
    featured: verified,
    city,
    owner_name: ownerName,
    owner_email: ownerEmail,
    owner_phoneNumber: ownerPhoneNumber,
    pincode,
    address,
    distance_from_nearest_railway_station: distanceFromRailwayStation,
    distance_from_bus_stop: distanceFromBusStop,
    description,
  };

  // Only update photos if new ones were uploaded
  if (propertyPhotosUrls && propertyPhotosUrls.length > 0) {
    updateData.property_photos = propertyPhotosUrls;
  }

  // Remove undefined values
  Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

  const updatedHostel = await Hostel.findByIdAndUpdate(
    req.query.id,
    { $set: updateData },
    { new: true }
  );
  if (!updatedHostel) {
    throw new ApiError(404, "Hostel not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedHostel, "Hostel Updated Successfully"));
});

export const deleteHostel = asyncHandler(async (req, res) => {
  const hostel = await Hostel.findById(req.query.id);
  if (!hostel) {
    throw new ApiError(404, "Hostel not found");
  }

  // Delete photos from Cloudinary (non-blocking)
  if (hostel.property_photos?.length > 0) {
    await Promise.all(hostel.property_photos.map(url => deleteFromCloudinary(url)));
  }

  await Hostel.findByIdAndDelete(req.query.id);
  return res.status(200).json(new ApiResponse(200, null, "Hostel has been deleted"));
});

export const getHostel = asyncHandler(async (req, res) => {
  const hostel = await Hostel.findById(req.query.id);
  if (!hostel) {
    throw new ApiError(404, "Hostel not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, hostel, "Hostel found successfully"));
});

export const getAllHostel = asyncHandler(async (req, res) => {
  const { city, locality, typeOfHostel, roomType, page = 1, limit = 10, minPrice, maxPrice, sortBy } = req.query;
  if (!city) {
    throw new ApiError(400, "City parameter not found");
  }
  const query = { city: { $regex: new RegExp(city, "i") } };

  if (locality) {
    query.locality = { $regex: new RegExp(locality, "i") };
  }
  if (typeOfHostel) {
    query.type_of_hostel = { $in: Array.isArray(typeOfHostel) ? typeOfHostel : [typeOfHostel] };
  }
  if (roomType) {
    query.room_type = { $in: Array.isArray(roomType) ? roomType : [roomType] };
  }
  if (minPrice || maxPrice) {
    query.rent_amount = {};
    if (minPrice) query.rent_amount.$gte = parseInt(minPrice);
    if (maxPrice) query.rent_amount.$lte = parseInt(maxPrice);
  }
  query.featured = true;

  // Determine sort order
  let sortOption = { createdAt: -1 };
  if (sortBy === "price_asc") sortOption = { rent_amount: 1 };
  else if (sortBy === "price_desc") sortOption = { rent_amount: -1 };
  else if (sortBy === "oldest") sortOption = { createdAt: 1 };

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Hostel.countDocuments(query);
  const hostels = await Hostel.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json(
    new ApiResponse(200, {
      hostels,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    }, "Hostels found successfully")
  );
});

export const getAllHostelsInfo = asyncHandler(async (req, res) => {
  const hostels = await Hostel.find();
  if (!hostels) {
    throw new ApiError(
      500,
      "Something went wrong while fetching Hostel properties"
    );
  }
  res
    .status(200)
    .json(new ApiResponse(200, hostels, "Hostels found successfully"));
});

export const countVerifiedHostels = asyncHandler(async (req, res) => {
  const count = await Hostel.countDocuments({ featured: true });
  res
    .status(200)
    .json(new ApiResponse(200, count, "Counted Verified Hostels successfully"));
});

export const countNotVerifiedHostels = asyncHandler(async (req, res) => {
  const count = await Hostel.countDocuments({ featured: false });
  res
    .status(200)
    .json(
      new ApiResponse(200, count, "Counted Unverified Hostels successfully")
    );
});

export const countHostelsByType = asyncHandler(async (req, res) => {
  const boysHostelsCount = await Hostel.countDocuments({
    type_of_hostel: "Boys-Hostel",
  });
  const girlsHostelsCount = await Hostel.countDocuments({
    type_of_hostel: "Girls-Hostel",
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        [boysHostelsCount, girlsHostelsCount],
        "Counted Hostels by type successfully"
      )
    );
});

export const countByAddress = asyncHandler(async (req, res) => {
  const address = req.query.address.split(",");
  const list = await Promise.all(
    address.map((addr) => {
      return Hostel.countDocuments({ address: addr });
    })
  );
  res.status(200).json(new ApiResponse(200, list, "Counted by address"));
});

export const countByType = asyncHandler(async (req, res) => {
  const singleRoomCount = await Hostel.countDocuments({
    room_type: "Single Room",
  });
  const doubleSharingCount = await Hostel.countDocuments({
    room_type: "Double Sharing",
  });
  const tripleSharingCount = await Hostel.countDocuments({
    room_type: "Triple Sharing",
  });
  const fourSharingCount = await Hostel.countDocuments({
    room_type: "Four Sharing",
  });
  res.status(200).json(new ApiResponse(200, [
    { room_type: "Single Room", count: singleRoomCount },
    { room_type: "Double Sharing", count: doubleSharingCount },
    { room_type: "Triple Sharing", count: tripleSharingCount },
    { room_type: "Four Sharing", count: fourSharingCount },
  ], "Counted by room type"));
});

export const verifyHostel = asyncHandler(async (req, res) => {
  const { id, featured } = req.body;
  const hostelData = await Hostel.findByIdAndUpdate(id, { $set: { featured } }, { new: true });
  if (!hostelData) {
    throw new ApiError(404, "Hostel not found");
  }
  // Send verification email (non-blocking)
  if (featured) {
    sendPropertyVerifiedEmail(hostelData.owner_email);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, hostelData, "Hostel verified successfully"));
});

export const incrementHostelViews = asyncHandler(async (req, res) => {
  const hostel = await Hostel.findByIdAndUpdate(
    req.query.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!hostel) {
    throw new ApiError(404, "Hostel not found");
  }
  return res.status(200).json(new ApiResponse(200, { views: hostel.views }, "View recorded"));
});

export const getTotalHostelViews = asyncHandler(async (req, res) => {
  const result = await Hostel.aggregate([
    { $group: { _id: null, totalViews: { $sum: "$views" } } }
  ]);
  const totalViews = result[0]?.totalViews || 0;
  return res.status(200).json(new ApiResponse(200, totalViews, "Total hostel views"));
});

export const bulkVerifyHostels = asyncHandler(async (req, res) => {
  const { ids, featured } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new ApiError(400, "Please provide an array of hostel IDs");
  }
  if (typeof featured !== "boolean") {
    throw new ApiError(400, "Featured status must be a boolean");
  }

  const result = await Hostel.updateMany(
    { _id: { $in: ids } },
    { $set: { featured } }
  );

  // Send verification emails for verified hostels (non-blocking)
  if (featured) {
    const hostels = await Hostel.find({ _id: { $in: ids } }, { owner_email: 1 });
    hostels.forEach(hostel => sendPropertyVerifiedEmail(hostel.owner_email));
  }

  return res.status(200).json(
    new ApiResponse(200, { modifiedCount: result.modifiedCount }, `${result.modifiedCount} hostels ${featured ? "verified" : "unverified"} successfully`)
  );
});

export const bulkDeleteHostels = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new ApiError(400, "Please provide an array of hostel IDs");
  }

  // Get hostels to delete their photos from Cloudinary
  const hostels = await Hostel.find({ _id: { $in: ids } }, { property_photos: 1 });

  // Delete photos from Cloudinary (non-blocking)
  const photoUrls = hostels.flatMap(h => h.property_photos || []);
  await Promise.all(photoUrls.map(url => deleteFromCloudinary(url)));

  // Delete hostels from database
  const result = await Hostel.deleteMany({ _id: { $in: ids } });

  return res.status(200).json(
    new ApiResponse(200, { deletedCount: result.deletedCount }, `${result.deletedCount} hostels deleted successfully`)
  );
});

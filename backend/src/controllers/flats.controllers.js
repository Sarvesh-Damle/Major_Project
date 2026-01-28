import Flat from "../models/flats.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFilesToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { sendPropertyRegistrationEmail, sendPropertyVerifiedEmail } from "../utils/sendEmail.js";

export const createFlat = asyncHandler(async (req, res) => {
  const flatData = req.body;
  if (!flatData) {
    throw new ApiError(400, "Fields are required for property to be listed");
  }
  const propertyPhotosUrls = [];
  if (
    req.files &&
    req.files.property_photos &&
    Array.isArray(req.files.property_photos)
  ) {
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

  const flat = await Flat.create({
    ...flatData,
    property_photos: propertyPhotosUrls,
  });
  if (!flat) {
    throw new ApiError(500, "Something went wrong while listing the property");
  }
  // Send registration email (non-blocking)
  sendPropertyRegistrationEmail(flatData.owner_email);

  return res
    .status(201)
    .json(new ApiResponse(201, flat, "Flat Property listed successfully"));
});

export const updateFlat = asyncHandler(async (req, res) => {
  const { flatType, preferredTennats, flatArea, furnishedStatus, locality, rentAmount, securityDeposit, verified, city, ownerName, ownerEmail, ownerPhoneNumber, pincode, address, distanceFromRailwayStation, distanceFromBusStop, description } = req.body;

  // Handle photo uploads if new photos are provided
  let propertyPhotosUrls;
  if (req.files?.property_photos && Array.isArray(req.files.property_photos) && req.files.property_photos.length > 0) {
    // Get current flat to delete old photos
    const currentFlat = await Flat.findById(req.query.id);
    if (currentFlat?.property_photos?.length > 0) {
      // Delete old photos from Cloudinary (non-blocking)
      await Promise.all(currentFlat.property_photos.map(url => deleteFromCloudinary(url)));
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
    flat_type: flatType,
    preferred_tennats: preferredTennats,
    flat_area: flatArea,
    furnished_status: furnishedStatus,
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

  const updatedFlat = await Flat.findByIdAndUpdate(
    req.query.id,
    { $set: updateData },
    { new: true }
  );
  if (!updatedFlat) {
    throw new ApiError(404, "Flat not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedFlat, "Flat Updated Successfully"));
});

export const deleteFlat = asyncHandler(async (req, res) => {
  const flat = await Flat.findById(req.query.id);
  if (!flat) {
    throw new ApiError(404, "Flat not found");
  }

  // Delete photos from Cloudinary (non-blocking)
  if (flat.property_photos?.length > 0) {
    await Promise.all(flat.property_photos.map(url => deleteFromCloudinary(url)));
  }

  await Flat.findByIdAndDelete(req.query.id);
  return res.status(200).json(new ApiResponse(200, null, "Flat has been deleted"));
});

export const getFlat = asyncHandler(async (req, res) => {
  const flat = await Flat.findById(req.query.id);
  if (!flat) {
    throw new ApiError(404, "Flat not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, flat, "Flat found successfully"));
});

export const getAllFlat = asyncHandler(async (req, res) => {
  const { city, locality, page = 1, limit = 10, minPrice, maxPrice, sortBy, flatType, furnishedStatus } = req.query;
  if (!city) {
    throw new ApiError(400, "City parameter not found");
  }
  const query = { city: { $regex: new RegExp(city, "i") } };
  if (locality) {
    query.locality = { $regex: new RegExp(locality, "i") };
  }
  if (flatType) {
    query.flat_type = { $in: Array.isArray(flatType) ? flatType : [flatType] };
  }
  if (furnishedStatus) {
    query.furnished_status = { $in: Array.isArray(furnishedStatus) ? furnishedStatus : [furnishedStatus] };
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
  const total = await Flat.countDocuments(query);
  const flats = await Flat.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit));

  return res.status(200).json(
    new ApiResponse(200, {
      flats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    }, "Flats found successfully")
  );
});

export const getAllFlatsInfo = asyncHandler(async (req, res) => {
  const flats = await Flat.find();
  if (!flats) {
    throw new ApiError(
      500,
      "Something went wrong while fetching Flat properties"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, flats, "Flats found successfully"));
});

export const countVerifiedFlats = asyncHandler(async (req, res) => {
  const count = await Flat.countDocuments({ featured: true });
  res
    .status(200)
    .json(new ApiResponse(200, count, "Counted Verified Flats successfully"));
});

export const countNotVerifiedFlats = asyncHandler(async (req, res) => {
  const count = await Flat.countDocuments({ featured: false });
  res
    .status(200)
    .json(new ApiResponse(200, count, "Counted Unverified Flats successfully"));
});

export const verifyFlat = asyncHandler(async (req, res) => {
  const { id, featured } = req.body;
  const flatData = await Flat.findByIdAndUpdate(id, { $set: { featured } }, { new: true });
  if (!flatData) {
    throw new ApiError(404, "Flat not found");
  }
  // Send verification email (non-blocking)
  if (featured) {
    sendPropertyVerifiedEmail(flatData.owner_email);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, flatData, "Flat verified successfully"));
});

export const incrementFlatViews = asyncHandler(async (req, res) => {
  const flat = await Flat.findByIdAndUpdate(
    req.query.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!flat) {
    throw new ApiError(404, "Flat not found");
  }
  return res.status(200).json(new ApiResponse(200, { views: flat.views }, "View recorded"));
});

export const getTotalFlatViews = asyncHandler(async (req, res) => {
  const result = await Flat.aggregate([
    { $group: { _id: null, totalViews: { $sum: "$views" } } }
  ]);
  const totalViews = result[0]?.totalViews || 0;
  return res.status(200).json(new ApiResponse(200, totalViews, "Total flat views"));
});

export const bulkVerifyFlats = asyncHandler(async (req, res) => {
  const { ids, featured } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new ApiError(400, "Please provide an array of flat IDs");
  }
  if (typeof featured !== "boolean") {
    throw new ApiError(400, "Featured status must be a boolean");
  }

  const result = await Flat.updateMany(
    { _id: { $in: ids } },
    { $set: { featured } }
  );

  // Send verification emails for verified flats (non-blocking)
  if (featured) {
    const flats = await Flat.find({ _id: { $in: ids } }, { owner_email: 1 });
    flats.forEach(flat => sendPropertyVerifiedEmail(flat.owner_email));
  }

  return res.status(200).json(
    new ApiResponse(200, { modifiedCount: result.modifiedCount }, `${result.modifiedCount} flats ${featured ? "verified" : "unverified"} successfully`)
  );
});

export const bulkDeleteFlats = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new ApiError(400, "Please provide an array of flat IDs");
  }

  // Get flats to delete their photos from Cloudinary
  const flats = await Flat.find({ _id: { $in: ids } }, { property_photos: 1 });

  // Delete photos from Cloudinary (non-blocking)
  const photoUrls = flats.flatMap(f => f.property_photos || []);
  await Promise.all(photoUrls.map(url => deleteFromCloudinary(url)));

  // Delete flats from database
  const result = await Flat.deleteMany({ _id: { $in: ids } });

  return res.status(200).json(
    new ApiResponse(200, { deletedCount: result.deletedCount }, `${result.deletedCount} flats deleted successfully`)
  );
});

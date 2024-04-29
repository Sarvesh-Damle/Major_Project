import Hostel from "../models/hostels.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFilesToCloudinary } from "../utils/cloudinary.js";
import axios from "axios";

export const createHostel = asyncHandler(async (req, res) => {
  const hostelData = req.body;
  if (!hostelData) {
    throw new ApiError(400, "Fields are required for property to be listed");
  }
  let propertyPhotosUrls = [];
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
  // const sendEmail = await axios.post("http://localhost:4000/backend-email-service/email", {
  //   to: hostelData.email,
  //   subject: "Property Registration Process has began!",
  //   body: `   Thank you, for providing property details!!\n\nOur Team will verify the property and will surely get back to you`,
  //   user: "Buddies.com",
  // });
  // if (!sendEmail) {
  //   throw new ApiError(500, "Something went wrong while sending email");
  // }
  return res
    .status(201)
    .json(new ApiResponse(200, hostel, "Hostel Property listed successfully"));
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
  const updatedHostel = await Hostel.findByIdAndUpdate(
    req.query.id,
    {
      $set: {
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
      },
    },
    { new: true }
  );
  if (!updatedHostel) {
    throw new ApiError(500, "Something went wrong while updating the property");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedHostel, "Hostel Updated Successfully"));
});

export const deleteHostel = asyncHandler(async (req, res) => {
  const hostel = await Hostel.findById(req.query.id);
  if (!hostel) {
    return res.status(200).json(new ApiResponse(200, "Hostel not found"));
  } else {
    await Hostel.findByIdAndDelete(req.query.id);
  }
  return res.status(200).json(new ApiResponse(200, "Hostel has been deleted"));
});

export const getHostel = asyncHandler(async (req, res) => {
  const hostel = await Hostel.findById(req.query.id);
  if (!hostel) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the hostel property"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, hostel, "Hostel founded successfully"));
});

export const getAllHostel = asyncHandler(async (req, res) => {
  const { city, locality, typeOfHostel, sharingType } = req.query;
  if (!city) {
    throw new ApiError(400, "City paramater not found");
  }
  let query = { city: { $regex: new RegExp(city, "i") } };

  if (locality) {
    query.locality = { $regex: new RegExp(locality, "i") };
  }
  if (typeOfHostel) {
    query.typeOfHostel = { $in: Array.isArray(typeOfHostel) ? typeOfHostel : [typeOfHostel] };
  }
  if (sharingType) {
    query.sharingType = { $in: Array.isArray(sharingType) ? sharingType : [sharingType] };
  }
  query.featured = true;
  const hostels = await Hostel.find(query);

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

export const countByAddress = async (req, res, next) => {
  const address = req.query.address.split(",");
  try {
    const list = await Promise.all(
      address.map((address) => {
        return Hostel.countDocuments({ address: address });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
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
    res.status(200).json([
      { room_type: "Single Room", count: singleRoomCount },
      { room_type: "Double Sharing", count: doubleSharingCount },
      { room_type: "Triple Sharing", count: tripleSharingCount },
      { room_type: "Four Sharing", count: fourSharingCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const verifyHostel = asyncHandler(async (req, res) => {
  const { id, featured } = req.body;
  await Hostel.findByIdAndUpdate(id, { $set: { featured } }, { new: true });
  await axios.post("http://localhost:4000/backend-email-service/email", {
    to: hostelData.email,
    subject: "Property Listed Successfully!",
    body: `   Thank you, your property has been listed!!`,
    user: "Buddies.com",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Hostel verified successfully"));
});

import Flat from "../models/flats.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFilesToCloudinary } from "../utils/cloudinary.js";
import axios from "axios";

export const createFlat = asyncHandler(async (req, res) => {
  const flatData = req.body;
  if (!flatData) {
    throw new ApiError(400, "Fields are required for property to be listed");
  }
  let propertyPhotosUrls = [];
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
  try {
    await axios.post("http://localhost:4000/backend-email-service/email", {
      to: flatData.owner_email,
      subject: "Property Registration Process has began!",
      body: `Thank you, for providing property details!\n\nOur Team will verify the property and will surely get back to you`,
      user: "Buddies.com",
    });
  } catch {
    // Email service unavailable - non-critical, continue
  }
  return res
    .status(201)
    .json(new ApiResponse(201, flat, "Flat Property listed successfully"));
});

export const updateFlat = asyncHandler(async (req, res) => {
  const { flatType, preferredTennats, flatArea, furnishedStatus, locality, rentAmount, securityDeposit, verified, city, ownerName, ownerEmail, ownerPhoneNumber, pincode, address, distanceFromRailwayStation, distanceFromBusStop, description } = req.body;

  // Handle photo uploads if new photos are provided
  let propertyPhotosUrls;
  if (req.files?.property_photos && Array.isArray(req.files.property_photos) && req.files.property_photos.length > 0) {
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
    return res.status(404).json(new ApiResponse(404, null, "Flat not found"));
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
  const { city, locality, page = 1, limit = 10 } = req.query;
  if (!city) {
    throw new ApiError(400, "City parameter not found");
  }
  let query = { city: { $regex: new RegExp(city, "i") } };
  if (locality) {
    query.locality = { $regex: new RegExp(locality, "i") };
  }
  query.featured = true;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Flat.countDocuments(query);
  const flats = await Flat.find(query)
    .sort({ createdAt: -1 })
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
  try {
    await axios.post("http://localhost:4000/backend-email-service/email", {
      to: flatData.owner_email,
      subject: "Property Listed Successfully!",
      body: `Thank you, your property has been listed!`,
      user: "Buddies.com",
    });
  } catch {
    // Email service unavailable - non-critical, continue
  }
  return res
    .status(200)
    .json(new ApiResponse(200, flatData, "Flat verified successfully"));
});

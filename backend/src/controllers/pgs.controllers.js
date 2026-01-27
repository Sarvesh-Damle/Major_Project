import PG from "../models/pgs.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFilesToCloudinary } from "../utils/cloudinary.js";
import { sendPropertyRegistrationEmail, sendPropertyVerifiedEmail } from "../utils/sendEmail.js";

export const createPG = asyncHandler(async (req, res) => {
  const pgData = req.body;
  if (!pgData) {
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

  const pg = await PG.create({
    ...pgData,
    property_photos: propertyPhotosUrls,
  });
  if (!pg) {
    throw new ApiError(500, "Something went wrong while listing the property");
  }
  // Send registration email (non-blocking)
  sendPropertyRegistrationEmail(pgData.owner_email);

  return res
    .status(201)
    .json(new ApiResponse(201, pg, "PG Property listed successfully"));
});

export const updatePG = asyncHandler(async (req, res) => {
  const { pgName, preferredTennats, locality, rentAmount, securityDeposit, verified, city, ownerName, ownerEmail, ownerPhoneNumber, pincode, address, distanceFromRailwayStation, distanceFromBusStop, description, foodIncluded } = req.body;

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
    pg_name: pgName,
    preferred_tennats: preferredTennats,
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
    food_included: foodIncluded,
  };

  // Only update photos if new ones were uploaded
  if (propertyPhotosUrls && propertyPhotosUrls.length > 0) {
    updateData.property_photos = propertyPhotosUrls;
  }

  // Remove undefined values
  Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

  const updatedPG = await PG.findByIdAndUpdate(
    req.query.id,
    { $set: updateData },
    { new: true }
  );
  if (!updatedPG) {
    throw new ApiError(404, "PG not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedPG, "PG Updated Successfully"));
});

export const deletePG = asyncHandler(async (req, res) => {
  const pg = await PG.findByIdAndDelete(req.query.id);
  if (!pg) {
    return res.status(404).json(new ApiResponse(404, null, "PG not found"));
  }
  return res.status(200).json(new ApiResponse(200, null, "PG has been deleted"));
});

export const getPG = asyncHandler(async (req, res) => {
  const pg = await PG.findById(req.query.id);
  if (!pg) {
    throw new ApiError(404, "PG not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, pg, "PG found successfully"));
});

export const getAllPG = asyncHandler(async (req, res) => {
  const { city, locality, page = 1, limit = 10, minPrice, maxPrice, sortBy, preferredTennats, roomType } = req.query;
  if (!city) {
    throw new ApiError(400, "City parameter not found");
  }
  let query = { city: { $regex: new RegExp(city, "i") } };
  if (locality) {
    query.locality = { $regex: new RegExp(locality, "i") };
  }
  if (preferredTennats) {
    query.preferred_tennats = { $in: Array.isArray(preferredTennats) ? preferredTennats : [preferredTennats] };
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
  const total = await PG.countDocuments(query);
  const pgs = await PG.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit));

  return res.status(200).json(
    new ApiResponse(200, {
      pgs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    }, "PGs found successfully")
  );
});

export const getAllPGsInfo = asyncHandler(async (req, res) => {
  const pgs = await PG.find();
  if (!pgs) {
    throw new ApiError(
      500,
      "Something went wrong while fetching PG properties"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, pgs, "PGs found successfully"));
});

export const countVerifiedPGs = asyncHandler(async (req, res) => {
  const count = await PG.countDocuments({featured: true});
  res
    .status(200)
    .json(new ApiResponse(200, count, "Counted Verified PGs successfully"));
});

export const countNotVerifiedPGs = asyncHandler(async (req, res) => {
  const count = await PG.countDocuments({featured: false});
  res
    .status(200)
    .json(new ApiResponse(200, count, "Counted Unverified PGs successfully"));
});

export const verifyPG = asyncHandler(async (req, res) => {
  const { id, featured } = req.body;
  const pgData = await PG.findByIdAndUpdate(id, { $set: { featured } }, { new: true });
  if (!pgData) {
    throw new ApiError(404, "PG not found");
  }
  // Send verification email (non-blocking)
  if (featured) {
    sendPropertyVerifiedEmail(pgData.owner_email);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, pgData, "PG verified successfully"));
});

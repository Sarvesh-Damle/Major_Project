import PG from "../models/pgs.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createPG = asyncHandler(async (req, res) => {
  const pgData = req.body;
  if (!pgData) {
    throw new ApiError(400, "Fields are required for property to be listed")
  }
  let propertyPhotosUrls = [];
  if (
    req.files &&
    req.files.property_photos &&
    Array.isArray(req.files.property_photos)
  ) {
    for (let i = 0; i < Math.min(req.files.property_photos.length, 5); i++) {
      const photosLocalPath = req.files.property_photos[i].path;
      const propertyPhoto = await uploadOnCloudinary(photosLocalPath);
      if (!propertyPhoto) {
        throw new ApiError(400, "Failed to upload property photo");
      }
      propertyPhotosUrls.push(propertyPhoto.url);
    }
  }
  if (propertyPhotosUrls.length === 0) {
    throw new ApiError(400, "Please provide property photos");
  }

  const pg = await PG.create({...pgData, property_photos: propertyPhotosUrls});
  if (!pg) {
    throw new ApiError(500, "Something went wrong while listing the property");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, pg, "PG Property listed successfully"));
});

export const updatePG = asyncHandler(async (req, res) => {
  const updatedPG = await PG.findByIdAndUpdate(
    req.query.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedPG) {
    throw new ApiError(500, "Something went wrong while updating the property");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedPG, "PG Updated Successfully"));
});

export const deletePG = asyncHandler(async (req, res) => {
  await PG.findByIdAndDelete(req.query.id);
  return res.status(200).json(new ApiResponse(200, "PG has been deleted"));
});

export const getPG = asyncHandler(async (req, res) => {
  const pg = await PG.findById(req.query.id);
  if (!pg) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the PG property"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, pg, "PG founded successfully"));
});

export const getAllPG = asyncHandler(async (req, res) => {
  const {city, locality} = req.query;
  if (!city) {
    throw new ApiError(400, "City paramater not found");
  }
  let query = {};
  if (city) {
    query.city = {$regex: new RegExp(city, "i")};
  }
  if (locality) {
    query.locality = {$regex: new RegExp(locality, "i")};
  }
  const pgs = await PG.find(query);
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

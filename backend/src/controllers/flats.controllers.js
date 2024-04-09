import Flat from "../models/flats.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

  const flat = await Flat.create({
    ...flatData,
    property_photos: propertyPhotosUrls,
  });
  if (!flat) {
    throw new ApiError(500, "Something went wrong while listing the property");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, flat, "Flat Property listed successfully"));
});

export const updateFlat = asyncHandler(async (req, res) => {
  const updatedFlat = await Flat.findByIdAndUpdate(
    req.query.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedFlat) {
    throw new ApiError(500, "Something went wrong while updating the property");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedFlat, "Flat Updated Successfully"));
});

export const deleteFlat = asyncHandler(async (req, res) => {
  await Flat.findByIdAndDelete(req.query.id);
  return res.status(200).json(new ApiResponse(200, "Flat has been deleted"));
});

export const getFlat = asyncHandler(async (req, res) => {
  const flat = await Flat.findById(req.query.id);
  if (!flat) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the flat property"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, flat, "Flat founded successfully"));
});

export const getAllFlat = asyncHandler(async (req, res) => {
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
  const flats = await Flat.find(query);
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

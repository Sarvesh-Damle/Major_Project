import Hostel from "../models/hostels.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

export const createHostel = asyncHandler(async (req, res) => {
  const hostelData = req.body;
  if (!hostelData) {
    throw new ApiError(400, "Fields are required for property to be listed");
  }
  let propertyPhotosUrls = [];
  if (
    req.files?.property_photos &&
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

  const hostel = await Hostel.create({...hostelData, property_photos: propertyPhotosUrls});
  if (!hostel) {
    throw new ApiError(500, "Something went wrong while listing the property");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, hostel, "Hostel Property listed successfully"));
});

export const updateHostel = asyncHandler(async (req, res) => {
  const {id} = req.query;
  const updatedHostel = await Hostel.findByIdAndUpdate(
    id,
    { $set: req.body },
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
  const {id} = req.query;
  await Hostel.findByIdAndDelete(id);
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

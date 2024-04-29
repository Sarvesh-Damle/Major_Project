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
  await axios.post("http://localhost:4000/backend-email-service/email", {
    to: hostelData.email,
    subject: "Property Registration Process has began!",
    body: `   Thank you, for providing property details!!\n\nOur Team will verify the property and will surely get back to you`,
    user: "Buddies.com",
  });
  return res
    .status(201)
    .json(new ApiResponse(200, flat, "Flat Property listed successfully"));
});

export const updateFlat = asyncHandler(async (req, res) => {
  const {flatType, preferredTennats, flatArea, furnishedStatus, locality, rentAmount, securityDeposit, verified, city, ownerName, ownerEmail, ownerPhoneNumber, pincode, address, distanceFromRailwayStation, distanceFromBusStop, description} = req.body;
  const updatedFlat = await Flat.findByIdAndUpdate(
    req.query.id,
    { $set: {flat_type: flatType, preferred_tennats: preferredTennats, flat_area: flatArea, furnished_status: furnishedStatus, locality, rent_amount: rentAmount, security_deposit: securityDeposit, featured: verified, city, owner_name: ownerName, owner_email: ownerEmail, owner_phoneNumber: ownerPhoneNumber, pincode, address, distance_from_nearest_railway_station: distanceFromRailwayStation, distance_from_bus_stop: distanceFromBusStop, description} },
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
  const flat = await Hostel.findById(req.query.id);
  if (!flat) {
    return res.status(200).json(new ApiResponse(200, "Flat not found"));
  } else {
    await Flat.findByIdAndDelete(req.query.id);
  }
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
  const { city, locality } = req.query;
  if (!city) {
    throw new ApiError(400, "City paramater not found");
  }
  let query = {};
  if (city) {
    query.city = { $regex: new RegExp(city, "i") };
  }
  if (locality) {
    query.locality = { $regex: new RegExp(locality, "i") };
  }
  query.featured = true;
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
  await Flat.findByIdAndUpdate(id, { $set: { featured } }, { new: true });
  await axios.post("http://localhost:4000/backend-email-service/email", {
    to: hostelData.email,
    subject: "Property Listed Successfully!",
    body: `   Thank you, your property has been listed!!`,
    user: "Buddies.com",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Flat verified successfully"));
});

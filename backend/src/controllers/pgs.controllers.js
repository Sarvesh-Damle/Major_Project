import PG from "../models/pgs.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFilesToCloudinary } from "../utils/cloudinary.js";
import axios from "axios";

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
  await axios.post("http://localhost:4000/backend-email-service/email", {
    to: hostelData.email,
    subject: "Property Registration Process has began!",
    body: `   Thank you, for providing property details!!\n\nOur Team will verify the property and will surely get back to you`,
    user: "Buddies.com",
  });
  return res
    .status(201)
    .json(new ApiResponse(200, pg, "PG Property listed successfully"));
});

export const updatePG = asyncHandler(async (req, res) => {
  const {pgName, preferredTennats, locality, rentAmount, securityDeposit, verified, city, ownerName, ownerEmail, ownerPhoneNumber, pincode, address, distanceFromRailwayStation, distanceFromBusStop, description, foodIncluded} = req.body;
  const updatedPG = await PG.findByIdAndUpdate(
    req.query.id,
    { $set: {pg_name: pgName, preferred_tennats: preferredTennats, locality, rent_amount: rentAmount, security_deposit: securityDeposit, featured: verified, city, owner_name: ownerName, owner_email: ownerEmail, owner_phoneNumber: ownerPhoneNumber, pincode, address, distance_from_nearest_railway_station: distanceFromRailwayStation, distance_from_bus_stop: distanceFromBusStop, description, food_included: foodIncluded} },
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
  const pg = await PG.findById(req.query.id);
  if (!pg) {
    return res.status(200).json(new ApiResponse(200, "PG not found"));
  } else {
    await PG.findByIdAndDelete(req.query.id);
  }
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
  await PG.findByIdAndUpdate(id, { $set: { featured } }, { new: true });
  await axios.post("http://localhost:4000/backend-email-service/email", {
    to: hostelData.email,
    subject: "Property Listed Successfully!",
    body: `   Thank you, your property has been listed!!`,
    user: "Buddies.com",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "PG verified successfully"));
});

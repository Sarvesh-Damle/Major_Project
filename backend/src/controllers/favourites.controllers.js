import Favourites from "../models/favourites.models.js";
import Hostel from "../models/hostels.models.js";
import PG from "../models/pgs.models.js";
import Flat from "../models/flats.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createFavourite = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { propertyId, propertyTag } = req.body;

  if (!propertyId || !propertyTag) {
    throw new ApiError(400, "Property ID and tag are required");
  }

  if (!["hostel", "pg", "flat"].includes(propertyTag)) {
    throw new ApiError(400, "Invalid property tag");
  }

  const existingFavourites = await Favourites.findOne({ userId });

  if (existingFavourites) {
    // Check if property already exists in favourites
    const alreadyExists = existingFavourites.properties.some(
      (prop) => prop.propertyId.toString() === propertyId
    );

    if (alreadyExists) {
      return res
        .status(200)
        .json(new ApiResponse(200, existingFavourites, "Property already exists in favourites"));
    }

    existingFavourites.properties.push({ propertyId, propertyTag });
    const updatedFavourites = await existingFavourites.save({ validateBeforeSave: false });

    return res
      .status(201)
      .json(new ApiResponse(201, updatedFavourites, "Property added to favourites"));
  }

  // Create new favourites document
  const newFavourite = await Favourites.create({
    userId,
    properties: [{ propertyId, propertyTag }],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newFavourite, "Favourite created successfully"));
});

export const getFavourite = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const favourites = await Favourites.findOne({ userId });

  if (!favourites || favourites.properties.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, { hostels: [], pgs: [], flats: [] }, "No favourites found")
    );
  }

  // Group property IDs by type
  const hostelIds = [];
  const pgIds = [];
  const flatIds = [];

  for (const prop of favourites.properties) {
    switch (prop.propertyTag) {
      case "hostel":
        hostelIds.push(prop.propertyId);
        break;
      case "pg":
        pgIds.push(prop.propertyId);
        break;
      case "flat":
        flatIds.push(prop.propertyId);
        break;
    }
  }

  // Fetch all properties in parallel (efficient batch query)
  const [hostels, pgs, flats] = await Promise.all([
    hostelIds.length > 0 ? Hostel.find({ _id: { $in: hostelIds } }) : [],
    pgIds.length > 0 ? PG.find({ _id: { $in: pgIds } }) : [],
    flatIds.length > 0 ? Flat.find({ _id: { $in: flatIds } }) : [],
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      { hostels, pgs, flats },
      "Favourite properties fetched successfully"
    )
  );
});

export const removeFavourite = asyncHandler(async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user._id;

  if (!propertyId) {
    throw new ApiError(400, "Property ID is required");
  }

  const result = await Favourites.findOneAndUpdate(
    { userId },
    { $pull: { properties: { propertyId } } },
    { new: true }
  );

  if (!result) {
    return res.status(404).json(new ApiResponse(404, null, "Favourites not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Property removed from favourites"));
});

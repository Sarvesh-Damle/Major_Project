import Favourites from "../models/favourites.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
import { returnUrl } from "../utils/returnUrl.js";

export const createFavourite = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const propertyId = req.body.propertyId;
  const propertyTag = req.body.propertyTag;
  const existingFavourites = await Favourites.findOne({ userId });
  if (existingFavourites) {
    if (
      existingFavourites.properties.some(
        (propId) => propId.propertyId.toString() === propertyId
      )
    ) {
      return res
        .status(200)
        .json(new ApiResponse(200, "Property already exists in favourites"));
    }
    existingFavourites.properties.push({ propertyId, propertyTag });
    const updatedFavourites = await existingFavourites.save({
      validateBeforeSave: false,
    });
    return res
      .status(201)
      .json(
        new ApiResponse(200, updatedFavourites, "Property added to favourites")
      );
  } else {
    const newFavourite = await Favourites.create({
      userId,
      properties: [{ propertyId, propertyTag }],
    });
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          newFavourite,
          "Favourite Property added to favourites"
        )
      );
  }
});

export const getFavourite = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const favouriteProperties = await Favourites.findOne({userId});
  let pgProperties = [];
  let flatProperties = [];
  let hostelProperties = [];
    if (!favouriteProperties) {
    return res.status(200).json(new ApiResponse(200, "No Favourites found"));
  }
  for (const item of favouriteProperties.properties) {
    let url = returnUrl(item.propertyTag, item.propertyId);
    const { data } = await axios.get(url, { withCredentials: true });
    if (item.propertyTag === "hostel") {
      hostelProperties.push(data.data);
    }
    if (item.propertyTag === "pg") {
      pgProperties.push(data.data);
    }
    if (item.propertyTag === "flat") {
      flatProperties.push(data.data);
    }
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { pg: pgProperties, hostel: hostelProperties, flat: flatProperties },
        "Favourite Property founded successfully"
      )
    );
});

export const removeFavourite = asyncHandler(async (req, res) => {
  const toDeleteId = req.body.propertyId;
  const userId = req.user._id;
  const updatedFavourites = await Favourites.findOneAndUpdate(
    { userId },
    { $pull: { properties: { propertyId: toDeleteId } } }
  );
  if (!updatedFavourites) {
    return res.status(404).json(new ApiResponse(404, "Favourite not found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Favourite Property removed successfully"));
});

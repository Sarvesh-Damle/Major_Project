import SavedSearch from "../models/savedSearches.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new saved search
export const createSavedSearch = asyncHandler(async (req, res) => {
  const { searchName, propertyType, filters, notifyOnNewMatches } = req.body;
  const userId = req.user._id;

  if (!searchName || !propertyType) {
    throw new ApiError(400, "Search name and property type are required");
  }

  // Limit saved searches per user (max 10)
  const existingCount = await SavedSearch.countDocuments({ userId });
  if (existingCount >= 10) {
    throw new ApiError(400, "Maximum 10 saved searches allowed. Please delete some to add new ones.");
  }

  const savedSearch = await SavedSearch.create({
    userId,
    searchName,
    propertyType,
    filters: filters || {},
    notifyOnNewMatches: notifyOnNewMatches || false,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, savedSearch, "Search saved successfully"));
});

// Get all saved searches for current user
export const getMySavedSearches = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const savedSearches = await SavedSearch.find({ userId }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, savedSearches, "Saved searches fetched successfully"));
});

// Get a single saved search by ID
export const getSavedSearch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const savedSearch = await SavedSearch.findOne({ _id: id, userId });

  if (!savedSearch) {
    throw new ApiError(404, "Saved search not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, savedSearch, "Saved search fetched successfully"));
});

// Update a saved search
export const updateSavedSearch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { searchName, filters, notifyOnNewMatches } = req.body;

  const savedSearch = await SavedSearch.findOne({ _id: id, userId });

  if (!savedSearch) {
    throw new ApiError(404, "Saved search not found");
  }

  // Update fields
  if (searchName) savedSearch.searchName = searchName;
  if (filters) savedSearch.filters = { ...savedSearch.filters, ...filters };
  if (typeof notifyOnNewMatches === "boolean") {
    savedSearch.notifyOnNewMatches = notifyOnNewMatches;
  }

  await savedSearch.save();

  return res
    .status(200)
    .json(new ApiResponse(200, savedSearch, "Saved search updated successfully"));
});

// Delete a saved search
export const deleteSavedSearch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const savedSearch = await SavedSearch.findOneAndDelete({ _id: id, userId });

  if (!savedSearch) {
    throw new ApiError(404, "Saved search not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Saved search deleted successfully"));
});

import User from "../models/users.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, admin } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.query.id,
    { $set: { name, email, phoneNumber, isAdmin: admin } },
    { new: true }
  ).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.query.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await User.findByIdAndDelete(req.query.id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User deleted successfully"));
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.query.id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken -isAdmin");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/users.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.header("Authorization")?.replace("Bearer ", "") || "");
    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

/**
 * Middleware to verify if user is an admin
 * Must be used after verifyJWT middleware
 */
export const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized Request");
  }
  if (req.user.isAdmin) {
    next();
  } else {
    throw new ApiError(403, "You are not authorized - Admin access required");
  }
};

/**
 * Middleware to verify if user owns the resource or is admin
 * Must be used after verifyJWT middleware
 */
export const verifyOwnerOrAdmin = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized Request");
  }
  if (req.user._id.toString() === req.params.id || req.user.isAdmin) {
    next();
  } else {
    throw new ApiError(403, "You are not authorized to access this resource");
  }
};

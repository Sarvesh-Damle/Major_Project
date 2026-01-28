import User from "../models/users.models.js";
import Hostel from "../models/hostels.models.js";
import PG from "../models/pgs.models.js";
import Flat from "../models/flats.models.js";
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

// Get all properties owned by the current user
export const getMyProperties = asyncHandler(async (req, res) => {
  const userEmail = req.user.email;

  // Fetch properties from all three collections where owner_email matches
  const [hostels, pgs, flats] = await Promise.all([
    Hostel.find({ owner_email: userEmail }).sort({ createdAt: -1 }),
    PG.find({ owner_email: userEmail }).sort({ createdAt: -1 }),
    Flat.find({ owner_email: userEmail }).sort({ createdAt: -1 }),
  ]);

  // Add propertyType to each item for frontend identification
  const properties = [
    ...hostels.map((h) => ({ ...h.toObject(), propertyType: "hostel" })),
    ...pgs.map((p) => ({ ...p.toObject(), propertyType: "pg" })),
    ...flats.map((f) => ({ ...f.toObject(), propertyType: "flat" })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res
    .status(200)
    .json(new ApiResponse(200, properties, "Properties fetched successfully"));
});

// Get dashboard stats for the current user's properties
export const getMyPropertyStats = asyncHandler(async (req, res) => {
  const userEmail = req.user.email;

  // Run aggregation pipelines in parallel
  const [hostelStats, pgStats, flatStats] = await Promise.all([
    Hostel.aggregate([
      { $match: { owner_email: userEmail } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalViews: { $sum: "$views" },
          verifiedCount: { $sum: { $cond: ["$featured", 1, 0] } },
        },
      },
    ]),
    PG.aggregate([
      { $match: { owner_email: userEmail } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalViews: { $sum: "$views" },
          verifiedCount: { $sum: { $cond: ["$featured", 1, 0] } },
        },
      },
    ]),
    Flat.aggregate([
      { $match: { owner_email: userEmail } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalViews: { $sum: "$views" },
          verifiedCount: { $sum: { $cond: ["$featured", 1, 0] } },
        },
      },
    ]),
  ]);

  // Extract stats or use defaults
  const h = hostelStats[0] || { count: 0, totalViews: 0, verifiedCount: 0 };
  const p = pgStats[0] || { count: 0, totalViews: 0, verifiedCount: 0 };
  const f = flatStats[0] || { count: 0, totalViews: 0, verifiedCount: 0 };

  const stats = {
    totalProperties: h.count + p.count + f.count,
    totalViews: h.totalViews + p.totalViews + f.totalViews,
    verifiedCount: h.verifiedCount + p.verifiedCount + f.verifiedCount,
    byType: {
      hostels: { count: h.count, views: h.totalViews, verified: h.verifiedCount },
      pgs: { count: p.count, views: p.totalViews, verified: p.verifiedCount },
      flats: { count: f.count, views: f.totalViews, verified: f.verifiedCount },
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Property stats fetched successfully"));
});

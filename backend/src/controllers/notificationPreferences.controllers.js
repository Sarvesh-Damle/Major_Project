import NotificationPreference from "../models/notificationPreferences.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get notification preferences for current user
export const getNotificationPreferences = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let preferences = await NotificationPreference.findOne({ userId });

  // Create default preferences if none exist
  if (!preferences) {
    preferences = await NotificationPreference.create({ userId });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, preferences, "Notification preferences fetched successfully"));
});

// Update notification preferences
export const updateNotificationPreferences = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    emailNotificationsEnabled,
    savedSearchAlerts,
    savedSearchFrequency,
    propertyVerifiedAlert,
    promotionalEmails,
  } = req.body;

  // Find existing or create new
  let preferences = await NotificationPreference.findOne({ userId });

  if (!preferences) {
    preferences = new NotificationPreference({ userId });
  }

  // Update fields if provided
  if (typeof emailNotificationsEnabled === "boolean") {
    preferences.emailNotificationsEnabled = emailNotificationsEnabled;
  }
  if (typeof savedSearchAlerts === "boolean") {
    preferences.savedSearchAlerts = savedSearchAlerts;
  }
  if (savedSearchFrequency) {
    if (!["immediate", "daily", "weekly", "never"].includes(savedSearchFrequency)) {
      throw new ApiError(400, "Invalid frequency value");
    }
    preferences.savedSearchFrequency = savedSearchFrequency;
  }
  if (typeof propertyVerifiedAlert === "boolean") {
    preferences.propertyVerifiedAlert = propertyVerifiedAlert;
  }
  if (typeof promotionalEmails === "boolean") {
    preferences.promotionalEmails = promotionalEmails;
  }

  await preferences.save();

  return res
    .status(200)
    .json(new ApiResponse(200, preferences, "Notification preferences updated successfully"));
});

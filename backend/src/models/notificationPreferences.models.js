import mongoose, { Schema } from "mongoose";

const notificationPreferencesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    emailNotificationsEnabled: {
      type: Boolean,
      default: true,
    },
    savedSearchAlerts: {
      type: Boolean,
      default: true,
    },
    savedSearchFrequency: {
      type: String,
      enum: ["immediate", "daily", "weekly", "never"],
      default: "daily",
    },
    propertyVerifiedAlert: {
      type: Boolean,
      default: true,
    },
    promotionalEmails: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NotificationPreference = mongoose.model(
  "NotificationPreference",
  notificationPreferencesSchema
);

export default NotificationPreference;

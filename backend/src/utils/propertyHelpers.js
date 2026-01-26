import { ApiResponse } from "./ApiResponse.js";
import { ApiError } from "./ApiError.js";
import { sendPropertyVerifiedEmail } from "./sendEmail.js";

/**
 * Handle property deletion with proper response
 * @param {Model} Model - Mongoose model (Hostel, PG, or Flat)
 * @param {string} id - Property ID to delete
 * @param {Response} res - Express response object
 */
export const handlePropertyDelete = async (Model, id, res) => {
  const property = await Model.findById(id);

  if (!property) {
    return res.status(404).json(new ApiResponse(404, null, "Property not found"));
  }

  await Model.findByIdAndDelete(id);
  return res.status(200).json(new ApiResponse(200, null, "Property deleted successfully"));
};

/**
 * Handle property verification (featured status update)
 * @param {Model} Model - Mongoose model (Hostel, PG, or Flat)
 * @param {string} id - Property ID to verify
 * @param {boolean} featured - Featured status to set
 * @param {string} propertyType - Type of property for response message
 */
export const handlePropertyVerify = async (Model, id, featured, propertyType = "Property") => {
  const property = await Model.findByIdAndUpdate(
    id,
    { $set: { featured } },
    { new: true }
  );

  if (!property) {
    throw new ApiError(404, `${propertyType} not found`);
  }

  // Send verification email if property is being verified (featured = true)
  if (featured && property.owner_email) {
    await sendPropertyVerifiedEmail(property.owner_email);
  }

  return property;
};

/**
 * Build pagination response object
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 */
export const buildPaginationResponse = (page, limit, total) => ({
  page: Number(page),
  limit: Number(limit),
  total,
  pages: Math.ceil(total / limit),
  hasNext: page * limit < total,
  hasPrev: page > 1,
});

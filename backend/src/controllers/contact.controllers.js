import Contact from "../models/contact.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const contact = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;
  if (
    [name, email, message, phoneNumber].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (!email.includes("@")) {
    throw new ApiError(400, "Valid email address is required");
  }

  const query = await Contact.create({ name, email, message, phoneNumber });
  if (!query) {
    throw new ApiError(
      500,
      "Something went wrong while submitting the message"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, query, "Message Submitted Successfully"));
});

export const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.query.id);
  return res.status(200).json(new ApiResponse(200, "Message query has been deleted"));
});

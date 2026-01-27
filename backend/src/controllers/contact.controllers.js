import Contact from "../models/contact.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendContactAcknowledgmentEmail, sendContactNotificationEmail } from "../utils/sendEmail.js";

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

  // Send emails (non-blocking, fire-and-forget)
  sendContactAcknowledgmentEmail(email, name);
  sendContactNotificationEmail(name, email, phoneNumber, message);

  return res
    .status(201)
    .json(new ApiResponse(201, query, "Message submitted successfully"));
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.query.id);

  if (!contact) {
    throw new ApiError(404, "Contact message not found");
  }

  await Contact.findByIdAndDelete(req.query.id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Contact message deleted successfully"));
});

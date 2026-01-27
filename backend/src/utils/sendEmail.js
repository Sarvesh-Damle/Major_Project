import axios from "axios";
import logger from "./logger.js";

const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || "http://localhost:4000";

/**
 * Send email via external email service
 * Non-critical - failures are logged but don't throw errors
 *
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} body - Email body content
 * @returns {Promise<boolean>} True if email was sent successfully
 */
export const sendEmail = async (to, subject, body) => {
  try {
    await axios.post(`${EMAIL_SERVICE_URL}/backend-email-service/email`, {
      to,
      subject,
      body,
      user: "Buddies.com",
    });
    return true;
  } catch (error) {
    // Log error but don't throw - email is non-critical
    logger.warn("Email service error", { error: error.message });
    return false;
  }
};

/**
 * Send property registration email
 */
export const sendPropertyRegistrationEmail = async (email) => {
  return sendEmail(
    email,
    "Property Registration Process has begun!",
    `Thank you for providing property details!

Our Team will verify the property and will surely get back to you.

Best regards,
Buddies.com Team`
  );
};

/**
 * Send property verification success email
 */
export const sendPropertyVerifiedEmail = async (email) => {
  return sendEmail(
    email,
    "Property Listed Successfully!",
    `Thank you, your property has been verified and listed!

Your property is now visible to potential tenants on our platform.

Best regards,
Buddies.com Team`
  );
};

/**
 * Send user registration welcome email
 */
export const sendWelcomeEmail = async (email) => {
  return sendEmail(
    email,
    "Welcome to Buddies!",
    `Thank you for registering with Buddies!

We are always ready to help by providing the best services for our customers.
We believe in convenience and getting you a good place to live.

Best regards,
Buddies.com Team`
  );
};

import { uploadFilesToCloudinary } from "./cloudinary.js";
import { ApiError } from "./ApiError.js";

/**
 * Upload multiple property images to Cloudinary
 * @param {Array} files - Array of file objects from multer
 * @param {number} maxCount - Maximum number of images to upload (default: 5)
 * @returns {Promise<string[]>} Array of uploaded image URLs
 */
export const uploadPropertyImages = async (files, maxCount = 5) => {
  if (!files || !Array.isArray(files) || files.length === 0) {
    throw new ApiError(400, "At least one image is required");
  }

  const filesToUpload = files.slice(0, maxCount);
  const uploadedUrls = [];

  for (const file of filesToUpload) {
    const result = await uploadFilesToCloudinary(file.path);
    if (result?.url) {
      uploadedUrls.push(result.url);
    }
  }

  if (uploadedUrls.length === 0) {
    throw new ApiError(400, "Failed to upload property photos");
  }

  return uploadedUrls;
};

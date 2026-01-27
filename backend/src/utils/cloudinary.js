import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import logger from "./logger.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFilesToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "Buddies_MajorProject/property_images",
      resource_type: "auto",
    });
    logger.info("Cloudinary upload successful", { url: response.url });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    logger.error("Cloudinary upload failed", { error: error.message });
    return null;
  }
};

/**
 * Extract public_id from Cloudinary URL
 * URL format: https://res.cloudinary.com/{cloud}/image/upload/v{version}/{public_id}.{ext}
 */
const extractPublicId = (imageUrl) => {
  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/");
    // Find index of 'upload' and get everything after version
    const uploadIndex = pathParts.indexOf("upload");
    if (uploadIndex === -1) return null;
    // Skip 'upload' and version (v1234567890)
    const publicIdParts = pathParts.slice(uploadIndex + 2);
    const publicIdWithExt = publicIdParts.join("/");
    // Remove file extension
    return publicIdWithExt.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null;
    const publicId = extractPublicId(imageUrl);
    if (!publicId) {
      logger.warn("Could not extract public_id from URL", { imageUrl });
      return null;
    }
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info("Cloudinary file deleted", { publicId, result: result.result });
    return result;
  } catch (error) {
    logger.error("Cloudinary delete failed", { error: error.message, imageUrl });
    return null;
  }
};

export { uploadFilesToCloudinary, deleteFromCloudinary };

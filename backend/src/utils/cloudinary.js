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

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null;
    await cloudinary.uploader.destroy(imageUrl);
    logger.info("Cloudinary file deleted", { imageUrl });
  } catch (error) {
    logger.error("Cloudinary delete failed", { error: error.message });
    return null;
  }
};

export { uploadFilesToCloudinary, deleteFromCloudinary };

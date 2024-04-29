import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFilesToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // uploading file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "Buddies_MajorProject/property_images",
      resource_type: "auto",
    });
    console.log("File upload on cloudinary successful!! ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // removing the locally saved temporary file as the upload operation failed
    return null;
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null;
    const response = await cloudinary.uploader.destroy(imageUrl);
    console.log("File deleted from cloudinary successfully");
  } catch (error) {
    console.error("Error deleting file from cloudinary: ", error);
    return null;
  }
};

export { uploadFilesToCloudinary, deleteFromCloudinary };

import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import fs from "fs";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (localPath) => {
  try {
    if (!localPath) return;

    const result = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localPath);

    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(localPath);
    console.log("Upload failed: " + error);
  }
};

export default uploadImage;

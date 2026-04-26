import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ override: true });

// Debug log to check if keys are loaded (only shows first/last 3 chars)
const mask = (str) => str ? `${str.substring(0, 3)}...${str.substring(str.length - 3)}` : 'undefined';
console.log(`Cloudinary Config Debug: Cloud Name: ${mask(process.env.CLOUDINARY_CLOUD_NAME)}, API Key: ${mask(process.env.CLOUDINARY_API_KEY)}`);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Check if config exists
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            throw new Error('Cloudinary configuration is missing. Please check your .env file.');
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: 'nphss/announcements',
        });

        // File has been uploaded successfully
        // console.log("File is uploaded on cloudinary ", response.url);

        // Remove the local file as it is now uploaded
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Remove the local file as the upload operation failed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error('Cloudinary upload error:', error);
        return null;
    }
};

export { uploadOnCloudinary };

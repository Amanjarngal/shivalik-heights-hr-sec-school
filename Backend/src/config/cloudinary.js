import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine the folder based on the route or fieldname
    let folderName = 'nphss/general';

    if (file.fieldname === 'logo') folderName = 'nphss/settings';
    else if (file.fieldname === 'heroImages') folderName = 'nphss/hero';
    else if (file.fieldname === 'admissionImage') folderName = 'nphss/admission';
    else if (file.fieldname === 'image') folderName = 'nphss/gallery';

    return {
      folder: folderName,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'svg', 'pdf'],
      public_id: `${file.fieldname}-${Date.now()}`,
      resource_type: 'auto'
    };
  }
});

export { cloudinary, storage };

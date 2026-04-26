import express from 'express';
import multer from 'multer';
import { getGalleryImages, uploadGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { storage } from '../config/cloudinary.js';

const router = express.Router();

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const filetypes = /jpe?g|png|webp|svg/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Images only! (JPEG, PNG, WEBP, SVG)'));
    }
  },
});

router.route('/')
  .get(getGalleryImages)
  .post(protect, admin, upload.single('image'), uploadGalleryImage);

router.route('/:id')
  .delete(protect, admin, deleteGalleryImage);

export default router;

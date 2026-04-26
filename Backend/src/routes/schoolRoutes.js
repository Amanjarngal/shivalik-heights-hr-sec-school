import express from 'express';
import multer from 'multer';
import { getSchoolSettings, updateSchoolSettings } from '../controllers/schoolController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { storage } from '../config/cloudinary.js';

const router = express.Router();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 12,                   // max total files per request
  },
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

const uploadFields = upload.fields([
  { name: 'logo',           maxCount: 1  },
  { name: 'heroImages',     maxCount: 10 },
  { name: 'admissionImage', maxCount: 1  },
  { name: 'aboutUsImage',   maxCount: 1  },
  { name: 'chairmanImage',  maxCount: 1  },
  { name: 'principalImage', maxCount: 1  },
]);

// Wrap multer so upload errors return JSON instead of crashing
const uploadMiddleware = (req, res, next) => {
  uploadFields(req, res, (err) => {
    if (err) {
      console.error('[Multer Error]', err.message);
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

router.route('/')
  .get(getSchoolSettings)
  .put(protect, admin, uploadMiddleware, updateSchoolSettings);

export default router;

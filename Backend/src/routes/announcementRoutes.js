import express from 'express';
import multer from 'multer';
import {
    createAnnouncement,
    getAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
} from '../controllers/announcementController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { storage } from '../config/cloudinary.js';

const router = express.Router();

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            return cb(null, true);
        } else {
            cb(new Error('PDF files only!'));
        }
    },
});

// Routes
router
    .route('/')
    .get(getAnnouncements)
    .post(protect, admin, upload.single('notice'), createAnnouncement);

router
    .route('/:id')
    .get(getAnnouncementById)
    .put(protect, admin, upload.single('notice'), updateAnnouncement)
    .delete(protect, admin, deleteAnnouncement);

export default router;

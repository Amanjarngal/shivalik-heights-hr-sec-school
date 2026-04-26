import express from 'express';
import {
    submitEnquiry,
    getEnquiries,
    getEnquiryById,
    deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to submit an enquiry
router.route('/').post(submitEnquiry);

// Admin routes to manage enquiries
router.route('/').get(protect, admin, getEnquiries);
router
    .route('/:id')
    .get(protect, admin, getEnquiryById)
    .delete(protect, admin, deleteEnquiry);

export default router;

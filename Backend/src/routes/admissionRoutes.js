import express from 'express';
import {
    submitAdmission,
    getAdmissions,
    getAdmissionById,
    deleteAdmission,
    testEmail,
} from '../controllers/admissionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Test email route
// Test email route
router.route('/test-email').get(protect, admin, testEmail);

// Public route to submit the form
router.route('/').post(submitAdmission);

// Admin routes to manage submissions
router.route('/').get(protect, admin, getAdmissions);
router
    .route('/:id')
    .get(protect, admin, getAdmissionById)
    .delete(protect, admin, deleteAdmission);

export default router;

import Admission from '../models/admissionModel.js';
import sendEmail from '../utils/sendEmail.js';
import { parentConfirmationTemplate, adminNotificationTemplate } from '../utils/emailTemplates.js';

// @desc    Submit a new admission form
// @route   POST /api/admissions
// @access  Public
const submitAdmission = async (req, res) => {
    try {
        const {
            studentName,
            dateOfBirth,
            classApplyingFor,
            parentName,
            contactNumber,
            address,
            email,
        } = req.body;

        const admission = await Admission.create({
            studentName,
            dateOfBirth,
            classApplyingFor,
            parentName,
            contactNumber,
            address,
            email,
        });

        // Send confirmation email to parent
        const parentMessage = parentConfirmationTemplate({
            parentName,
            studentName,
            classApplyingFor,
            admissionId: admission._id,
            contactNumber,
        });

        try {
            await sendEmail({
                email: email,
                subject: `Admission Received: ${studentName} - NPHSS`,
                message: parentMessage,
            });
        } catch (emailError) {
            console.error('Parent Email error:', emailError);
        }

        // Send notification email to admin
        const adminMessage = adminNotificationTemplate({
            studentName,
            dateOfBirth,
            classApplyingFor,
            parentName,
            contactNumber,
            email,
            address,
            adminPanelUrl: process.env.ADMIN_PANEL_URL,
        });

        try {
            await sendEmail({
                email: process.env.ADMIN_EMAIL,
                subject: 'New Admission Form Submitted',
                message: adminMessage,
            });
        } catch (emailError) {
            console.error('Admin Email error:', emailError);
        }

        res.status(201).json({
            success: true,
            message: 'Admission form submitted successfully. A confirmation email has been sent.',
            data: admission,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// @desc    Get all admission submissions
// @route   GET /api/admissions
// @access  Private/Admin
const getAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find({}).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: admissions,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get admission by ID
// @route   GET /api/admissions/:id
// @access  Private/Admin
const getAdmissionById = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);

        if (admission) {
            res.json({
                success: true,
                data: admission,
            });
        } else {
            res.status(404).json({ success: false, message: 'Admission not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete an admission submission
// @route   DELETE /api/admissions/:id
// @access  Private/Admin
const deleteAdmission = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);

        if (admission) {
            await admission.deleteOne();
            res.json({ success: true, message: 'Admission submission removed' });
        } else {
            res.status(404).json({ success: false, message: 'Admission not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Test email configuration
// @route   GET /api/admissions/test-email
// @access  Private/Admin
const testEmail = async (req, res) => {
    try {
        console.log("Nodemailer: Starting manual test...");
        await sendEmail({
            email: process.env.ADMIN_EMAIL,
            subject: 'NPHSS Email Service Test',
            message: '<h1>Test Successful</h1><p>Your email service is configured correctly.</p>',
        });
        res.json({ success: true, message: 'Test email sent successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    submitAdmission,
    getAdmissions,
    getAdmissionById,
    deleteAdmission,
    testEmail,
};

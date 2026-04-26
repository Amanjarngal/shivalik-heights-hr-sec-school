import Enquiry from '../models/enquiryModel.js';
import sendEmail from '../utils/sendEmail.js';
import { enquiryConfirmationTemplate, enquiryAdminNotificationTemplate } from '../utils/emailTemplates.js';

// @desc    Submit a new contact/enquiry form
// @route   POST /api/enquiries
// @access  Public
const submitEnquiry = async (req, res) => {
    try {
        const { parentName, parentPhone, parentEmail, subject, message } = req.body;

        const enquiry = await Enquiry.create({
            parentName,
            parentPhone,
            parentEmail,
            subject,
            message,
        });

        // Email to Parent
        const parentHtml = enquiryConfirmationTemplate({
            parentName,
            subject,
            message,
        });

        try {
            await sendEmail({
                email: parentEmail,
                subject: `Enquiry Received: ${subject} - SHHSS`,
                message: parentHtml,
            });
        } catch (emailError) {
            console.error('Enquiry Parent Email error:', emailError);
        }

        // Email to Admin
        const adminEmail = process.env.ADMIN_EMAIL;
        
        if (!adminEmail) {
            console.error('Enquiry Admin Email error: ADMIN_EMAIL is not defined in environment variables');
        } else {
            const adminHtml = enquiryAdminNotificationTemplate({
                parentName,
                parentPhone,
                parentEmail,
                subject,
                message,
                adminPanelUrl: process.env.ADMIN_PANEL_URL,
            });

            try {
                await sendEmail({
                    email: adminEmail,
                    subject: `New Website Enquiry: ${subject}`,
                    message: adminHtml,
                });
            } catch (emailError) {
                console.error('Enquiry Admin Email error:', emailError.message);
            }
        }

        res.status(201).json({
            success: true,
            message: 'Enquiry submitted successfully. We will contact you soon.',
            data: enquiry,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: enquiries,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get enquiry by ID
// @route   GET /api/enquiries/:id
// @access  Private/Admin
const getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);

        if (enquiry) {
            res.json({
                success: true,
                data: enquiry,
            });
        } else {
            res.status(404).json({ success: false, message: 'Enquiry not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);

        if (enquiry) {
            await enquiry.deleteOne();
            res.json({ success: true, message: 'Enquiry removed' });
        } else {
            res.status(404).json({ success: false, message: 'Enquiry not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    submitEnquiry,
    getEnquiries,
    getEnquiryById,
    deleteEnquiry,
};

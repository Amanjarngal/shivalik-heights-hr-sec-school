import Admission from '../models/admissionModel.js';
import Announcement from '../models/announcementModel.js';
import Enquiry from '../models/enquiryModel.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const admissionCount = await Admission.countDocuments({});
        const announcementCount = await Announcement.countDocuments({});
        const enquiryCount = await Enquiry.countDocuments({});

        res.json({
            success: true,
            data: {
                admissions: admissionCount,
                announcements: announcementCount,
                enquiries: enquiryCount,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { getDashboardStats };

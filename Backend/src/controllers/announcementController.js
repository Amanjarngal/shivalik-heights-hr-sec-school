import Announcement from '../models/announcementModel.js';

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Private/Admin
const createAnnouncement = async (req, res) => {
    try {
        const { title, description } = req.body;
        let pdfUrl = '';

        if (req.file) {
            pdfUrl = req.file.path;
        }

        const announcement = await Announcement.create({
            title,
            description,
            pdfUrl,
        });

        res.status(201).json({
            success: true,
            message: 'Announcement created successfully',
            data: announcement,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find({}).sort({ date: -1 });
        res.json({
            success: true,
            data: announcements,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get announcement by ID
// @route   GET /api/announcements/:id
// @access  Public
const getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);

        if (announcement) {
            res.json({
                success: true,
                data: announcement,
            });
        } else {
            res.status(404).json({ success: false, message: 'Announcement not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update an announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
const updateAnnouncement = async (req, res) => {
    try {
        const { title, description } = req.body;
        const announcement = await Announcement.findById(req.params.id);

        if (announcement) {
            announcement.title = title || announcement.title;
            announcement.description = description || announcement.description;

            if (req.file) {
                announcement.pdfUrl = req.file.path;
            }

            const updatedAnnouncement = await announcement.save();
            res.json({
                success: true,
                message: 'Announcement updated successfully',
                data: updatedAnnouncement,
            });
        } else {
            res.status(404).json({ success: false, message: 'Announcement not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);

        if (announcement) {
            await announcement.deleteOne();
            res.json({ success: true, message: 'Announcement removed' });
        } else {
            res.status(404).json({ success: false, message: 'Announcement not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    createAnnouncement,
    getAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
};

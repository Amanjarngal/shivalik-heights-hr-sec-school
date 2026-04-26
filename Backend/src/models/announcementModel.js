import mongoose from 'mongoose';

const announcementSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        pdfUrl: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;

import mongoose from 'mongoose';

const enquirySchema = mongoose.Schema(
    {
        parentName: {
            type: String,
            required: [true, 'Please add a name'],
        },
        parentPhone: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        parentEmail: {
            type: String,
            required: [true, 'Please add an email'],
        },
        subject: {
            type: String,
            required: [true, 'Please add a subject'],
        },
        message: {
            type: String,
            required: [true, 'Please add a message'],
        },
        isResponded: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;

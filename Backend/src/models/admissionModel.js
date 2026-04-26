import mongoose from 'mongoose';

const admissionSchema = mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        classApplyingFor: {
            type: String,
            required: true,
        },
        parentName: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'reviewed', 'contacted', 'accepted', 'rejected'],
        },
    },
    {
        timestamps: true,
    }
);

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;

import Gallery from '../models/galleryModel.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Upload new gallery image
// @route   POST /api/gallery
// @access  Private/Admin
export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const newImage = await Gallery.create({
      imageUrl: req.file.path // Directly from CloudinaryStorage
    });

    res.status(201).json({ success: true, message: 'Image uploaded successfully', data: newImage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (image) {
      // Optional: Extract public_id and delete from Cloudinary
      // const publicId = image.imageUrl.split('/').pop().split('.')[0];
      // await cloudinary.uploader.destroy(`nphss/gallery/${publicId}`);
      
      await image.deleteOne();
      res.json({ success: true, message: 'Image deleted completely' });
    } else {
      res.status(404).json({ success: false, message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

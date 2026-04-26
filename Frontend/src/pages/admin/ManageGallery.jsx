import React, { useState, useEffect } from 'react';
import { Camera, Upload, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../../utils/api';
import { getStoredToken } from '../../context/AuthContext';
const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchImages = async () => {
    try {
      const res = await fetch(getApiUrl('/api/gallery'), {
        headers: getStoredToken() ? { Authorization: `Bearer ${getStoredToken()}` } : {},
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(getApiUrl('/api/gallery'), {
        method: 'POST',
        headers: getStoredToken() ? { Authorization: `Bearer ${getStoredToken()}` } : {},
        credentials: 'include',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setFile(null);
        setPreview(null);
        fetchImages(); // Refresh
      } else {
        alert(data.message || 'Failed to upload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch(getApiUrl(`/api/gallery/${id}`), {
        method: 'DELETE',
        headers: getStoredToken() ? { Authorization: `Bearer ${getStoredToken()}` } : {},
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setImages(images.filter(img => img._id !== id));
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 pb-24">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-[#a81d1d]">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-800">Manage Gallery</h1>
            <p className="text-gray-500 font-medium">Upload and organize public school photos</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
        
        {/* Left Column: Upload Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100 h-fit sticky top-24"
        >
          <h2 className="text-lg font-black uppercase tracking-widest text-[#a81d1d] mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5" /> Upload Photo
          </h2>

          <form onSubmit={handleUpload} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Select Image</label>
              
              <div className="relative border-2 border-dashed border-gray-300 rounded-[1.5rem] bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="p-8 text-center flex flex-col items-center justify-center h-[200px]">
                  {preview ? (
                    <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon className="w-10 h-10 text-gray-400 mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-bold text-gray-600">Click or drag image here</p>
                      <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WEBP (Max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!file || uploading}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#a81d1d] hover:bg-red-800 text-white rounded-full font-black text-lg transition-all shadow-[0_10px_30px_rgba(168,29,29,0.3)] hover:shadow-[0_15px_40px_rgba(168,29,29,0.5)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {uploading ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Uploading...</>
              ) : (
                <><Upload className="w-6 h-6" /> Upload to Gallery</>
              )}
            </button>
          </form>
        </motion.div>


        {/* Right Column: Existing Images */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <h2 className="text-lg font-black uppercase tracking-widest text-gray-800 mb-6 flex items-center justify-between">
            <span>Uploaded Photos</span>
            <span className="bg-gray-100 text-[#a81d1d] px-3 py-1 rounded-full text-xs">{images.length}</span>
          </h2>

          {loading ? (
             <div className="flex justify-center items-center h-64">
               <Loader2 className="w-8 h-8 animate-spin text-[#a81d1d]" />
             </div>
          ) : images.length === 0 ? (
             <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-[2rem] bg-gray-50">
               <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
               <p className="text-gray-500 font-bold">No photos uploaded yet.</p>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {images.map(img => (
                  <motion.div
                    key={img._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-200"
                  >
                    <img src={img.imageUrl || img.image} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(img._id)}
                        className="p-3 bg-white hover:bg-red-50 text-red-600 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all hover:scale-110"
                        title="Delete Image"
                      >
                         <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default ManageGallery;

import React, { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, Edit, FileText, Loader2, AlertCircle, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../../utils/api';
import { getStoredToken } from '../../context/AuthContext';

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notice, setNotice] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(getApiUrl('/api/announcements'));
      const data = await response.json();
      setAnnouncements(data.data || []);
    } catch (err) {
      setError('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (notice) {
      formData.append('notice', notice);
    }

    try {
      const url = isEditing ? getApiUrl(`/api/announcements/${currentId}`) : getApiUrl('/api/announcements');
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData,
        headers: getStoredToken() ? { Authorization: `Bearer ${getStoredToken()}` } : {},
        credentials: 'include'
      });

      if (response.ok) {
        fetchAnnouncements();
        closeModal();
      } else {
        const errData = await response.json();
        alert(errData.message || 'Error occurred');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    
    try {
      const response = await fetch(getApiUrl(`/api/announcements/${id}`), { 
        method: 'DELETE',
        headers: getStoredToken() ? { Authorization: `Bearer ${getStoredToken()}` } : {},
        credentials: 'include'
      });
      if (response.ok) fetchAnnouncements();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const openModal = (ann = null) => {
    if (ann) {
      setIsEditing(true);
      setCurrentId(ann._id);
      setTitle(ann.title);
      setDescription(ann.description);
      setNotice(null);
    } else {
      setIsEditing(false);
      setTitle('');
      setDescription('');
      setNotice(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentId(null);
  };

  if (loading && announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#a81d1d]" />
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Announcements...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase flex items-center gap-3">
            <Bell className="w-8 h-8 text-[#a81d1d]" />
            Announcements
          </h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest bg-gray-50 inline-block px-3 py-1 rounded-full border border-gray-100 italic">
            Broadcast updates to students & parents
          </p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#a81d1d] hover:bg-red-800 text-white font-black px-8 py-4 rounded-2xl shadow-2xl shadow-red-900/30 flex items-center justify-center gap-3 transition-all active:scale-95 group"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          <span>New Announcement</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1a1a1a] text-white">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Title & Date</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] hidden lg:table-cell">Details</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Document</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {announcements.map((ann) => (
                <tr key={ann._id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-50 text-[#a81d1d] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border border-red-100">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-gray-900 leading-none truncate group-hover:text-[#a81d1d] transition-colors uppercase tracking-tight">{ann.title}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 bg-gray-50 px-2 py-0.5 rounded w-fit">{new Date(ann.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 hidden lg:table-cell max-w-md">
                    <p className="text-xs text-gray-500 font-medium leading-relaxed italic line-clamp-2">
                       {ann.description}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    {ann.pdfUrl ? (
                      <a href={ann.pdfUrl.startsWith('http') ? ann.pdfUrl : `http://localhost:5000${ann.pdfUrl}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                        <Download className="w-3.5 h-3.5" />
                        PDF Notice
                      </a>
                    ) : (
                      <span className="text-gray-300 text-[10px] font-black uppercase tracking-widest border border-dashed border-gray-200 px-3 py-1.5 rounded-lg italic">No Attachment</span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openModal(ann)}
                        className="p-3 bg-amber-50 text-amber-600 rounded-2xl transition-all border border-amber-100 hover:bg-amber-600 hover:text-white shadow-sm hover:shadow-amber-900/20"
                        title="Edit Notice"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(ann._id)}
                        className="p-3 bg-red-50 text-[#a81d1d] rounded-2xl transition-all border border-red-100 hover:bg-[#a81d1d] hover:text-white shadow-sm hover:shadow-red-900/20"
                        title="Delete Notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {announcements.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-8 py-24 text-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 border border-gray-100 border-dashed">
                        <Bell className="w-10 h-10" />
                      </div>
                      <div>
                        <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">No active announcements</p>
                        <button 
                          onClick={() => openModal()}
                          className="mt-4 text-[#a81d1d] font-black text-[10px] uppercase tracking-widest hover:underline"
                        >
                          Create the first one now
                        </button>
                      </div>
                    </motion.div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Enhanced with Framer Motion and Responsiveness */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-[#a81d1d] p-8 text-white flex justify-between items-center flex-shrink-0">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{isEditing ? 'Modify Notice' : 'Draft New Notice'}</h3>
                  <p className="text-red-100 text-[10px] font-black uppercase tracking-[0.2em]">Internal Communication Portal</p>
                </div>
                <button 
                  onClick={closeModal} 
                  className="p-3 hover:bg-white/20 rounded-2xl transition-all active:scale-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="overflow-y-auto p-8 lg:p-10 scrollbar-thin scrollbar-thumb-gray-200">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Announcement Title</label>
                    <input 
                      type="text" 
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#a81d1d]/30 outline-none transition-all font-bold text-gray-800 placeholder:text-gray-300 shadow-inner"
                      placeholder="e.g., ANNUAL SPORTS DAY 2026"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Broadcast Message</label>
                    <textarea 
                      required
                      rows="5"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#a81d1d]/30 outline-none transition-all font-bold text-gray-800 placeholder:text-gray-300 shadow-inner resize-none leading-relaxed"
                      placeholder="Enter the detailed announcement content here..."
                    ></textarea>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Official PDF Attachment</label>
                    <div className="relative group/file">
                      <input 
                        type="file" 
                        accept=".pdf"
                        onChange={(e) => setNotice(e.target.files[0])}
                        className="hidden"
                        id="pdf-upload"
                      />
                      <label 
                        htmlFor="pdf-upload"
                        className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50 hover:bg-red-50/50 hover:border-[#a81d1d]/30 cursor-pointer transition-all group-hover/file:scale-[0.99]"
                      >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover/file:rotate-12 transition-transform">
                          <FileText className={`w-8 h-8 ${notice ? 'text-blue-500' : 'text-gray-300'}`} />
                        </div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center px-4 leading-relaxed">
                          {notice ? notice.name : 'Click or Drag PDF file here'}
                        </span>
                        {!notice && <p className="text-[9px] text-gray-400 font-bold uppercase mt-2">Maximum size 5MB recommended</p>}
                      </label>
                    </div>
                  </div>

                  {/* Submit Buttons (Bottom of scrollable area on mobile, or fixed if wanted) */}
                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button 
                      type="button"
                      onClick={closeModal}
                      className="order-2 sm:order-1 flex-grow py-5 px-8 bg-gray-100 hover:bg-gray-200 text-gray-600 font-black rounded-[1.5rem] transition-all uppercase tracking-widest text-[10px] active:scale-95"
                    >
                      Discard Changes
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="order-1 sm:order-2 flex-[2] py-5 px-8 bg-[#a81d1d] hover:bg-red-800 text-white font-black rounded-[1.5rem] shadow-2xl shadow-red-900/40 transform active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale uppercase tracking-widest text-[10px]"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          <Bell className="w-4 h-4" />
                          {isEditing ? 'Update Broadcast' : 'Post Announcement'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageAnnouncements;

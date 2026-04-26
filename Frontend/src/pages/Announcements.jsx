import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, FileText, Download, Loader2, AlertCircle } from 'lucide-react';
import { getApiUrl } from '../utils/api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(getApiUrl('/api/announcements'));
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        setAnnouncements(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-[#a81d1d]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <section className="bg-[#a81d1d] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffd700 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Bell className="w-10 h-10 text-[#ffd700]" />
            <h1 className="text-4xl md:text-5xl font-extrabold pb-1 border-b-4 border-[#ffd700] inline-block">
              Notice Board
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-red-100 text-lg max-w-2xl mx-auto mt-4"
          >
            Stay updated with the latest news, events, and important circulars from Shivalik Heights Higher Secondary School.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {error ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-200 shadow-sm flex items-center gap-3">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p><strong>Error:</strong> {error}</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">No Announcements Yet</h3>
            <p className="text-gray-500 mt-2">Check back later for updates and notices.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col md:flex-row"
              >
                {/* Date Side tag */}
                <div className="bg-[#a81d1d] text-white p-6 md:w-48 flex flex-row md:flex-col items-center justify-center shrink-0 gap-2 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full border-b border-l border-[#ffd700]/30"></div>
                  <Calendar className="w-6 h-6 text-[#ffd700]" />
                  <span className="font-bold text-center leading-tight">
                    {formatDate(announcement.date || announcement.createdAt)}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{announcement.title}</h3>
                  <p className="text-gray-600 whitespace-pre-wrap leading-relaxed mb-6">
                    {announcement.description}
                  </p>

                  {/* PDF Action */}
                  {announcement.pdfUrl && (
                    <a 
                      href={announcement.pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#ffd700] hover:bg-yellow-400 text-[#a81d1d] font-bold px-6 py-2.5 rounded-full transition-colors shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download Document
                    </a>
                  )}
                  {!announcement.pdfUrl && (
                     <div className="inline-flex items-center gap-2 text-gray-400 text-sm italic">
                       <FileText className="w-4 h-4" /> Text Notice Only
                     </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;

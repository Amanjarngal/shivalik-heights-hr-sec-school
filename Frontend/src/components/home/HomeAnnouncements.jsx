import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getApiUrl } from '../../utils/api';

const HomeAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(getApiUrl('/api/announcements'));
        if (response.ok) {
          const data = await response.json();
          // Keep only the top 5 latest announcements for the home screen
          setAnnouncements(data.data?.slice(0, 5) || []);
        }
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#a81d1d 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Bell className="text-[#a81d1d]" /> Latest Announcements
              </h2>
              <div className="h-1 w-20 bg-[#ffd700] rounded-full"></div>
            </motion.div>
            <Link to="/announcements" className="flex items-center gap-1 text-[#a81d1d] font-bold py-2 px-4 rounded-full border-2 border-[#a81d1d]/20 hover:bg-[#a81d1d]/5 transition-all group">
              View All <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-[#a81d1d]" />
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No recent announcements found.</p>
              </div>
            ) : (
              announcements.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to="/announcements" className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#a81d1d]/30 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center text-gray-500 font-medium text-sm whitespace-nowrap min-w-[140px] bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                      <Calendar className="w-4 h-4 mr-2 text-[#a81d1d]" />
                      {formatDate(item.date || item.createdAt)}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#a81d1d] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-[#ffd700]/20 text-[#a81d1d] rounded-full shrink-0 hidden sm:block">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAnnouncements;

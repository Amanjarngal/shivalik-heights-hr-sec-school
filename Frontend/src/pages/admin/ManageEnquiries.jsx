import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, Loader2, Search, CheckCircle2, Clock, User, Phone, MessageSquare, AlertCircle, X, Reply } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../../utils/api';
import { getStoredToken } from '../../context/AuthContext';

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch(getApiUrl('/api/enquiries'), { 
        headers: { 'Content-Type': 'application/json', ...(getStoredToken() ? { Authorization: `Bearer ${getStoredToken()}` } : {}) },
        credentials: 'include'
      });
      const data = await response.json();
      setEnquiries(data.data || []);
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      const response = await fetch(getApiUrl(`/api/enquiries/${id}`), { 
        method: 'DELETE',
        headers: getStoredToken() ? { Authorization: `Bearer ${getStoredToken()}` } : {},
        credentials: 'include'
      });
      if (response.ok) fetchEnquiries();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const filteredEnquiries = enquiries.filter(enq => 
    enq.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.parentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && enquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#a81d1d]" />
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Enquiries...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase flex items-center gap-3">
            <Mail className="w-8 h-8 text-[#a81d1d]" />
            Inbox
          </h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest bg-gray-50 inline-block px-3 py-1 rounded-full border border-gray-100 italic">
            Messages from parents & visitors
          </p>
        </div>
        
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a81d1d] transition-colors" />
          <input 
            type="text" 
            placeholder="Search keywords or names..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-4 bg-white border-2 border-transparent rounded-[2rem] text-sm focus:bg-white focus:border-[#a81d1d]/30 outline-none w-full lg:w-96 shadow-inner transition-all font-bold text-gray-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredEnquiries.map((enq) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={enq._id} 
            className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-black/5 border border-gray-50 hover:shadow-red-900/5 transition-all group relative overflow-hidden flex flex-col"
          >
            {/* Thread Indicator */}
            <div className={`absolute top-0 left-10 w-12 h-1 ${enq.isResponded ? 'bg-emerald-500' : 'bg-[#a81d1d]'}`}></div>
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-[#a81d1d] group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 overflow-hidden">
                   <User className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight truncate">{enq.parentName}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">{new Date(enq.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedEnquiry(enq)}
                  className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(enq._id)}
                  className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-grow space-y-4 mb-6">
              <div className="inline-flex items-center gap-2 text-[10px] font-black text-[#a81d1d] bg-red-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-red-100/50">
                <MessageSquare className="w-3.5 h-3.5" />
                {enq.subject}
              </div>
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 relative">
                <p className="text-xs text-gray-600 font-medium leading-relaxed line-clamp-4 italic">
                  &quot;{enq.message}&quot;
                </p>
                <div className="absolute -bottom-2 -right-2 text-gray-100">
                   <MessageSquare className="w-12 h-12" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
              <div className="flex flex-col gap-1.5 min-w-0">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 truncate">
                    <Mail className="w-3.5 h-3.5 text-gray-300" /> {enq.parentEmail}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 truncate">
                    <Phone className="w-3.5 h-3.5 text-gray-300" /> {enq.parentPhone}
                 </div>
              </div>
              <div className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 px-3 py-1.5 rounded-xl border ${enq.isResponded ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm shadow-amber-900/5 pulse-subtle'}`}>
                {enq.isResponded ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {enq.isResponded ? 'Sent' : 'New'}
              </div>
            </div>
          </motion.div>
        ))}
        {filteredEnquiries.length === 0 && (
          <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Mail className="w-16 h-16 text-gray-100 mx-auto mb-4" />
              <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs italic">Your inbox is clear</p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Full Enquiry Detail Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedEnquiry(null)}
               className="absolute inset-0 bg-black/85 backdrop-blur-xl"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 50 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 50 }}
               className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
             >
                {/* Visual Header Decoration */}
                <div className="h-2 bg-[#a81d1d]"></div>

                <div className="p-8 md:p-10 flex flex-col h-full">
                   <div className="flex justify-between items-start mb-10">
                      <div className="flex items-center gap-5">
                         <div className="w-16 h-16 bg-red-50 text-[#a81d1d] rounded-3xl flex items-center justify-center border border-red-100 shadow-lg">
                            <Mail className="w-7 h-7" />
                         </div>
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Official Enquiry</p>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">{selectedEnquiry.subject}</h3>
                         </div>
                      </div>
                      <button 
                        onClick={() => setSelectedEnquiry(null)}
                        className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all active:scale-90"
                      >
                        <X className="w-6 h-6 text-gray-400" />
                      </button>
                   </div>

                   <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 space-y-10">
                      <div className="space-y-4">
                         <span className="text-[10px] font-black text-[#a81d1d] uppercase tracking-[0.3em] ml-1">Message from {selectedEnquiry.parentName}</span>
                         <div className="bg-gray-50/80 p-8 rounded-[2rem] border-2 border-gray-100 text-sm md:text-base text-gray-800 leading-relaxed font-serif italic shadow-inner">
                            &quot;{selectedEnquiry.message}&quot;
                         </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
                         <div className="bg-white p-6 rounded-[1.5rem] border-2 border-gray-50 shadow-sm flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                               <Mail className="w-4 h-4" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Email Identity</span>
                            </div>
                            <p className="text-xs font-black text-gray-800 tracking-tight">{selectedEnquiry.parentEmail}</p>
                         </div>
                         <div className="bg-white p-6 rounded-[1.5rem] border-2 border-gray-50 shadow-sm flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                               <Phone className="w-4 h-4" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Contact Phone</span>
                            </div>
                            <p className="text-xs font-black text-gray-800 tracking-tight">{selectedEnquiry.parentPhone}</p>
                         </div>
                      </div>
                   </div>

                   <div className="pt-10 flex flex-col sm:flex-row gap-4 mt-auto">
                      <button 
                       onClick={() => setSelectedEnquiry(null)}
                       className="flex-grow py-5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-black rounded-2xl transition-all uppercase tracking-widest text-[10px] active:scale-95"
                      >
                        Close Message
                      </button>
                      <button 
                       className="flex-[2] py-5 bg-[#a81d1d] text-white font-black rounded-2xl shadow-2xl shadow-red-900/30 active:scale-95 transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-3"
                      >
                        <Reply className="w-4 h-4" />
                        Quick Respond
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageEnquiries;

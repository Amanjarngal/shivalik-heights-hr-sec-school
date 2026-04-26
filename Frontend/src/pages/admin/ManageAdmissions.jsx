import React, { useState, useEffect } from 'react';
import { Users, Trash2, Eye, Loader2, Search, Filter, Mail, Phone, Calendar, School, CheckCircle, Clock, X, MapPin, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../../utils/api';
import { getStoredToken } from '../../context/AuthContext';

const ManageAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const fetchAdmissions = async () => {
    try {
      const response = await fetch(getApiUrl('/api/admissions'), { 
        headers: { 'Content-Type': 'application/json', ...(getStoredToken() ? { Authorization: `Bearer ${getStoredToken()}` } : {}) },
        credentials: 'include'
      });
      const data = await response.json();
      setAdmissions(data.data || []);
    } catch (err) {
      console.error('Failed to fetch admissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admission record?')) return;
    try {
      const response = await fetch(getApiUrl(`/api/admissions/${id}`), { 
        method: 'DELETE',
        headers: getStoredToken() ? { Authorization: `Bearer ${getStoredToken()}` } : {},
        credentials: 'include'
      });
      if (response.ok) fetchAdmissions();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const filteredAdmissions = admissions.filter(adm => 
    adm.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adm.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adm.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading && admissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#a81d1d]" />
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Applications...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase flex items-center gap-3">
            <School className="w-8 h-8 text-[#a81d1d]" />
            Admissions
          </h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest bg-gray-50 inline-block px-3 py-1 rounded-full border border-gray-100 italic">
            Review incoming student applications
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a81d1d] transition-colors" />
            <input 
              type="text" 
              placeholder="Search student or parent..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border-2 border-transparent rounded-[2rem] text-sm focus:bg-white focus:border-[#a81d1d]/30 outline-none w-full lg:w-80 shadow-inner transition-all font-bold text-gray-800"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1a1a1a] text-white">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-center w-20">No.</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Student Identitiy</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] hidden sm:table-cell">Contact Info</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredAdmissions.map((adm, index) => (
                <tr key={adm._id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-8 py-6 text-center">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">#{index + 1}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#a81d1d]/10 text-[#a81d1d] flex items-center justify-center font-black text-sm border border-[#a81d1d]/10 group-hover:scale-110 transition-transform">
                        {adm.studentName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-gray-900 leading-none truncate uppercase tracking-tight">{adm.studentName}</p>
                        <p className="text-[10px] font-black text-[#a81d1d] uppercase tracking-widest mt-2 bg-red-50 px-2 py-0.5 rounded w-fit italic border border-red-100/50">CLASS: {adm.classApplyingFor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 hidden sm:table-cell">
                    <div className="space-y-1.5">
                      <p className="text-xs font-black text-gray-700 uppercase tracking-tighter">{adm.parentName}</p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <Mail className="w-3 h-3" /> {adm.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${getStatusColor(adm.status)}`}>
                      {adm.status === 'pending' ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                      {adm.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                         onClick={() => setSelectedAdmission(adm)}
                         className="p-3 bg-blue-50 text-blue-600 rounded-2xl transition-all border border-blue-100 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-blue-900/20"
                         title="View Details"
                      >
                         <Eye className="w-4 h-4" />
                      </button>
                      <button 
                         onClick={() => handleDelete(adm._id)}
                         className="p-3 bg-red-50 text-red-600 rounded-2xl transition-all border border-red-100 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-red-900/20"
                         title="Delete Entry"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAdmissions.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 border border-gray-100 border-dashed">
                        <Users className="w-10 h-10" />
                      </div>
                      <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">No matching applications</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal - Enhanced Responsive UI */}
      <AnimatePresence>
        {selectedAdmission && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAdmission(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#a81d1d] p-8 text-white flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-xl">
                      <GraduationCap className="w-8 h-8 text-white" />
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">{selectedAdmission.studentName}</h3>
                      <p className="text-red-100 text-[10px] font-black uppercase tracking-[0.3em]">Online Admission ID: {selectedAdmission._id.slice(-8)}</p>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedAdmission(null)}
                  className="p-3 hover:bg-white/20 rounded-2xl transition-all active:scale-90 shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="overflow-y-auto p-8 lg:p-12 scrollbar-thin scrollbar-thumb-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Student Info Section */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] border-b border-gray-100 pb-2">Student Information</h4>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Users className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Full Legal Name</label>
                          <p className="text-sm font-bold text-gray-800 uppercase tracking-tight">{selectedAdmission.studentName}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Date of Birth</label>
                          <p className="text-sm font-bold text-gray-800 uppercase tracking-tight">{new Date(selectedAdmission.dateOfBirth).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-[#a81d1d] text-white rounded-2xl shadow-xl shadow-red-900/10">
                        <GraduationCap className="w-5 h-5 text-red-200 mt-1" />
                        <div>
                          <label className="text-[9px] font-black text-red-200/80 uppercase tracking-widest block mb-1">Grade Level Applied</label>
                          <p className="text-sm font-black uppercase tracking-tight">CLASS - {selectedAdmission.classApplyingFor}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Parent & Contact Section */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] border-b border-gray-100 pb-2">Secondary Information</h4>
                    
                    <div className="space-y-6">
                       <div className="flex items-start gap-4 p-4 bg-white border-2 border-gray-50 rounded-2xl">
                        <Users className="w-5 h-5 text-[#a81d1d] mt-1" />
                        <div>
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Parent/Guardian Name</label>
                          <p className="text-sm font-bold text-gray-800 uppercase tracking-tight">{selectedAdmission.parentName}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-white border-2 border-gray-50 rounded-2xl">
                        <Phone className="w-5 h-5 text-[#a81d1d] mt-1" />
                        <div>
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Primary Contact</label>
                          <p className="text-sm font-bold text-gray-800 tracking-tight">{selectedAdmission.contactNumber}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{selectedAdmission.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-white border-2 border-gray-50 rounded-2xl">
                        <MapPin className="w-5 h-5 text-[#a81d1d] mt-1" />
                        <div>
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Residential Address</label>
                          <p className="text-sm font-bold text-gray-800 leading-relaxed italic truncate-multiline">&quot;{selectedAdmission.address}&quot;</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Update / Action Section */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
                   <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${selectedAdmission.status === 'pending' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Current Status: <span className="text-gray-900">{selectedAdmission.status}</span></p>
                   </div>
                   <div className="flex gap-4 w-full sm:w-auto">
                      <button 
                        onClick={() => setSelectedAdmission(null)}
                        className="flex-grow sm:flex-none px-10 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-black rounded-2xl transition-all uppercase tracking-widest text-[10px] active:scale-95"
                      >
                        Exit Details
                      </button>
                      <button 
                        className="flex-grow sm:flex-none px-10 py-4 bg-[#a81d1d] text-white font-black rounded-2xl shadow-2xl shadow-red-900/20 active:scale-95 transition-all text-[10px] uppercase tracking-widest"
                      >
                        Print Form
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageAdmissions;

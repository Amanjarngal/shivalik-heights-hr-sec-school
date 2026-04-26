import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Loader2, Landmark } from 'lucide-react';
import { getApiUrl } from '../../utils/api';

const OnlineAdmissionForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    classApplyingFor: '',
    parentName: '',
    contactNumber: '',
    email: '',
    address: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const classes = [
    "Pre-Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", 
    "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 11"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(getApiUrl('/api/admissions'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit admission form');
      }
      
      setSuccess(true);
      setFormData({
        studentName: '', dateOfBirth: '', classApplyingFor: '', 
        parentName: '', contactNumber: '', email: '', address: ''
      });
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admission-form" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-[#a81d1d] mb-4 flex items-center justify-center gap-3"
          >
            <Landmark className="w-10 h-10" /> Online Admission
          </motion.h2>
          <p className="text-gray-600 text-lg">
            A dedicated form to collect student and parent details for new admissions. Forms are received via email and our admin panel.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gray-50 p-8 rounded-3xl shadow-xl border border-gray-200"
        >
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h3>
              <p className="mb-6 text-green-700">Thank you for choosing NPHSS. A confirmation email has been sent to your email address, and our admissions office will get in touch with you shortly.</p>
              <button onClick={() => setSuccess(false)} className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition">Submit another application</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                  {error}
                </div>
              )}

              {/* Student Details Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-[#ffd700] pb-2 mb-6">Student Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Student's Full Name *</label>
                    <input required type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#a81d1d] focus:ring-1 focus:ring-[#a81d1d] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                    <input required type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#a81d1d] focus:ring-1 focus:ring-[#a81d1d] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Class Applying For *</label>
                    <select required name="classApplyingFor" value={formData.classApplyingFor} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#a81d1d] focus:ring-1 focus:ring-[#a81d1d] transition-colors">
                      <option value="">Select Class</option>
                      {classes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Parent Details Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-[#ffd700] pb-2 mb-6">Parent Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Parent / Guardian's Full Name *</label>
                    <input required type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#a81d1d] focus:ring-1 focus:ring-[#a81d1d] transition-colors" />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-[#ffd700] pb-2 mb-6">Contact & Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                    <input required type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#a81d1d] focus:ring-1 focus:ring-[#a81d1d] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#a81d1d] focus:ring-1 focus:ring-[#a81d1d] transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Residential Address *</label>
                    <textarea required rows="2" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#a81d1d] focus:ring-1 focus:ring-[#a81d1d] transition-colors"></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full md:w-auto md:px-12 bg-[#a81d1d] text-white font-bold py-4 rounded-xl hover:bg-red-800 transition flex items-center justify-center gap-2 group text-lg mx-auto"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <>Submit Form Online <FileDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" /></>
                  )}
                </button>
                <p className="text-center text-sm text-gray-500 mt-4 px-4">
                  Upon submission, you will receive a confirmation message to your email, and the admin panel will instantly receive your form details.
                </p>
              </div>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default OnlineAdmissionForm;

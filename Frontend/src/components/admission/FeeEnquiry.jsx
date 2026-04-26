import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, IndianRupee } from 'lucide-react';
import { getApiUrl } from '../../utils/api';
import { useSchool } from '../../context/SchoolContext';

const FeeEnquiry = () => {
  const { schoolSettings } = useSchool();
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    subject: '',
    message: ''
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

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    const initialText = `Fee/Admission Enquiry for ${selectedClass}`;
    setFormData({ ...formData, subject: initialText });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(getApiUrl('/api/enquiries'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to submit enquiry');
      }
      
      setSuccess(true);
      setFormData({ parentName: '', parentEmail: '', parentPhone: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#a81d1d] text-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffd700 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <IndianRupee className="w-10 h-10 text-[#ffd700]" />
                <h2 className="text-3xl md:text-5xl font-bold">Fee & Admission Enquiry</h2>
              </div>
              <p className="text-red-100 text-lg mb-8 leading-relaxed max-w-xl">
                Have questions regarding the fee structure, availability of seats, or transport facilities? Drop us a quick enquiry and our admissions team will get back to you within 24 working hours.
              </p>
              
              <div className="bg-red-900/50 p-6 rounded-xl border border-red-800 backdrop-blur-sm max-w-md">
                <h3 className="font-bold text-[#ffd700] mb-2 text-xl">Direct Contact</h3>
                <p className="mb-1"><strong>Phone:</strong> {schoolSettings.phone}</p>
                <p><strong>Email:</strong> admissions@{schoolSettings.email.split('@')[1]}</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-[#a81d1d]">Quick Enquiry</h3>
              
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  Successfully submitted your enquiry! We will contact you soon.
                </div>
              )}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Name *</label>
                  <input required type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a81d1d]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input required type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a81d1d]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input required type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a81d1d]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Applied For</label>
                  <select onChange={handleClassChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a81d1d]">
                    <option value="">Select Class</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="E.g., Fee Structure, Admission Availability" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a81d1d]" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Enquiry / Message *</label>
                <textarea required rows="3" name="message" value={formData.message} onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a81d1d]"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#a81d1d] text-white font-bold py-3 rounded-xl hover:bg-red-800 transition flex items-center justify-center gap-2 group"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>Submit Enquiry <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeeEnquiry;

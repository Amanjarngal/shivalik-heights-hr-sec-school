import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2, MessageSquareText } from 'lucide-react';
import { getApiUrl } from '../utils/api';
import { useSchool } from '../context/SchoolContext';

const ContactUs = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* ── 1. Hero Header ── */}
      <section className="bg-[#a81d1d] text-white py-20 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffd700 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-48 -right-48 w-[40rem] h-[40rem] bg-[#ffd700]/10 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <MessageSquareText className="w-10 h-10 md:w-12 md:h-12 text-[#ffd700]" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold pb-2 border-b-4 border-[#ffd700] inline-block">
              Contact Us
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto mt-6"
          >
            We would love to hear from you. Whether you have a question about admissions, fees, or anything else, our team is ready to answer all your questions.
          </motion.p>
        </div>
      </section>

      {/* ── 2. Contact Grid (Info + Map) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-red-100">
                <MapPin className="w-6 h-6 text-[#a81d1d]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Our Location</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {schoolSettings.schoolName}<br />
                  {schoolSettings.address}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Phone Numbers</h3>
                <p className="text-gray-600 text-sm mb-1">Reception: {schoolSettings.phone}</p>
                <p className="text-gray-600 text-sm">Admissions: {schoolSettings.phone}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-[#ffd700]/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#ffd700]/30">
                <Mail className="w-6 h-6 text-[#a81d1d]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Email Addresses</h3>
                <p className="text-gray-600 text-sm mb-1">{schoolSettings.email}</p>
                <p className="text-gray-600 text-sm">admissions@{schoolSettings.email.split('@')[1]}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-100">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Working Hours</h3>
                <p className="text-gray-600 text-sm mb-1">{schoolSettings.workingHours}</p>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-200 h-[400px] lg:h-auto min-h-[400px]"
          >
            {/* Embedded Google Map */}
             <iframe
                src={schoolSettings.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Google Maps Location of ${schoolSettings.schoolName}`}
             ></iframe>
          </motion.div>

        </div>
      </div>

      {/* ── 3. Contact Form Section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

          {/* Left panel design */}
          <div className="lg:w-2/5 bg-gradient-to-br from-[#a81d1d] to-red-900 p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffd700 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4">Send us a Message</h3>
              <p className="text-red-100 text-lg mb-8 leading-relaxed">
                Fill out the form and our team will get back to you within 24 working hours.
              </p>
            </div>

            <div className="relative z-10 glass-panel bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
              <h4 className="font-bold text-[#ffd700] mb-2">Need immediate assistance?</h4>
              <p className="text-sm text-white font-medium mb-1">Call our admission desk directly:</p>
              <div className="flex items-center gap-2 mt-3 text-xl font-bold bg-[#a81d1d] w-max px-4 py-2 rounded-lg shadow-inner">
                <Phone className="w-5 h-5" /> {schoolSettings.phone}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-3/5 p-10 lg:p-12">
            <form onSubmit={handleSubmit}>

              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg mb-6 shadow-sm">
                  <p className="font-bold">Message Sent Successfully!</p>
                  <p className="text-sm">Thank you for contacting us. We will get back to you shortly.</p>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6 shadow-sm">
                  <p className="font-bold">Submission Failed</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a81d1d] transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a81d1d] transition-shadow"
                    placeholder="+91 95968 14606"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a81d1d] transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a81d1d] transition-shadow"
                    placeholder="How can we help?"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Message <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a81d1d] transition-shadow resize-y"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 py-4 bg-[#a81d1d] hover:bg-red-800 text-white font-black rounded-xl shadow-lg shadow-red-900/40 hover:shadow-red-900/60 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;

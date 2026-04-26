import React from 'react';
import { motion } from 'framer-motion';
import {
  AdmissionProcess,
  EligibilityCriteria,
  FeeEnquiry,
  OnlineAdmissionForm
} from '../components/admission';

const Admission = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#a81d1d] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-400 via-[#8a1515] to-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Admissions <span className="text-[#ffd700]">Open</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-red-100 max-w-3xl mx-auto"
          >
            Join SHHSS and give your child the foundation they need for a bright and successful future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex justify-center gap-4"
          >
            <a href="#admission-form" className="bg-[#ffd700] text-[#a81d1d] px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-400 transition transform hover:-translate-y-1">
              Apply Online Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Components */}
      <AdmissionProcess />
      <EligibilityCriteria />
      <FeeEnquiry />
      <OnlineAdmissionForm />
    </div>
  );
};

export default Admission;

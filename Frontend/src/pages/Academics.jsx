import React from 'react';
import { motion } from 'framer-motion';
import {
  ClassesOffered,
  CurriculumDetails,
  SubjectsStreams,
  TeachingMethodology,
  AcademicCalendar
} from '../components/academics';

const Academics = () => {
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
            Academic <span className="text-[#ffd700]">Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-red-100 max-w-3xl mx-auto"
          >
            Nurturing inquisitive minds, fostering critical thinking, and preparing students for the challenges of tomorrow through a comprehensive and dynamic curriculum.
          </motion.p>
        </div>
      </section>

      {/* Components */}
      <ClassesOffered />
      <CurriculumDetails />
      <SubjectsStreams />
      <TeachingMethodology />
      <AcademicCalendar />
    </div>
  );
};

export default Academics;

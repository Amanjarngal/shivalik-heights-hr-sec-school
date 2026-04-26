import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Calculator, Briefcase, Palette, Globe, Code } from 'lucide-react';

const SubjectsStreams = () => {
  const [activeStream, setActiveStream] = useState('Science');

  const streams = {
    'Science': {
      description: "Designed for students passionate about innovation, medicine, engineering, and core sciences.",
      subjects: [
        { name: "Physics", icon: <Microscope className="w-5 h-5" /> },
        { name: "Chemistry", icon: <Microscope className="w-5 h-5" /> },
        { name: "Mathematics", icon: <Calculator className="w-5 h-5" /> },
        { name: "Biology", icon: <Microscope className="w-5 h-5" /> },
        { name: "Computer Sci.", icon: <Code className="w-5 h-5" /> }
      ]
    },
    'Commerce': {
      description: "Perfect for future entrepreneurs, finance experts, and business leaders focusing on market dynamics.",
      subjects: [
        { name: "Accountancy", icon: <Briefcase className="w-5 h-5" /> },
        { name: "Business St.", icon: <Briefcase className="w-5 h-5" /> },
        { name: "Economics", icon: <Globe className="w-5 h-5" /> },
        { name: "Mathematics", icon: <Calculator className="w-5 h-5" /> },
        { name: "English Core", icon: <BookOpen className="w-5 h-5" /> }
      ]
    },
    'Humanities': {
      description: "Fostering critical thinking, societal understanding, and communication for future leaders and artists.",
      subjects: [
        { name: "History", icon: <Globe className="w-5 h-5" /> },
        { name: "Political Sci.", icon: <Globe className="w-5 h-5" /> },
        { name: "Geography", icon: <Globe className="w-5 h-5" /> },
        { name: "Psychology", icon: <Users className="w-5 h-5" /> },
        { name: "Fine Arts", icon: <Palette className="w-5 h-5" /> }
      ]
    }
  };

  // Small helper component to prevent missing icon error (since BookOpen/Users wasn't imported above, I will inline them)
  function BookOpen(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
  }
  function Users(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Subjects & Streams (Senior Sec.)
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide diverse academic streams tailored to help students achieve their career aspirations safely and confidently.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.keys(streams).map((stream) => (
              <button
                key={stream}
                onClick={() => setActiveStream(stream)}
                className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                  activeStream === stream 
                    ? 'bg-[#a81d1d] text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-[#a81d1d] border border-gray-200'
                }`}
              >
                {stream}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl p-8 shadow-xl min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStream}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <p className="text-xl text-gray-700 italic">
                    "{streams[activeStream].description}"
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {streams[activeStream].subjects.map((subject, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-red-50 border border-red-100 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-3 hover:bg-[#a81d1d] hover:text-white transition-colors group"
                    >
                      <div className="text-[#a81d1d] group-hover:text-white transition-colors">
                        {subject.icon}
                      </div>
                      <span className="font-semibold">{subject.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectsStreams;

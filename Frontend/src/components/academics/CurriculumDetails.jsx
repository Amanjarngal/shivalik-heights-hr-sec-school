import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookCheck, ClipboardList, Target } from 'lucide-react';

const CurriculumDetails = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6 text-[#a81d1d]" />,
      title: "Holistic Development",
      description: "Our curriculum emphasizes academic excellence alongside sports, arts, and character building."
    },
    {
      icon: <BookCheck className="w-6 h-6 text-indigo-600" />,
      title: "Board Affiliation",
      description: "Strict adherence to the national educational board guidelines ensuring recognized standard education."
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "Skill Competency",
      description: "Integration of 21st-century skills including critical thinking, digital literacy, and problem-solving."
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-green-600" />,
      title: "Continuous Assessment",
      description: "Regular formative and summative assessments to track progress and provide timely interventions."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Curriculum Details</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our academic curriculum is meticulously designed to foster a love for learning while meeting the highest educational standards. We focus on a balanced approach that nurtures intellect, physical wellness, and emotional growth.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We leverage modern pedagogical tools integrated with traditional values to create an environment where students don't just memorize, but understand and apply concepts to real-world scenarios.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#a81d1d] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-800 transition"
            >
              Download Syllabus
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="bg-red-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CurriculumDetails;

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Atom, Users } from 'lucide-react';

const classesData = [
  {
    level: "Pre-Primary",
    grades: "Pre-KG - UKG",
    description: "Building strong foundations through play-way methods, focusing on motor skills and sensory development.",
    icon: <Users className="w-8 h-8 text-pink-500" />,
    color: "bg-pink-50 border-pink-200"
  },
  {
    level: "Primary",
    grades: "Class I - V",
    description: "Fostering curiosity and fundamental academic skills in a nurturing, interactive environment.",
    icon: <BookOpen className="w-8 h-8 text-[#a81d1d]" />,
    color: "bg-red-50 border-red-200"
  },
  {
    level: "Middle",
    grades: "Class VI - VIII",
    description: "Encouraging independent thinking, project-based learning, and strengthening core subject concepts.",
    icon: <Atom className="w-8 h-8 text-green-500" />,
    color: "bg-green-50 border-green-200"
  },
  {
    level: "Secondary & Senior Secondary",
    grades: "Class IX - XII",
    description: "Rigorous academic preparation focusing on board exams and future career pathways.",
    icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
    color: "bg-purple-50 border-purple-200"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const ClassesOffered = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Classes Offered
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We offer a comprehensive educational journey from foundational years to senior secondary education, tailoring our approach to each developmental stage.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {classesData.map((cls, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border-2 ${cls.color} transition-all duration-300 hover:shadow-xl`}
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-6">
                {cls.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cls.level}</h3>
              <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">{cls.grades}</p>
              <p className="text-gray-700 leading-relaxed">{cls.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClassesOffered;

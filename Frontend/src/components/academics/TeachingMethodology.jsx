import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Laptop, Activity } from 'lucide-react';

const TeachingMethodology = () => {
  const methods = [
    {
      title: "Experiential Learning",
      description: "Hands-on projects, field trips, and experiments to connect theoretical concepts with real-world applications.",
      icon: <Activity className="w-8 h-8 text-orange-500" />,
      color: "bg-orange-50 border-orange-200 hover:border-orange-500"
    },
    {
      title: "Tech-Integrated Classrooms",
      description: "Smart boards, digital resources, and interactive modules to make learning visually engaging.",
      icon: <Laptop className="w-8 h-8 text-[#a81d1d]" />,
      color: "bg-red-50 border-red-200 hover:border-[#a81d1d]"
    },
    {
      title: "Collaborative Approach",
      description: "Group discussions, peer-to-peer learning, and team projects to build communication and teamwork skills.",
      icon: <Users className="w-8 h-8 text-green-500" />,
      color: "bg-green-50 border-green-200 hover:border-green-500"
    },
    {
      title: "Critical Thinking",
      description: "Encouraging students to question, analyze, and synthesize information rather than rote memorization.",
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      color: "bg-yellow-50 border-yellow-200 hover:border-yellow-500"
    }
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Teaching Methodology
          </motion.h2>
          <div className="w-24 h-1 bg-[#a81d1d] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our pedagogy shifts the focus from teaching to learning, ensuring that every student actively participates in the construction of their own knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Centered Decorative Line (visible on md+) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2 z-0"></div>

          {methods.map((method, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative z-10 flex ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
            >
              <div className={`p-8 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-xl w-full md:w-[90%] lg:w-[80%] ${method.color} bg-white group`}>
                <div className="flex items-start gap-5">
                  <div className="bg-gray-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{method.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachingMethodology;

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, CheckCircle, GraduationCap } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Registration",
    description: "Fill out the online admission form or collect the prospectus from the school office.",
    icon: <FileText className="w-8 h-8 text-white" />,
    color: "bg-[#a81d1d]"
  },
  {
    id: 2,
    title: "Interaction",
    description: "An informal interaction with the parents and the child by our admission panel.",
    icon: <Users className="w-8 h-8 text-white" />,
    color: "bg-[#ffd700]"
  },
  {
    id: 3,
    title: "Document Verification",
    description: "Submission and verification of all required mandatory documents at the school office.",
    icon: <CheckCircle className="w-8 h-8 text-white" />,
    color: "bg-green-600"
  },
  {
    id: 4,
    title: "Fee Payment & Enrollment",
    description: "Payment of the admission fee to confirm the seat and complete the enrollment process.",
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    color: "bg-blue-600"
  }
];

const AdmissionProcess = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Admission Process
          </motion.h2>
          <div className="w-24 h-1 bg-[#a81d1d] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our admission process is designed to be transparent, straightforward, and welcoming for both parents and students.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-gray-200 transform -translate-x-1/2 z-0"></div>

          <div className="space-y-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={step.id} className={`flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8`}>
                
                {/* Content */}
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex-1 w-full bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                >
                  <h3 className="text-xl font-bold text-[#a81d1d] mb-2">{step.id}. {step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>

                {/* Icon Marker */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.2, type: "spring" }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-lg ${step.color} relative z-10`}
                >
                  {step.icon}
                </motion.div>

                {/* Empty Space for alignment on Desktop */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcess;

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileWarning, Fingerprint, MapPin, BicepsFlexed, Receipt } from 'lucide-react';

const EligibilityCriteria = () => {
  const documents = [
    { title: "Birth Certificate", desc: "Original and photocopy of municipal birth certificate.", icon: <Fingerprint className="w-5 h-5 text-[#a81d1d]" /> },
    { title: "Address Proof", desc: "Aadhar card / Electricity Bill / Rent Agreement.", icon: <MapPin className="w-5 h-5 text-[#a81d1d]" /> },
    { title: "Photographs", desc: "4 passport size photographs of the child and 2 of each parent.", icon: <BicepsFlexed className="w-5 h-5 text-[#a81d1d]" /> }, // BicepsFlexed used as a generic icon, replace if needed
    { title: "Previous Report Card", desc: "Final report card of the previous class (if applicable).", icon: <Receipt className="w-5 h-5 text-[#a81d1d]" /> },
    { title: "Transfer Certificate", desc: "Original TC from the previous school (Class II onwards).", icon: <FileWarning className="w-5 h-5 text-[#a81d1d]" /> }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Eligibility Rules */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-[#ffd700] pb-2 inline-block">Eligibility Criteria</h2>
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
              <p className="text-gray-700 mb-6 text-lg">
                Admission is granted to classes Pre-Nursery to IX and XI, subject to the availability of seats. The age criteria as of March 31st of the academic year is as follows:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                  <span className="font-bold text-[#a81d1d] w-32 shrink-0">Pre-Nursery:</span>
                  <span className="text-gray-700">2.5 to 3.5 Years</span>
                </li>
                <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <span className="font-bold text-[#a81d1d] w-32 shrink-0">Nursery / LKG:</span>
                  <span className="text-gray-700">3.5 to 4.5 Years</span>
                </li>
                <li className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                  <span className="font-bold text-[#a81d1d] w-32 shrink-0">Prep / UKG:</span>
                  <span className="text-gray-700">4.5 to 5.5 Years</span>
                </li>
                <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <span className="font-bold text-[#a81d1d] w-32 shrink-0">Class 1:</span>
                  <span className="text-gray-700">5.5 to 6.5 Years</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-6 italic">
                * Age relaxation is subject to the principal's discretion and board guidelines.
              </p>
            </div>
          </motion.div>

          {/* Documents Required */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-[#a81d1d] pb-2 inline-block">Mandatory Documents</h2>
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 h-full">
              <p className="text-gray-700 mb-6 text-lg">
                Please ensure you bring the following documents (original for verification and one set of photocopies) at the time of admission:
              </p>
              
              <div className="space-y-4">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-3 hover:bg-red-50 transition-colors rounded-lg group">
                    <div className="mt-1 bg-red-100 p-2 rounded-full group-hover:scale-110 transition-transform">
                      {doc.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{doc.title}</h4>
                      <p className="text-sm text-gray-600">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EligibilityCriteria;

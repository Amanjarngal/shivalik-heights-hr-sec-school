import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const eventsData = [
  {
    month: "April",
    events: [
      { date: "05", title: "New Academic Session Begins", time: "08:00 AM", location: "School Campus" },
      { date: "15", title: "Orientation for Parents (Primary)", time: "10:00 AM", location: "Main Auditorium" }
    ]
  },
  {
    month: "May",
    events: [
      { date: "10", title: "First Periodic Assessment", time: "Full Day", location: "Classrooms" },
      { date: "25", title: "Summer Vacation Begins", time: "n/a", location: "n/a" }
    ]
  },
  {
    month: "July",
    events: [
      { date: "01", title: "School Reopens after Summer", time: "08:00 AM", location: "School Campus" },
      { date: "20", title: "Inter-School Science Exhibition", time: "09:00 AM", location: "Science Block" }
    ]
  }
];

const AcademicCalendar = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            >
              Academic Calendar Highlight
            </motion.h2>
            <p className="text-gray-600">Key dates and events for the current academic year.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-[#a81d1d] text-white px-6 py-2 rounded-full hover:bg-red-800 transition">
            <Calendar className="w-5 h-5" />
            Download Full PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {eventsData.map((monthData, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-[#a81d1d] mb-6 border-b pb-4">{monthData.month}</h3>
              <div className="space-y-6">
                {monthData.events.map((event, eIdx) => (
                  <div key={eIdx} className="flex gap-4 group cursor-pointer">
                    <div className="bg-red-50 text-red-700 font-bold rounded-xl w-14 h-14 flex items-center justify-center shrink-0 text-xl group-hover:bg-[#a81d1d] group-hover:text-white transition-colors">
                      {event.date}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#a81d1d] transition-colors">{event.title}</h4>
                      {event.time !== "n/a" && (
                        <div className="flex items-center text-sm text-gray-500 mt-1 gap-3">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center md:hidden">
            <button className="flex items-center gap-2 bg-[#a81d1d] text-white px-6 py-2 rounded-full hover:bg-red-800 transition">
              <Calendar className="w-5 h-5" />
              Download Full PDF
            </button>
        </div>
      </div>
    </section>
  );
};

export default AcademicCalendar;

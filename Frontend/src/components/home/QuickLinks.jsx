import { motion } from 'framer-motion';
import {
  GraduationCap, Camera, PhoneCall, BookOpen,
  Megaphone, ClipboardList, Users, MapPin, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  {
    icon: GraduationCap,
    label: 'Admission',
    sub: 'Enroll for 2026-27',
    path: '/admission',
    gradient: 'from-[#a81d1d] to-rose-600',
    glow: 'shadow-rose-200',
  },
  {
    icon: BookOpen,
    label: 'Academics',
    sub: 'Courses & Curriculum',
    path: '/academics',
    gradient: 'from-blue-700 to-blue-500',
    glow: 'shadow-blue-200',
  },
  {
    icon: Megaphone,
    label: 'Announcements',
    sub: 'Latest News & Notices',
    path: '/announcements',
    gradient: 'from-amber-500 to-yellow-400',
    glow: 'shadow-yellow-200',
  },
  {
    icon: Camera,
    label: 'Gallery',
    sub: 'Photos & Events',
    path: '/gallery',
    gradient: 'from-purple-700 to-purple-500',
    glow: 'shadow-purple-200',
  },
  {
    icon: Users,
    label: 'About Us',
    sub: 'Our Story & Faculty',
    path: '/about',
    gradient: 'from-teal-600 to-emerald-500',
    glow: 'shadow-emerald-200',
  },
  // {
  //   icon: ClipboardList,
  //   label: 'Results',
  //   sub: 'Academic Performance',
  //   path: '/academics',
  //   gradient: 'from-orange-600 to-orange-400',
  //   glow: 'shadow-orange-200',
  // },
  {
    icon: MapPin,
    label: 'Location',
    sub: 'Find Us on Map',
    path: '/contact',
    gradient: 'from-cyan-600 to-sky-500',
    glow: 'shadow-cyan-200',
  },
  {
    icon: PhoneCall,
    label: 'Contact Us',
    sub: 'Call or Email Us',
    path: '/contact',
    gradient: 'from-gray-700 to-gray-500',
    glow: 'shadow-gray-200',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const QuickLinks = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 text-xs font-black uppercase tracking-[0.25em] text-[#a81d1d] bg-red-50 border border-red-200 rounded-full mb-4">
            Quick Access
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Explore <span className="text-[#a81d1d]">NPHSS</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#a81d1d] mx-auto rounded-full" />
        </motion.div>

        {/* Link Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {links.map((link) => (
            <motion.div key={link.label} variants={cardVariants}>
              <Link
                to={link.path}
                className={`group relative flex flex-col items-start justify-between p-6 rounded-2xl bg-gradient-to-br ${link.gradient} text-white shadow-lg ${link.glow} hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 h-36 overflow-hidden`}
              >
                {/* Background Glow Circle */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full transition-transform duration-300 group-hover:scale-150" />

                {/* Icon */}
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mb-auto">
                  <link.icon className="w-6 h-6 text-white" />
                </div>

                {/* Text + Arrow */}
                <div className="w-full">
                  <p className="text-[11px] font-semibold text-white/70 uppercase tracking-widest leading-none mb-0.5">
                    {link.sub}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black leading-tight">{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default QuickLinks;

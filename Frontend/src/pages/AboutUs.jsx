import React from 'react';
import { motion } from 'framer-motion';
import {
  History,
  Target,
  Eye,
  Award,
  Users,
  Heart,
  ShieldCheck,
  Lightbulb,
  ChevronRight,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSchool } from '../context/SchoolContext';

const AboutUs = () => {
  const { schoolSettings } = useSchool();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-[#1e3a8a]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a81d1d]/90 to-[#1e3a8a]/90 z-10"></div>
          <img
            src="https://scontent.fdel11-1.fna.fbcdn.net/v/t39.30808-6/527568420_1312491147548041_7284580997631772171_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=2a1932&_nc_ohc=n4GlkA5kjA8Q7kNvwH7jYcI&_nc_oc=AdmlJ6M6Y4o1jmKsa2_vqJbR1025GbnqlU8f6W8u-3wFWlIWWp_5AGFHWYjRqqNT3bg&_nc_zt=23&_nc_ht=scontent.fdel11-1.fna&_nc_gid=t7wgJib8nVGAIqJi1jxmNA&_nc_ss=8&oh=00_AfyTptrzuv0MJEDoeT2VaDUXZvQz3kJ6mdIlWcDyFH6Eaw&oe=69BB14BE"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 text-white/70 text-sm mb-4 font-bold uppercase tracking-widest"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-yellow-400">About Us</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 text-shadow-lg">Legacy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/90 text-sm md:text-lg font-bold uppercase tracking-[0.3em] mt-2 mb-6"
          >
            {schoolSettings.schoolName}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            className="h-1.5 bg-yellow-400 mx-auto mt-6 rounded-full"
          ></motion.div>
        </div>
      </section>

      {/* ── History & Introduction ── */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-[#a81d1d] rounded-full text-xs font-black uppercase tracking-widest border border-red-100">
                <History className="w-4 h-4" />
                Since 1998
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                A Journey of <span className="text-[#a81d1d]">Excellence</span> in Hiranagar
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Founded in 1998, <span className="font-bold text-blue-900 text-shadow">{schoolSettings.schoolName} ({schoolSettings.shortName})</span> has been a beacon of knowledge and character building for over two decades. Located in the heart of {schoolSettings.address.split(',')[0]}, we have dedicated ourselves to providing high-quality education that blends traditional values with modern innovation.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Affiliated with the <span className="font-bold">{schoolSettings.boardAffiliation}</span>, our institution has consistently produced toppers and leaders who excel in various fields. From our humble beginnings to becoming a premier educational hub, our commitment remains unchanged: to empower every child with the tools they need to succeed in an ever-evolving world.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="text-3xl font-black text-[#a81d1d]">25+</h4>
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Years of Legacy</p>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="text-3xl font-black text-blue-900">100%</h4>
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Board Results</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#a81d1d] to-blue-900 rounded-[2rem] opacity-10 blur-2xl animate-pulse"></div>
              <img
                src={schoolSettings.aboutUsImage || "https://lh3.googleusercontent.com/gps-cs-s/AHVAweplnOkPGyhzIB-khbCKbaoDfeBcfPGKQw5N5Itxbn1BiJUgFUoaAqYQmrXakV3YXlFB80cdCRNGSjYtLkmAemKm7IulKVnE30BIsaqmuvszup4ylJGT8f2AqQ9TvPjDoXVJ3Txq=s1360-w1360-h1020-rw"}
                alt="Students studying"
                className="relative z-10 rounded-[2rem] shadow-2xl border-8 border-white w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-8 -left-8 z-20 bg-[#a81d1d] text-white p-8 rounded-3xl shadow-2xl hidden md:block">
                <p className="text-3xl font-black">Est. 1998</p>
                <p className="text-white/70 font-bold uppercase tracking-widest text-xs">A Tradition of Gold</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 md:p-14 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] rounded-[3rem] text-white relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                  <Eye className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">Our Vision</h3>
                <p className="text-blue-100 text-lg leading-relaxed mb-6 font-medium italic">
                  "To be a global leader in providing holistic education that nurtures excellence, innovation, and character, empowering students to lead with integrity in a dynamic world."
                </p>
                <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 md:p-14 bg-gradient-to-br from-[#a81d1d] to-rose-900 rounded-[3rem] text-white relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                  <Target className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">Our Mission</h3>
                <p className="text-rose-100 text-lg leading-relaxed mb-6 font-medium">
                  To provide a nurturing environment where students are challenged to think critically, encouraged to act compassionately, and inspired to achieve their full potential through a balanced curriculum of academics, sports, and arts.
                </p>
                <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#a81d1d] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
              Our Core <span className="text-[#a81d1d]">Values</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#a81d1d] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Integrity", desc: "Honesty and ethical conduct in all spheres of life." },
              { icon: Award, title: "Excellence", desc: "Striving for the highest standards in everything we do." },
              { icon: Heart, title: "Respect", desc: "Valuing diversity and treating everyone with dignity." },
              { icon: Lightbulb, title: "Innovation", desc: "Encouraging creative thinking and new-age learning." }
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
              >
                <div className="w-16 h-16 bg-[#a81d1d] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black mb-3">{value.title}</h4>
                <p className="text-gray-400 font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Messages ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
              Messages from <span className="text-[#a81d1d]">Leadership</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#a81d1d] mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-16">
            {/* Chairman Message */}
            {/* <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row items-center gap-12 bg-gray-50 rounded-[4rem] p-8 md:p-16 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 opacity-[0.03] text-gray-900 pointer-events-none">
                <Quote size={400} />
              </div>
              <div className="shrink-0 relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative z-10">
                  <img
                    src={schoolSettings.chairmanImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop"}
                    alt="Chairman"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-xl z-20">
                  <Quote className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="space-y-6 relative z-10">
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Chairman's Message</h3>
                <p className="text-gray-600 text-lg italic leading-relaxed font-medium">
                  {schoolSettings.chairmanMessage || `"At ${schoolSettings.shortName}, we believe that education is not just about books, but about building a foundation for life. Our vision is to create a community where every student feels valued and empowered. We are committed to providing the infrastructure and guidance necessary for our students to compete at the highest levels, while remaining rooted in our cultural values."`}
                </p>
                <div>
                  <p className="text-xl font-black text-[#a81d1d] mb-1">{schoolSettings.chairmanName || 'Sh. [Name]'}</p>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Chairman, {schoolSettings.shortName}</p>
                </div>
              </div>
            </motion.div> */}

            {/* Principal Message */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row-reverse items-center gap-12 bg-[#1e3a8a] text-white rounded-[4rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-blue-900/40"
            >
              <div className="absolute top-0 left-0 opacity-[0.05] text-white pointer-events-none">
                <Quote size={400} transform="scale(-1, 1)" />
              </div>
              <div className="shrink-0 relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl relative z-10">
                  <img
                    src={schoolSettings.principalImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop"}
                    alt="Principal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#a81d1d] rounded-3xl flex items-center justify-center shadow-xl z-20">
                  <Heart className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="space-y-6 relative z-10">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Principal's Address</h3>
                <p className="text-blue-100 text-lg italic leading-relaxed font-medium">
                  {schoolSettings.principalMessage || `"Our school is a place of infinite possibilities. Every day, I see young minds blooming with curiosity and ambition. We strive to provide an environment that is both academically rigorous and emotionally supportive. Our faculty is dedicated to mentorship, ensuring that every ${schoolSettings.shortName} graduate is a well-rounded individual ready to contribute meaningfully to society."`}
                </p>
                <div>
                  <p className="text-xl font-black text-yellow-400 mb-1">{schoolSettings.principalName || 'Ms. [Name]'}</p>
                  <p className="text-blue-200 font-bold uppercase tracking-widest text-xs">Principal, {schoolSettings.shortName}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#a81d1d] to-[#1e3a8a] rounded-[3.5rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Be Part of Our Legacy</h2>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                Admissions are open for the session 2026-27. Join the {schoolSettings.shortName} family and start your journey towards greatness today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/admission"
                  className="bg-white text-[#a81d1d] px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                >
                  Apply Online <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-white/5 rounded-full blur-[100px]"></div>
              <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-[#a81d1d]/20 rounded-full blur-[100px]"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

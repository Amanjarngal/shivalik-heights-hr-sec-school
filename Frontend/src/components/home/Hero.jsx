import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSchool } from '../../context/SchoolContext';
import hero1 from '../../assets/hero 1.jpg';
import hero2 from '../../assets/hero2.jpg';
import hero3 from '../../assets/hero3.jpg';
import hero4 from '../../assets/hero 4.jpg';

const HERO_IMAGES = [hero1, hero2, hero3, hero4];

const Hero = () => {
  const { schoolSettings } = useSchool();
  const [currentImage, setCurrentImage] = useState(0);

  const sliderImages = schoolSettings?.heroSlides?.length > 0
    ? schoolSettings.heroSlides.map(s => s.imageUrl)  // Cloudinary URLs are already absolute
    : HERO_IMAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#1e3a8a]">
      {/* Background with Ambient Glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#a81d1d] via-[#1e3a8a] to-[#0f172a]"></div>

      {/* Animated Decorative Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-48 -left-48 w-[40rem] h-[40rem] bg-[#a81d1d]/20 rounded-full blur-[120px]"
      ></motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">

          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            {/* Top Badge */}
            {/* <div className="inline-flex items-center px-4 py-2 mb-6 text-xs md:text-sm font-bold tracking-widest text-[#a81d1d] uppercase bg-white rounded-full shadow-2xl">
              <GraduationCap className="w-5 h-5 mr-3 text-[#a81d1d]" />
              Excellence Since 1998
            </div> */}

            {/* Scaleable Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-lg whitespace-pre-line">
              {schoolSettings?.heroTitle || "Building Leaders of \nTomorrow, Today."}
            </h1>

            {/* Highlighted Slogan */}
            <div className="mb-8 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border-l-[6px] border-yellow-400 shadow-xl max-w-lg">
              <p className="text-lg md:text-xl text-white font-medium italic mb-2 leading-relaxed whitespace-pre-line">
                "{schoolSettings?.heroSubtitle || "Where your child's potential meets world-class opportunity in a nurturing environment."}"
              </p>
              <p className="text-blue-200 font-bold uppercase tracking-[0.2em] text-xs">
                {schoolSettings.address.split(',')[0]} | Affiliated to {schoolSettings.boardAffiliation}
              </p>
            </div>

            {/* Feature Icons List */}
            <div className="grid grid-cols-2 gap-4 mb-10 max-w-md">
              {['Smart Classes', 'Sports Academy', 'STEM Labs', 'Expert Faculty'].map((item) => (
                <div key={item} className="flex items-center space-x-2 text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="font-bold text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/admission"
                className="group flex items-center justify-center px-8 py-4 text-lg font-black text-white bg-[#a81d1d] hover:bg-white hover:text-[#a81d1d] rounded-xl transition-all shadow-[0_10px_30px_rgba(168,29,29,0.4)] hover:scale-105 active:scale-95 border-2 border-transparent hover:border-[#a81d1d]"
              >
                ENROLL NOW
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white/40 hover:bg-white/10 hover:border-white rounded-xl transition-all backdrop-blur-sm"
              >
                DISCOVER MORE
              </Link>
            </div>
          </motion.div>

          {/* Right Slider Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:w-full"
          >
            {/* Interactive Image Frame */}
            <div className="relative z-10 aspect-[16/10] lg:aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-8 border-white/10 group bg-black/20">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={currentImage}
                  src={sliderImages[currentImage]}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute top-6 right-6 z-20">
                <div className="bg-[#a81d1d] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  {schoolSettings.shortName} Campus
                </div>
              </div>
            </div>

            {/* Glowing Background Glow behind slider */}
            <div className="absolute -inset-10 bg-[#a81d1d]/30 rounded-full blur-[100px] -z-10 animate-pulse"></div>

            {/* Slider Dots */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex space-x-4">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${idx === currentImage ? 'w-12 bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'w-2.5 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Modern Wave Divider or Bottom Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;

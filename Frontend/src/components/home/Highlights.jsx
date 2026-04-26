import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Trophy, Award, Star, Users, GraduationCap,
  BookOpen, Medal, TrendingUp, CheckCircle2, Zap,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import hero1 from '../../assets/hero 1.jpg';
import hero2 from '../../assets/hero2.jpg';
import hero3 from '../../assets/hero3.jpg';
import hero4 from '../../assets/hero 4.jpg';
import { useSchool } from '../../context/SchoolContext';

// ── Animated Counter ──────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ── Data ──────────────────────────────────────────────────────────
const stats = [
  { icon: GraduationCap, label: 'Years of Excellence', value: 25, suffix: '+', color: 'from-[#a81d1d] to-rose-700' },
  { icon: Users, label: 'Students Enrolled', value: 1200, suffix: '+', color: 'from-blue-700 to-blue-500' },
  { icon: TrendingUp, label: 'Board Result', value: 100, suffix: '%', color: 'from-green-600 to-emerald-500' },
  { icon: Trophy, label: 'Awards Won', value: 50, suffix: '+', color: 'from-yellow-500 to-amber-400' },
];

const defaultAchievements = [
  {
    icon: Trophy,
    image: hero1,
    color: 'text-yellow-500',
    year: '2025',
    title: 'Independence Day Parade',
    desc: 'Our students and NCC cadets participating in the 79th Independence Day celebrations with patriotic fervor.',
  },
  {
    icon: Medal,
    image: hero2,
    color: 'text-blue-400',
    bg: 'from-blue-900/80 to-blue-700/60',
    year: '2024',
    title: 'Bhagat House Excellence',
    desc: 'Students of Bhagat House celebrating their outstanding performance in the inter-house cultural competitions.',
  },
  {
    icon: Star,
    image: hero3,
    color: 'text-purple-400',
    bg: 'from-purple-900/80 to-purple-700/60',
    year: '2024',
    title: 'Azad House Leadership',
    desc: 'Captain of Azad House leading the student council during the annual school sports and leadership meet.',
  },
  {
    icon: Award,
    image: hero4,
    color: 'text-red-400',
    bg: 'from-[#a81d1d]/90 to-rose-700/60',
    year: '2024',
    title: 'Community Engagement',
    desc: 'Hosting a mega community awareness program with local authorities and media presence.',
  },
];

const getWhyUs = (board) => [
  `${board} Affiliated — J&K`,
  'Experienced & Dedicated Faculty',
  '100% Board Pass Rate (5+ Years)',
  'Smart Classrooms & STEM Labs',
  'Sports, Arts & Cultural Programs',
  'Safe & Nurturing Environment',
];

// ── Achievement Slider ─────────────────────────────────────────────
const AchievementSlider = ({ achievements }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = achievements.length;

  const go = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };
  const prev = () => go((current - 1 + total) % total);
  const next = () => go((current + 1) % total);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
    }, 5000);
    return () => clearInterval(t);
  }, [total]);

  const a = achievements[current] || achievements[0];

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-900 select-none">
      {/* Image Area */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="absolute inset-0"
          >
            {/* Image - fills full area cleanly */}
            <img
              src={a.image}
              alt={a.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrow Controls */}
        <button
          onClick={prev}
          className="absolute left-4 bottom-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 bottom-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Description Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="px-7 py-6"
        >
          <h4 className="text-2xl font-black text-white mb-2 leading-tight">{a.title}</h4>
          <p className="text-gray-400 text-base leading-relaxed">{a.desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2 pb-5">
        {achievements.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-400 ${i === current ? 'w-8 h-2.5 bg-yellow-400' : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────
const Highlights = () => {
  const { schoolSettings } = useSchool();
  const whyUs = getWhyUs(schoolSettings.boardAffiliation);

  const achievements = schoolSettings?.heroSlides?.length > 0
    ? schoolSettings.heroSlides.map((s, i) => {
        const fallbacks = [
          { icon: Trophy, color: 'text-yellow-500' },
          { icon: Medal, color: 'text-blue-400' },
          { icon: Star, color: 'text-purple-400' },
          { icon: Award, color: 'text-red-400' }
        ];
        const fb = fallbacks[i % fallbacks.length];
        return {
          icon: fb.icon,
          image: s.imageUrl,  // Cloudinary URLs are already absolute
          color: fb.color,
          title: s.title,
          desc: s.description
        };
      })
    : defaultAchievements;

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 text-xs font-black uppercase tracking-[0.25em] text-[#a81d1d] bg-red-50 border border-red-200 rounded-full mb-4">
            Our Track Record
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            School <span className="text-[#a81d1d]">Achievements</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#a81d1d] mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-500 max-w-xl mx-auto font-medium">
            Results that speak louder than words.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-90`} />
              <div className="relative p-8 text-center text-white">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4">
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-5xl font-black mb-1 leading-none">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-white/90 font-semibold text-sm uppercase tracking-widest">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slider + Why Us */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">

          {/* Achievement Slider */}
          <div>
            <motion.h3
              className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Trophy className="w-7 h-7 text-yellow-500" />
              Awards &amp; Milestones
            </motion.h3>
            {achievements.length > 0 && <AchievementSlider achievements={achievements} />}
          </div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-[#a81d1d] to-[#1e3a8a] rounded-3xl p-8 text-white shadow-2xl"
          >
            <h3 className="text-2xl font-black mb-2">Why Choose {schoolSettings.shortName}?</h3>
            <p className="text-white/70 text-sm mb-8 leading-relaxed">
              We go beyond textbooks — building character, confidence and career-readiness.
            </p>
            <ul className="space-y-4">
              {whyUs.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Recognized By</p>
              <p className="text-yellow-300 font-black text-lg">{schoolSettings.boardAffiliation}</p>
              <p className="text-white/60 text-xs mt-1">J&K School Education Department</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Highlights;

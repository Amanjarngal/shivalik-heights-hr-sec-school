import { motion } from 'framer-motion';
import {
  CheckCircle, ArrowRight, ClipboardList,
  UserCheck, FileText, BookOpen, Calendar,
  Phone, Sparkles, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSchool } from '../../context/SchoolContext';
import logo from '../../assets/logo.png';

// ── Image Config ──────────────────────────────────────────────────
const IMAGES = {
  main: 'https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/634043602_1485585333571954_1684549502855741659_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=ucilnxlStYoQ7kNvwGRXiAa&_nc_oc=Adkk2_MZP9FT7OCEdGRduUrEIg_J4Xdjp0MuiY2zoUVgPL2SPoQbmumEJ7oIlVI1dqU&_nc_zt=23&_nc_ht=scontent.fdel11-4.fna&_nc_gid=YSwy2oo0mUVPyx81_5Q77w&_nc_ss=8&oh=00_AfwH3RP_UXRnVcJ2CndeyJvlnjN2pFOf7Tia586XNyKFlg&oe=69B7AA2A', // 🖼️ Replace with your main image
};

const getFeatures = (board) => [
  `${board} Affiliated — J&K`,
  'Smart Classrooms & STEM Labs',
  'Expert & Experienced Faculty',
  '100% Board Result Track Record',
  'Sports, Arts & Cultural Programs',
  'Safe & Disciplined Environment',
];

const steps = [
  { icon: FileText, step: '01', title: 'Fill Form', desc: 'Online or physical application' },
  { icon: ClipboardList, step: '02', title: 'Submit Docs', desc: 'Attach required certificates' },
  { icon: UserCheck, step: '03', title: 'Assessment', desc: 'Entry interview or test' },
  { icon: BookOpen, step: '04', title: 'Confirm Seat', desc: 'Pay fees & get started' },
];

const AdmissionSection = () => {
  const { schoolSettings } = useSchool();
  const features = getFeatures(schoolSettings.boardAffiliation);
  return (
    <section className="relative overflow-hidden bg-[#1e3a8a]">

      {/* ── Same gradient as Hero ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a81d1d] via-[#1e3a8a] to-[#0f172a]" />

      {/* Same animated blob as Hero */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-48 -left-48 w-[40rem] h-[40rem] bg-[#a81d1d]/20 rounded-full blur-[120px] pointer-events-none"
      />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <img
          src={schoolSettings.logoUrl ? schoolSettings.logoUrl : logo}
          alt=""
          className="w-[1400px] h-1400px] object-contain opacity-[0.07]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-yellow-300 text-xs font-black uppercase tracking-[0.3em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Admissions Open — Session 2026-27
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-none">
            Your Child's<br />
            <span className="text-yellow-300">
              Future Starts Here
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto font-medium mt-5">
            Join 1200+ students building their tomorrow at {schoolSettings.shortName} — {schoolSettings.address.split(',')[0]}'s most trusted school.
          </p>
        </motion.div>

        {/* ── Main Two-Column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 mb-20 items-center">

          {/* Left — Image with overlays */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image card */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] ring-1 ring-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
              <img
                src={schoolSettings?.admissionImage ? schoolSettings.admissionImage : IMAGES.main}
                alt={`${schoolSettings.shortName} School`}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-white font-black text-xl leading-tight">
                  {schoolSettings.schoolName}
                </p>
                <p className="text-white/60 text-sm font-semibold mt-1">{schoolSettings.address}</p>
              </div>
            </div>

            {/* Floating glass badge — Years */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl px-6 py-4 text-center"
            >
              <p className="text-4xl font-black text-yellow-300">25+</p>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Years of Excellence</p>
            </motion.div>

            {/* Floating glass badge — Results */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -top-5 -left-5 backdrop-blur-xl bg-[#a81d1d]/80 border border-red-400/20 rounded-2xl shadow-2xl px-5 py-3 text-center"
            >
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Board Results</p>
            </motion.div>
          </motion.div>

          {/* Right — Features + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-black text-white mb-1">
              Why choose <span className="text-yellow-300">{schoolSettings.shortName}</span>?
            </h3>
            <p className="text-white/40 text-sm mb-7">Everything your child needs to succeed.</p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 text-white/80 font-semibold text-sm"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </span>
                  {f}
                </motion.li>
              ))}
            </ul>

            {/* Deadline notice */}
            <div className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-400/20 rounded-xl px-4 py-3 mb-7">
              <Calendar className="w-5 h-5 text-yellow-400 shrink-0" />
              <p className="text-sm font-semibold text-yellow-300">
                Last date: <span className="font-black">{schoolSettings?.admissionLastDate || '31st March 2026'}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/admission"
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-[#a81d1d] to-rose-600 hover:from-[#8f1818] hover:to-rose-700 text-white font-black rounded-2xl shadow-lg shadow-red-900/40 hover:shadow-red-900/60 transition-all group"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black rounded-2xl transition-all backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                Contact
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── How to Apply Steps ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-center text-2xl font-black text-white mb-10">
            How to <span className="text-yellow-300">Apply</span>
            <span className="block text-sm font-medium text-white/40 mt-1 tracking-widest uppercase">4 Simple Steps</span>
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/25 hover:bg-white/10 transition-all shadow-xl"
              >
                {/* Background step number */}
                <span className="absolute top-4 right-5 text-5xl font-black text-white/5 leading-none select-none">
                  {s.step}
                </span>
                {/* Icon */}
                <div className="w-12 h-12 bg-[#a81d1d]/30 border border-[#a81d1d]/40 rounded-xl flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-[#ff6b6b]" />
                </div>
                <h4 className="text-base font-black text-white mb-1">{s.title}</h4>
                <p className="text-sm text-white/40 font-medium">{s.desc}</p>

                {/* Connector dot */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-white/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AdmissionSection;

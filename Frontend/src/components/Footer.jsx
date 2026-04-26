import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, GraduationCap, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';
import { useSchool } from '../context/SchoolContext';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admission', path: '/admission' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Announcements', path: '/announcements' },
  { label: 'Contact Us', path: '/contact' },
];

const Footer = () => {
  const { schoolSettings } = useSchool();

  return (
    <footer className="bg-[#0f172a] text-white">

      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#a81d1d] via-rose-500 to-[#1e3a8a]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Column 1: School Brand ── */}
          <div className="lg:col-span-1">
            {/* Logo + Name */}
            <div className="flex items-center gap-3 mb-5">
              <Link to="/">
                <img
                  src={schoolSettings.logoUrl ? schoolSettings.logoUrl : logo}
                  alt={`${schoolSettings.shortName} Logo`}
                  className="w-14 h-14 object-contain rounded-full border-2 border-[#a81d1d] shadow-md bg-white"
                />
              </Link>
              <div>
                <p className="text-white font-black text-lg leading-tight">{schoolSettings.shortName}</p>
                <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest leading-tight">Est. 1998</p>
              </div>
            </div>

            <p className="text-sm text-white/50 font-medium leading-relaxed mb-6">
              <span className="text-white font-bold">{schoolSettings.schoolName}</span><br />
              {schoolSettings.address}<br />
              Dedicated to excellence in education and character building since 1998.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: schoolSettings.facebookUrl, label: 'Facebook' },
                { icon: Youtube, href: schoolSettings.twitterUrl, label: 'YouTube' },
                { icon: Instagram, href: schoolSettings.instagramUrl, label: 'Instagram' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#a81d1d] border border-white/10 hover:border-[#a81d1d] flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="group flex items-center gap-2 text-sm text-white/60 hover:text-white font-semibold transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#a81d1d] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Contact Info ── */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#a81d1d]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#a81d1d]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white/80">{schoolSettings.address.split(',')[0]}</p>
                  <p className="text-xs text-white/40 font-medium">{schoolSettings.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#a81d1d]/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#a81d1d]" />
                </div>
                <div>
                  <a href={`tel:${schoolSettings.phone}`} className="text-sm font-bold text-white/80 hover:text-white transition-colors">{schoolSettings.phone}</a>
                  <p className="text-xs text-white/40 font-medium">{schoolSettings.workingHours.split(',')[0]}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#a81d1d]/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#a81d1d]" />
                </div>
                <div>
                  <a href={`mailto:${schoolSettings.email}`} className="text-sm font-bold text-white/80 hover:text-white transition-colors">{schoolSettings.email}</a>
                  <p className="text-xs text-white/40 font-medium">We reply within 24 hours</p>
                </div>
              </li>
            </ul>
          </div>

          {/* ── Column 4: Admission CTA ── */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-5">Admissions 2026-27</h4>
            <div className="bg-gradient-to-br from-[#a81d1d]/20 to-[#1e3a8a]/20 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-black text-lg mb-1">Enroll Today</p>
              <p className="text-white/50 text-xs font-medium mb-5 leading-relaxed">
                Seats are filling fast for session 2026-27. Apply before 31st March 2026.
              </p>
              <Link
                to="/admission"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#a81d1d] to-rose-600 hover:from-[#8f1818] text-white font-black text-sm rounded-xl transition-all group shadow-lg shadow-red-900/30"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Affiliation badge */}
            <div className="mt-4 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4 text-yellow-300" />
              </div>
              <div>
                <p className="text-xs font-black text-white">{schoolSettings.boardAffiliation} Affiliated</p>
                <p className="text-[10px] text-white/40 font-medium">{schoolSettings.address.split(',')[1]?.trim() || 'JK'} · Affiliation No. XXXXXX</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-medium">
            © {new Date().getFullYear()} <span className="text-white/50 font-bold">{schoolSettings.schoolName}</span>, {schoolSettings.address.split(',')[0]}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30 font-medium">
            <Link to="/contact" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-white/60 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

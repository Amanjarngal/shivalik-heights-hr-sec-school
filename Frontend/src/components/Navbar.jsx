import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Youtube, Instagram, Menu, X, LogOut, User } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { useSchool } from '../context/SchoolContext';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { schoolSettings } = useSchool();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (topRef.current) {
        // When the top sections (maroon bar + brand) have scrolled out of view
        const bottom = topRef.current.getBoundingClientRect().bottom;
        setIsScrolled(bottom <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'ACADEMICS', path: '/academics' },
    { name: 'ADMISSION', path: '/admission' },
    { name: 'ANNOUNCEMENTS', path: '/announcements' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  // Admin specific links
  const adminLinks = isAdmin ? [
    { name: 'DASHBOARD', path: '/admin/dashboard' },
  ] : [];

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <header className="w-full">

      {/* ── Sentinel: Top Sections (scroll off-screen) ── */}
      <div ref={topRef}>
        {/* Top Bar - Maroon/Red */}
        <div className="bg-[#a81d1d] text-white py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm font-medium">
            <div className="flex items-center space-x-6">
              <a href={`mailto:${schoolSettings.email}`} className="flex items-center hover:text-gray-200 transition-colors cursor-pointer">
                <Mail className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{schoolSettings.email}</span>
              </a>
              <a href={`tel:${schoolSettings.phone}`} className="flex items-center hover:text-gray-200 transition-colors border-l border-white/30 pl-6 cursor-pointer">
                <Phone className="w-4 h-4 mr-2" />
                <span>{schoolSettings.phone}</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href={schoolSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/10 rounded-full transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href={schoolSettings.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/10 rounded-full transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href={schoolSettings.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/10 rounded-full transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        {/* Middle Brand Section - White */}
        <div className="bg-white py-6 px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
            {/* School Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src={schoolSettings.logoUrl ? schoolSettings.logoUrl : logo}
                  alt={`${schoolSettings.shortName} Logo`}
                  className="w-20 h-20 object-contain rounded-full border-2 border-[#a81d1d] shadow-md"
                />
              </Link>
            </div>

            {/* School Name & Affiliation */}
            <div className="flex-grow flex flex-col items-center md:items-start md:pl-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#a81d1d] tracking-tight uppercase leading-tight">
                {schoolSettings.schoolName}
              </h1>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3">
                  <h2 className="text-lg md:text-xl font-bold text-blue-900">{schoolSettings.address.split(',')[0]}</h2>
                  <span className="hidden md:inline text-gray-300">|</span>
                  <p className="text-xs md:text-sm font-bold text-gray-600 italic">(Affiliated to {schoolSettings.boardAffiliation})</p>
                </div>
                <p className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mt-1">
                  {schoolSettings.address}
                </p>
              </div>
            </div>

            {/* Tagline/Motto Right side */}
            <div className="hidden lg:block text-right">
              <div className="border-l-2 border-gray-200 pl-6 py-2">
                <p className="text-blue-900 font-bold italic leading-tight">
                  &quot;Empowering Minds,<br />
                  Shaping Futures&quot;
                </p>
                <div className="mt-2 flex justify-end">
                  <div className="w-12 h-1 bg-[#a81d1d] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ── End Sentinel ── */}

      {/* Spacer: prevents layout jump when nav becomes fixed */}
      {isScrolled && <div className="h-14" />}

      {/* ── Dark Navigation Bar - becomes fixed only after scrolling ── */}
      <nav
        className={`bg-[#333333] z-50 shadow-xl px-4 sm:px-6 lg:px-8 transition-shadow duration-300 ${
          isScrolled ? 'fixed top-0 left-0 right-0 w-full' : 'relative'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:bg-[#a81d1d] px-4 h-full flex items-center text-xs lg:text-sm font-bold tracking-wider transition-all uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            {adminLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[#ffd700] hover:bg-[#a81d1d] px-4 h-full flex items-center text-xs lg:text-sm font-bold tracking-wider transition-all"
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <Link
                to="/admin/login"
                className="bg-[#a81d1d] text-white px-6 h-full flex items-center text-xs lg:text-sm font-bold tracking-wider hover:bg-red-700 transition-all ml-4"
              >
                LOGIN
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white hover:bg-red-800 px-4 h-full flex items-center text-xs lg:text-sm font-bold tracking-wider transition-all ml-4 group"
              >
                <LogOut className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                LOGOUT
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center w-full justify-between py-2">
            <span className="text-white font-bold text-sm tracking-widest">MENU</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 focus:outline-none p-1 bg-white/10 rounded"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden bg-[#333333] border-t border-white/10 overflow-hidden pb-4">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-6 py-3 text-white hover:bg-[#a81d1d] border-b border-white/5 text-sm font-bold tracking-widest transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {adminLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-6 py-3 text-[#ffd700] hover:bg-[#a81d1d] border-b border-white/5 text-sm font-bold tracking-widest transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {!user ? (
                <Link
                  to="/admin/login"
                  className="px-6 py-4 bg-[#a81d1d] text-white text-sm font-bold tracking-widest text-center"
                  onClick={() => setIsOpen(false)}
                >
                  LOGIN
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-6 py-4 text-white hover:bg-red-800 text-sm font-bold tracking-widest flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

    </header>
  );
};

export default Navbar;

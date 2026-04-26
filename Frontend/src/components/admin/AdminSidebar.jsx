import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  Users,
  Mail,
  Settings,
  Menu,
  X,
  ChevronRight,
  School,
  Image
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import logo from '../../assets/logo.png';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const { schoolSettings } = useSchool();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Announcements', path: '/admin/announcements', icon: Bell },
    { name: 'Admissions', path: '/admin/admissions', icon: Users },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Mail },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'School Settings', path: '/admin/school-settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen bg-[#1a1a1a] text-white w-64 z-50 transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-white/10 shadow-2xl
      `}>
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute right-4 top-6 p-2 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo Section - Now a Link to Home */}
        <Link 
          to="/" 
          className="h-24 flex items-center px-4 border-b border-white/10 bg-[#a81d1d] hover:bg-black transition-all group overflow-hidden"
          title="Back to Home"
        >
          <img 
            src={schoolSettings.logoUrl ? schoolSettings.logoUrl : logo} 
            alt={`${schoolSettings.shortName} Logo`} 
            className="w-12 h-12 mr-3 object-cover rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform shadow-lg shrink-0 bg-white"
          />
          <div className="min-w-0">
            <h2 className="text-[13px] font-black tracking-tighter uppercase leading-tight text-white whitespace-pre-line truncate">
              {schoolSettings.schoolName}
            </h2>
            <p className="text-[9px] font-bold text-red-200 tracking-[0.3em] uppercase opacity-80">
              Admin Gateway
            </p>
          </div>
        </Link>

        {/* User Profile Summary */}
        {/* <div className="p-6 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#a81d1d] flex items-center justify-center font-black text-lg shadow-lg">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">{user?.role}</p>
            </div>
          </div>
        </div> */}

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-200px)]">
          <p className="px-4 text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Main Menu</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin/dashboard'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive
                  ? 'bg-[#a81d1d] text-white shadow-lg shadow-red-900/40'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-[15px] font-bold tracking-wide">{item.name}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-0' : 'group-hover:translate-x-1'}`} />
            </NavLink>
          ))}
        </nav>

        {/* Footer info maybe? */}
        <div className="absolute bottom-0 w-full p-6 text-center border-t border-white/10 bg-[#111]">
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">© 2026 Internal System</p>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

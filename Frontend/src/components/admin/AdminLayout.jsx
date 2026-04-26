import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, X, Bell, Search, User, LayoutDashboard } from 'lucide-react';
import ScrollToTop from '../ScrollToTop';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <ScrollToTop />
      
      {/* Sidebar Component */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Mobile Header (Hidden on Laptop) */}
      <div className="lg:hidden bg-[#1a1a1a] text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-white/10 shadow-lg">
        <div className="flex items-center gap-3">
          <Menu 
            className="w-6 h-6 cursor-pointer hover:text-[#a81d1d] transition-colors" 
            onClick={() => setIsSidebarOpen(true)}
          />
          <h1 className="text-sm font-black uppercase tracking-tighter">Admin Portal</h1>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-gray-400" />
          <User className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 lg:ml-64">
        {/* Desktop Header (Visible on Laptop) */}
        <header className="hidden lg:flex items-center justify-between h-20 bg-white border-b border-gray-100 px-8 sticky top-0 z-30 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-red-50 text-[#a81d1d] rounded-lg">
                 <LayoutDashboard className="w-5 h-5" />
              </div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                 System Overview <span className="mx-2">/</span> <span className="text-gray-900">Dashboard</span>
              </p>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input 
                    type="text" 
                    placeholder="Search records..." 
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-100 w-64 transition-all"
                 />
              </div>
              <div className="h-6 w-[1px] bg-gray-100"></div>
              <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-gray-900 uppercase">Administrator</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-emerald-500">Online</p>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-[#a81d1d] flex items-center justify-center text-white font-black shadow-lg shadow-red-900/20">
                    A
                 </div>
              </div>
           </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

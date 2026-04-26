import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Bell, FileText, Settings, ShieldCheck, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from '../utils/api';
import { getStoredToken } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    admissions: 0,
    enquiries: 0,
    announcements: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = getStoredToken();
        const { data } = await axios.get(getApiUrl('/api/dashboard'), {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (data.success) {
          setStatsData(data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { 
      label: 'Total Admissions', 
      value: statsData.admissions, 
      icon: FileText, 
      color: 'bg-blue-500', 
      trend: 'Total Registered',
      path: '/admin/admissions'
    },
    { 
      label: 'Pending Enquiries', 
      value: statsData.enquiries, 
      icon: Users, 
      color: 'bg-amber-500', 
      trend: 'New Submissions',
      path: '/admin/enquiries'
    },
    { 
      label: 'Active Announcements', 
      value: statsData.announcements, 
      icon: Bell, 
      color: 'bg-emerald-500', 
      trend: 'On Notice Board',
      path: '/admin/announcements'
    },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-10 min-h-screen animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-red-50 text-[#a81d1d] rounded-2xl border border-red-100 shadow-sm">
                <LayoutDashboard className="w-6 h-6" />
             </div>
             <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
               Dashboard
             </h1>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] ml-1">
            Welcome back, <span className="text-[#a81d1d] underline decoration-red-200 decoration-2 underline-offset-4">{user?.name}</span>. School operations are normal.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 self-start md:self-auto">
          <div className="flex -space-x-2">
             {[1,2,3].map(i => (
               <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400`}>
                 {String.fromCharCode(64+i)}
               </div>
             ))}
          </div>
          <div className="h-8 w-[1px] bg-gray-100"></div>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            System Secure
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label} 
            onClick={() => navigate(stat.path)}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-50 hover:shadow-red-900/5 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                {loading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-gray-200" />
                ) : (
                  <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{stat.value}</h3>
                )}
              </div>
              <div className={`${stat.color} p-4 rounded-2xl text-white shadow-2xl shadow-current/20 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest">
                <span>{stat.trend}</span>
              </div>
              <button className="text-[9px] font-black text-gray-300 uppercase tracking-widest group-hover:text-[#a81d1d] transition-colors flex items-center gap-1">
                Manage Details <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Background Decoration */}
            <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform duration-1000 ${stat.color}`}></div>
          </motion.div>
        ))}
      </div>

      {/* Primary Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-black/5 border border-gray-50 flex flex-col items-center text-center space-y-6 group"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-[2rem] flex items-center justify-center border border-blue-100 shadow-inner group-hover:rotate-3 transition-transform">
             <FileText className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Manage Admissions</h4>
            <p className="text-gray-500 text-xs font-medium max-w-xs mx-auto leading-relaxed">
              Process new student registrations, review parent applications, and manage school enrollment status.
            </p>
          </div>
          <button 
            onClick={() => navigate('/admin/admissions')}
            className="bg-[#a81d1d] hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] px-8 py-4 rounded-2xl shadow-2xl shadow-red-900/20 transition-all active:scale-95 flex items-center gap-3"
          >
            Open Registry
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-[#1a1a1a] p-10 rounded-[3rem] shadow-2xl shadow-red-900/10 border border-white/5 flex flex-col items-center text-center space-y-6 group"
        >
          <div className="w-20 h-20 bg-white/5 text-red-500 rounded-[2rem] flex items-center justify-center border border-white/10 shadow-inner group-hover:-rotate-3 transition-transform">
             <Bell className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-black text-white uppercase tracking-tighter">Bulletin Board</h4>
            <p className="text-gray-400 text-xs font-medium max-w-xs mx-auto leading-relaxed">
              Update the official school news, post holiday circulars, and broadcast emergency alerts to all users.
            </p>
          </div>
          <button 
            onClick={() => navigate('/admin/announcements')}
            className="bg-white hover:bg-red-500 hover:text-white text-[#a81d1d] font-black text-[10px] uppercase tracking-[0.2em] px-8 py-4 rounded-2xl shadow-2xl transition-all active:scale-95 flex items-center gap-3"
          >
            Post Update
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Footer System Status */}
      <div className="pt-10 flex items-center justify-center">
         <div className="bg-gray-100/50 backdrop-blur-sm px-6 py-2 rounded-full border border-gray-100 flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">All school systems are currently operational</p>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

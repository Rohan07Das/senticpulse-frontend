'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User, LogOut, ShieldCheck } from 'lucide-react';

export default function AccountHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<{ email: string; name: string; tier: string; role: string } | null>(null);

  // --- DYNAMIC BACKEND URL ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchUser = async () => {
      const savedEmail = localStorage.getItem('userEmail');
      if (!savedEmail) return;

      try {
        const res = await fetch(`${API_URL}/api/auth/user-profile/${savedEmail}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          // Sync local name and role
          localStorage.setItem('userName', data.name);
          localStorage.setItem('userRole', data.role);
        }
      } catch (err) {
        console.error("Neural Identity Link Interrupted");
        const localName = localStorage.getItem('userName');
        const localRole = localStorage.getItem('userRole');
        if (localName) {
          setUserData({ email: savedEmail, name: localName, tier: "Active", role: localRole || 'user' });
        }
      }
    };

    fetchUser();
    
    window.addEventListener('storage', fetchUser);
    return () => window.removeEventListener('storage', fetchUser);
  }, [pathname, API_URL]);

  // Added /admin-stats to the visibility check
  const isAppPage = pathname.startsWith('/dashboard') || 
                    pathname.startsWith('/sentiment') || 
                    pathname.startsWith('/shippers') || 
                    pathname.startsWith('/settings') ||
                    pathname.startsWith('/checkout') ||
                    pathname.startsWith('/product') ||
                    pathname.startsWith('/admin-stats');

  if (!isAppPage) return null;

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole'); // CRITICAL: Clear role on sign out
    setUserData(null);
    router.push('/'); 
  };

  return (
    <div className="fixed top-6 right-8 z-[100] flex items-center gap-4">
      {/* TIER & ROLE INDICATOR */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm">
        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${userData?.role === 'admin' ? 'bg-amber-500' : 'bg-teal-500 dark:bg-[#b3ffe2]'}`} />
        <span className="text-[9px] font-black text-slate-500 dark:text-[#b3ffe2] uppercase tracking-widest">
          Neural Link: {userData?.role === 'admin' ? 'ADMIN CORE' : (userData?.tier || 'Verified')}
        </span>
      </div>

      <div className="group relative">
        <button className={`h-10 w-10 rounded-full flex items-center justify-center text-white dark:text-black border-2 border-white dark:border-black shadow-lg hover:scale-110 transition-all ${userData?.role === 'admin' ? 'bg-amber-600 dark:bg-amber-400' : 'bg-slate-900 dark:bg-[#b3ffe2]'}`}>
          {userData?.role === 'admin' ? <ShieldCheck size={20} /> : <User size={20} />}
        </button>

        <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
          
          <div className="px-4 py-2 border-b border-slate-100 dark:border-white/5 mb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Neural ID {userData?.role === 'admin' && <span className="text-amber-500 ml-1">(Admin)</span>}
            </p>
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate capitalize">
              {userData?.name || 'Syncing...'}
            </p>
          </div>
          
          {/* Admin shortcut if logged in as admin */}
          {userData?.role === 'admin' && (
            <button 
              onClick={() => router.push('/admin-stats')}
              className="w-full text-left px-4 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
            >
              Command Center
            </button>
          )}

          <button 
            onClick={() => router.push('/settings')}
            className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-teal-600 dark:hover:text-[#b3ffe2] transition-colors"
          >
            Manage Profile
          </button>

          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center justify-between"
          >
            Sign Out <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
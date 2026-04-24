'use client';

import React, { useMemo, useEffect, useState } from 'react';
import GooeyNav from './GooeyNav';
import { 
  Home, LayoutDashboard, BarChart2, ShieldCheck, Settings, 
  CreditCard, Briefcase, FileText, Activity 
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function GlobalNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setUserRole(localStorage.getItem('userRole'));
  }, []);

  const allItems = {
    home: { icon: <Home size={20} />, label: "Home", href: "/" },
    pricing: { icon: <CreditCard size={20} />, label: "Pricing", href: "/pricing" },
    careers: { icon: <Briefcase size={20} />, label: "Careers", href: "/careers" },
    blogs: { icon: <FileText size={20} />, label: "Blogs", href: "/blogs" },
    dashboard: { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
    sentiment: { icon: <BarChart2 size={20} />, label: "Sentiment", href: "/sentiment" },
    shippers: { icon: <ShieldCheck size={20} />, label: "Shippers", href: "/shippers" },
    settings: { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  };

  const isAppPage = pathname.startsWith('/dashboard') || 
                    pathname.startsWith('/sentiment') || 
                    pathname.startsWith('/shippers') || 
                    pathname.startsWith('/settings') ||
                    pathname.startsWith('/checkout') ||
                    pathname.startsWith('/product') ||
                    pathname.startsWith('/admin-stats');

  const navItems = isAppPage 
    ? [allItems.dashboard, allItems.sentiment, allItems.shippers, allItems.settings]
    : [allItems.home, allItems.pricing, allItems.careers, allItems.blogs];

  const activeIndex = useMemo(() => {
    const index = navItems.findIndex(item => {
      if (item.href === '/') return pathname === '/';
      return pathname.startsWith(item.href);
    });
    return index !== -1 ? index : 0;
  }, [pathname, navItems]);

  if (pathname === '/login' || pathname === '/register') return null;

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center items-center pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* MAIN NAV */}
        <div className="bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md rounded-full shadow-xl border border-gray-200 dark:border-white/10 px-2 py-1 flex items-center">
          <GooeyNav items={navItems} activeIndex={activeIndex} />
        </div>

        {/* ADMIN BUTTON - Separate & Opaque */}
        {mounted && isAppPage && userRole === 'admin' && (
          <button
            onClick={() => router.push('/admin-stats')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 shadow-xl
              ${pathname === '/admin-stats' 
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-[#b3ffe2] dark:text-black dark:border-[#b3ffe2]' 
                : 'bg-white text-slate-500 border-gray-200 dark:bg-[#121212] dark:border-white/10 hover:text-teal-600 dark:text-slate-400 dark:hover:text-[#b3ffe2]'
              }`}
          >
            <Activity size={18} className={pathname === '/admin-stats' ? 'animate-pulse' : ''} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Admin Center</span>
          </button>
        )}
      </div>
    </div>
  );
}
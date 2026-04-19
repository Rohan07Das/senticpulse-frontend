'use client';

import React, { useMemo } from 'react';
import GooeyNav from './GooeyNav';
import { 
  Home, LayoutDashboard, BarChart2, ShieldCheck, Settings, 
  CreditCard, Briefcase, FileText 
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function GlobalNav() {
  const pathname = usePathname();

  // 1. Items Definition (Unchanged)
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

  // 2. UPDATED LOGIC: Include '/product' as an App Page
  const isAppPage = pathname.startsWith('/dashboard') || 
                    pathname.startsWith('/sentiment') || 
                    pathname.startsWith('/shippers') || 
                    pathname.startsWith('/settings') ||
                    pathname.startsWith('/checkout') ||
                    pathname.startsWith('/product'); // 👈 KEEPS APP NAV ON PRODUCT PREVIEW

  // 3. Swap Arrays based on Login State
  const navItems = isAppPage 
    ? [allItems.dashboard, allItems.sentiment, allItems.shippers, allItems.settings]
    : [allItems.home, allItems.pricing, allItems.careers, allItems.blogs];

  // 4. JITTER FIX: Memoized Active Index to prevent dynamic recalculation flickering
  const activeIndex = useMemo(() => {
    const index = navItems.findIndex(item => {
      if (item.href === '/') return pathname === '/';
      return pathname.startsWith(item.href);
    });

    if (index !== -1) return index;
    
    // Logic: If on a product page, highlight 'Dashboard' as the active parent
    if (pathname.startsWith('/product')) return 0;
    
    return 0; // Default fallback
  }, [pathname, navItems]);

  if (pathname === '/login' || pathname === '/register') return null;

  return (
    <div 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] 
                 bg-white/70 dark:bg-[#121212]/70 backdrop-blur-md 
                 rounded-full shadow-xl border border-gray-200/50 dark:border-white/10 
                 px-2 py-1 transition-all duration-500"
    >
      <GooeyNav 
        items={navItems} 
        activeIndex={activeIndex} 
      />
    </div>
  );
}
// components/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import GlobalNav from './GlobalNav';
import ThemeToggle from './ThemeToggle';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // 1. Check if we are on the Home ('/') or Registration ('/register') pages
  const isAuthOrLandingPage = pathname === '/' || pathname === '/register';

  return (
    <>
      {/* 2. ONLY show this Dashboard Header if we are NOT on Home or Register */}
      {!isAuthOrLandingPage && (
        <div className="fixed top-0 left-0 w-full h-24 z-[100] bg-white/70 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-gray-200/50 dark:border-white/5 flex items-center justify-between px-8 transition-all">
          
          {/* LOGO - Now a minimal, single-color Custom SVG */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 transition-transform hover:scale-105">
             <div className="relative flex items-center justify-center h-10 w-10 bg-[#b3ffe2]/10 border border-[#b3ffe2]/20 rounded-xl shadow-[0_0_15px_rgba(179,255,226,0.1)]">
                
                {/* Custom "S-Pulse" Vector */}
                <svg viewBox="0 0 24 24" fill="none" stroke="#b3ffe2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  {/* The jagged data pulse */}
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  {/* Top S-Curve */}
                  <path d="M9 3c3-3 9-3 9 0" opacity="0.4" />
                  {/* Bottom S-Curve */}
                  <path d="M15 21c-3 3-9 3-9 0" opacity="0.4" />
                </svg>

             </div>
             <div className="flex flex-col leading-none">
                <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">SenticPulse AI</h1>
                {/* Changed the subtitle color to match the Cyan theme */}
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#b3ffe2] dark:text-[#b3ffe2] opacity-90 mt-1">
                  SME Intelligence
                </span>
             </div>
          </Link>

          {/* CENTER NAVIGATION - The Gooey Nav */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
             <GlobalNav /> 
          </div>

          {/* RIGHT SIDE CONTROLS - Status Pill & Theme Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full shadow-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#b3ffe2] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">Live Pulse</span>
              </div>
              <div className="h-3 w-[1px] bg-gray-200 dark:bg-white/10" />
              <span className="text-[10px] font-black tracking-widest text-gray-900 dark:text-white uppercase">
                1,248 <span className="text-gray-400 font-medium">Visits</span>
              </span>
            </div>

            <ThemeToggle />
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT WRAPPER */}
      <main className={isAuthOrLandingPage ? "min-h-screen" : "min-h-screen pt-40 pb-16"}>
        {children}
      </main>
    </>
  );
}
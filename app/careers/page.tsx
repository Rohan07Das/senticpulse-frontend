'use client';

import React, { memo, useMemo } from 'react';
import { Briefcase, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// 1. Memoized Job Card - Aligned with Home Page Card Weights
const JobCard = memo(({ job }: any) => (
  <div className="group p-8 rounded-[2.5rem] bg-white/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/5 items-center justify-between flex cursor-pointer active:scale-[0.98]">
    <div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-[#b3ffe2] transition-colors tracking-tight">
        {job.title}
      </h3>
      <div className="flex gap-4 mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em]">
        <span className="flex items-center gap-1.5">
          <Briefcase size={12} className="text-teal-600 dark:text-[#b3ffe2]" /> {job.team}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={12} className="text-teal-600 dark:text-[#b3ffe2]" /> {job.type}
        </span>
      </div>
    </div>
    <div className="h-10 w-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 group-hover:scale-110 transition-transform shadow-lg">
        <ArrowRight className="h-4 w-4" />
    </div>
  </div>
));
JobCard.displayName = "JobCard";

export default function CareersPage() {
  const jobs = useMemo(() => [
    { title: "Lead ML Architect", team: "Neural Core", type: "Remote" },
    { title: "Senior Backend Engineer", team: "Infrastructure", type: "London / Remote" },
    { title: "Product Designer", team: "Experience", type: "Remote" }
  ], []);

  return (
    <div className="relative min-h-screen w-full bg-transparent font-sans transition-colors duration-500 pt-0">
      
      {/* --- BACKGROUND ADAPTER (Grid for Light Mode) --- */}
      <div className="fixed inset-0 z-0 bg-transparent pointer-events-none transition-colors duration-500">
        <div className="block dark:hidden absolute inset-0 opacity-100 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        <section className="relative z-10 pt-4 pb-20 px-6 max-w-[1200px] mx-auto flex flex-col items-center">
          
          {/* --- HEADER --- */}
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="mx-auto flex items-center gap-3 w-fit px-4 py-1.5 bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-full shadow-sm">
              <div className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 dark:bg-[#b3ffe2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600 dark:bg-[#b3ffe2]"></span>
              </div>
              <span className="text-[10px] font-semibold tracking-[0.15em] text-teal-700 dark:text-[#b3ffe2] uppercase">
                Talent Acquisition
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-slate-900 dark:text-slate-100">
              Expand the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-slate-600 dark:from-[#b3ffe2] dark:via-teal-100 dark:to-slate-400">
                Neural Network.
              </span>
            </h1>

            <p className="text-md md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
               Join a collective of <span className="text-slate-900 dark:text-slate-200 font-medium italic">innovators</span> building the world's most advanced sentiment-driven <span className="text-slate-900 dark:text-[#b3ffe2] font-medium italic">risk engine</span>.
            </p>
          </div>

          {/* --- STEALTH MODE CONTENT --- */}
          <div className="w-full max-w-4xl space-y-4">
            <div className="flex items-center justify-between px-4 mb-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                Future Nodes
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="w-1 h-1 rounded-full bg-slate-400 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase text-slate-500 tracking-wider text-center">Stealth Mode Active</span>
              </div>
            </div>
            
            <div className="space-y-4 opacity-60 pointer-events-none grayscale select-none">
              {jobs.map((job, i) => (
                <JobCard key={i} job={job} />
              ))}
            </div>
          </div>

          {/* --- TALENT POOL CTA --- */}
          <div className="mt-16 w-full max-w-4xl p-12 rounded-[3.5rem] bg-black border border-white/10 dark:border-[#b3ffe2]/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-teal-500/5 blur-[100px] pointer-events-none" />
              <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner relative z-10">
                  <Sparkles className="text-[#b3ffe2] w-7 h-7" />
              </div>
              <div className="space-y-3 relative z-10">
                  <h3 className="text-3xl font-semibold text-white tracking-tight">Register for the Talent Pool</h3>
                  <p className="text-sm font-light text-slate-400 max-w-md mx-auto leading-relaxed">
                      We aren't actively hiring today, but we are always looking for <span className="font-medium text-white">elite researchers</span> and <span className="font-medium text-[#b3ffe2]">AI architects</span> to join our roadmap.
                  </p>
              </div>
              <button className="relative z-10 px-12 py-4 rounded-2xl bg-[#b3ffe2] text-black font-semibold text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:scale-[1.03] transition-all duration-500 shadow-[0_0_20px_rgba(179,255,226,0.15)]">
                  Register Interest
              </button>
              <p className="relative z-10 text-[9px] text-slate-500 uppercase tracking-[0.4em] pt-4">
                  Official Talent Nodes opening Late 2026
              </p>
          </div>
        </section>

         {/* --- ADAPTABLE FOOTER SYSTEM --- */}
        <div className="w-full mt-6 relative">
          {/* NEURAL DIVIDER */}
          <div className="w-full max-w-[12200px] mx-auto h-[1px] bg-slate-200 dark:bg-[#b3ffe2] dark:opacity-20 relative z-10" />

          {/* FULL-WIDTH ADAPTABLE FOOTER WRAPPER */}
          <div className="relative w-full bg-white dark:bg-black transition-colors duration-500 mt-[-1px]">
            
            {/* THE NEURAL FADE: Blends the main grid into the solid footer bg */}
            <div className="absolute top-0 left-0 right-0 h-40 -translate-y-full bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />

            <footer className="w-full pb-12 px-6 relative overflow-hidden z-10">
              {/* DOTTED MASK OVERLAY */}
              <div 
                className="absolute top-0 bottom-0 right-0 w-1/2 pointer-events-none opacity-100 dark:opacity-30 z-0 text-slate-300 dark:text-[#b3ffe2]" 
                style={{ 
                  backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)', 
                  backgroundSize: '28px 28px', 
                  backgroundPosition: 'bottom right', 
                  WebkitMaskImage: 'linear-gradient(to top left, black 0%, transparent 80%)', 
                  maskImage: 'linear-gradient(to top left, black 0%, transparent 80%)' 
                }} 
              />

              <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 relative z-10 pt-16">
                <div className="flex-1 flex flex-col gap-12 text-center lg:text-left w-full pt-4">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">SenticPulse AI</h3>
                    <p className="text-slate-600 dark:text-slate-500 text-xs leading-relaxed">Next-generation SME Intelligence & Risk Mitigation.</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-8 text-left max-w-lg mx-auto lg:mx-0 w-full">
                    <div><h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-6 tracking-wide">Product</h4><ul className="space-y-4"><li><Link href="/" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Features</Link></li><li><Link href="/pricing" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Pricing</Link></li><li><Link href="/pricing" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">API</Link></li></ul></div>
        <div><h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-6 tracking-wide">Resources</h4><ul className="space-y-4"><li><Link href="#" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Documentation</Link></li><li><Link href="/blogs" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Blogs</Link></li><li><Link href="/blogs" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Case Studies</Link></li></ul></div>
        <div><h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-6 tracking-wide">Company</h4><ul className="space-y-4"><li><Link href="/" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">About</Link></li><li><Link href="/careers" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Careers</Link></li><li><Link href="/contact" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Contact</Link></li></ul></div>
                  </div>
                </div>

                <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-end justify-center relative pt-4">
                  <div className="relative p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-lg backdrop-blur-sm group hover:border-teal-300 dark:hover:border-[#b3ffe2]/20 transition-colors w-full max-w-sm overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-400 dark:bg-[#b3ffe2] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500"></div>
                    <h4 className="text-slate-900 dark:text-white text-xl font-semibold mb-2">Ready to scale?</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">Get a personalized demo and see how SenticPulse AI can protect your supply chain.</p>
                    <Link href="/contact" className="relative group/btn cursor-pointer block w-full">
                      <div className="relative bg-slate-900 dark:bg-black border border-slate-700 dark:border-[#b3ffe2]/30 px-6 py-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:bg-slate-800 dark:hover:bg-[#b3ffe2]/10 hover:border-teal-500 dark:hover:border-[#b3ffe2]/80 active:scale-95 shadow-md">
                        <span className="text-xs font-black text-white uppercase tracking-widest group-hover/btn:text-teal-400 dark:group-hover/btn:text-[#b3ffe2] transition-colors">Contact Enterprise Sales</span>
                        <div className="h-8 w-8 rounded-full bg-slate-800 dark:bg-[#b3ffe2]/10 flex items-center justify-center group-hover/btn:bg-slate-700 dark:group-hover/btn:bg-[#b3ffe2]/20 transition-colors">
                          <ArrowRight className="w-4 h-4 text-teal-400 dark:text-[#b3ffe2] group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="max-w-[1200px] mx-auto mt-20 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-widest font-bold border-t border-slate-200 dark:border-white/5 pt-8 relative z-10">
                <p>© 2026 SenticPulse AI. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <Link href="#" className="hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Privacy</Link>
                  <Link href="#" className="hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Terms</Link>
                  <Link href="#" className="hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">API Status</Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
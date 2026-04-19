'use client';

import React, { memo, useMemo } from 'react';
import { Truck, ShieldCheck, ChevronRight, Globe, Zap } from 'lucide-react';

// 1. Memoized Table Row to ensure the list doesn't "stutter" on hover or navigation
const ShipperRow = memo(({ shipper }: any) => (
  <div className="group flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer border-b border-slate-100 dark:border-white/5 last:border-0">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xs font-black text-slate-500 dark:text-slate-400 group-hover:text-black dark:group-hover:text-white transition-all shadow-sm">
        {shipper.icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-black dark:text-slate-200 group-hover:text-black dark:group-hover:text-white transition-colors">
          {shipper.name}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <Globe className="w-3 h-3 text-slate-400 dark:text-slate-600" />
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {shipper.onTime} On-Time
          </span>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between md:justify-end gap-12 mt-4 md:mt-0">
      <div className="text-left md:text-right">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 block mb-1">
          AI Trust Score
        </span>
        <div className="flex items-center gap-2">
          <div className={`text-lg font-black tracking-tighter ${shipper.color}`}>{shipper.score}%</div>
          <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-white dark:bg-white/5 ${shipper.color} border border-current shadow-sm`}>
            {shipper.status}
          </span>
        </div>
      </div>
      
      <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-[#b3ffe2] dark:hover:text-black dark:hover:border-transparent transition-all shadow-md active:scale-95">
        Details <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  </div>
));
ShipperRow.displayName = "ShipperRow";

export default function TrustPage() {
  // 2. Wrap data in useMemo to prevent re-mapping on every render
  const partners = useMemo(() => [
    { name: "BlueDart Express", onTime: "99.2%", score: 98, status: "Secure", color: "text-emerald-600 dark:text-[#34A853]", icon: "B" },
    { name: "Delhivery Prime", onTime: "94.5%", score: 85, status: "Stable", color: "text-teal-600 dark:text-[#b3ffe2]", icon: "D" },
    { name: "RapidLogistics", onTime: "88.1%", score: 62, status: "At Risk", color: "text-red-600 dark:text-red-500", icon: "R" },
  ], []);

  return (
    /* FIXED: Removed BackgroundBeams and local bg-black/white. Inherits from layout.tsx now. */
    <div className="relative min-h-screen w-full bg-transparent overflow-clip font-sans transition-colors duration-500">
      
      <div className="pt-2 pb-16 px-6 max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 relative z-10">
        
        {/* --- HEADER --- */}
        <header className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-[#b3ffe2]/10 rounded-lg border border-slate-200 dark:border-[#b3ffe2]/20 shadow-sm">
              <Truck className="w-5 h-5 text-teal-600 dark:text-[#b3ffe2]" />
            </div>
            <h2 className="text-3xl font-extralight tracking-tight text-slate-400 dark:text-slate-500 transition-colors">
              Shipper Trust <span className="font-semibold text-slate-900 dark:text-white">Intelligence</span>
            </h2>
          </div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-11">
            Real-time reliability scoring powered by neural fulfillment models
          </p>
        </header>

        {/* --- NETWORK AVERAGE HERO --- */}
        <div className="w-fit bg-white/80 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-[#b3ffe2]/10 p-6 rounded-[2rem] shadow-xl dark:shadow-2xl flex items-center gap-6 transition-all">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-[#34A853]/10 border border-emerald-100 dark:border-[#34A853]/20 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-[#34A853]" />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Network Average</span>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">
              91.4% <span className="text-emerald-600 dark:text-[#34A853] text-sm ml-1 font-black uppercase tracking-widest">Trust</span>
            </h3>
          </div>
          <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10 mx-2" />
          <div className="pr-4">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Status</span>
            <p className="text-[10px] font-bold text-teal-600 dark:text-[#b3ffe2] uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
              <Zap className="w-3 h-3 fill-current animate-pulse" /> Optimal
            </p>
          </div>
        </div>

        {/* --- ACTIVE PARTNERS TABLE --- */}
        <div className="bg-white/90 dark:bg-[#b3ffe2]/5 backdrop-blur-2xl border border-slate-200 dark:border-[#b3ffe2]/10 rounded-[3rem] overflow-hidden shadow-xl dark:shadow-none transition-all">
          <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black dark:text-white">
              Active Partners
            </h3>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {partners.map((shipper, i) => (
              <ShipperRow key={i} shipper={shipper} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
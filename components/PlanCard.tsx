'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon, Check, ArrowRight, Sparkles } from 'lucide-react';

export interface PlanFeature {
  name: string;
  active: boolean;
}

interface PlanCardProps {
  name: string;
  icon: LucideIcon;
  price: number | string;
  billingPeriod: 'monthly' | 'annually';
  description: string;
  features: PlanFeature[];
  ctaText: string;
  ctaLink: string;
  theme?: 'light' | 'pro' | 'nexus';
  popular?: boolean;
}

export default function PlanCard({
  name,
  icon: Icon,
  price,
  billingPeriod,
  description,
  features,
  ctaText,
  ctaLink,
  theme = 'light',
  popular = false
}: PlanCardProps) {
  const isPro = theme === 'pro';

  return (
    <div 
        className={`relative p-8 rounded-[2.5rem] flex flex-col h-full border backdrop-blur-3xl transition-all duration-700 hover:-translate-y-2
        ${isPro 
            ? 'bg-slate-900/90 dark:bg-slate-900/40 border-slate-200 dark:border-[#b3ffe2]/30 shadow-2xl' 
            : 'bg-white/70 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 shadow-sm'
        }
        `}
    >
        
        {/* --- HEADER --- */}
        <div className="flex items-center gap-5 mb-8 relative z-10">
            <div className={`shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center border shadow-sm transition-colors
                ${isPro ? 'bg-[#b3ffe2]/10 border-[#b3ffe2]/30' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10'}
            `}>
                <Icon className={`w-7 h-7 ${isPro ? 'text-[#b3ffe2]' : 'text-teal-600 dark:text-[#b3ffe2]'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-semibold tracking-tight uppercase ${isPro ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                {name}
              </h3>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mt-1 ${isPro ? 'text-[#b3ffe2]/80' : 'text-teal-600 dark:text-[#b3ffe2]'}`}>
                {description}
              </p>
            </div>
        </div>

        {/* --- PRICE --- */}
        <div className="mb-8 relative z-10">
            <div className="flex items-baseline gap-1">
                <span className={`text-6xl font-semibold tracking-tight ${isPro ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                    {typeof price === 'number' ? `$${price}` : price}
                </span>
                {typeof price === 'number' && (
                    <span className={`text-xs font-light uppercase tracking-widest ${isPro ? 'text-slate-400' : 'text-slate-500'}`}>
                        /{billingPeriod === 'annually' ? 'yr' : 'mo'}
                    </span>
                )}
            </div>
        </div>

        {/* --- FEATURES --- */}
        <div className="flex-1 space-y-4 mb-10 relative z-10">
            {features.map((feature, idx) => (
                <div key={idx} className={`flex items-center gap-3 transition-opacity ${feature.active ? 'opacity-100' : 'opacity-25'}`}>
                    <div className={`shrink-0 h-5 w-5 rounded-full flex items-center justify-center border
                        ${isPro ? 'bg-[#b3ffe2]/10 border-[#b3ffe2]/20' : 'bg-teal-50 dark:bg-white/5 border-teal-100 dark:border-white/10'}
                    `}>
                        <Check className={`w-3 h-3 ${isPro ? 'text-[#b3ffe2]' : 'text-teal-600 dark:text-[#b3ffe2]'}`} />
                    </div>
                    <span className={`text-sm font-light ${isPro ? 'text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                        {feature.name}
                    </span>
                </div>
            ))}
        </div>

        {/* --- CTA BUTTON --- */}
        <Link 
            href={ctaLink}
            className={`w-full group flex items-center justify-between px-7 py-4 rounded-2xl font-semibold text-[10px] uppercase tracking-[0.2em] transition-all duration-500
            ${isPro 
                ? 'bg-[#b3ffe2] text-slate-900 hover:bg-white shadow-[0_0_20px_rgba(179,255,226,0.2)]' 
                : 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:scale-[1.02]'
            }
            `}
        >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        
        {/* --- OPTIMIZED BADGE --- */}
        {popular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 dark:bg-white shadow-xl border border-white/10 dark:border-black/10">
                 <Sparkles className="w-3 h-3 text-[#b3ffe2] dark:text-teal-600" />
                 <span className="text-[9px] font-bold text-white dark:text-slate-900 uppercase tracking-widest">Neural Sync</span>
            </div>
        )}
    </div>
  );
}
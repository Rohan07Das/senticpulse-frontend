'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, Building2, BrainCircuit, Star, BarChart3, 
  Target, ShieldCheck, Check, Sparkles, ArrowRight 
} from 'lucide-react';
import PlanCard from '@/components/PlanCard';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('annually');

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-transparent font-sans overflow-x-clip transition-colors duration-500 pt-2">
      
      {/* --- BACKGROUND ADAPTER (Dotted Grid for Light Mode) --- */}
      <div className="fixed inset-0 z-0 bg-transparent pointer-events-none transition-colors duration-500">
        <div className="block dark:hidden absolute inset-0 opacity-100 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex flex-col items-center">
          {/* --- HEADER --- */}
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="mx-auto flex items-center gap-3 w-fit px-4 py-1.5 bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-full shadow-sm">
              <div className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 dark:bg-[#b3ffe2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600 dark:bg-[#b3ffe2]"></span>
              </div>
              <span className="text-[10px] font-semibold tracking-[0.15em] text-teal-700 dark:text-[#b3ffe2] uppercase">
                Pricing Modules
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-slate-900 dark:text-slate-100">
              Neural Access <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-slate-600 dark:from-[#b3ffe2] dark:via-teal-100 dark:to-slate-400">
                Plans.
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Activate <span className="text-slate-900 dark:text-slate-200 font-medium italic">real-time</span> sentiment synchronization. Choose the access level that matches your <span className="text-slate-900 dark:text-[#b3ffe2] font-medium italic">supply chain scale</span>.
            </p>
          </div>

          {/* --- BILLING TOGGLE --- */}
          <div className="pricing-toggle-container relative mb-20 p-1.5 bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-full flex items-center shadow-sm w-[380px] mx-auto">
              <button 
                  onClick={() => setBillingPeriod('monthly')}
                  className={`relative z-20 flex-1 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${billingPeriod === 'monthly' ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}
              >
                  Monthly
              </button>
              <button 
                  onClick={() => setBillingPeriod('annually')}
                  className={`relative z-20 flex-1 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${billingPeriod === 'annually' ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}
              >
                  Annually <span className={`ml-1 text-[8px] opacity-80 ${billingPeriod === 'annually' ? 'text-white/80 dark:text-slate-900/70' : 'text-teal-600 dark:text-[#b3ffe2]'}`}>(Save 20%)</span>
              </button>
              
              <div 
                  className={`absolute top-1.5 left-1.5 bottom-1.5 w-[calc(50%-3px)] bg-slate-900 dark:bg-[#b3ffe2] rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 ${
                      billingPeriod === 'annually' ? 'translate-x-[calc(100%-3px)]' : 'translate-x-0'
                  }`} 
              />
          </div>

          {/* --- PRICING MATRIX --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch">
              <PlanCard 
                  name="Pulse Starter"
                  icon={Zap}
                  price={billingPeriod === 'annually' ? 79 : 99}
                  billingPeriod={billingPeriod}
                  description="Dedicated Trace Path"
                  features={[
                      { name: '1 Dedicated Trace Path', active: true },
                      { name: '500 Neural Checkpoints/Day', active: true },
                      { name: 'Live Sentiment Heatmaps', active: true },
                      { name: 'Basic Bot Detection', active: true },
                      { name: 'Shipper Scoring API', active: false },
                      { name: 'Disruption Prediction', active: false },
                      { name: 'Neural Sync Architecture', active: false },
                  ]}
                  ctaText="Activate Pulse"
                  ctaLink="/register"
                  theme="light"
              />

              <PlanCard 
                  name="Sentic Pro"
                  icon={BrainCircuit}
                  price={billingPeriod === 'annually' ? 249 : 299}
                  billingPeriod={billingPeriod}
                  description="Advanced logistics intelligence"
                  features={[
                      { name: '25 Dedicated Trace Paths', active: true },
                      { name: '10,000 Neural Checkpoints/Day', active: true },
                      { name: 'Live Sentiment Heatmaps', active: true },
                      { name: 'Advanced Bot-Farm Defenses', active: true },
                      { name: 'Neural Sync Architecture', active: true },
                      { name: 'Full Shipper Scoring API', active: true },
                      { name: 'Disruption Prediction', active: false },
                  ]}
                  ctaText="Access Pro Neural Net"
                  ctaLink="/register"
                  theme="pro"
                  popular={true}
              />

              <PlanCard 
                  name="SME Nexus"
                  icon={Building2}
                  price="Enterprise"
                  billingPeriod={billingPeriod}
                  description="Comprehensive scaled monitoring"
                  features={[
                      { name: 'Unlimited Trace Paths', active: true },
                      { name: 'Max Neural Checkpoints/Day', active: true },
                      { name: 'Live Sentiment Heatmaps', active: true },
                      { name: 'Bot-Farm Disruption Immunity', active: true },
                      { name: 'Neural Sync Architecture', active: true },
                      { name: 'Priority API Access', active: true },
                      { name: 'AI Disruption Prediction', active: true },
                  ]}
                  ctaText="Nexus Sales"
                  ctaLink="/contact"
                  theme="nexus"
              />
          </div>
        </div>

        {/* --- ADAPTABLE FOOTER SYSTEM --- */}
        <div className="w-full mt-32 relative">
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

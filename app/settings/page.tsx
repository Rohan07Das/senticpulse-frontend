'use client';

import React from 'react';
import { 
  Settings as SettingsIcon, Database, Bell, ShieldAlert, Cpu, 
  CheckCircle2, CreditCard, BookOpen, Terminal, MessageSquare, 
  Shield, FileText, ArrowUpRight 
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-transparent transition-colors duration-500">
      
      {/* Container positioned higher (pt-24) to sit perfectly under the floating nav */}
      <div className="pt-2 pb-16 px-6 max-w-[1000px] mx-auto space-y-8 animate-in fade-in duration-1000">
        
        {/* --- HEADER --- */}
        <header className="space-y-1">
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-5 h-5 text-teal-600 dark:text-[#b3ffe2] animate-[spin_4s_linear_infinite]" />
            <h2 className="text-3xl font-extralight tracking-tight text-slate-400 dark:text-slate-500">
              Platform <span className="font-semibold text-slate-900 dark:text-white transition-colors">Settings</span>
            </h2>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-8">
            Configure model endpoints and neural threshold parameters
          </p>
        </header>

        <div className="space-y-6">
          
          {/* --- CUSTOM MODEL ENDPOINTS --- */}
          <section className="bg-slate-50 dark:bg-[#b3ffe2]/5 backdrop-blur-2xl border border-slate-200 dark:border-[#b3ffe2]/10 p-8 rounded-[2.5rem] shadow-sm dark:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-8">
              <Database className="w-4 h-4 text-teal-600 dark:text-[#b3ffe2]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Custom Model Endpoints</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Sentiment Analysis API</label>
                <input 
                  type="text" 
                  defaultValue="http://127.0.0.1:5000/api/predict-sentiment"
                  className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 px-6 text-xs text-slate-700 dark:text-slate-300 font-mono focus:border-teal-500/40 dark:focus:border-[#b3ffe2]/40 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Shipper Reliability API</label>
                <input 
                  type="text" 
                  defaultValue="http://127.0.0.1:5000/api/shipper-score"
                  className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 px-6 text-xs text-slate-700 dark:text-slate-300 font-mono focus:border-teal-500/40 dark:focus:border-[#b3ffe2]/40 focus:outline-none transition-all"
                />
              </div>

              <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-[#b3ffe2] bg-white dark:bg-white/5 hover:bg-slate-900 dark:hover:bg-[#b3ffe2] hover:text-white dark:hover:text-black hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_25px_rgba(179,255,226,0.3)] transition-all active:scale-95">
                <Cpu className="w-3.5 h-3.5" /> Test Neural Connections
              </button>
            </div>
          </section>

          {/* --- NEURAL MONITORING --- */}
          <section className="bg-slate-50 dark:bg-[#b3ffe2]/5 backdrop-blur-2xl border border-slate-200 dark:border-[#b3ffe2]/10 p-8 rounded-[2.5rem] shadow-sm dark:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-8">
              <Bell className="w-4 h-4 text-[#EA4335]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Neural Monitoring</h3>
            </div>

            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-[2rem] flex items-center justify-between group hover:border-red-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-500/10 rounded-xl mt-1">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">Fake News Threshold Warning</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    Alert session immediately if trending social sentiment matches known <br/> misinformation patterns or bot-farm signatures.
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-300 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500 dark:peer-checked:bg-[#b3ffe2]"></div>
              </label>
            </div>
          </section>

          {/* --- SUBSCRIPTION & BILLING --- */}
          <section className="bg-slate-50 dark:bg-[#b3ffe2]/5 backdrop-blur-2xl border border-slate-200 dark:border-[#b3ffe2]/10 p-8 rounded-[2.5rem] shadow-sm dark:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="w-4 h-4 text-teal-600 dark:text-[#b3ffe2]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Subscription & Billing</h3>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-200">Enterprise Tier</h4>
                  <span className="px-2 py-0.5 rounded bg-teal-600/10 dark:bg-[#b3ffe2]/10 text-teal-700 dark:text-[#b3ffe2] text-[9px] font-black uppercase tracking-widest border border-teal-600/20 dark:border-[#b3ffe2]/20">Active</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium mt-2">1.2M / 2.0M Neural API calls used this cycle</p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-3 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 bg-white dark:bg-white/5 hover:bg-slate-900 dark:hover:bg-[#b3ffe2] hover:text-white dark:hover:text-black hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_25px_rgba(179,255,226,0.3)] transition-all active:scale-95">
                Manage Plan
              </button>
            </div>
          </section>

          {/* --- RESOURCES & LEGAL --- */}
          <section className="bg-slate-50 dark:bg-[#b3ffe2]/5 backdrop-blur-2xl border border-slate-200 dark:border-[#b3ffe2]/10 p-8 rounded-[2.5rem] shadow-sm dark:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-4 h-4 text-teal-600 dark:text-[#b3ffe2]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Resources & Legal</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "API Documentation", icon: <Terminal className="w-4 h-4" />, desc: "Integration guides & endpoints" },
                { name: "Contact Support", icon: <MessageSquare className="w-4 h-4" />, desc: "Get help from the SME team" },
                { name: "Privacy Policy", icon: <Shield className="w-4 h-4" />, desc: "How we handle your data" },
                { name: "Terms of Service", icon: <FileText className="w-4 h-4" />, desc: "Platform usage rules" }
              ].map((link, i) => (
                <button key={i} className="group flex items-center justify-between p-5 rounded-[1.5rem] bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 dark:hover:border-[#b3ffe2]/30 hover:shadow-md hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl text-slate-400 group-hover:text-teal-600 dark:group-hover:text-[#b3ffe2] group-hover:bg-teal-50 dark:group-hover:bg-[#b3ffe2]/10 transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{link.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{link.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-teal-600 dark:group-hover:text-[#b3ffe2] transition-colors" />
                </button>
              ))}
            </div>
          </section>

          {/* --- SAVE STATUS FOOTER --- */}
          <div className="flex items-center justify-center gap-2 pt-4 pb-8 opacity-60 dark:opacity-40">
             <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#b3ffe2]" />
             <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Configurations Auto-Synced</span>
          </div>

        </div>
      </div>
    </div>
  );
}
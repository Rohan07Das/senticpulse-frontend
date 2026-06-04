'use client';

import React, { memo, useMemo, useState } from 'react';
import { Briefcase, MapPin, ArrowRight, Sparkles, X, ShieldCheck } from 'lucide-react';
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

  // --- MODAL & FORM STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    reason: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', reason: '' });
    }, 300);
  };

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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="relative z-10 px-12 py-4 rounded-2xl bg-[#b3ffe2] text-black font-semibold text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:scale-[1.03] transition-all duration-500 shadow-[0_0_20px_rgba(179,255,226,0.15)] cursor-pointer"
              >
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
            
            {/* THE NEURAL FADE */}
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
                    <div><h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-6 tracking-wide">Company</h4><ul className="space-y-4"><li><Link href="/" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">About</Link></li><li><Link href="/careers" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Careers</Link></li><li><button onClick={() => setIsModalOpen(true)} className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors text-left bg-transparent border-none cursor-pointer p-0">Contact</button></li></ul></div>
                  </div>
                </div>

                <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-end justify-center relative pt-4">
                  <div className="relative p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-lg backdrop-blur-sm group hover:border-teal-300 dark:hover:border-[#b3ffe2]/20 transition-colors w-full max-w-sm overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-400 dark:bg-[#b3ffe2] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500"></div>
                    <h4 className="text-slate-900 dark:text-white text-xl font-semibold mb-2">Ready to scale?</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">Get a personalized demo and see how SenticPulse AI can protect your supply chain.</p>
                    <button 
                      onClick={() => setIsModalOpen(true)} 
                      className="relative group/btn cursor-pointer block w-full bg-transparent border-none p-0 text-left"
                    >
                      <div className="relative bg-slate-900 dark:bg-black border border-slate-700 dark:border-[#b3ffe2]/30 px-6 py-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:bg-slate-800 dark:hover:bg-[#b3ffe2]/10 hover:border-teal-500 dark:hover:border-[#b3ffe2]/80 active:scale-95 shadow-md">
                        <span className="text-xs font-black text-white uppercase tracking-widest group-hover/btn:text-teal-400 dark:group-hover/btn:text-[#b3ffe2] transition-colors">Contact Enterprise Sales</span>
                        <div className="h-8 w-8 rounded-full bg-slate-800 dark:bg-[#b3ffe2]/10 flex items-center justify-center group-hover/btn:bg-slate-700 dark:group-hover/btn:bg-[#b3ffe2]/20 transition-colors">
                          <ArrowRight className="w-4 h-4 text-teal-400 dark:text-[#b3ffe2] group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </button>
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

      {/* ========================================= */}
      {/* PROFESSIONAL CONTACT MODAL INTERFACE        */}
      {/* ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop blur layer */}
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Main Modal Container */}
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0a0f1a] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 transition-all transform animate-in zoom-in-95 duration-200 p-8 flex flex-col">
            
            {/* Corner Decorative Accent Gradient */}
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-teal-400 dark:bg-[#b3ffe2] opacity-10 blur-2xl pointer-events-none"></div>
            
            {/* Exit Cross Button - Positioned exactly to right top corner */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors cursor-pointer z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Heading Block */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-[#b3ffe2]/10 border border-teal-200 dark:border-[#b3ffe2]/20 mb-3">
                    <span className="text-teal-700 dark:text-[#b3ffe2] text-[9px] font-bold uppercase tracking-widest">Enterprise Inquiry</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Connect with SenticPulse AI</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Let us know how we can align our intelligence engines with your logistics infrastructure.</p>
                </div>

                {/* Form Logic */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">What is your name?</label>
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-[#b3ffe2]/50 transition-colors font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">Work Email</label>
                      <input 
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-[#b3ffe2]/50 transition-colors font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">Company / Agency Name</label>
                      <input 
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="NexusLogistics"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-[#b3ffe2]/50 transition-colors font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">Why do you want to integrate SenticPulse AI?</label>
                    <textarea 
                      name="reason"
                      required
                      rows={3}
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="Tell us about your logistics parameters, supply routes, or specific risk monitoring goals..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-[#b3ffe2]/50 transition-colors resize-none font-medium leading-relaxed"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-2 py-3.5 px-6 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs tracking-widest uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    Submit Request <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            ) : (
              /* --- HIGHLY PROFESSIONAL SUCCESS VIEW STATE --- */
              <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="h-14 w-14 rounded-full bg-teal-50 dark:bg-[#b3ffe2]/10 border border-teal-200 dark:border-[#b3ffe2]/30 flex items-center justify-center mb-6 shadow-md shadow-teal-500/5">
                  <ShieldCheck className="text-teal-600 dark:text-[#b3ffe2] w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Transmission Successful</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mt-2 leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-800 dark:text-[#b3ffe2]">{formData.name}</span>. Your operational profile for <span className="font-semibold text-slate-800 dark:text-[#b3ffe2]">{formData.company}</span> has been processed into our queue.
                </p>
                
                <div className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl p-4 my-8 text-[11px] font-mono tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                  Status: Route Analysis Initiated
                </div>

                <button 
                  onClick={closeModal}
                  className="px-6 py-3.5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-all cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

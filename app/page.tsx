'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, ShieldCheck, ArrowRight, Star, Hexagon, Triangle, Box, 
  Circle, Infinity, Globe, Radar, Activity, ArrowDown, ChevronLeft, ChevronRight 
} from 'lucide-react';
import CardSwap, { Card } from '@/components/CardSwap'; 

export default function HomePage() {
  // --- CAROUSEL STATE ---
  const dashboardImages = [
    '/image1.png', 
    '/image2.png',
    '/image3.png',
    '/image4.png'
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % dashboardImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + dashboardImages.length) % dashboardImages.length);

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-transparent font-sans overflow-clip transition-colors duration-500">
      
      {/* --- CUSTOM STYLES FOR INFINITE SCROLL --- */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .mask-edges {
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
        `}
      </style>

      {/* --- BACKGROUND ADAPTER --- */}
      <div className="fixed inset-0 z-0 bg-transparent pointer-events-none transition-colors duration-500">
        <div className="block dark:hidden absolute inset-0 opacity-100 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      {/* ========================================= */}
      {/* HERO SECTION                               */}
      {/* ========================================= */}
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full pt-20">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pointer-events-auto -mt-55">
          
          <div className="mx-auto flex items-center gap-3 w-fit px-4 py-1.5 bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-full shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <div className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 dark:bg-[#b3ffe2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600 dark:bg-[#b3ffe2] shadow-none dark:shadow-[0_0_8px_#b3ffe2]"></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-[#b3ffe2]">Market Guard AI</span>
              <div className="h-3 w-[1px] bg-slate-300 dark:bg-slate-600/50" />
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status: Monitoring</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-slate-900 dark:text-slate-100">
            Deliver High-Quality <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-slate-600 dark:from-[#b3ffe2] dark:via-teal-100 dark:to-slate-400">
              Market Intelligence.
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            SenticPulse AI lets you move <span className="text-slate-900 dark:text-slate-200 font-medium italic">10x faster</span> by simplifying how you{' '}
            <span className="text-slate-900 dark:text-[#b3ffe2] font-medium italic">analyze</span>,{' '}
            <span className="text-slate-900 dark:text-[#b3ffe2] font-medium italic">evaluate</span>, and{' '}
            <span className="text-slate-900 dark:text-[#b3ffe2] font-medium italic">monitor</span>{' '}
            your social sentiment and supply chain risks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              href="/register" 
              className="group px-7 py-3.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-white transition-all shadow-md dark:shadow-[0_0_30px_rgba(179,255,226,0.15)] hover:scale-105 flex items-center gap-2"
            >
              GET STARTED <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-7 py-3.5 border border-slate-200 dark:border-[#b3ffe2]/15 rounded-xl font-semibold text-sm text-slate-600 dark:text-[#b3ffe2]/80 hover:bg-slate-50 hover:text-black hover:border-black dark:hover:border-transparent dark:hover:bg-[#b3ffe2]/20 dark:hover:text-white transition-all backdrop-blur-sm">
              VIEW DOCS
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 pt-12 opacity-60 dark:opacity-40 hover:opacity-100 transition-opacity duration-700">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-500 dark:text-[#b3ffe2]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">30M+ Points Analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#34A853]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">SME Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT PEEK WITH IMAGE CAROUSEL --- */}
      {/* Increased max-width and added side padding (px-12 lg:px-24) to create room for the arrows */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-12 lg:px-24 -mt-32 md:-mt-48 pb-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-teal-400 dark:bg-[#b3ffe2] opacity-[0.03] dark:opacity-[0.08] blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* Navigation Arrows - MOVED COMPLETELY OUTSIDE THE BROWSER WINDOW */}
        <button 
          onClick={prevImage} 
          className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 hover:bg-black border border-slate-700 shadow-2xl text-white transition-all z-50 cursor-pointer flex items-center justify-center"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={nextImage} 
          className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 hover:bg-black border border-slate-700 shadow-2xl text-white transition-all z-50 cursor-pointer flex items-center justify-center"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Mock Browser Window */}
        <div className="relative w-full aspect-[16/9] bg-white dark:bg-slate-950/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col group">
          
          <div className="h-10 md:h-12 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center px-4 gap-2 shrink-0 relative z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="mx-auto flex items-center gap-2 px-3 py-1 bg-white dark:bg-black/50 rounded-md border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
              <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">app.senticpulse.ai/dashboard</span>
            </div>
          </div>
          
          {/* CAROUSEL BODY */}
          <div className="flex-1 relative w-full h-full bg-slate-100 dark:bg-slate-900">
            {/* The sliding track */}
            <div 
              className="absolute inset-0 w-full h-full flex transition-transform duration-700 ease-out" 
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {dashboardImages.map((src, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                  <img 
                    src={src} 
                    alt={`Dashboard View ${index + 1}`} 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots - MOVED BELOW THE BROWSER WINDOW */}
        <div className="flex items-center justify-center gap-2 mt-8 z-50 relative">
          {dashboardImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentImage === index 
                  ? 'bg-teal-600 dark:bg-[#b3ffe2] w-8' 
                  : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10 w-full bg-white dark:bg-black transition-colors duration-500">
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-transparent to-white dark:to-black -translate-y-full pointer-events-none"></div>

        {/* LOGO MARQUEE */}
        <section className="pt-4 md:-mt-12 w-full max-w-[1200px] mx-auto px-6 relative z-10">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-8">
            Powering supply chain intelligence for
          </p>
          <div className="overflow-hidden w-full relative mask-edges flex">
            <div className="flex w-max animate-scroll hover:[animation-play-state:paused] gap-24 items-center">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-2 text-black dark:text-slate-600 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer">
                    <Hexagon className="w-6 h-6" /> <span className="font-bold text-lg tracking-tight">NexusLogistics</span>
                  </div>
                  <div className="flex items-center gap-2 text-black dark:text-slate-600 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer">
                    <Triangle className="w-6 h-6" /> <span className="font-bold text-lg tracking-tight">AeroFreight</span>
                  </div>
                  <div className="flex items-center gap-2 text-black dark:text-slate-600 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer">
                    <Box className="w-6 h-6" /> <span className="font-bold text-lg tracking-tight">ShipperCore</span>
                  </div>
                  <div className="flex items-center gap-2 text-black dark:text-slate-600 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer">
                    <Circle className="w-6 h-6" /> <span className="font-bold text-lg tracking-tight">GlobalTrade AI</span>
                  </div>
                  <div className="flex items-center gap-2 text-black dark:text-slate-600 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer">
                    <Infinity className="w-6 h-6" /> <span className="font-bold text-lg tracking-tight">OmniRoute</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* PIPELINE ARCHITECTURE */}
        <section className="relative z-10 w-full pt-32 pb-8">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="w-full lg:w-[55%] relative flex flex-col items-center md:items-start">
                <div className="hidden md:block absolute left-[39px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-teal-200 dark:from-[#b3ffe2]/50 via-teal-100 dark:via-[#b3ffe2]/10 to-transparent z-0"></div>

                {/* BLOCK 1 */}
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 w-full max-w-lg group">
                  <div className="shrink-0 h-20 w-20 rounded-2xl bg-white dark:bg-[#0a0f1a] border border-slate-200 dark:border-[#b3ffe2]/30 flex items-center justify-center shadow-md dark:shadow-[0_0_30px_rgba(179,255,226,0.1)] group-hover:scale-105 transition-transform">
                    <Globe className="text-teal-500 dark:text-[#b3ffe2] w-8 h-8" />
                  </div>
                  <div className="bg-white dark:bg-[#0a0f1a] border border-slate-200 dark:border-white/10 p-6 rounded-2xl w-full text-center md:text-left hover:border-teal-400 dark:hover:border-white/20 transition-colors shadow-sm dark:shadow-none">
                    <span className="text-[10px] font-mono text-teal-600 dark:text-[#b3ffe2] uppercase tracking-[0.2em] mb-2 block">Step 01</span>
                    <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-2">Supply Chain Mapping</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Instantly visualize disruption risks across global logistics networks with interactive sentiment heatmaps.</p>
                  </div>
                </div>
                <div className="relative z-10 flex justify-center md:justify-start w-full max-w-lg py-4 md:pl-[28px]"><ArrowDown className="w-6 h-6 text-slate-300 dark:text-slate-600 animate-bounce" /></div>

                {/* BLOCK 2 */}
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 w-full max-w-lg group">
                  <div className="shrink-0 h-20 w-20 rounded-2xl bg-white dark:bg-[#0a0f1a] border border-slate-200 dark:border-[#b3ffe2]/30 flex items-center justify-center shadow-md dark:shadow-[0_0_30px_rgba(179,255,226,0.1)] group-hover:scale-105 transition-transform">
                    <Radar className="text-teal-500 dark:text-[#b3ffe2] w-8 h-8" />
                  </div>
                  <div className="bg-white dark:bg-[#0a0f1a] border border-slate-200 dark:border-white/10 p-6 rounded-2xl w-full text-center md:text-left hover:border-teal-400 dark:hover:border-white/20 transition-colors shadow-sm dark:shadow-none">
                    <span className="text-[10px] font-mono text-teal-600 dark:text-[#b3ffe2] uppercase tracking-[0.2em] mb-2 block">Step 02</span>
                    <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-2">Bot-Farm Detection</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Filter out noisy, coordinated misinformation campaigns automatically before they skew your strategic decisions.</p>
                  </div>
                </div>
                <div className="relative z-10 flex justify-center md:justify-start w-full max-w-lg py-4 md:pl-[28px]"><ArrowDown className="w-6 h-6 text-slate-300 dark:text-slate-600 animate-bounce" /></div>

                {/* BLOCK 3 */}
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 w-full max-w-lg group">
                  <div className="shrink-0 h-20 w-20 rounded-2xl bg-white dark:bg-[#0a0f1a] border border-slate-200 dark:border-[#b3ffe2]/30 flex items-center justify-center shadow-md dark:shadow-[0_0_30px_rgba(179,255,226,0.1)] group-hover:scale-105 transition-transform">
                    <Activity className="text-teal-500 dark:text-[#b3ffe2] w-8 h-8" />
                  </div>
                  <div className="bg-white dark:bg-[#0a0f1a] border border-slate-200 dark:border-white/10 p-6 rounded-2xl w-full text-center md:text-left hover:border-teal-400 dark:hover:border-white/20 transition-colors shadow-sm dark:shadow-none">
                    <span className="text-[10px] font-mono text-teal-600 dark:text-[#b3ffe2] uppercase tracking-[0.2em] mb-2 block">Step 03</span>
                    <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-2">Shipper Trust Scoring</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Neural syncing evaluates carrier reliability based on live social data points for a verifiable, dynamic risk score.</p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[45%] text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-[#b3ffe2]/10 border border-teal-200 dark:border-[#b3ffe2]/20 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-[#b3ffe2] animate-pulse" />
                  <span className="text-teal-700 dark:text-[#b3ffe2] text-[10px] font-bold uppercase tracking-widest">Platform Capabilities</span>
                </div>
                <h2 className="text-4xl md:text-5xl text-slate-900 dark:text-white font-light tracking-tight mb-6">Engineered for <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-[#b3ffe2] dark:to-teal-400">Scale.</span></h2>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">Our multi-layered approach ensures that data integrity is maintained from ingestion to analysis, providing you with real-time, actionable insights.</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {['Real-time tracking', 'Sentiment Analysis', 'Risk Scoring', 'Neural Sync', 'API Access', '24/7 Monitoring'].map((tag) => (
                    <button key={tag} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-slate-200 hover:text-slate-900 hover:border-slate-300 dark:hover:bg-white/[0.05] dark:hover:border-white/10 transition-colors cursor-pointer shadow-sm dark:shadow-none group">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors" />
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full max-w-[12200px] mx-auto mt-16 mb-8 h-[1px] bg-slate-200 dark:bg-[#b3ffe2] dark:opacity-20"></div>

        {/* REVIEWS SECTION */}
        <section className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-16">
            <div className="flex-1 space-y-6 text-center md:text-left md:mt-20">
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-slate-900 dark:text-white leading-tight">Validated by <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-slate-500 dark:from-[#b3ffe2] dark:to-slate-400">Industry Leaders.</span></h2>
              <p className="text-slate-600 dark:text-slate-400 text-base max-w-sm mx-auto md:mx-0">See why top supply chain executives rely on SenticPulse AI to mitigate risks and move 10x faster.</p>
              <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-8"><span className="w-8 h-[1px] bg-slate-300 dark:bg-slate-700"></span>Live Reviews</div>
            </div>

            <div className="flex-1 flex justify-center mt-12 md:-mt-4 relative w-full h-[600px]">
              <CardSwap width={600} height={300} cardDistance={70} verticalDistance={70} delay={4500} pauseOnHover={false} skewAmount={4}>
                {[
                  { id: 1, name: "Sarah Jenkins", role: "VP Supply Chain, Nexus", comment: "SenticPulse flagged a major bot-farm misinformation campaign affecting our pacific routes 48 hours before it hit mainstream news. Saved us millions.", rating: 5, theme: { bg: "bg-white dark:bg-gradient-to-br dark:from-teal-950/90 dark:to-emerald-900/90 border-slate-200 dark:border-teal-500/40 shadow-xl dark:shadow-[0_10px_40px_rgba(20,184,166,0.15)]", star: "text-yellow-400 fill-yellow-400 dark:text-teal-400 dark:fill-teal-400", avatar: "bg-teal-50 dark:bg-transparent dark:from-teal-400/20 dark:to-teal-900 border-teal-100 dark:border-teal-400/50 text-teal-700 dark:text-teal-200" }},
                  { id: 2, name: "Marcus Thorne", role: "Director of Risk, AeroFreight", comment: "The Shipper Trust scoring is incredibly accurate. We’ve integrated the API directly into our dashboard and haven't looked back.", rating: 5, theme: { bg: "bg-white dark:bg-gradient-to-br dark:from-indigo-950/90 dark:to-purple-900/90 border-slate-200 dark:border-purple-500/40 shadow-xl dark:shadow-[0_10px_40px_rgba(168,85,247,0.15)]", star: "text-yellow-400 fill-yellow-400 dark:text-purple-400 dark:fill-purple-400", avatar: "bg-slate-100 dark:bg-transparent dark:from-purple-400/20 dark:to-purple-900 border-slate-200 dark:border-purple-400/50 text-slate-700 dark:text-purple-200" }},
                  { id: 3, name: "Dr. Elena Rostova", role: "Lead Data Scientist, GlobalTrade", comment: "Finally, an AI tool that actually understands the nuances of logistics sentiment. The neural syncing feature is best-in-class.", rating: 4, theme: { bg: "bg-white dark:bg-gradient-to-br dark:from-blue-950/90 dark:to-cyan-900/90 border-slate-200 dark:border-cyan-500/40 shadow-xl dark:shadow-[0_10px_40px_rgba(6,182,212,0.15)]", star: "text-yellow-400 fill-yellow-400 dark:text-cyan-400 dark:fill-cyan-400", avatar: "bg-teal-50 dark:bg-transparent dark:from-cyan-400/20 dark:to-cyan-900 border-teal-100 dark:border-cyan-400/50 text-teal-700 dark:text-cyan-200" }}
                ].map((review) => (
                  <Card key={review.id} customClass={`p-8 flex flex-col justify-between border backdrop-blur-xl rounded-2xl ${review.theme.bg}`}>
                    <div><div className="flex gap-1 mb-6">{[...Array(review.rating)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${review.theme.star}`} />))}</div><p className="text-slate-800 dark:text-white text-sm leading-relaxed font-medium">"{review.comment}"</p></div>
                    <div className="pt-6 border-t border-slate-100 dark:border-white/10 flex items-center gap-4"><div className={`h-10 w-10 rounded-full border flex items-center justify-center font-bold text-sm ${review.theme.avatar}`}>{review.name.charAt(0)}</div><div><h4 className="text-slate-900 dark:text-white font-bold text-xs">{review.name}</h4><p className="text-slate-500 dark:text-white/60 text-[10px] uppercase tracking-widest mt-0.5">{review.role}</p></div></div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </section>

        <div className="w-full max-w-[12200px] mx-auto mt-32 mb-16 h-[1px] bg-slate-200 dark:bg-[#b3ffe2] dark:opacity-20"></div>

        {/* FOOTER */}
        <footer className="w-full bg-white dark:bg-black pb-12 px-6 relative overflow-hidden z-10 transition-colors duration-500">
          <div className="absolute top-0 bottom-0 right-0 w-1/2 pointer-events-none opacity-100 dark:opacity-30 z-0 text-slate-300 dark:text-[#b3ffe2]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', backgroundPosition: 'bottom right', WebkitMaskImage: 'linear-gradient(to top left, black 0%, transparent 80%)', maskImage: 'linear-gradient(to top left, black 0%, transparent 80%)' }} />
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 relative z-10">
            <div className="flex-1 flex flex-col gap-12 text-center lg:text-left w-full pt-4">
              <div><h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">SenticPulse AI</h3><p className="text-slate-600 dark:text-slate-500 text-xs leading-relaxed">Next-generation SME Intelligence & Risk Mitigation.</p></div>
              <div className="grid grid-cols-3 gap-8 text-left max-w-lg mx-auto lg:mx-0 w-full">
                <div><h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-6 tracking-wide">Product</h4><ul className="space-y-4"><li><Link href="/" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Features</Link></li><li><Link href="/pricing" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Pricing</Link></li><li><Link href="/pricing" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">API</Link></li></ul></div>
                <div><h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-6 tracking-wide">Resources</h4><ul className="space-y-4"><li><Link href="#" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Documentation</Link></li><li><Link href="/blogs" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Blogs</Link></li><li><Link href="/blogs" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Case Studies</Link></li></ul></div>
                <div><h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-6 tracking-wide">Company</h4><ul className="space-y-4"><li><Link href="/" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">About</Link></li><li><Link href="/careers" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Careers</Link></li><li><Link href="/contact" className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Contact</Link></li></ul></div>
              </div>
            </div>
            <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-end justify-center relative pt-4">
              <div className="relative p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-lg dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-sm group hover:border-teal-300 dark:hover:border-[#b3ffe2]/20 transition-colors w-full max-w-sm overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-400 dark:bg-[#b3ffe2] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500"></div>
                <h4 className="text-slate-900 dark:text-white text-xl font-semibold mb-2">Ready to scale?</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">Get a personalized demo and see how SenticPulse AI can protect your supply chain.</p>
                <Link href="/contact" className="relative group/btn cursor-pointer block w-full"><div className="relative bg-slate-900 dark:bg-black border border-slate-700 dark:border-[#b3ffe2]/30 px-6 py-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:bg-slate-800 dark:hover:bg-[#b3ffe2]/10 hover:border-teal-500 dark:hover:border-[#b3ffe2]/80 active:scale-95 shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover/btn:shadow-xl dark:group-hover/btn:shadow-[0_0_30px_rgba(179,255,226,0.2)]"><span className="text-xs font-black text-white uppercase tracking-widest group-hover/btn:text-teal-400 dark:group-hover/btn:text-[#b3ffe2] transition-colors">Contact Enterprise Sales</span><div className="h-8 w-8 rounded-full bg-slate-800 dark:bg-[#b3ffe2]/10 flex items-center justify-center group-hover/btn:bg-slate-700 dark:group-hover/btn:bg-[#b3ffe2]/20 transition-colors"><ArrowRight className="w-4 h-4 text-teal-400 dark:text-[#b3ffe2] group-hover/btn:translate-x-1 transition-transform" /></div></div></Link>
              </div>
            </div>
          </div>
          <div className="max-w-[1200px] mx-auto mt-20 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-widest font-bold border-t border-slate-200 dark:border-white/5 pt-8 relative z-10"><p>© 2026 SenticPulse AI. All rights reserved.</p><div className="flex gap-6 mt-4 md:mt-0"><a href="#" className="hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Privacy</a><a href="#" className="hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">Terms</a><a href="#" className="hover:text-slate-700 dark:hover:text-[#b3ffe2] transition-colors">API Status</a></div></div>
        </footer>
      </div>
    </div>
  );
}
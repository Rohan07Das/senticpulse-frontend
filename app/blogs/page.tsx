'use client';

import React, { memo, useMemo, useState } from 'react';
import { Calendar, Clock, Sparkles, ArrowLeft, ArrowRight, Send } from 'lucide-react';
import Link from 'next/link';

// 1. Memoized Blog Card
const BlogCard = memo(({ post, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-1000"
  >
    <div className="aspect-[16/10] rounded-[2.5rem] bg-slate-200/50 dark:bg-white/[0.03] mb-6 overflow-hidden relative shadow-sm transition-all duration-700 backdrop-blur-2xl group-hover:shadow-2xl group-hover:-translate-y-4">
      <img 
        src={post.image} 
        alt={post.title}
        className={`
          absolute inset-0 w-full h-full object-cover transition-all duration-700 
          opacity-90 grayscale-[0.2] 
          dark:opacity-70 dark:grayscale-[0.2] 
          group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105
          dark:group-hover:opacity-100 dark:group-hover:grayscale-0
        `}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-slate-950/90 via-transparent to-transparent" />
      <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
         <Sparkles className="w-3 h-3 text-[#b3ffe2]" />
         <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/90">{post.category}</span>
      </div>
    </div>
    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-[#b3ffe2] transition-colors leading-tight mb-4 tracking-tight">
      {post.title}
    </h3>
    <div className="flex gap-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
      <span className="flex items-center gap-2 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300">
        <Calendar size={12} className="text-teal-600 dark:text-[#b3ffe2]" /> {post.date}
      </span>
      <span className="flex items-center gap-2 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300">
        <Clock size={12} className="text-teal-600 dark:text-[#b3ffe2]" /> {post.time}
      </span>
    </div>
  </div>
));

BlogCard.displayName = "BlogCard";

export default function BlogsPage() {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const posts = useMemo(() => [
    { 
        title: "Detecting Bot-Farms in Logistics", 
        date: "Apr 02, 2026", 
        time: "6 min",
        category: "Security",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format",
        content: ["Neutralize automated networks that manipulate supply chain data. This deep dive explores how Neural Checkpoint Nodes identify fake demand signals and 'ghost' orders in real-time, preventing resource waste and ensuring predictive accuracy for global SME logistics.","Beyond identification, the true power of SenticPulse lies in its 'Stealth Mitigation' protocols. Instead of simply blocking a detected bot—which alerts the farm operator to change their tactics—the system feeds the automated agents synthetic data loops. By presenting these bots with 'Ghost-Lanes' and artificial freight availability, the engine traps them in a sandbox environment. This preserves the integrity of the real-time supply chain for human operators while simultaneously draining the computational resources of the bot-farm, turning their own automation against them."]
    },
    { 
        title: "The Rise of Autonomous Shippers", 
        date: "Mar 28, 2026", 
        time: "10 min",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=1200&auto=format",
        content: ["Autonomous shipping is transitioning from theory to mathematical necessity as global commerce volumes triple. Decentralized AI agents, powered by engines like SenticPulse, now manage complex logistics—negotiating freight rates and optimizing fuel—with a precision that human teams cannot match. By processing data via edge-nodes rather than the cloud, these systems eliminate 500ms latencies, allowing fleets to react to real-time disruptions like weather or port congestion instantaneously.", "The true breakthrough is Neural Fulfillment Synchronization, where every vessel operates as a live node in a global network. When a bottleneck is detected, the entire ecosystem recalibrates in milliseconds to prevent cascading delays. This evolution turns the supply chain into a self-governing organism that predicts and bypasses failure before it occurs, ensuring seamless fulfillment at a massive scale."]
    },
    { 
        title: "Neural Syncing: A Technical Deep Dive", 
        date: "Mar 15, 2026", 
        time: "15 min",
        category: "Neural Core",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format",
        content: ["Neural Fulfillment Synchronization functions as the 'nervous system' of modern logistics, moving beyond centralized cloud processing to a mesh of edge-computing nodes. In this architecture, every autonomous vessel and ground vehicle processes data locally, utilizing peer-to-peer protocols to share telemetry and risk assessments across the fleet. This eliminates the 500ms round-trip latency of traditional cloud systems, allowing the network to achieve 'synthetic intuition'—the ability to detect and react to micro-fluctuations in port velocity or sea states in under 10ms.","The technical core of this system relies on Distributed Ledger Risk Engines that validate data across the swarm. When a single node encounters a disruption, it doesn't just reroute itself; it broadcasts a weighted probability shift to the entire grid. Using Recursive Optimization Algorithms, the global network then triggers a preemptive recalibration, adjusting the speed and heading of thousands of assets simultaneously. This transforms the supply chain from a reactive series of handoffs into a self-governing, predictive organism that resolves bottlenecks before they physically manifest."]
    },
    { 
    title: "SME Logistics: The Ghost-Lane Problem", 
    date: "Apr 05, 2026", 
    time: "7 min",
    category: "Efficiency",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format",
    content: ["Small-to-medium enterprises (SMEs) face the 'Ghost-Lane' crisis—a phenomenon where under-utilized shipping lanes and fragmented data silos lead to 'phantom' capacity and 40% higher costs compared to tier-one carriers. While global giants utilize synchronized fleets, SMEs are often trapped in legacy workflows, paying for space they don't use or losing cargo to 'dead zones' where real-time visibility vanishes. This inefficiency creates a massive competitive gap, as smaller players lack the computational weight to negotiate within high-velocity autonomous networks.", "To bridge this, emerging SME-specific AI Aggregators are turning these ghost lanes into 'liquid assets' by pooling decentralized demand into a single neural node. By plugging into the SenticPulse risk engine, smaller logistics teams can access the same predictive routing and automated rate negotiation once reserved for conglomerates. This democratizes the supply chain, allowing SMEs to vanish the ghost-lane deficit and operate with the agility of a global powerhouse within the self-governing ecosystem."]
  },
  { 
    title: "Decoding the Oklch Color Space in UI", 
    date: "Apr 04, 2026", 
    time: "5 min",
    category: "Design",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format",
    content: ["Oklch is transforming UI design by fixing the 'perceptual unpredictability' of traditional RGB and HSL models. Unlike HSL, where shifting hue can radically alter a color's perceived brightness—making a pure blue feel much darker than a pure yellow at the same lightness—Oklch maintains uniform perceived lightness across the entire spectrum. This allows developers to programmatically generate accessible color scales and 'perfect' dark modes without manual tweaking, as the mathematical lightness (L) directly correlates to how the human eye actually sees.", "The power of Oklch lies in its three coordinates: Lightness, Chroma (intensity), and Hue. Because it operates within a device-independent gamut, it allows UIs to tap into P3 wide-gamut colors that were previously unreachable. By defining colors based on human perception rather than hardware limitations, Oklch enables a more resilient design system where gradients are smoother, contrast is more predictable, and the interface remains visually balanced regardless of the hue selected."]
  },
  { 
    title: "Edge-Node Processing vs Cloud Latency", 
    date: "Apr 03, 2026", 
    time: "12 min",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=1200&auto=format",
    content: ["The transition to autonomous logistics hinges on a critical architectural shift: moving intelligence from centralized data centers to the 'edge' of the network. In traditional Cloud Computing, data must travel from a vessel to a distant server and back, creating a 500ms latency gap. While half a second seems negligible, for a self-navigating fleet traveling at high speeds through congested ports, that delay represents a 'blind spot' where catastrophic errors can occur before the cloud can even issue a correction.", "Edge-Node Processing eliminates this lag by housing the decision-making engine directly on the hardware—the ships, drones, and trucks themselves. By processing telemetry and environmental variables locally, these units achieve near-zero latency, responding to disruptions in under 10ms. This decentralized approach ensures that even if a global network connection is severed, the individual node remains fully operational and intelligent, turning the supply chain into a resilient, distributed mesh rather than a fragile, hub-and-spoke system."]
  }
  ], []);

  const nextSlide = () => { if (currentIndex < (posts.length / 3) - 1) setCurrentIndex(prev => prev + 1); };
  const prevSlide = () => { if (currentIndex > 0) setCurrentIndex(prev => prev - 1); };

  return (
    <div className="relative min-h-screen w-full bg-transparent font-sans pt-0 transition-all duration-500 overflow-hidden flex flex-col">
      
      <div className="fixed inset-0 z-0 bg-transparent pointer-events-none">
        <div className="block dark:hidden absolute inset-0 opacity-100 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <section className="relative z-10 pt-2 pb-32 px-6 max-w-[1200px] mx-auto flex flex-col items-center">
        
        {!selectedPost ? (
          <>
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative z-10">
              <div className="mx-auto flex items-center gap-3 w-fit px-4 py-1.5 bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-full shadow-sm">
                <div className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 dark:bg-[#b3ffe2] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600 dark:bg-[#b3ffe2]"></span>
                </div>
                <span className="text-[10px] font-semibold tracking-[0.15em] text-teal-700 dark:text-[#b3ffe2] uppercase">Intelligence Feed</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-slate-600 dark:from-[#b3ffe2] dark:via-teal-100 dark:to-slate-400">Insights.</span>
              </h1>
              <p className="text-md md:text-lg text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
                Deep dives into the future of <span className="text-slate-900 dark:text-slate-200 font-medium italic">autonomous risk mitigation</span> and neural fulfillment engines.
              </p>
            </div>
            
            <div className="relative w-full overflow-visible">
              
              <button 
                onClick={prevSlide} 
                className={`absolute left-[-80px] top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white transition-all hover:scale-110 active:scale-95 backdrop-blur-xl flex items-center justify-center ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
              >
                <ArrowLeft size={20} strokeWidth={2.5} />
              </button>

              <div className="w-full overflow-hidden py-20 -my-20">
                <div 
                  className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full flex-shrink-0">
                    {posts.slice(0, 3).map((post, i) => <BlogCard key={i} post={post} onClick={() => setSelectedPost(post)} />)}
                  </div>
                  {posts.length > 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full flex-shrink-0">
                      {posts.slice(3, 6).map((post, i) => <BlogCard key={i} post={post} onClick={() => setSelectedPost(post)} />)}
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={nextSlide} 
                className={`absolute right-[-80px] top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white transition-all hover:scale-110 active:scale-95 backdrop-blur-xl flex items-center justify-center ${currentIndex >= (posts.length / 3) - 1 ? 'opacity-0' : 'opacity-100'}`}
              >
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex gap-3 mt-12">
              {Array.from({ length: Math.ceil(posts.length / 3) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1 rounded-full transition-all duration-700 ${currentIndex === i ? 'w-10 bg-teal-600 dark:bg-[#b3ffe2]' : 'w-2 bg-slate-300 dark:bg-white/10'}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500 pt-4 relative z-10">
            <button 
                onClick={() => setSelectedPost(null)}
                className="group flex items-center gap-3 text-md font-bold text-teal-600 dark:text-[#b3ffe2/10] mb-12 hover:text-black dark:hover:text-[#b3ffe2] transition-all"
            >
                <ArrowLeft size={18} className="mb-0.7 transition-transform group-hover:-translate-x-1" />
                <span className="tracking-tight">Back</span>
            </button>
            <div className="aspect-video w-full rounded-[3rem] overflow-hidden mb-12 border border-transparent shadow-2xl relative">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>
            <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">{selectedPost.title}</h2>
                {(Array.isArray(selectedPost.content) ? selectedPost.content : [selectedPost.content]).map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-md text-slate-900 dark:text-white font-light leading-relaxed pt-4 border-t border-slate-100 dark:border-white/5">{paragraph}</p>
                ))}
            </div>
          </div>
        )}

        <div className="mt-32 w-full p-12 rounded-[3.5rem] bg-black border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden z-10">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/5 blur-[100px] pointer-events-none" />
            <div className="max-w-md text-center md:text-left relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-2 tracking-tight">Weekly Neural Sync</h4>
              <p className="text-sm font-light text-slate-400">The latest in bot-farm detection and supply chain risks, delivered to your node.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3 relative z-10">
              <input type="email" placeholder="Secure email" className="flex-1 md:w-72 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#b3ffe2]/50 transition-all backdrop-blur-md" />
              <button className="px-8 py-4 bg-[#b3ffe2] text-black text-[11px] font-semibold uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2">
                Join Feed <Send size={12} />
              </button>
            </div>
        </div>
      </section>

      {/* --- ADAPTABLE FOOTER SYSTEM --- */}
      <div className="w-full mt-auto relative">
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
  );
}
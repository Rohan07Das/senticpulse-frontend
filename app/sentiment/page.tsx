'use client';

import React, { memo, useMemo, useState } from 'react';
import { Send, Hash, FileText, ShieldAlert, Sparkles, User } from 'lucide-react';

// 1. Memoized Cluster Item
const ClusterItem = memo(({ cluster }: any) => (
  <div className="group/cluster flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-transparent hover:border-slate-300 dark:hover:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer">
    <span className="text-xs font-bold text-teal-600 dark:text-[#b3ffe2] group-hover/cluster:text-black dark:group-hover/cluster:text-white transition-colors">
      #{cluster.name}
    </span>
    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${cluster.bg} ${cluster.color}`}>
      {cluster.status}
    </span>
  </div>
));
ClusterItem.displayName = "ClusterItem";

export default function SentimentPage() {
  // --- DYNAMIC BACKEND URL ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // --- STATE FOR CHAT LOGIC ---
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const clusters = useMemo(() => [
    { name: "SupplyChainShortage", status: "Negative", color: "text-red-600 dark:text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
    { name: "TechPulse2026", status: "Positive", color: "text-emerald-600 dark:text-[#34A853]", bg: "bg-emerald-50 dark:bg-[#34A853]/10" },
    { name: "LogisticsReform", status: "Neutral", color: "text-slate-500 dark:text-slate-400", bg: "bg-slate-50 dark:bg-white/5" },
  ], []);

  // --- UPDATED: THE FUNCTION THAT TALKS TO API_URL ---
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // 1. Add user's message to the chat
    const newChat = [...chatHistory, { role: "user", text: inputText }];
    setChatHistory(newChat);
    setInputText(""); 
    setIsTyping(true); 

    try {
      // 2. Send to FastAPI (UPDATED URL)
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      
      const data = await response.json();

      // 3. Add AI's response to the chat
      setChatHistory([...newChat, { role: "agent", text: data.ai_analysis }]);
    } catch (error) {
      console.error("Backend connection failed", error);
      setChatHistory([...newChat, { role: "agent", text: "Error: Could not reach the Neural Core. Connection timed out." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-clip font-sans transition-colors duration-500">
      
      <div className="pt-2 pb-16 px-6 max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 relative z-10">
        
        <header className="space-y-1">
          <h2 className="text-3xl font-extralight tracking-tight text-slate-400 dark:text-slate-500">
            Sentiment <span className="font-semibold text-slate-900 dark:text-white transition-colors">Analysis Center</span>
          </h2>
          <p className="text-[10px] font-black text-teal-600 dark:text-[#b3ffe2] uppercase tracking-[0.3em]">Deep Social Cluster Parsing</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 flex flex-col h-[650px] bg-white/80 dark:bg-[#b3ffe2]/5 backdrop-blur-2xl border border-slate-200 dark:border-[#b3ffe2]/10 rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl transition-all">
            
            <div className="p-5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-teal-500 dark:bg-[#b3ffe2] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">Sentic Agent v4.22</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">ENCRYPTED_SESSION_ACTIVE</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-xl bg-teal-50 dark:bg-[#b3ffe2]/10 border border-teal-100 dark:border-[#b3ffe2]/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-teal-600 dark:text-[#b3ffe2]" />
                </div>
                <div className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl rounded-tl-none max-w-lg shadow-sm">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
                    Hello. I am currently monitoring <span className="text-teal-700 dark:text-[#b3ffe2] font-bold">#Electronics</span> and <span className="text-teal-700 dark:text-[#b3ffe2] font-bold">#SME_Logistics</span>. Paste a link or type a topic to run a real-time misinformation check.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-500" />
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20 rounded-2xl rounded-tl-none max-w-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-red-600 dark:text-red-500 uppercase tracking-widest">Misinformation Detected</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
                    Recent clusters for <span className="text-slate-900 dark:text-white font-bold">"ExpressGlobal Delay"</span> show a 78% correlation with known bot-farm patterns. Recommend lower trust score for this shipper.
                  </p>
                </div>
              </div>

              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 items-start animate-in fade-in slide-in-from-bottom-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`h-8 w-8 rounded-xl border flex items-center justify-center shrink-0 ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 dark:bg-white border-slate-800 dark:border-slate-200' 
                      : 'bg-teal-50 dark:bg-[#b3ffe2]/10 border-teal-100 dark:border-[#b3ffe2]/20'
                  }`}>
                    {msg.role === 'user' 
                      ? <User className="w-4 h-4 text-white dark:text-black" /> 
                      : <Sparkles className="w-4 h-4 text-teal-600 dark:text-[#b3ffe2]" />
                    }
                  </div>

                  <div className={`p-4 border rounded-2xl max-w-lg shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-black rounded-tr-none border-slate-800 dark:border-slate-200'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-tl-none border-slate-100 dark:border-white/10'
                  }`}>
                    <p className="text-xs leading-relaxed transition-colors">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 items-start animate-in fade-in">
                  <div className="h-8 w-8 rounded-xl bg-teal-50 dark:bg-[#b3ffe2]/10 border border-teal-100 dark:border-[#b3ffe2]/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-teal-600 dark:text-[#b3ffe2] animate-spin" />
                  </div>
                  <div className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl rounded-tl-none max-w-lg shadow-sm">
                    <p className="text-xs text-slate-400 dark:text-slate-500 animate-pulse">Processing neural input...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 shrink-0">
              <div className="relative group">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Agent to analyze a trend or URL..."
                  className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-6 pr-14 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-black dark:focus:border-[#b3ffe2]/40 transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isTyping}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900 dark:bg-[#b3ffe2] text-white dark:text-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg dark:shadow-[0_0_15px_rgba(179,255,226,0.2)] disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-[#b3ffe2]/5 backdrop-blur-md border border-slate-200 dark:border-[#b3ffe2]/10 p-6 rounded-[2.5rem] shadow-xl dark:shadow-none transition-all">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black dark:text-white mb-6 flex items-center gap-2">
                <Hash className="w-4 h-4 text-teal-600 dark:text-[#b3ffe2]" /> Live Clusters
              </h3>
              <div className="space-y-3">
                {clusters.map((cluster, i) => (
                  <ClusterItem key={i} cluster={cluster} />
                ))}
              </div>
            </div>

            <div className="relative group overflow-hidden bg-slate-50 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-[#b3ffe2]/5 p-8 rounded-[2.5rem] shadow-lg transition-all">
              <div className="relative z-10 space-y-4">
                <div className="h-10 w-10 bg-white dark:bg-[#b3ffe2]/10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-[#b3ffe2]/20">
                  <FileText className="w-5 h-5 text-teal-600 dark:text-[#b3ffe2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Need a Report?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  I can compile these sentiment clusters into a <span className="text-slate-900 dark:text-white font-semibold">PDF</span> for your weekly SME review.
                </p>
                <button className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-[11px] font-black uppercase tracking-widest transition-all hover:bg-black dark:hover:bg-[#b3ffe2] hover:shadow-lg active:scale-95">
                  Export Analysis
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-teal-500 dark:bg-[#b3ffe2] opacity-5 blur-[60px]" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ShieldCheck, TrendingUp, Package, Activity } from 'lucide-react';

export default function AdminStatsPage() {
  const [data, setData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'orders' | 'activity'>('orders');
  const [mounted, setMounted] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    setMounted(true);
    const fetchAdminData = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const res = await fetch(`${API_URL}/api/admin/global-stats?email=${encodeURIComponent(email || '')}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Admin Fetch Error:", err);
      }
    };
    fetchAdminData();
  }, []);

  if (!data || !mounted) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black animate-pulse text-slate-500 font-bold uppercase tracking-widest">Initialising SenticPulse Admin...</div>;

  return (
    <div className="relative min-h-screen w-full font-sans transition-colors duration-500">
      {/* 1. BACKGROUND FEATURE LOGIC: Masks grid beams */}
      <div className="fixed inset-0 bg-white dark:bg-[#020202] z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen p-6">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          
          {/* HEADER */}
          <div className="flex justify-between items-end border-b border-slate-200 dark:border-white/10 pb-4 shrink-0">
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                Admin <span className="text-teal-600 dark:text-[#b3ffe2] font-extralight">Command Center</span>
              </h1>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Strategic Market Sentiment intelligence</p>
            </div>
            <div className="bg-white dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-[#b3ffe2]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Admin Session</span>
            </div>
          </div>

          {/* TOP METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
            {[
              { label: 'Total Pulses', val: data?.totalAnalyzed || 0, color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Positive Bias', val: '64%', color: 'text-teal-600 dark:text-[#b3ffe2]' },
              { label: 'Market Load', val: '14.2ms', color: 'text-orange-600 dark:text-orange-400' },
              { label: 'System Health', val: 'Optimum', color: 'text-purple-600 dark:text-purple-400' }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm transition-all hover:shadow-md">
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                <h2 className={`text-2xl font-black ${item.color}`}>{item.val}</h2>
              </div>
            ))}
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 bg-white dark:bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col min-h-[500px]">
              <h3 className="text-sm font-black uppercase tracking-widest mb-10 text-slate-800 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-600 dark:text-[#b3ffe2]" /> Sentiment & Market Distribution
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                {/* PIE CHART */}
                <div className="flex flex-col h-[350px] border-r border-slate-200 dark:border-white/5 pr-4">
                  <p className="text-[11px] font-bold text-slate-900 dark:text-slate-500 uppercase mb-4 text-center italic">Mood Share Distribution</p>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%" key={data?.totalAnalyzed || 'pie-grid-style'}>
                      <PieChart>
                        <XAxis hide type="number" />
                        <YAxis hide type="number" />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mounted && document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0'} />
                        <Pie
                          data={data?.chartData || []}
                          innerRadius="0%"
                          outerRadius="85%"
                          paddingAngle={0}
                          dataKey="value"
                          nameKey="name"
                          stroke="#fff"
                          strokeWidth={3}
                          animationDuration={1000}
                          label={({ cx, cy, midAngle = 0, innerRadius, outerRadius, percent }) => {
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                            return (
                              <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="bold">
                                {`${((percent ?? 0) * 100).toFixed(0)}%`}
                              </text>
                            );
                          }}
                          labelLine={false}
                        >
                          {(data?.chartData || []).map((entry: any, index: number) => {
                            let sliceColor = '#92c9d5'; 
                            if (entry.name?.toLowerCase().includes('pos')) sliceColor = '#6db33f'; 
                            if (entry.name?.toLowerCase().includes('neg')) sliceColor = '#4472c4'; 
                            return <Cell key={`cell-${index}`} fill={sliceColor} className="outline-none hover:opacity-80 transition-opacity cursor-pointer" />;
                          })}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff' }} />
                        <Legend verticalAlign="bottom" align="center" iconType="square" iconSize={12} wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '25px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* BAR CHART */}
                <div className="flex flex-col h-[350px] pl-4">
                  <p className="text-[11px] font-bold text-slate-900 dark:text-slate-500 uppercase mb-4 text-center italic">Sector Pulse Analytics</p>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data?.categoryData || []} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mounted && document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0'} />
                        <XAxis dataKey="name" axisLine={{ stroke: '#94a3b8' }} tickLine={false} fontSize={10} tick={{ fill: '#536277', fontWeight: 'bold' }} label={{ value: 'Market Sectors', position: 'insideBottom', offset: -10, fontSize: 12, fill: '#546275', fontWeight: 'bold' }} />
                        <YAxis axisLine={{ stroke: '#94a3b8' }} tickLine={false} fontSize={10} tick={{ fill: '#536277' }} label={{ value: 'Frequency', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12, fill: '#546275', fontWeight: 'bold' } }} />
                        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#c1c5a6', color: '#fff' }} />
                        <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={30}>
                          {(data?.categoryData || []).map((entry: any, index: number) => {
                            const colors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
                            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-6 h-full">
              <div className="pricing-toggle-container relative p-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full flex items-center shadow-sm w-full mx-auto h-14 shrink-0">
                <button onClick={() => setViewMode('orders')} className={`relative z-20 flex-1 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${viewMode === 'orders' ? 'text-white dark:text-black' : 'text-slate-400 dark:text-slate-500'}`}>Market Orders</button>
                <button onClick={() => setViewMode('activity')} className={`relative z-20 flex-1 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${viewMode === 'activity' ? 'text-white dark:text-black' : 'text-slate-400'}`}>Global Feed <span className={`ml-1 text-[8px] opacity-80 ${viewMode === 'activity' ? 'text-white/80 dark:text-black/60' : 'text-teal-600 dark:text-[#b3ffe2]'}`}> (Live)</span></button>
                <div className={`absolute top-1.5 left-1.5 bottom-1.5 w-[calc(50%-3px)] bg-slate-900 dark:bg-[#b3ffe2] rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 ${viewMode === 'activity' ? 'translate-x-[calc(100%-3px)]' : 'translate-x-0'}`} />
              </div>

              <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden min-h-[420px] max-h-[420px] flex flex-col">
                  <div className="space-y-4 h-full overflow-y-auto pr-2 custom-scrollbar">
                      {/* 2. ORDER FETCH INTEGRATION: Pulls data directly from MongoDB collection keys */}
                      {(viewMode === 'orders' ? data?.marketOrders : data?.activityFeed || []).map((item: any, i: number) => (
                          viewMode === 'orders' ? (
                            <div key={i} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-white dark:bg-black border border-slate-100 dark:border-white/10 flex items-center justify-center shrink-0">
                                    <Package className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1 text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
                                        <p className="truncate">{item.email || 'User'}</p>
                                        <span className="px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-[#b3ffe2]">Paid</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-400 truncate uppercase">{item.name || "Product Unidentified"}</p>
                                    <p className="text-[11px] text-teal-600 dark:text-[#b3ffe2] font-black mt-1">₹ {item.total?.toLocaleString() || "0.00"}</p>
                                </div>
                            </div>
                          ) : (
                            <div key={i} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest truncate max-w-[65%]">{item.email}</p>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md transition-colors ${item.sentiment?.includes('Pos') ? 'bg-emerald-100 dark:bg-emerald-900/30 text-[#34A853] dark:text-[#10b981]' : item.sentiment?.includes('Neg') ? 'bg-red-100 dark:bg-red-100/20 text-red-500 dark:text-red-500' : 'bg-slate-100 dark:bg-slate-500/20 text-slate-600 dark:text-[#94a3b8]'}`}>
                                      {item.sentiment?.split(' ')[0]}
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-900 dark:text-white font-medium leading-relaxed italic">"{item.full_text || item.keyword}"</p>
                            </div>
                          )
                      ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #64748b; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}</style>
    </div>
  );
}
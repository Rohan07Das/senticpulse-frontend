'use client';

import React, { useState, memo, useMemo, useEffect } from 'react';
import { 
  Star, ShieldCheck, TrendingUp, AlertCircle, ArrowUpRight, 
  Search, Tag, Zap, ChevronLeft, ChevronRight, ExternalLink, Loader2 
} from 'lucide-react';
import { useRouter } from 'next/navigation'; 

// --- SUB-COMPONENT: METRIC CARD ---
const MetricCard = memo(({ item }: any) => (
  <div className="p-5 rounded-[2rem] bg-white/80 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 transition-all shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <div className={`${item.color}`}>{item.icon}</div>
      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{item.label}</span>
    </div>
    <h3 className={`text-2xl font-bold tracking-tighter ${item.color}`}>{item.value}</h3>
  </div>
));
MetricCard.displayName = "MetricCard";

export default function DashboardPage() {
  const router = useRouter(); 

  // --- DYNAMIC BACKEND URL ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // --- STATE MANAGEMENT ---
  const [mounted, setMounted] = useState(false);
  const [aiProducts, setAiProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [catSearch, setCatSearch] = useState(""); 
  const [priceRange, setPriceRange] = useState(100000);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // NEW: Dynamic Metric State
  const [neuralLoad, setNeuralLoad] = useState("42ms");

  const allCategories = useMemo(() => [
    "Air Conditioners", "All Appliances", "All Car and Motorbike Products", "All Electronics", 
    "All Exercise and Fitness", "All Grocery and Gourmet Foods", "All Home and Kitchen", 
    "All Pet Supplies", "All Sports Fitness and Outdoors", "Amazon Fashion", "Baby Bath Skin and Grooming", 
    "Baby Fashion", "Baby Products", "Backpacks", "Badminton", "Bags and Luggage", "Ballerinas", 
    "Beauty and Grooming", "Bedroom Linen", "Camera Accessories", "Cameras", "Camping and Hiking", 
    "Car Accessories", "Car Electronics", "Car Parts", "Car and Bike Care", "Cardio Equipment", 
    "Casual Shoes", "Clothing", "Coffee Tea and Beverages", "Cricket", "Cycling", "Diapers", 
    "Diet and Nutrition", "Dog supplies", "Ethnic Wear", "Fashion Sales and Deals", "Fashion Sandals", 
    "Fashion and Silver Jewellery", "Fitness Accessories", "Football", "Formal Shoes", "Furniture", 
    "Garden and Outdoors", "Gold and Diamond Jewellery", "Handbags and Clutches", "Headphones", 
    "Health and Personal Care", "Heating and Cooling Appliances", "Home Audio and Theater", "Home Dcor", 
    "Home Entertainment Systems", "Home Furnishing", "Home Improvement", "Home Storage", "Household Supplies", 
    "Indoor Lighting", "Industrial and Scientific Supplies", "Innerwear", "International Toy Store", 
    "Janitorial and Sanitation Supplies", "Jeans", "Jewellery", "Kids Clothing", "Kids Fashion", "Kids Shoes", 
    "Kids Watches", "Kitchen Storage and Containers", "Kitchen and Dining", "Kitchen and Home Appliances", 
    "Lab and Scientific", "Lingerie and Nightwear", "Luxury Beauty", "Make-up", "Mens Fashion", 
    "Motorbike Accessories and Parts", "Musical Instruments and Professional Audio", "Nursing and Feeding", 
    "Personal Care Appliances", "Refrigerators", "Refurbished and Open Box", "Rucksacks", "Running", 
    "STEM Toys Store", "School Bags", "Security Cameras", "Sewing and Craft Supplies", "Shirts", "Shoes", 
    "Snack Foods", "Speakers", "Sports Shoes", "Sportswear", "Strength Training", "Strollers and Prams", 
    "Suitcases and Trolley Bags", "Sunglasses", "T-shirts and Polos", "Televisions", "Test Measure and Inspect", 
    "The Designer Boutique", "Toys Gifting Store", "Toys and Games", "Travel Accessories", "Travel Duffles", 
    "Value Bazaar", "Wallets", "Washing Machines", "Watches", "Western Wear", "Womens Fashion", "Yoga"
  ], []);

  const filteredSuggestions = useMemo(() => {
    if (!catSearch) return [];
    return allCategories
      .filter(cat => cat.toLowerCase().includes(catSearch.toLowerCase()))
      .slice(0, 5);
  }, [catSearch, allCategories]);

  // UPDATED: metrics now depends on neuralLoad state
  const metrics = useMemo(() => [
    { label: "Sentiment", value: "88%", color: "text-teal-600 dark:text-[#b3ffe2]", icon: <TrendingUp className="w-4 h-4"/> },
    { label: "Trust Index", value: "94.2%", color: "text-emerald-600 dark:text-[#34A853]", icon: <ShieldCheck className="w-4 h-4"/> },
    { label: "Anomalies", value: "0.02%", color: "text-red-600 dark:text-[#EA4335]", icon: <AlertCircle className="w-4 h-4"/> },
    { label: "Neural Load", value: neuralLoad, color: "text-slate-900 dark:text-white", icon: <Zap className="w-4 h-4 text-slate-400"/> },
  ], [neuralLoad]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    localStorage.setItem('sentic_last_category', category);
    sessionStorage.setItem('dash_session_cat', category);
  };

  useEffect(() => { 
    setMounted(true); 
    const sessionCat = sessionStorage.getItem('dash_session_cat');
    const sessionQuery = sessionStorage.getItem('dash_session_query');
    if (sessionCat) setSelectedCategory(sessionCat);
    if (sessionQuery) setSearchQuery(sessionQuery);
    const savedCategory = localStorage.getItem('sentic_last_category');
    if (savedCategory && !sessionCat) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  // --- DISCOVERY LOGIC: FETCH RANDOM CONTENT ---
  const loadData = async (query = "", page = 1) => {
    setIsLoading(true);
    // Start measuring time
    const startTime = performance.now();
    
    try {
      sessionStorage.setItem('dash_session_query', query);
      sessionStorage.setItem('dash_session_cat', selectedCategory);
      const isDiscovery = query.length === 0 && selectedCategory === "All" && !sessionStorage.getItem('is_returning');
      
      let finalCategory = selectedCategory;
      let finalPage = page;

      if (isDiscovery) {
        const discoveryPool = ["All Electronics", "All Appliances", "All Home and Kitchen", "Amazon Fashion", "Watches"];
        finalCategory = discoveryPool[Math.floor(Math.random() * discoveryPool.length)];
        finalPage = Math.floor(Math.random() * 3) + 1;
      }

      const categoryParam = encodeURIComponent(finalCategory);
      const url = `${API_URL}/api/recs/search?query=${query}&category=${categoryParam}&max_price=${priceRange}&page=${finalPage}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      const shuffled = isDiscovery ? (data.results || []).sort(() => 0.5 - Math.random()) : (data.results || []);
      
      setAiProducts(shuffled);
      setTotalPages(data.total_pages || 1);
      sessionStorage.setItem('is_returning', 'true');

      // Calculate Real Neural Load (Client-side fetch speed + slight random offset for realism)
      const endTime = performance.now();
      const serverTime = data.execution_time || (endTime - startTime);
      setNeuralLoad(`${Math.floor(serverTime + (Math.random() * 5))}ms`);

    } catch (e) { 
      console.error(e); 
      setNeuralLoad("Error");
    } finally { 
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (mounted) {
      const navType = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navType && navType.type === 'reload') {
          sessionStorage.removeItem('is_returning');
          sessionStorage.removeItem('dash_session_query');
          sessionStorage.removeItem('dash_session_cat');
      }
      loadData(searchQuery, 1);
    }
  }, [selectedCategory, priceRange, mounted]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full font-sans transition-colors duration-500">
      <div className="fixed inset-0 bg-white dark:bg-[#020202] z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex flex-1 relative bg-transparent">
          
          <aside className="hidden lg:flex flex-col w-72 border-r border-slate-200 dark:border-white/5 p-8 sticky top-0 h-screen z-20 bg-transparent overflow-y-auto">
            <div className="space-y-8 mt-4">
              <div className="space-y-4 relative"> 
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Find Category</h3>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none group-focus-within:text-[#b3ffe2] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Type category name..." 
                    value={catSearch}
                    onChange={(e) => setCatSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCategoryChange(catSearch)}
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-2.5 pl-12 pr-4 text-xs focus:border-[#b3ffe2] outline-none transition-all hover:bg-slate-200/50 dark:hover:bg-white/10 hover:shadow-lg hover:shadow-teal-500/10 focus:shadow-xl focus:shadow-teal-500/20"
                  />
                </div>
                {filteredSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-[100] bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((s) => (
                      <button 
                        key={s} 
                        onClick={() => { handleCategoryChange(s); setCatSearch(""); }} 
                        className="w-full text-left px-4 py-2.5 text-[10px] text-slate-500 hover:bg-[#b3ffe2] hover:text-black transition-colors border-b last:border-0 border-slate-100 dark:border-white/5"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Quick Access</h3>
                <div className="flex flex-col gap-1">
                  {["All", "All Electronics", "All Appliances", "All Home and Kitchen", "Amazon Fashion"].map((cat) => (
                    <button key={cat} onClick={() => handleCategoryChange(cat)} className={`text-left text-xs py-2.5 px-4 rounded-xl transition-all ${selectedCategory === cat ? "bg-slate-900 text-white dark:bg-[#b3ffe2] dark:text-black font-bold shadow-md shadow-teal-500/10" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:pl-6"}`}>
                      {cat === "All Home and Kitchen" ? "Home & Kitchen" : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">
                  Max: ₹{priceRange.toLocaleString('en-IN')}
                </h3>
                <input type="range" min="500" max="100000" step="500" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full accent-teal-600 dark:accent-[#b3ffe2] cursor-pointer" />
              </div>
            </div>
          </aside>

          <main className="flex-1 bg-transparent z-10 min-h-screen">
            <div className="max-w-[1200px] mx-auto p-8 space-y-8">
              <div className="flex justify-between items-center py-4 sticky top-0 z-50 bg-transparent backdrop-blur-sm">
                  <div className="relative w-full max-w-xl group">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 group-focus-within:text-[#b3ffe2] transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && loadData(searchQuery, 1)} 
                        className="w-full rounded-full py-4 pl-14 pr-8 text-sm outline-none bg-slate-100/80 dark:bg-[#111111]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 dark:text-white transition-all duration-300 hover:bg-slate-200/50 dark:hover:bg-white/10 hover:shadow-lg hover:shadow-teal-500/10 focus:shadow-xl focus:shadow-teal-500/20 focus:border-[#b3ffe2]/30" 
                      />
                  </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-20">
                {metrics.map((item, i) => <MetricCard key={i} item={item} />)}
              </div>

              <section className="space-y-6 pb-20 relative z-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Tag className="w-5 h-5 text-teal-600 dark:text-[#b3ffe2]" /> 
                        Market Discovery {selectedCategory !== "All" && <span className="text-xs font-normal text-slate-400 ml-2">/ {selectedCategory}</span>}
                    </h2>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10">
                            <button onClick={() => { setCurrentPage(p => p - 1); loadData(searchQuery, currentPage - 1); }} disabled={currentPage === 1} className="p-1 disabled:opacity-20 hover:text-[#b3ffe2] transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                            <span className="text-xs font-bold dark:text-white">{currentPage} / {totalPages}</span>
                            <button onClick={() => { setCurrentPage(p => p + 1); loadData(searchQuery, currentPage + 1); }} disabled={currentPage === totalPages} className="p-1 disabled:opacity-20 hover:text-[#b3ffe2] transition-colors"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {isLoading ? (
                    <div className="col-span-full py-32 flex flex-col items-center gap-4 text-slate-400 font-mono tracking-widest animate-pulse">
                        <Loader2 className="w-8 h-8 animate-spin text-[#b3ffe2]" /> REFINING_NEURAL_WEIGHTS...
                    </div>
                  ) : (
                    aiProducts?.map((item, i) => (
                      <div 
                        key={item._id || i} 
                        onClick={() => router.push(`/product/${item._id || i}`)}
                        className="cursor-pointer group bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-5 transition-all duration-300 hover:border-[#b3ffe2]/30 hover:shadow-2xl hover:shadow-teal-500/10 flex flex-col h-full"
                      >
                        <div className="aspect-square overflow-hidden rounded-[1.8rem] relative bg-slate-50 dark:bg-black mb-4">
                          <img src={item.image || item.img || "https://via.placeholder.com/400x400?text=No+Image"} className="w-full h-full object-cover transition-all duration-700 bg-white" alt={item.name} onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x400?text=No+Image"; }} />
                          <div className="absolute top-4 left-4 bg-black/80 px-2 py-1 rounded-lg text-[10px] font-bold border border-white/10 flex items-center gap-1 text-white backdrop-blur-sm shadow-xl">
                              <Star className="w-3 h-3 text-[#b3ffe2] fill-current" /> 
                              {item.ai_rating ? `${item.ai_rating.toFixed(2)} (AI)` : (item.ratings || item.rating || "0.0")}
                          </div>
                        </div>

                        <div className="flex-1 space-y-3">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 h-10 leading-tight group-hover:text-teal-500 dark:group-hover:text-[#b3ffe2] transition-colors">
                            {item.name}
                          </h4>
                          <a 
                            href={item.amazon_link || item.link || "#"} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()} 
                            className="inline-flex items-center justify-center w-full gap-2 py-3 px-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400 hover:bg-black hover:text-white dark:hover:bg-[#b3ffe2] dark:hover:text-black transition-all group/btn"
                          >
                            Buy on Amazon <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        </div>

                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
                            <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter truncate max-w-[50%]">{item.main_category || "General"}</span>
                            <span className="text-lg font-black text-slate-900 dark:text-teal-500 dark:text-[#b3ffe2] group-hover:scale-110 transition-transform origin-right">
                              {item.price && item.price > 0 
                                ? `₹${item.price.toLocaleString('en-IN')}` 
                                : <span className="text-slate-400 text-sm font-medium">N/A</span>
                              }
                            </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
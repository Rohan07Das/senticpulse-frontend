'use client';

import React, { useState, useEffect, use } from 'react'; 
import { ShoppingCart, Zap, Star, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  // --- DYNAMIC BACKEND URL ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) setUserEmail(email);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/recs/product/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, API_URL]); 

  const handleAddToCart = async () => {
    if (!product) return;

    const cartKey = userEmail ? `sentic_cart_${userEmail}` : 'sentic_cart';
    const currentCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    if (currentCart.find((item: any) => item.id === productId)) {
      // --- TRIGGER TOAST INSTEAD OF ALERT ---
      window.dispatchEvent(new CustomEvent('show-toast', { 
        detail: { message: "Item already in Queue" } 
      }));
      return;
    }

    const productToAdd = {
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image || product.img
    };

    const updatedCart = [...currentCart, productToAdd];
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));

    if (userEmail) {
      try {
        await fetch(`${API_URL}/api/auth/sync-cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userEmail,
            items: updatedCart
          }),
        });
      } catch (err) {
        console.error("Cloud sync failed, saved locally.");
      }
    }

    // Update the cart icon number
    window.dispatchEvent(new Event('cartUpdate'));
    
    // --- TRIGGER SUCCESS TOAST ---
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: { message: "Product Added to Cart" } 
    }));
  };

  const handleBuyNow = async () => {
    if (!userEmail) {
      alert("Authentication required. Please sign in to establish a connection.");
      router.push('/login');
      return;
    }

    const cartKey = `sentic_cart_${userEmail}`;
    const currentCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    let updatedCart = currentCart;
    
    if (!currentCart.find((item: any) => item.id === productId)) {
      const productToAdd = {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image || product.img
      };
      updatedCart = [...currentCart, productToAdd];
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      
      try {
        await fetch(`${API_URL}/api/auth/sync-cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userEmail,
            items: updatedCart
          }),
        });
      } catch (err) {
        console.error("Cloud Buy Now sync failed");
      }

      window.dispatchEvent(new Event('cartUpdate'));
    }

    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#b3ffe2] gap-4">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest">Loading Neural Data...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <button onClick={() => router.back()} className="text-teal-500 hover:underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 animate-in fade-in duration-700">
      
      <button 
        onClick={() => router.back()} 
        className="group flex items-center gap-3 text-md font-bold text-teal-600 dark:text-[#b3ffe2/10] mb-12 hover:text-black dark:hover:text-[#b3ffe2] transition-all"
      >
        <ArrowLeft size={18} className="mb-0.7 transition-transform group-hover:-translate-x-1" />
        <span className="tracking-tight">Back</span>
      </button>

      <div className="grid grid-cols-2 md:grid-cols-12 gap-10 lg:gap-16 items-start relative">
        
        <div className="md:col-span-5 lg:col-span-4 w-full md:sticky md:top-32 self-start z-10">
          <div className="relative w-full max-w-[400px] h-[350px] rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-xl group p-6">
            
            <img 
              src={product.image || product.img || "https://via.placeholder.com/600"} 
              alt={product.name}
              className="max-w-full max-h-[250px] object-contain mix-blend-multiply dark:mix-blend-normal relative z-10 drop-shadow-xl transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600?text=No+Image"; }}
            />

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black dark:bg-[#b3ffe2] border border-white/10 shadow-md z-20">
              <span className="text-[8px] font-black uppercase tracking-widest text-white dark:text-black">
                {product.main_category || "Premium"}
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8 w-full flex flex-col space-y-6 pt-2 relative z-0">
          
          <div className="space-y-3 border-b border-slate-200 dark:border-white/10 pb-6">
            <h1 className="text-lg md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight max-w-2xl">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-black/80 dark:bg-white/10 px-2.5 py-1.5 rounded-md">
                <Star size={12} className="text-[#b3ffe2] fill-current" />
                <span className="text-[11px] font-bold text-white">
                  {product.ai_rating ? product.ai_rating.toFixed(2) : (product.ratings || product.rating || "4.5")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-bold text-slate-400">₹</span>
              <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                {product.price?.toLocaleString('en-IN') || "N/A"}
              </span>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Inclusive of all taxes</p>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 mt-2 space-y-4 max-w-lg">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
               <ShieldCheck size={14} />
               <span className="text-[10px] font-bold uppercase tracking-widest">In Stock & Ready to Ship</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 dark:hover:border-white/30 dark:hover:bg-[#000000] text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 group active:translate-y-0"
              >
                <ShoppingCart size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Add to Cart
              </button>

              <button 
                onClick={handleBuyNow}
                disabled={isProcessing}
                className="flex-1 py-3.5 px-5 bg-slate-100 hover:bg-slate-800 text-black hover:text-white dark:bg-[#0a0a0a] dark:hover:bg-white dark:text-white dark:hover:text-black rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(179,255,226,0.4)] flex items-center justify-center gap-2 hover:-translate-y-1 active:translate-y-0 active:scale-95 disabled:opacity-50 group"
              >
                {isProcessing ? 'Processing...' : 'Buy Now'} 
                {!isProcessing && <Zap size={14} fill="currentColor" className="group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />}
              </button>
            </div>
          </div>

          <div className="h-[500px]"></div>

        </div>
      </div>
    </div>
  );
}
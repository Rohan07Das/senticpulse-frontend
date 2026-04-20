'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  CreditCard, 
  Package, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Trash2
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // --- DYNAMIC BACKEND URL ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // 1. Load cart items for the specific logged-in user
  const loadCart = () => {
    const savedEmail = localStorage.getItem('userEmail');
    const cartKey = savedEmail ? `sentic_cart_${savedEmail}` : 'sentic_cart';
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // 2. Delete functionality using user-specific key
  const removeItem = (id: string) => {
    const savedEmail = localStorage.getItem('userEmail');
    const cartKey = savedEmail ? `sentic_cart_${savedEmail}` : 'sentic_cart';
    
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
    
    window.dispatchEvent(new Event('cartUpdate'));
    
    if (updated.length === 0) {
      router.push('/dashboard');
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + parseFloat(item.price.toString().replace(/,/g, '')), 0);

  // --- UPDATED: HANDLE ESTABLISH ORDER WITH API_URL ---
  const handleEstablishOrder = async () => {
    const savedEmail = localStorage.getItem('userEmail');
    const cartKey = savedEmail ? `sentic_cart_${savedEmail}` : 'sentic_cart';
    
    setLoading(true);

    try {
      const itemsForBackend = cartItems.map(item => ({
        name: item.name,
        price: item.price.toString(), 
        image: item.image || item.img 
      }));

      // 1. Dispatch Email Receipt via Backend (UPDATED URL)
      await fetch(`${API_URL}/api/auth/send-receipt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: savedEmail,
          name: localStorage.getItem('userName') || 'User',
          items: itemsForBackend,
          total: totalAmount
        }),
      });

      // 2. SAVE PERMANENT ORDER TO MONGODB (UPDATED URL)
      await fetch(`${API_URL}/api/auth/save-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: savedEmail,
          name: localStorage.getItem('userName') || 'User',
          items: itemsForBackend,
          total: totalAmount
        }),
      });

      // 3. Clear the active cart in MongoDB (UPDATED URL)
      await fetch(`${API_URL}/api/auth/sync-cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: savedEmail,
          items: [] 
        }),
      });

      setLoading(false);
      setStep(4);
      localStorage.removeItem(cartKey);
      window.dispatchEvent(new Event('cartUpdate'));
    } catch (err) {
      console.error("Neural Sync Error:", err);
      setLoading(false);
      setStep(4);
      localStorage.removeItem(cartKey);
      window.dispatchEvent(new Event('cartUpdate'));
    }
  };

  return (
    <div className="min-h-screen bg-transparent px-6 pb-20">
      <div className="max-w-6xl mx-auto"> 
        
        <button 
          onClick={() => router.back()} 
          className="group flex items-center gap-3 text-md font-bold text-teal-600 dark:text-[#b3ffe2/10] mb-12 hover:text-black dark:hover:text-[#b3ffe2] transition-all"
        >
          <ArrowLeft size={18} className="mb-0.7 transition-transform group-hover:-translate-x-1" />
          <span className="tracking-tight">Back</span>
        </button>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between px-8 py-6 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-[2rem] border border-black/5 dark:border-white/5 mb-8">
              {[
                { id: 1, label: 'Shipment', icon: MapPin },
                { id: 2, label: 'Payment', icon: CreditCard },
                { id: 3, label: 'Confirm', icon: Package }
              ].map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 ${step >= s.id ? 'bg-[#b3ffe2] text-black shadow-[0_0_15px_rgba(179,255,226,0.3)]' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                    <s.icon size={18} />
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${step >= s.id ? 'text-black dark:text-white' : 'text-slate-400'}`}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/70 dark:bg-[#b3ffe2]/5 backdrop-blur-2xl border border-slate-200 dark:border-[#b3ffe2]/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl min-h-[400px] flex flex-col justify-center">
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Delivery Coordinates</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specify the destination for neural hardware</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="FULL NAME" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-[11px] font-bold focus:outline-none focus:border-teal-500 transition-all" />
                    <input placeholder="CONTACT NUMBER" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-[11px] font-bold focus:outline-none focus:border-teal-500 transition-all" />
                    <input placeholder="POSTAL CODE" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-[11px] font-bold focus:outline-none focus:border-teal-500 transition-all" />
                    <input placeholder="CITY / STATE" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-[11px] font-bold focus:outline-none focus:border-teal-500 transition-all" />
                  </div>
                  <textarea placeholder="DETAILED ADDRESS" rows={3} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-[11px] font-bold focus:outline-none focus:border-teal-500 transition-all" />
                  <button onClick={() => setStep(2)} className="w-full py-4 bg-slate-900 dark:bg-[#b3ffe2] text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                    Initiate Neural Link <ChevronRight size={14} />
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 text-center">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Secure Payment</h2>
                  <div className="grid grid-cols-1 gap-4 py-4">
                    <button className="flex items-center justify-between p-6 rounded-2xl border-2 border-[#b3ffe2] bg-[#b3ffe2]/10 transition-all">
                      <div className="flex items-center gap-4 text-left">
                        <CreditCard className="text-teal-600 dark:text-[#b3ffe2]" />
                        <div>
                          <p className="text-[11px] font-black uppercase">Online Transaction</p>
                          <p className="text-[9px] font-bold text-slate-400">CREDIT / DEBIT / UPI</p>
                        </div>
                      </div>
                      <div className="h-4 w-4 rounded-full border-4 border-[#b3ffe2]" />
                    </button>
                    <button className="flex items-center justify-between p-6 rounded-2xl border border-slate-200 dark:border-white/10 opacity-50 grayscale cursor-not-allowed">
                      <div className="flex items-center gap-4 text-left">
                        <Package className="text-slate-400" />
                        <div>
                          <p className="text-[11px] font-black uppercase">Cash on Delivery</p>
                          <p className="text-[9px] font-bold text-slate-400">OFFLINE SYNC</p>
                        </div>
                      </div>
                    </button>
                  </div>
                  <button onClick={() => setStep(3)} className="w-full py-4 bg-slate-900 dark:bg-[#b3ffe2] text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all">
                    Finalize Transaction
                  </button>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 text-center">
                  <div className="flex justify-center"><ShieldCheck size={48} className="text-[#b3ffe2] animate-pulse" /></div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Order Verification</h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest max-w-xs mx-auto">
                    A confirmation pulse will be sent to your registered neural ID upon establishment.
                  </p>
                  <button onClick={handleEstablishOrder} disabled={loading} className="w-full py-4 bg-slate-900 dark:bg-[#b3ffe2] text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : 'ESTABLISH ORDER'}
                  </button>
                </div>
              )}
              {step === 4 && (
                <div className="text-center space-y-6 animate-in zoom-in duration-700">
                  <div className="flex justify-center text-[#b3ffe2]"><CheckCircle2 size={80} /></div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Connection Success</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Neural Receipt dispatched to your mail</p>
                  </div>
                  <button onClick={() => router.push('/dashboard')} className="px-8 py-4 bg-slate-900 dark:bg-[#b3ffe2] text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-12 space-y-6">
            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-[2.5rem] border border-black/5 dark:border-white/5 p-8 shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-[#b3ffe2] mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="w-full text-left px-5 py-4 text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-teal-500/10 dark:hover:bg-[#b3ffe2]/10 hover:text-black dark:hover:text-[#b3ffe2] rounded-2xl transition-all flex items-center gap-4 group/item overflow-hidden"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="h-14 w-14 rounded-xl bg-white p-1 border border-black/5 flex-shrink-0">
                        <img src={item.image} className="h-full w-full object-contain" alt="item" />
                      </div>
                      <div className="min-w-0 w-1/2">
                        <p className="text-[11px] font-bold dark:text-white uppercase truncate block">
                          {item.name}
                        </p>
                        <p className="text-[10px] font-black text-black dark:text-white mt-0.5">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute right-8 p-2 text-black dark:text-white hover:!text-red-500 transition-all z-30"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-black/5 dark:border-white/10 font-bold uppercase text-[10px]">
                <div className="flex justify-between text-black dark:text-white tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-black dark:text-white tracking-widest">
                  <span>Shipping Sync</span>
                  <span className="text-emerald-500">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-black text-black dark:text-white pt-4 border-t border-black/5 dark:border-white/10">
                  <span className="tracking-tighter">TOTAL</span>
                  <span className="text-black dark:text-white">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
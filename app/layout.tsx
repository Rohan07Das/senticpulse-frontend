'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { User, LogOut, Settings, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import GlobalNav from '@/components/GlobalNav';
import ThemeToggle from '@/components/ThemeToggle'; 
import { ThemeProvider } from '@/components/ThemeProvider'; 
import BackgroundBeams from '@/components/Beams';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // --- DYNAMIC BACKEND URL ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // --- CART & USER STATE ---
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userData, setUserData] = useState<{ email: string; name: string; tier: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    
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

    loadCart();

    window.addEventListener('cartUpdate', loadCart);
    return () => window.removeEventListener('cartUpdate', loadCart);
  }, [pathname]);

  // --- GLOBAL SYNC CART TO MONGODB ---
  useEffect(() => {
    const syncCartToDB = async () => {
      const savedEmail = localStorage.getItem('userEmail');
      if (!savedEmail || !mounted) return;

      try {
        // --- UPDATED TO USE API_URL ---
        await fetch(`${API_URL}/api/auth/sync-cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: savedEmail,
            items: cartItems
          }),
        });
      } catch (err) {
        console.error("Cloud cart sync failed", err);
      }
    };

    syncCartToDB();
  }, [cartItems, mounted, API_URL]);

  // --- FETCH REAL USER DATA ON LOAD ---
  useEffect(() => {
    const fetchUser = async () => {
      const savedEmail = localStorage.getItem('userEmail');
      if (!savedEmail) return;

      try {
        // --- UPDATED TO USE API_URL ---
        const res = await fetch(`${API_URL}/api/auth/user-profile/${savedEmail}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Neural Identity Link failed");
      }
    };
    
    if (mounted) fetchUser();
  }, [mounted, pathname, API_URL]);

  const removeFromCart = (id: string) => {
    const savedEmail = localStorage.getItem('userEmail');
    const cartKey = savedEmail ? `sentic_cart_${savedEmail}` : 'sentic_cart';

    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem(cartKey, JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const isAppPage = pathname.startsWith('/dashboard') || 
                    pathname.startsWith('/sentiment') || 
                    pathname.startsWith('/shippers') || 
                    pathname.startsWith('/settings') ||
                    pathname.startsWith('/checkout') ||
                    pathname.startsWith('/product');

  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black text-black dark:text-white antialiased transition-colors duration-500`}>
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {mounted && (
            <div className="fixed inset-0 z-0 pointer-events-none hidden dark:block">
              <BackgroundBeams 
                  beamWidth={1.1} beamHeight={24} beamNumber={33}
                  lightColor="#b3ffe2" speed={4} noiseIntensity={2.75}
                  scale={0.25} rotation={180}
              />
            </div>
          )}

          <div className="fixed inset-0 z-0 pointer-events-none 
                bg-[radial-gradient(circle_at_center,transparent_0%,#ffffff_100%)] 
                dark:bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] 
                opacity-70 transition-colors duration-500">
          </div>

          <Link 
            href={isAppPage ? "/dashboard" : "/"} 
            className="fixed top-6 left-8 z-[110] flex items-center gap-3 group p-2 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/5 transition-all hover:scale-105"
          >
            <div className="relative flex items-center justify-center h-10 w-10 bg-[#b3ffe2]/10 border border-[#1bdb85]/20 rounded-xl shadow-[0_0_15px_rgba(179,255,226,0.15)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1bdb85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
            </div>
            <div className="flex flex-col pr-2">
              <h1 className="text-xl font-bold tracking-tight leading-none text-black dark:text-white">SenticPulse AI</h1>
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-black dark:text-white mt-1">SME Intelligence</span>
            </div>
          </Link>

          <div className="fixed top-8 right-8 z-[130] flex items-center gap-3">
            
            {isAppPage && (
              <div className="group relative">
                <button className="h-10 w-10 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md flex items-center justify-center text-slate-900 dark:text-[#b3ffe2] border border-black/5 dark:border-white/5 shadow-sm hover:scale-110 active:scale-95 transition-all duration-300 relative z-[140]">
                  <ShoppingCart size={18} />
                  {cartItems.length > 0 && (
                    <span className="absolute bottom-0 right-0 translate-x-1 translate-y-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[6px] font-black text-white border border-white dark:border-black shadow-sm">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {/* --- CART DROPDOWN MENU --- */}
                <div className="absolute right-0 top-full pt-4 w-64 opacity-0 invisible translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] z-[150]">
                  <div className="bg-white dark:bg-[#0a0a0a] backdrop-blur-3xl border border-black/10 dark:border-[#b3ffe2]/20 rounded-[2rem] shadow-2xl overflow-hidden py-3">
                    <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 mb-2 bg-slate-50 dark:bg-[#b3ffe2]/5">
                      <p className="text-[9px] font-black text-teal-600 dark:text-[#b3ffe2] uppercase tracking-[0.2em]">Cart</p>
                    </div>

                    <div className="max-h-80 overflow-y-auto overflow-x-hidden px-2 space-y-2 custom-scrollbar">
                      {cartItems.length === 0 ? (
                        <div className="py-12 text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cart Empty</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {cartItems.map((item) => (
                            <div 
                              key={item.id} 
                               className="w-full text-left px-5 py-4 text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-teal-500/10 dark:hover:bg-[#b3ffe2]/10 hover:text-black dark:hover:text-[#b3ffe2] rounded-2xl transition-all flex items-center gap-4 group/item relative"
                            >
                              <div className="h-10 w-10 bg-white rounded-lg p-1 flex-shrink-0 z-10">
                                <img src={item.image} alt="" className="h-full w-full object-contain" />
                              </div>
                              <div className="ml-3 w-1/2 min-w-0">
                                <p className="text-[10px] font-bold dark:text-white uppercase truncate block">{item.name}</p>
                                <p className="text-[9px] font-black text-black dark:text-white mt-0.5">₹{item.price}</p>
                              </div>

                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeFromCart(item.id);
                                }} 
                                className="absolute right-3 p-2 text-black dark:text-white hover:!text-red-500 transition-all z-20 outline-none"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {cartItems.length > 0 && (
                      <div className="px-3 mt-3 pt-2 border-t border-black/5 dark:border-white/5">
                        <Link href="/checkout" className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 dark:bg-[#b3ffe2] text-white dark:text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md">
                          Checkout <ArrowRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>             
              </div>
            )}

            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-full border border-black/5 dark:border-white/5 shadow-sm transition-colors">
              <ThemeToggle />
            </div>

            {isAppPage && (
              <div className="group relative">
                <button className="h-10 w-10 rounded-full bg-slate-900 dark:bg-[#b3ffe2] flex items-center justify-center text-white dark:text-black border-2 border-white dark:border-black shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 relative z-[140]">
                  <User size={18} strokeWidth={2.5} />
                </button>
                
                <div className="absolute right-0 top-full pt-4 w-64 opacity-0 invisible translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] z-[150]">
                  <div className="bg-white dark:bg-[#0a0a0a] backdrop-blur-3xl border border-black/10 dark:border-[#b3ffe2]/20 rounded-[2.5rem] shadow-2xl overflow-hidden py-3">
                    <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 mb-2 bg-slate-50 dark:bg-[#b3ffe2]/5">
                      <p className="text-[9px] font-black text-teal-600 dark:text-[#b3ffe2] uppercase tracking-[0.2em] mb-1">
                        Neural ID: {userData?.tier || 'Enterprise'}
                      </p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate capitalize">
                        {userData?.name || 'Syncing Identity...'}
                      </p>
                    </div>
                    
                    <div className="px-3 space-y-1">
                      <button 
                        onClick={() => router.push('/settings')} 
                        className="w-full text-left px-5 py-4 text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-teal-500/10 dark:hover:bg-[#b3ffe2]/10 hover:text-black dark:hover:text-[#b3ffe2] rounded-2xl transition-all flex items-center gap-4 group/item"
                      >
                        <Settings size={16} className="group-hover/item:rotate-90 transition-transform duration-500" /> 
                        Account Settings
                      </button>
                      
                      <button 
                        onClick={() => {
                          localStorage.removeItem('userEmail');
                          localStorage.removeItem('userName');
                          setUserData(null);
                          router.push('/');
                        }} 
                        className="w-full text-left px-5 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-2xl transition-all flex items-center justify-between group/logout"
                      >
                        <span>Sign Out</span>
                        <LogOut size={16} className="group-hover/logout:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isAppPage && !isAuthPage && (
              <Link href="/register" className="px-6 py-2.5 bg-slate-900 dark:bg-[#b3ffe2] text-white dark:text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                Sign In
              </Link>
            )}
          </div>

          <GlobalNav />

          <main className="relative z-10 min-h-screen pt-36">
            {children}
          </main>

          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>

        </ThemeProvider>
      </body>
    </html>
  );
}
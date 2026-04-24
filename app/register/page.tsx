'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, User, Loader2, ShieldCheck, Users } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  
  // --- DYNAMIC BACKEND URL ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // 1. UI STATE
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roleMode, setRoleMode] = useState<'user' | 'admin'>('user'); 

  // 2. FORM DATA STATE
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // FEATURE: Including 'role' in the body so MongoDB can store it
        body: JSON.stringify({ 
          ...formData, 
          role: roleMode 
        }), 
      });

      const data = await response.json();

      if (response.ok && (data.status === 'success' || data.message === 'Registration successful!')) {
        
        // --- SYNC SESSION DATA ---
        localStorage.setItem('userEmail', data.user.email);
        
        // Use the role returned from the database to ensure consistency
        const confirmedRole = data.user.role || roleMode;
        localStorage.setItem('userRole', confirmedRole); 
        
        if (data.user && data.user.name) {
          localStorage.setItem('userName', data.user.name);
        }
        
        // --- SIMULTANEOUS ACCESS LOGIC ---
        if (confirmedRole === 'admin') {
          // Opens User Dashboard in new tab, sends current tab to Admin Panel
          window.open('/dashboard', '_blank'); 
          router.push('/admin-stats');        
        } else {
          router.push(data.redirect_to || '/dashboard'); 
        }
      } else {
        setError(data.detail || 'Access Denied: Neural mismatch');
      }
    } catch (err) {
      setError('Neural Core Offline: Check your backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-6 overflow-hidden transition-colors duration-500 bg-transparent">
      
      {/* --- BACKGROUND ADAPTER --- */}
      <div className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-500">
        <div className="block dark:hidden absolute inset-0 bg-white bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10 -mt-20">
        
        {/* --- ROLE TOGGLE (Pricing Style) --- */}
        <div className="pricing-toggle-container relative p-1.5 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-full flex items-center shadow-sm w-full h-14 shrink-0">
          <button 
              type="button"
              onClick={() => setRoleMode('user')}
              className={`relative z-20 flex-1 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 flex items-center justify-center gap-2 ${roleMode === 'user' ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}
          >
              <Users className="w-3.5 h-3.5" /> User
          </button>
          <button 
              type="button"
              onClick={() => setRoleMode('admin')}
              className={`relative z-20 flex-1 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 flex items-center justify-center gap-2 ${roleMode === 'admin' ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}
          >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Core
          </button>
          
          <div 
              className={`absolute top-1.5 left-1.5 bottom-1.5 w-[calc(50%-3px)] bg-slate-900 dark:bg-[#b3ffe2] rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 ${
                  roleMode === 'admin' ? 'translate-x-[calc(100%-3px)]' : 'translate-x-0'
              }`} 
          />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">
            {isRegistering ? 'Register Identity' : 'Secure Access'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm italic font-medium">
            Authorized for <span className="text-teal-600 dark:text-[#b3ffe2] font-bold">{roleMode.toUpperCase()}</span> clearance
          </p>
        </div>

        <div className="bg-white/70 dark:bg-[#b3ffe2]/5 backdrop-blur-2xl border border-slate-200 dark:border-[#b3ffe2]/10 p-8 rounded-[2.5rem] shadow-xl dark:shadow-2xl">
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              
              {isRegistering && (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Rohan"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder={roleMode === 'admin' ? 'admin@senticpulse.ai' : 'user@senticpulse.ai'}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4">Neural Access Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50 text-white dark:text-black ${roleMode === 'admin' ? 'bg-teal-600 hover:bg-teal-700 dark:bg-[#b3ffe2] dark:hover:bg-[#9debc9]' : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200'}`}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRegistering ? 'ESTABLISH IDENTITY' : `LOGIN AS ${roleMode.toUpperCase()}`)} 
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 text-center">
            <p className="text-xs text-slate-500">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                }}
                type="button"
                className="text-teal-600 dark:text-[#b3ffe2] font-bold hover:underline"
              >
                {isRegistering ? 'Login Now' : 'Request Access'}
              </button>
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 opacity-60 dark:opacity-40">
           <div className="h-1 w-1 rounded-full bg-teal-500 dark:bg-[#b3ffe2]" />
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">End-to-End Encrypted</span>
           <div className="h-1 w-1 rounded-full bg-teal-500 dark:bg-[#b3ffe2]" />
        </div>
      </div>
    </div>
  );
}
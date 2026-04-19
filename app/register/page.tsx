'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, User, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  
  // --- DYNAMIC BACKEND URL ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // 1. UI STATE
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    // Determine which API endpoint to hit
    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';

    try {
      // --- UPDATED TO USE API_URL ---
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Check for success status from backend
      if (response.ok && (data.status === 'success' || data.message === 'Registration successful!')) {
        
        // --- DATABASE-FIRST IDENTITY LOGIC ---
        
        // 1. Save verified email from response
        localStorage.setItem('userEmail', data.user.email);
        
        // 2. ONLY use the name returned by MongoDB Atlas
        if (data.user && data.user.name) {
          localStorage.setItem('userName', data.user.name);
        }
        
        // Success redirect
        router.push(data.redirect_to || '/dashboard'); 
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

      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10 -mt-40">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">
            {isRegistering ? 'Register Identity' : 'Secure Access'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {isRegistering ? 'Create a new profile with' : 'Enter your credentials to sync with'}{' '}
            <span className="text-teal-600 dark:text-[#b3ffe2] font-bold">SenticPulse AI</span>
          </p>
        </div>

        <div className="bg-white/70 dark:bg-[#b3ffe2]/5 backdrop-blur-2xl border border-slate-200 dark:border-[#b3ffe2]/10 p-8 rounded-[2.5rem] shadow-xl dark:shadow-2xl">
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              
              {/* Name Input - ONLY VISIBLE DURING REGISTRATION */}
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
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-teal-500 dark:focus:border-[#b3ffe2]/50 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="admin@senticpulse.ai"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-teal-500 dark:focus:border-[#b3ffe2]/50 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
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
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-teal-500 dark:focus:border-[#b3ffe2]/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ERROR DISPLAY */}
            {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 dark:bg-[#b3ffe2] hover:bg-slate-800 dark:hover:bg-[#9debc9] text-white dark:text-black rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-slate-200 dark:shadow-[#b3ffe2]/20 flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRegistering ? 'ESTABLISH IDENTITY' : 'ESTABLISH CONNECTION')} 
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

        {/* FOOTER TAG */}
        <div className="flex justify-center items-center gap-2 opacity-60 dark:opacity-40">
           <div className="h-1 w-1 rounded-full bg-teal-500 dark:bg-[#b3ffe2]" />
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">End-to-End Encrypted</span>
           <div className="h-1 w-1 rounded-full bg-teal-500 dark:bg-[#b3ffe2]" />
        </div>

      </div>
    </div>
  );
}
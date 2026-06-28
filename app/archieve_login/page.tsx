'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ArchiveLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    
    const hash = window.location.hash;
    if (hash && hash.includes('access_token=')) {
       
      setLoading(true);
          const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');

      if (accessToken) {
        
        window.history.replaceState(null, '', window.location.pathname);

        fetch(`${API_URL}/auth/oauth-login`, {
          method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token: accessToken })
        })
          .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            
           
            localStorage.setItem('token', data.token);
            
        
            router.push('/canvas');
          } else {
        
            const errorData = await res.json().catch(() => ({}));
        
            alert(errorData.message || "Access Denied. You must request access first.");
             console.log("Error message is"+errorData)
            setLoading(false);
          }
        })
        .catch(err => {
          console.error("Failed to sync oauth session", err);
          alert("A network error occurred. Please try again.");
      
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  const handleGoogleLogin = async () => {
         setLoading(true);
    try {
      
      const res = await fetch(`${API_URL}/auth/google-url?redirectTo=${encodeURIComponent(window.location.origin + '/archieve_login')}`);
      
      if (res.ok) {
        const data = await res.json();
            if (data.url) {
          window.location.href = data.url;
          return;
        }
       
      }
      throw new Error("Failed to get Google login URL");
    } catch (err) {
      console.error(err);
      alert("Failed to initiate Google login");
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
        const data = await res.json();
       
        console.log("tokenset")
      
        localStorage.setItem('token', data.token);
        router.push('/canvas');
     
      } else {
          const errorData = await res.json().catch(() => ({}));
          alert(errorData.message || "Invalid email or password");
          console.log("Error comming is"+errorData)
          
        setLoading(false);
      }
    } catch (err) {
       console.error(err);
        alert("A network error occurred. Please try again.");
      console.log("a netwrok error came inthe backend")
      
      setLoading(false);
    }
  };

  return (
    <div className="page-shell bg-[var(--background)] font-['Inter'] text-[var(--foreground)] antialiased min-h-screen">
      
      

     

      <main className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden pt-24">
        
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--surface)] -z-10"></div>
        
        <div className="w-full max-w-md mt-16 px-6">
          <div className="text-center mb-12">
            <h1 className="font-['Inter'] text-[var(--text-main)] text-xl font-black uppercase tracking-widest mb-2">Private Archive</h1>
            <p className="text-[var(--text-muted)] text-sm font-medium tracking-tight">Access restricted to authorized lineage members</p>
          </div>
          
          <div className="bg-[var(--surface-elevated)] shadow-[0_10px_40px_-10px_rgba(24,32,52,0.06)] rounded-xl p-8 md:p-12 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#3b1600] rounded-t-xl"></div>
            
            <form className="space-y-8" onSubmit={handleEmailLogin}>
                 <div className="space-y-1">
                   <label className="block text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-wider text-[var(--text-muted)]" htmlFor="email">
                      Email Address
               
               
                 </label>
                <input 
                  className="w-full bg-[var(--surface-2)] border-0 border-b border-[var(--border-strong)] px-2 py-3 text-sm focus:ring-0 focus:border-[#182034] transition-all placeholder:text-[#c4c6cf]" 
                    id="email" 
                     name="email" 
                    placeholder="lineage@archive.net" 
                    type="email"
                     value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     disabled={loading}
                    required
                  />
              </div>
              
              <div className="space-y-1">
                <label className="block text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-wider text-[var(--text-muted)]" htmlFor="password">
                  Password
                   </label>
                  <input 
                     className="w-full bg-[var(--surface-2)] border-0 border-b border-[var(--border-strong)] px-2 py-3 text-sm focus:ring-0 focus:border-[#182034] transition-all placeholder:text-[#c4c6cf]" 
                   id="password" 
                    name="password" 
                  placeholder="••••••••" 
                      type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     disabled={loading}
                  required
                />
              </div>
                
              <div className="pt-4 flex flex-col gap-3">
                  <button 
                    className="w-full btn-primary py-4 px-6 font-['Inter'] text-sm tracking-tight active:scale-[0.98] flex items-center justify-center gap-2 group" 
                     type="submit"
                    disabled={loading}
                  >
                  {loading ? 'Authenticating...' : 'Login'}
                  {!loading && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                  </button>

                <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-[var(--surface)] text-[var(--text-main)] py-4 px-6 font-['Inter'] text-sm tracking-tight active:scale-[0.98] flex items-center justify-center gap-3 rounded-xl hover:bg-[var(--surface-elevated)] transition-colors border border-[var(--border-strong)]" 
                >
              
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                  {loading ? 'Redirecting...' : ' Google'}
                  </button>
              </div>
            </form>
            
            <div className="mt-10  border-t border-[var(--border)]/10 flex flex-col items-center gap-4">
                <Link className="text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-widest text-[#f0813a] hover:text-[#3b1600] transition-colors" href="/requestform">
                  Request Access
                 </Link>
              
                <Link className="text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-widest text-[#f0813a] hover:text-[#3b1600] transition-colors" href="/canvas/guest">
                   Guest Login
                </Link>
              
                 <div className="flex items-center gap-2 opacity-40">
                <span className="h-px w-8 bg-[#74777f]"></span>
                  <span className="material-symbols-outlined text-[10px]">shield</span>
                  <span className="h-px w-8 bg-[#74777f]"></span>
                 </div>
      
             </div>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6 px-4">
            <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse"></div>
              <span className="text-[0.6875rem] font-['Inter'] uppercase tracking-widest text-[var(--text-muted)]">Server Status: Online</span>
              </div>
        
            </div>
        </div>

      </main>

    </div>
  );
}
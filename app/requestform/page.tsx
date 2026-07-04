'use client';
import {useState, useEffect, FormEvent} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const APIURL= process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ArchiveSignup() {
  const router = useRouter();
  const [name,setName]= useState("");
  const [email,setEmail] = useState("");
  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPending) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`${APIURL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          if (res.ok) {
            const data = await res.json();
            localStorage.setItem('token', data.token);
            clearInterval(interval);
            router.push('/canvas');
          }
        } catch (err) {
          console.error("Status check failed", err);
        }
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPending, email, password, router]);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords wrong");
      console.log("password wrong")
      return;
    }
    
    try {
        const response = await fetch(`${APIURL}/auth/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                phonenumber: mobile,
                password
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Failed  sign up");
            console.log("failed  signup")
        }
        
        // Switch to pending screen, don't clear email/password as we need them for polling
        setIsPending(true);
    } catch (err: any) {
        alert(err.message);
    }
  };
  
  return (
    <div className="page-shell bg-[var(--background)] font-['Inter'] text-[var(--foreground)] antialiased min-h-screen">
      
      <main className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden pt-16 md:pt-24 pb-12">
        
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--surface)] -z-10"></div>
          
        <div className="w-full max-w-md mt-8 px-6">
          <div className="text-center mb-12">
            <h1 className="font-['Inter'] text-[var(--text-main)] text-xl font-black uppercase tracking-widest mb-2">Join the Archive</h1>
            <p className="text-[var(--text-muted)] text-sm font-medium tracking-tight">Request lineage member authorization</p>
          </div>
          
          <div className="bg-[var(--surface-elevated)] shadow-[0_10px_40px_-10px_rgba(24,32,52,0.06)] rounded-xl p-8 md:p-12 relative min-h-[400px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#3b1600] rounded-t-xl"></div>
            
            {isPending ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-8 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-[#3b1600]/10 rounded-full flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-3xl text-[#3b1600]">hourglass_empty</span>
                </div>
                <h2 className="font-['Inter'] text-[var(--text-main)] text-lg font-bold uppercase tracking-wider">Account Pending</h2>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  Your account has been sent for verification. Please wait while an administrator reviews your request.
                </p>
                <div className="flex items-center gap-2 mt-4 text-[#f0813a]">
                  <svg className="animate-spin h-3.5 w-3.5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-widest">Checking status...</span>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSignup}>
                <div className="space-y-1">
                  <label className="block text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-wider text-[var(--text-muted)]" htmlFor="fullName">
                    Full Name
                  </label>
                  <input 
                    className="w-full bg-[var(--surface-2)] border-0 border-b border-[var(--border-strong)] px-0 py-3 text-sm focus:ring-0 focus:border-[#182034] transition-all placeholder:text-[#c4c6cf]" 
                    id="fullName" 
                    name="fullName" 
                    placeholder="E.g. John Doe" 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-wider text-[var(--text-muted)]" htmlFor="email">
                    Email Address
                  </label>
                  <input 
                    className="w-full bg-[var(--surface-2)] border-0 border-b border-[var(--border-strong)] px-0 py-3 text-sm focus:ring-0 focus:border-[#182034] transition-all placeholder:text-[#c4c6cf]" 
                    id="email" 
                    name="email" 
                    placeholder="lineage@archive.net" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-wider text-[var(--text-muted)]" htmlFor="mobile">
                    Phone Number
                  </label>
                  <input 
                    className="w-full bg-[var(--surface-2)] border-0 border-b border-[var(--border-strong)] px-0 py-3 text-sm focus:ring-0 focus:border-[#182034] transition-all placeholder:text-[#c4c6cf]" 
                    id="mobile" 
                    name="mobile" 
                    placeholder="9876543210"
                    type="number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-wider text-[var(--text-muted)]" htmlFor="password">
                    Password
                  </label>
                  <input 
                    className="w-full bg-[var(--surface-2)] border-0 border-b border-[var(--border-strong)] px-0 py-3 text-sm focus:ring-0 focus:border-[#182034] transition-all placeholder:text-[#c4c6cf]" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-wider text-[var(--text-muted)]" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input 
                    className="w-full bg-[var(--surface-2)] border-0 border-b border-[var(--border-strong)] px-0 py-3 text-sm focus:ring-0 focus:border-[#182034] transition-all placeholder:text-[#c4c6cf]" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="••••••••" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <div className="pt-6">
                  <button 
                     className="w-full btn-primary py-4 px-6 font-['Inter'] text-sm tracking-tight active:scale-[0.98] flex items-center justify-center gap-2 group" 
                     type="submit"
                  >
                    Create Account
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </form>
            )}
            
            <div className="mt-10 pt-8 border-t border-[var(--border)]/10 flex flex-col items-center gap-4">
               <Link className="text-[0.6875rem] font-['Inter'] font-bold uppercase tracking-widest text-[#f0813a] hover:text-[#3b1600] transition-colors" href="/archieve_login">
                 Already have an account? Login
              </Link>
              <div className="flex items-center gap-2 opacity-40">
                <span className="h-px w-8 bg-[#74777f]"></span>
                 <span className="material-symbols-outlined text-[10px]">shield</span>
                 <span className="h-px w-8 bg-[#74777f]"></span>
               </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col justify-center items-center gap-6 px-4">
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
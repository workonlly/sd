'use client';

import Link from 'next/link';
import Image from 'next/image';


export default function About() {
  return (
    <div className="page-shell bg-[var(--background)] text-[var(--foreground)] selection:bg-[#ffdbca] selection:text-[#331200] min-h-screen">
      
      {/* Inject Fonts and Icons directly for single-file independence */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body { font-family: 'Inter', sans-serif; }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-left {
          opacity: 0;
          animation: fade-in-left 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-right {
          opacity: 0;
          animation: fade-in-right 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}} />

     

      <main className="pt-24">
        {/* Section 1: Hero - Origin Narrative */}
        <section className="max-w-7xl mx-auto px-8 py-20 md:py-32 animate-fade-in-up stagger-1">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7 space-y-8 animate-fade-in-left stagger-1">
              <span className="inline-block px-3 py-1 bg-[#ffdbca] text-[#331200] text-[0.6875rem] uppercase tracking-widest font-bold rounded-sm">
                Origin Narrative
              </span>
              <h1 className="text-[var(--text-main)] text-5xl md:text-[3.5rem] leading-[1.1] font-extrabold tracking-tighter max-w-2xl">
                Curiosity, Resilience, and Systems-Level Thinking.
              </h1>
              <div className="max-w-xl">
                <p className="text-[var(--text-muted)] leading-[1.6] text-lg font-['Inter']">
                  My journey into data architecture and public policy didn't begin in a classroom—it began with a question about my family's history. At 18, while drafting an essay on the 1947 Bengali Language Movement, I uncovered lost connections to vital political figures in the Indian subcontinent.
                </p>
              </div>
              <div className="pt-4">
                <button className="flex items-center gap-3 text-[var(--text-main)] font-bold group transition-all hover:translate-x-1">
                  <span className="text-sm uppercase tracking-widest">Read the Full Narrative</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_right_alt</span>
                </button>
              </div>
            </div>
            
            <div className="md:col-span-5 relative animate-fade-in-right stagger-2">
              <div className="aspect-[4/5] bg-[var(--surface-2)] rounded-xl overflow-hidden shadow-2xl relative hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <Image
                  alt="Areeb Uzzaman speaking at a professional podium" 
                  className="w-full h-full object-cover" 
                  src="/Photo1.jpg" 
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              {/* Tonal Layering Accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#ffb68e]/30 -z-10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* Section 2: The 500-Year Archive Project */}
        <section className="bg-[var(--surface)] py-32 animate-fade-in-up stagger-2">
          <div className="max-w-5xl mx-auto px-8">
            <div className="flex flex-col gap-16 items-center">
              {/* Text Content */}
              <div className="w-full text-center space-y-8 animate-fade-in-up stagger-2 max-w-3xl">
                <h2 className="text-[var(--text-main)] text-4xl md:text-[2.75rem] font-bold tracking-tight">Architecting the Past.</h2>
                <p className="text-[var(--text-muted)] text-lg leading-[1.7]">
                  What started as a personal inquiry grew into the Independent Archival Research Project. Over three years, I architected a verified lineage database of over 3,100 individuals, navigating the complexities of 500 years of historical data.
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8 pt-6 max-w-sm mx-auto">
                  <div className="space-y-2 p-4 rounded-lg bg-[var(--background)]/50 backdrop-blur-sm border border-[var(--border)]">
                    <div className="text-3xl font-bold text-[#f0813a] tracking-tighter">3,100+</div>
                    <div className="text-[0.6875rem] uppercase tracking-widest text-[var(--text-muted)] font-semibold">Verified Records</div>
                  </div>
                  <div className="space-y-2 p-4 rounded-lg bg-[var(--background)]/50 backdrop-blur-sm border border-[var(--border)]">
                    <div className="text-3xl font-bold text-[#f0813a] tracking-tighter">500 yrs</div>
                    <div className="text-[0.6875rem] uppercase tracking-widest text-[var(--text-muted)] font-semibold">Temporal Scope</div>
                  </div>
                </div>
              </div>

              {/* Centered Image */}
              <div className="w-full max-w-md animate-fade-in-up stagger-3">
                <div className="aspect-[3/4] bg-[#182034] rounded-xl overflow-hidden shadow-xl border-t-4 border-[#f0813a] relative hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <Image
                    alt="Areeb researching in a grand library" 
                    className="w-full h-full object-cover" 
                    src="/Photo2.jpg" 
                    fill
                    sizes="(max-width: 768px) 100vw, 28vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Ethos (Off the Desk) */}
        <section className="py-32 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="bg-[var(--surface-elevated)] p-12 md:p-20 rounded-2xl shadow-sm border-t-4 border-[#3b1600]">
              <div className="grid md:grid-cols-12 gap-16 items-center">
                <div className="md:col-span-7 space-y-10">
                  <div className="space-y-4">
                    <span className="text-[#f0813a] font-bold text-xs uppercase tracking-[0.2em]">Personal Discipline</span>
                    <h2 className="text-[var(--text-main)] text-3xl md:text-4xl font-bold tracking-tight">The Discipline of Continuous Improvement.</h2>
                  </div>
                  <p className="text-[var(--text-muted)] text-lg leading-[1.8]">
                    Whether I am analyzing algorithmic rent-setting policies or reconstructing genealogical nodes, my approach remains the same: sustained dedication yields results. Through a strict dedication to strength training and weightlifting, I maintain the mental fortitude required for deep analytical work.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-4 py-2 bg-[#d5e3fd] text-[#57657b] text-xs font-bold rounded-lg uppercase">Data Architecture</span>
                    <span className="px-4 py-2 bg-[#d5e3fd] text-[#57657b] text-xs font-bold rounded-lg uppercase">Public Policy</span>
                    <span className="px-4 py-2 bg-[#ffb68e] text-[#763300] text-xs font-bold rounded-lg uppercase">Strength Training</span>
                  </div>
                </div>
                
                <div className="md:col-span-5">
                  <div className="aspect-square bg-[var(--surface)] rounded-full overflow-hidden border-8 border-white shadow-xl relative group">
                    <Image
                      alt="Areeb Uzzaman with a baby goat" 
                      className="w-full h-full object-cover transition-all duration-700" 
                      src="/Photo3.jpg" 
                      fill
                      sizes="(max-width: 768px) 100vw, 34vw"
                    />
                    <div className="absolute inset-0 bg-[#182034]/10 mix-blend-multiply opacity-0 transition-opacity"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      

    </div>
  );
}
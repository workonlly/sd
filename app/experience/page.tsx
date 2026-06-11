'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Experience() {
  const experiences = [
    {
      period: "2023 – 2025",
      title: "Health and Education for All (HAEFA)",
      role: "Project Lead & Strategic Operations",
      desc: [
        "Directed digital transformations and modernization of operational workflows for global health initiatives.",
        "Secured official Meta nonprofit verification, significantly expanding digital outreach and fundraising capacity.",
        "Produced \"Ignited Tears\" documentary, highlighting humanitarian efforts in resource-limited settings."
      ],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt0cVEtQzZMcz-AFwjS-UtTGr3w2OnqfrpgGoqinsqQcNl5tO3Ap1Rg5GouHT_89sBkAr3gdcOgc_Mz2mhk2GTM3eX_4-CYf7ROGnfuSolwROVLJOTO_dmKQM4cNEJ7HtaegbiJd-IMArg5zC4Sd9UqmVHqW-V-xLdFEYB8bHg9TSuaXOkrSmaVG91KklI_FqFnkmpWOEodlHjIN4tlwkziBExmwh2id7cFWmKpzz0vrWf11WEsbgfcyoYChksozjYM9Pzo7K_bW6L"
    },
    {
      period: "2025",
      title: "Brown University",
      role: "Research Strategy Intern | Office of Research Strategy & Development",
      desc: [
        "Overhauled institutional funding pipeline to streamline multi-disciplinary grant applications.",
        "Benchmarked 20 international foundations to identify strategic growth opportunities for research funding.",
        "Established a Comprehensive Proposal Library to serve as a high-value resource for faculty and investigators."
      ],
      focus: "Bridging the gap between academic innovation and fiscal sustainability through data-driven strategy.",
      tags: ["Benchmarking", "Grant Strategy", "Institutional Growth"]
    },
    {
      period: "2025",
      title: "Children's Specialized Hospital",
      role: "CDID Intern",
      desc: [
        "Engineered clinical trial proposal for Embrace2 wearable, focusing on pediatric neuro-monitoring.",
        "Authored comprehensive white paper on AI integration in pediatric rehabilitation frameworks.",
        "Developed research protocols for investigating efficacy of next-gen digital health interventions."
      ],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8YH6yfgWfuvuQJEgqPZadzK2i04NSdwJqzkWhXlSPKRSWoXGu8ppv_rc7T221vLNlpOnwNS5ArxVE2Z-ovz0qRMTBZO9LPF0IpCNObpTvOUjSe_kcoIPn-SJSWJsEONn41vwYMzkDIHgJQMnamf2980vG6Tw7nGd1gpNAEcJiT_faJKpkXurFFPGOK-eJvdPMhSAcuIcK8ulweC97vDMe90gkAwK1lWfBE4oz1X9FGBQ1ut6zpgkvklsnA0qEngx_ePaxWzKci3dy"
    }
  ];

  const testimonials = [
    {
      highlight: "Areeb stands out as a driven, compassionate, and forward-thinking individual...",
      quote: "marrying technical skills with a sincere dedication to social betterment.",
      author: "Dr. Tremayne Waller",
      title: "Director of Graduate Student Programs, Virginia Tech College of Engineering"
    },
    {
      highlight: "Mr. Uzzaman is characterized by immense energy, dedication, initiative, leadership, and sincerity...",
      quote: "all underpinned by a profound commitment to positive social impact.",
      author: "Dr. Ruhul Abid, MD, PhD",
      title: "Associate Professor, Brown University Alpert Medical School; President, HAEFA"
    },
    {
      highlight: "Areeb's collaborative nature and communication skills showed that he was not just a great intern...",
      quote: "but will be a great employee for any organization.",
      author: "Jimmy Weber",
      title: "Director, CDID, Children's Specialized Hospital"
    }
  ];


  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] selection:bg-[#ffdbca] selection:text-[#331200] min-h-screen">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(240, 129, 58, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(240, 129, 58, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(240, 129, 58, 0);
          }
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      <main className="max-w-7xl mx-auto px-8 py-24">
        {/* Header */}
        <header className="mb-24 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#f0813a] font-bold tracking-widest text-[0.6875rem] uppercase mb-4">CURRICULUM VITAE</p>
              <h1 className="text-[var(--text-main)] text-[3.5rem] font-extrabold tracking-tighter leading-tight mb-6">Professional Trajectory</h1>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-xl">
                An overview of my contributions across strategic operations, institutional research, and clinical engineering within the global health and higher education sectors.
              </p>
            </div>
            
          </div>
        </header>

        {/* Timeline Section */}
        <section className="space-y-20 relative mb-32 pl-12">
          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-[#f0813a] opacity-60"></div>
          
          {experiences.map((exp, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start group relative" style={{ animationDelay: `${idx * 0.1}s` }}>
              {/* Timeline dot */}
              <div className="absolute left-0 top-4 w-6 h-6 bg-[#f0813a] rounded-full border-4 border-[var(--background)] transform -translate-x-1/2 z-10 animate-pulse-ring"></div>
              
              {idx % 2 === 0 ? (
                <>
                  <div className="order-2 md:order-1 animate-slide-in-right" style={{ animationDelay: `${idx * 0.15}s` }}>
                    <div className="inline-block px-3 py-1 bg-[#ffdbca] text-[#331200] text-sm font-bold rounded mb-4">
                      {exp.period}
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">{exp.title}</h3>
                    <p className="text-[#f0813a] font-semibold italic mb-6">{exp.role}</p>
                    <ul className="text-[var(--text-muted)] space-y-0 leading-relaxed max-w-lg">
                      {exp.desc.map((item, j) => (
                        <li key={j} className="flex gap-3 py-3 border-b border-[var(--border)]/20 last:border-b-0">
                          <span className="material-symbols-outlined text-[var(--text-main)] text-sm mt-1 flex-shrink-0">check_circle</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {exp.img ? (
                    <div className="order-1 md:order-2 animate-slide-in-left" style={{ animationDelay: `${idx * 0.15 + 0.1}s` }}>
                      <div className="rounded-xl overflow-hidden bg-[var(--surface)] shadow-sm hover:shadow-md transition-shadow relative h-80 hover:scale-[1.02] hover:-translate-y-1 duration-300">
                        <Image alt={exp.title} className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700" src={exp.img} fill sizes="(max-width: 768px) 100vw, 45vw" />
                      </div>
                    </div>
                  ) : (
                    <div className="order-1 md:order-2 animate-slide-in-left" style={{ animationDelay: `${idx * 0.15 + 0.1}s` }}>
                      {exp.focus && (
                        <div className="bg-[var(--surface-elevated)] p-8 rounded-xl border-t-4 border-[#3b1600] shadow-[0_10px_40px_rgba(24,32,52,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                          <h4 className="text-[var(--text-main)] font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                            <span className="material-symbols-outlined text-sm">analytics</span> Strategic Focus
                          </h4>
                          <p className="text-[var(--text-muted)] italic mb-6">&quot;{exp.focus}&quot;</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.tags?.map((tag, t) => (
                              <span key={t} className="bg-[var(--surface-2)] px-3 py-1 text-[0.6875rem] font-bold uppercase rounded hover:bg-[#f0813a]/10 transition-all duration-300">{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="animate-slide-in-left" style={{ animationDelay: `${idx * 0.15}s` }}>
                    <div className="inline-block px-3 py-1 bg-[var(--surface-2)] text-[#57657b] text-sm font-bold rounded mb-4">
                      <span className="text-[var(--text-muted)]">{exp.period}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">{exp.title}</h3>
                    <p className="text-[#f0813a] font-semibold italic mb-6">{exp.role}</p>
                    <ul className="text-[var(--text-muted)] space-y-0 leading-relaxed max-w-lg">
                      {exp.desc.map((item, j) => (
                        <li key={j} className="flex gap-3 py-3 border-b border-[var(--border)]/20 last:border-b-0">
                          <span className="material-symbols-outlined text-[var(--text-main)] text-sm mt-1 flex-shrink-0">check_circle</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {exp.img ? (
                    <div className="animate-slide-in-right" style={{ animationDelay: `${idx * 0.15 + 0.1}s` }}>
                      <div className="rounded-xl overflow-hidden bg-[var(--surface)] shadow-sm hover:shadow-md transition-shadow relative h-80 hover:scale-[1.02] hover:-translate-y-1 duration-300">
                        <Image alt={exp.title} className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700" src={exp.img} fill sizes="(max-width: 768px) 100vw, 45vw" />
                      </div>
                    </div>
                  ) : (
                    <div className="animate-slide-in-right" style={{ animationDelay: `${idx * 0.15 + 0.1}s` }}>
                      {exp.focus && (
                        <div className="bg-[var(--surface-elevated)] p-8 rounded-xl border-t-4 border-[#3b1600] shadow-[0_10px_40px_rgba(24,32,52,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                          <h4 className="text-[var(--text-main)] font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                            <span className="material-symbols-outlined text-sm">analytics</span> Strategic Focus
                          </h4>
                          <p className="text-[var(--text-muted)] italic mb-6">&quot;{exp.focus}&quot;</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.tags?.map((tag, t) => (
                              <span key={t} className="bg-[var(--surface-2)] px-3 py-1 text-[0.6875rem] font-bold uppercase rounded hover:bg-[#f0813a]/10 transition-all duration-300">{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </section>

        {/* Endorsements Section */}
        <section className="mt-32">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-[#f0813a] font-bold tracking-widest text-[0.6875rem] uppercase mb-4">PROFESSIONAL ENDORSEMENTS</p>
            <h2 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tighter">What Leaders Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div key={i} className="bg-[var(--surface-elevated)] p-10 rounded-2xl border-t-4 border-[#f0813a] shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300" style={{ animation: `slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`, animationDelay: `${i * 0.15}s`, opacity: 0 }}>
                <span className="material-symbols-outlined text-[#f0813a]/40 text-6xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                <p className="text-[var(--text-main)] italic leading-relaxed mb-8 text-lg font-semibold">
                  &quot;{test.highlight} {test.quote}&quot;
                </p>
                <div className="border-t border-[var(--border)] pt-6">
                  <p className="text-[var(--text-main)] font-bold text-sm">{test.author}</p>
                  <p className="text-[var(--text-muted)] text-xs mt-2">{test.title}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--text-muted)] text-[0.6875rem] font-medium mt-8 opacity-60">
            Full, signed letters of recommendation and references available upon request.
          </p>
        </section>

        {/* Call to Action */}
        <section className="mt-32 pt-24 border-t border-[var(--border)]/10 flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tighter mb-6">Comprehensive Background</h2>
          <p className="text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed">
            For a complete list of publications, certifications, and technical proficiencies, please access the full professional documentation.
          </p>
          <button className="inline-flex items-center gap-3 bg-[#ffdbca] text-[#331200] px-10 py-5 rounded-md font-bold hover:bg-[#ffb68e] transition-all active:scale-95 shadow-sm hover:-translate-y-1 duration-300">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
            Download Full Resume (PDF)
          </button>
        </section>
      </main>
    </div>
  );
}
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Portfolio() {
  return (
    <div className="page-shell selection:bg-[#ffdbca] selection:text-[#331200] bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      
      {/* Inject Fonts and Icons directly for single-file independence */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        /* Custom animations for smooth entry and interactions */
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
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
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-down {
          opacity: 0;
          animation: fade-in-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-left {
          opacity: 0;
          animation: fade-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-right {
          opacity: 0;
          animation: fade-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          opacity: 0;
          animation: scale-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        /* Stagger animations */
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        
        /* Hover scale effect */
        .hover-scale-up {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-scale-up:hover {
          transform: scale(1.02);
        }
        
        /* Smooth underline animation */
        .smooth-underline {
          position: relative;
          text-decoration: none;
        }
        .smooth-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: currentColor;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .smooth-underline:hover::after {
          width: 100%;
        }
        
        /* Enhanced button hover effects */
        .button-enhanced-hover {
          position: relative;
          overflow: hidden;
        }
        .button-enhanced-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transition: left 0.5s ease;
        }
        .button-enhanced-hover:hover::before {
          left: 100%;
        }

        @keyframes reveal-rise {
          0% { opacity: 0; transform: translateY(24px) scale(0.99); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sweep-shine {
          0% { left: -120%; }
          100% { left: 140%; }
        }

        .section-reveal {
          opacity: 0;
          animation: reveal-rise 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .section-delay-1 { animation-delay: 0.1s; }
        .section-delay-2 { animation-delay: 0.2s; }
        .section-delay-3 { animation-delay: 0.3s; }

        .hover-glow-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-glow-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(240, 129, 58, 0.12), transparent 55%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: 1;
        }
        .hover-glow-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(24, 32, 52, 0.12);
        }
        .hover-glow-card:hover::before {
          opacity: 1;
        }

        .shimmer-on-hover {
          position: relative;
          overflow: hidden;
        }
        .shimmer-on-hover::after {
          content: '';
          position: absolute;
          top: 0;
          left: -120%;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0));
          transform: skewX(-20deg);
          pointer-events: none;
          z-index: 2;
        }
        .shimmer-on-hover:hover::after {
          animation: sweep-shine 0.65s ease-in-out;
        }

        .title-hover-lift {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-block;
        }
        .title-hover-lift:hover {
          transform: translateY(-2px);
          letter-spacing: 0.02em;
        }

        .icon-drift {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .icon-drift .material-symbols-outlined {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .icon-drift:hover .material-symbols-outlined {
          transform: translateX(3px) translateY(-2px);
        }
        .icon-drift:hover {
          transform: translateY(-1px);
        }
      `}} />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[860px] flex items-center px-6 md:px-12 lg:px-24 pt-24 pb-16 overflow-hidden section-reveal">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-[#ffdbca]/40 blur-3xl hidden dark:hidden"></div>
            <div className="absolute top-20 right-0 w-[32rem] h-[32rem] rounded-full bg-[#d5e3fd]/30 blur-3xl hidden dark:hidden"></div>
            <div className="absolute top-0 right-0 h-full w-full lg:w-[42%] bg-gradient-to-b from-[var(--surface)]/70 to-[var(--surface)]/10"></div>
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            <div className="lg:col-span-7">
              
              <h1 className="animate-fade-in-up stagger-1 text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight text-[var(--text-main)] mb-6">
                Data-driven policy systems for measurable humanitarian outcomes.
              </h1>

              <p className="animate-fade-in-up stagger-2 text-lg md:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
                Bridging policy research, process optimization, and digital delivery to help governments and mission-driven organizations act with speed, clarity, and accountability.
              </p>

              <div className="animate-fade-in-up stagger-3 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mb-10">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-3 hover-glow-card shimmer-on-hover">
                  <p className="text-xs tracking-[0.12em] uppercase text-[var(--text-muted)] font-semibold mb-1">Education</p>
                  <p className="text-sm rounded-sm bg-white m-1 p-1 text-[var(--text-main)] font-semibold">Master of Public Affairs, Brown University</p>
                  <p className="text-sm rounded-sm bg-white m-1 p-1 text-[var(--text-main)] font-semibold">B.S. International Business, University of Maryland</p>
                </div>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-3 hover-glow-card shimmer-on-hover">
                  <p className="text-xs tracking-[0.12em] uppercase text-[var(--text-muted)] font-semibold mb-2">Professional Credentials</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#ffdbca] text-[#331200] text-xs font-bold tracking-wider">PMP</span>
                    <span className="px-2.5 py-1 rounded bg-[#d5e3fd] text-[#162039] text-xs font-bold tracking-wider">LSSBB</span>
                    <span className="px-2.5 py-1 rounded bg-[var(--surface-2)] text-[var(--text-main)] text-xs font-bold tracking-wider border border-[var(--border)]">PSM I</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-4">
                <Link href="/experience" className="group inline-flex items-center gap-2 bg-[#f0813a] text-white px-7 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shimmer-on-hover icon-drift">
                  Explore Experience
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-[var(--border-strong)] text-[var(--text-main)] px-7 py-4 rounded-lg font-bold hover:bg-[var(--surface)] transition-colors duration-300 shimmer-on-hover">
                  Contact
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-fade-in-right stagger-2">
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-2xl hover-glow-card">
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    alt="Professional portrait of Areeb Uzzaman"
                    className="w-full h-full object-cover"
                    src="/main.png"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#182034]/70 via-[#182034]/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs tracking-[0.14em] uppercase opacity-80 mb-2">Current Focus</p>
                  <p className="text-xl font-bold leading-tight">Policy and Data Architecture for Public Impact</p>
                </div>
              </div>

              <div className="hidden md:block rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 shadow-lg hover-glow-card mt-4">
                <p className="text-xs tracking-[0.12em] uppercase text-[var(--text-muted)] mb-1">Core Domains</p>
                <p className="text-sm text-[var(--text-main)] font-semibold">Policy Research | Process Design | Humanitarian Operations</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-24 bg-[var(--surface)] transition-all duration-700 hover:bg-[#f8f9fa] dark:hover:bg-[var(--surface-elevated)] relative overflow-hidden group section-reveal section-delay-1">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-white/35 to-transparent dark:from-[#1f2d46]/40"></div>
          
          <div className="max-w-7xl mx-auto px-8 lg:px-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-[8.5rem] items-start">
              <div className="pt-4 animate-fade-in-left">
                <h2 className="text-sm font-bold tracking-[0.2em] text-[#f0813a] uppercase mb-4 transition-all duration-500 hover:text-[#ff9e5a] hover:tracking-widest">The Architect's Ethos</h2>
                <h3 className="text-3xl font-bold text-[var(--text-main)] leading-tight transition-colors duration-500   ">Proactive Dedication to Social Betterment.</h3>
              </div>
              <div className="space-y-8 animate-fade-in-right">
                <p className="text-lg text-[var(--foreground)] leading-relaxed hover:text-[var(--text-main)] transition-all duration-500 hover:translate-x-2">
                  I operate at the intersection of technical precision and human empathy. My work focuses on building the invisible infrastructure—data pipelines and policy frameworks—that empowers local governments and NGOs to react faster to humanitarian crises. By optimizing operational logistics through Lean Six Sigma methodologies, I ensure that resources reach those who need them most with minimal friction and maximum accountability.
                </p>
                <button className="flex items-center gap-2 text-[var(--text-main)] font-bold group relative pb-1 smooth-underline transition-all duration-500 hover:text-[#f0813a] hover:translate-x-1 icon-drift">
                  View Full Experience & Resume 
                  <span className="material-symbols-outlined group-hover:translate-x-2 group-hover:rotate-45 transition-all duration-500 ease-out">east</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Impact Section */}
        <section className="py-32 px-8 lg:px-24 relative overflow-hidden section-reveal section-delay-2">
          {/* Background animated elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffdbca] opacity-[0.05] rounded-full blur-3xl animate-float pointer-events-none hidden dark:hidden"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex justify-between items-end mb-16 animate-fade-in-down">
              <div className="max-w-xl">
                <h2 className="text-sm font-bold tracking-[0.2em] text-[#f0813a] uppercase mb-4 transition-all duration-500 hover:text-[#ff9e5a]">Strategic Impact</h2>
                <p className="text-2xl font-bold text-[var(--text-main)] transition-all duration-500 hover:text-[#5c2600]">High-stakes projects driving structural change in public administration.</p>
              </div>
              <button className="hidden md:flex items-center gap-2 px-6 py-3 border border-[var(--border-strong)] rounded-lg text-[var(--text-main)] font-bold hover:bg-[#182034] hover:text-white transition-all duration-500 hover:shadow-lg hover:shadow-[#182034]/20 active:scale-95 group hover-scale-up group-hover:border-[#182034] shimmer-on-hover icon-drift">
                View All Projects <span className="material-symbols-outlined group-hover:rotate-90 transition-transform duration-500">grid_view</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project 1 */}
              <div className="group relative overflow-hidden rounded-xl bg-[var(--surface-elevated)] border-t-4 border-[#3b1600] shadow-md hover:shadow-2xl hover:shadow-[#3b1600]/20 hover:-translate-y-3 transition-all duration-700 ease-out cursor-pointer flex flex-col h-full hover-scale-up animate-fade-in-left stagger-1 hover-glow-card shimmer-on-hover">
                <div className="aspect-video w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#182034]/0 group-hover:bg-[#182034]/20 transition-all duration-700 z-10"></div>
                  <Image alt="Resilient Migration Data Infrastructure" className="w-full h-full object-cover transform group-hover:scale-[1.08] transition-transform duration-1000 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD463Kx3uRXfxLG3tWxWHHoddUPKXjOxNln-9ec4C8eJsndt1zmJFkSRknTUnFwYNJrvJs3ojlSWK9Z95ynqA8ZbnbsdM5Q_zq4oqEcpQ2lbnhclkyUROaF7sEJnBv2I1Mtkaz_Osmw8GAtqkVSWTHYODYmHKgsU2-5yCnfAsDSSR3rWy-0B4Dm7wczMDERHtqWwdJxRagdYgL4wIfUJwPG42nFBECTHUy43YpF5wXAyigzF71vtzJRrI-pAMJzoyJEvJDlNPYbDXG2" fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="px-3 py-1 bg-[#d5e3fd] text-[#57657b] text-[0.65rem] font-bold rounded uppercase tracking-wider group-hover:bg-[#c4d7fc] group-hover:text-[#3b4d5c] transition-all duration-500">Public Policy</span>
                    <span className="px-3 py-1 bg-[#dae2fd] text-[#131b2e] text-[0.65rem] font-bold rounded uppercase tracking-wider group-hover:bg-[#c8d4fc] transition-all duration-500">Data Science</span>
                  </div>
                  <h4 className="text-xl font-bold text-[var(--text-main)] mb-3 group-hover:text-[#f0813a] transition-all duration-500 group-hover:translate-x-1">Resilient Migration Data Infrastructure</h4>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-8 flex-grow group-hover:text-[var(--text-main)] transition-all duration-500">
                    Developing a robust framework for tracking migratory flows using edge-computing nodes to ensure data integrity in low-connectivity humanitarian corridors.
                  </p>
                  <div className="inline-flex items-center text-sm font-bold text-[#f0813a] group-hover:text-[#ffdbca] transition-all duration-500 mt-auto">
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out">CASE STUDY</span> 
                    <span className="material-symbols-outlined text-sm ms-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">arrow_outward</span>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group relative overflow-hidden rounded-xl bg-[var(--surface-elevated)] border-t-4 border-[#3b1600] shadow-md hover:shadow-2xl hover:shadow-[#3b1600]/20 hover:-translate-y-3 transition-all duration-700 ease-out cursor-pointer flex flex-col h-full hover-scale-up animate-fade-in-right stagger-2 hover-glow-card shimmer-on-hover">
                <div className="aspect-video w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#182034]/0 group-hover:bg-[#182034]/20 transition-all duration-700 z-10"></div>
                  <Image alt="Crisis Sentiment Mapping Engine" className="w-full h-full object-cover transform group-hover:scale-[1.08] transition-transform duration-1000 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQmsUV79vppl_hMRe3uLmSGCzz9QvJFJxMbATykyI0abAdkkBxLJG5oIg0TfylKU6KDuZ9iBuCGSgI_E_uUWo0SEM8yPgYj12534-JPoAHiUkJvDWctGtCdkq6KMIXm6HgSQOagnfZlN4jzQT_r5zDdf4DQBvuH67MrpFFu6U4Z9tPobqvGqAyQYDKYL_g5BausCffO4MkEaOlQ5XjbGVIXWzXyYxwNludtxnSTbeUWOZHB4MJNSRzhm_kU1MFacawv_-qhHAp9Z2A" fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="px-3 py-1 bg-[#d5e3fd] text-[#57657b] text-[0.65rem] font-bold rounded uppercase tracking-wider group-hover:bg-[#c4d7fc] group-hover:text-[#3b4d5c] transition-all duration-500">NLP</span>
                    <span className="px-3 py-1 bg-[#dae2fd] text-[#131b2e] text-[0.65rem] font-bold rounded uppercase tracking-wider group-hover:bg-[#c8d4fc] transition-all duration-500">Governance</span>
                  </div>
                  <h4 className="text-xl font-bold text-[var(--text-main)] mb-3 group-hover:text-[#f0813a] transition-all duration-500 group-hover:translate-x-1">Crisis Sentiment Mapping Engine</h4>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-8 flex-grow group-hover:text-[var(--text-main)] transition-all duration-500">
                    A human-in-the-loop AI system designed to analyze social media sentiment during natural disasters to guide rapid-response logistics.
                  </p>
                  <div className="inline-flex items-center text-sm font-bold text-[#f0813a] group-hover:text-[#ffdbca] transition-all duration-500 mt-auto">
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out">CASE STUDY</span> 
                    <span className="material-symbols-outlined text-sm ms-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">arrow_outward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insights & Writing Section */}
        <section className="py-32 bg-[#182034] text-[#ffffff] relative overflow-hidden section-reveal section-delay-3">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#ffdbca] opacity-[0.03] blur-[120px] rounded-full pointer-events-none animate-float hidden dark:hidden"></div>

          <div className="max-w-7xl mx-auto px-8 lg:px-24 relative z-10">
            <div className="mb-16 animate-fade-in-down">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#ffdbca] uppercase mb-4 transition-all duration-500 hover:text-[#ffe5d8] hover:tracking-widest">Insights & Writing</h2>
              <h3 className="text-3xl font-bold max-w-2xl transition-all duration-500 hover:text-[#ffdbca] title-hover-lift">Reflections on the intersection of digital governance and social equity.</h3>
            </div>
            
            <div className="space-y-0 border-t border-white/10">
              {/* Article 1 */}
              <Link className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-white/10 hover:bg-white/[0.05] transition-all duration-500 px-4 -mx-4 hover:px-8 rounded-lg hover:-translate-y-1 animate-fade-in-left stagger-1 hover-glow-card shimmer-on-hover icon-drift" href="#">
                <div className="max-w-xl transition-all duration-500 group-hover:translate-x-3">
                  <span className="text-[0.6875rem] text-[#ffb68e] font-bold tracking-widest uppercase mb-2 block transition-all duration-500 group-hover:text-[#ffdbca] group-hover:tracking-[0.15em]">MARCH 2024 • POLICY BRIEF</span>
                  <h4 className="text-xl md:text-2xl font-bold group-hover:text-[#ffdbca] transition-all duration-500">The Ethics of Algorithmic Aid: Moving Beyond Efficiency</h4>
                </div>
                <span className="material-symbols-outlined text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-8 group-hover:translate-x-0 text-[#ffdbca]">trending_flat</span>
              </Link>
              
              {/* Article 2 */}
              <Link className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-white/10 hover:bg-white/[0.05] transition-all duration-500 px-4 -mx-4 hover:px-8 rounded-lg hover:-translate-y-1 animate-fade-in-left stagger-2 hover-glow-card shimmer-on-hover icon-drift" href="#">
                <div className="max-w-xl transition-all duration-500 group-hover:translate-x-3">
                  <span className="text-[0.6875rem] text-[#ffb68e] font-bold tracking-widest uppercase mb-2 block transition-all duration-500 group-hover:text-[#ffdbca] group-hover:tracking-[0.15em]">JANUARY 2024 • TECHNOLOGY</span>
                  <h4 className="text-xl md:text-2xl font-bold group-hover:text-[#ffdbca] transition-all duration-500">Six Sigma in the Social Sector: Trimming Waste, Feeding Hope</h4>
                </div>
                <span className="material-symbols-outlined text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-8 group-hover:translate-x-0 text-[#ffdbca]">trending_flat</span>
              </Link>
              
              {/* Article 3 */}
              <Link className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-white/10 hover:bg-white/[0.05] transition-all duration-500 px-4 -mx-4 hover:px-8 rounded-lg hover:-translate-y-1 animate-fade-in-left stagger-3 hover-glow-card shimmer-on-hover icon-drift" href="#">
                <div className="max-w-xl transition-all duration-500 group-hover:translate-x-3">
                  <span className="text-[0.6875rem] text-[#ffb68e] font-bold tracking-widest uppercase mb-2 block transition-all duration-500 group-hover:text-[#ffdbca] group-hover:tracking-[0.15em]">NOVEMBER 2023 • CASE STUDY</span>
                  <h4 className="text-xl md:text-2xl font-bold group-hover:text-[#ffdbca] transition-all duration-500">Digital Identity as a Human Right in Refugee Contexts</h4>
                </div>
                <span className="material-symbols-outlined text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-8 group-hover:translate-x-0 text-[#ffdbca]">trending_flat</span>
              </Link>
            </div>
            
            <div className="mt-16 text-center animate-fade-in-up stagger-4">
              <button className="px-10 py-4 bg-[#ffdbca] text-[#331200] rounded-lg font-bold hover:bg-[#ffe5d8] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ffdbca]/30 transition-all duration-500 active:scale-95 border border-[#ffb68e] hover:border-[#f0813a] button-enhanced-hover shimmer-on-hover">
                Read Full Archive
              </button>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
'use client';

import Script from 'next/script';
import Link from 'next/link';

export default function Projects() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] selection:bg-[#d5e3fd] selection:text-[#57657b] min-h-screen overflow-x-hidden">
      
      {/* Inject Fonts, Icons, and Custom Utilities directly for single-file independence */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }

        /* Hide scrollbar for the horizontal scroll section */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

   

      <main className="pt-16 overflow-x-hidden">
        {/* Hero Section: Intentional Asymmetry */}
        <section className="relative min-h-[716px] flex items-center bg-[var(--background)] pt-20 pb-24 md:pb-32 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8 lg:col-span-7">
              <span className="inline-block px-3 py-1 mb-6 text-[0.6875rem] font-bold tracking-[0.1em] uppercase bg-[#d5e3fd] text-[#57657b] rounded-sm">Research Portfolio 2024-2026</span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[var(--text-main)] leading-[1.1] mb-8">
                Policy Briefs & Academic Research
              </h1>
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed mb-10">
                Applied research, institutional benchmarking, and policy frameworks translating complex data into actionable governance strategies.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#182034] text-[#ffffff] text-sm font-bold tracking-widest uppercase rounded-md hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-[#182034]/10">
                  Download CV <span className="material-symbols-outlined text-sm">download</span>
                </button>
                <button className="px-6 py-3 bg-[#ffdbca] text-[#331200] text-sm font-bold tracking-widest uppercase rounded-md hover:bg-[#ffb68e] transition-all">
                  View Publications
                </button>
              </div>
            </div>

            {/* Hero Abstract Element */}
            <div className="hidden md:block md:col-span-4 lg:col-span-5 relative h-full">
              <div className="absolute -top-12 -right-12 w-96 h-96 bg-[#182034]/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 p-8 bg-[var(--surface-elevated)] rounded-xl border-t-4 border-[#3b1600] shadow-xl shadow-[#182034]/5 rotate-2 translate-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#182034] flex items-center justify-center text-[#ffffff]">
                    <span className="material-symbols-outlined text-lg">policy</span>
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)]">Active Directive</span>
                </div>
                <p className="text-sm font-medium text-[var(--text-main)] italic mb-4">"Frameworks must be as resilient as the communities they serve."</p>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-[var(--surface-2)] rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-[#182034]"></div>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--surface-2)] rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-[#3b1600]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Case Studies (Grid Layout) */}
        <section className="bg-[var(--surface)] py-24 md:py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[var(--text-main)] mb-4">Case Studies & Policy Briefs</h2>
                <p className="text-[var(--text-muted)] font-medium">Investigating the intersection of emerging technology and urban equity through data-driven advocacy.</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-[var(--border)] hover:border-[#182034] rounded-sm transition-colors">
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button className="p-2 border border-[var(--border)] hover:border-[#182034] rounded-sm transition-colors">
                  <span className="material-symbols-outlined">list</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Card 1 */}
              <div className="group flex flex-col bg-[var(--surface-elevated)] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#182034]/5">
                <div className="h-64 overflow-hidden relative">
                  <img alt="Urban Housing Density" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmDJBVBnaLOrdhpq8TTCsjST6uu3RFwBWy9Z7UTxpD9W8FsGA0_p6H10kX4k86vFZ-77VUnyhX_NxHyNGmnggAV9KH4FPbvpVajk3XWztbVwxbB_cXzNWroChsMbB9HjcNth5tNYhQBOUXbmiCH-_3FGxYFnW7PYKbW0xxoyPLwxL2G1DJyti2oHZ5zY0EGPHgxNYE1WWILg_QaJkkFVlQ-VxOzYA_TWA75u65WRZJ4mSLf8zb-q5kNCIqM0Ls0NqAvHG1bdWihDtl" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-[#182034] text-[#ffffff] text-[0.6rem] font-bold tracking-widest uppercase rounded-sm">Housing Policy</span>
                    <span className="px-2 py-1 bg-[var(--surface-2)] text-[var(--text-main)] text-[0.6rem] font-bold tracking-widest uppercase rounded-sm">Algorithmic Governance</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col h-full border-t-4 border-[#3b1600]">
                  <h3 className="text-2xl font-extrabold tracking-tight text-[var(--text-main)] mb-4 leading-tight">Algorithmic Rent-Setting & Housing Equity</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-8 flex-grow">
                    A comprehensive policy brief evaluating the socioeconomic impacts of RealPage's YieldStar software on high-density urban rental markets, proposing frameworks for algorithmic transparency and anti-collusion measures.
                  </p>
                  <Link className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[var(--text-main)] hover:gap-4 transition-all" href="#">
                    Read Brief <span className="material-symbols-outlined">arrow_right_alt</span>
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group flex flex-col bg-[var(--surface-elevated)] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#182034]/5">
                <div className="h-64 overflow-hidden relative">
                  <img alt="Community Safety Meeting" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhBR3AAPqgzFKCy0tHDMRg_kbpIlfUj_HoUuiRsP1lSJZluxeRwsVZG54rlW8n39K7ybE3I-dctHTsbH1TatKUbbz7sbHnQQUZ8RK48AtOWCF2CbVzP0c5ZL3iggVHhmNyu0_QNc63yth5J04eX8UHotkVd0pe_Xzf6o8GCB4ETZGngFrCWDgisx9kShLZD8VZCRFzz6iFOjPmlcXp2qBjFVwTXn2cezccTLRWL9QYc-pUvb43pyF01gD2zfxyw99yg0w76MKWOqZp" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-[#182034] text-[#ffffff] text-[0.6rem] font-bold tracking-widest uppercase rounded-sm">Public Safety</span>
                    <span className="px-2 py-1 bg-[var(--surface-2)] text-[var(--text-main)] text-[0.6rem] font-bold tracking-widest uppercase rounded-sm">Program Evaluation</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col h-full border-t-4 border-[#3b1600]">
                  <h3 className="text-2xl font-extrabold tracking-tight text-[var(--text-main)] mb-4 leading-tight">Evaluating Community-Based Safety Ambassadors</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-8 flex-grow">
                    A collaborative evaluation of Rhode Island's Community-Based Safety Ambassador Program, analyzing operational efficacy and local community integration to provide actionable policy recommendations for scalable safety models.
                  </p>
                  <Link className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[var(--text-main)] hover:gap-4 transition-all" href="#">
                    Read Brief <span className="material-symbols-outlined">arrow_right_alt</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Presentations (Horizontal Scroll) */}
        <section className="py-24 md:py-32 overflow-hidden bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[var(--text-main)]">Presentations & Engagements</h2>
          </div>
          
          <div className="flex overflow-x-auto gap-8 px-8 md:px-[calc((100vw-80rem)/2+2rem)] hide-scrollbar snap-x snap-mandatory">
            {/* Presentation Card 1 */}
            <div className="flex-none w-[85vw] md:w-[600px] snap-center">
              <div className="bg-[var(--surface-2)] p-8 md:p-12 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#182034]/5 -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-150"></div>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-2 py-1 bg-[#f0813a]/10 text-[#f0813a] text-[0.6rem] font-bold tracking-widest uppercase rounded-sm">Public Health</span>
                  <span className="px-2 py-1 bg-[#182034] text-[#ffffff] text-[0.6rem] font-bold tracking-widest uppercase rounded-sm">Information Architecture</span>
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight text-[var(--text-main)] mb-6">Combating Health Misinformation in Local Communities</h3>
                <div className="flex items-center gap-2 mb-6 text-[var(--text-muted)]">
                  <span className="material-symbols-outlined text-lg">groups</span>
                  <span className="text-sm font-bold uppercase tracking-wider">Target: Rhode Island Public Health Association</span>
                </div>
                <p className="text-[var(--text-muted)] leading-relaxed text-lg mb-8">
                  A strategic presentation outlining resilient communication architectures that leverage trusted local leaders to filter and verify medical data for vulnerable populations, mitigating the spread of misinformation.
                </p>
                <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="w-12 h-12 bg-[var(--surface-elevated)] rounded-full flex items-center justify-center border border-[var(--border)]">
                    <span className="material-symbols-outlined text-[var(--text-main)]">play_circle</span>
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-main)]">View Full Slideshow</span>
                </div>
              </div>
            </div>

            {/* Card 2 (Empty state for scroll demonstration) */}
            <div className="flex-none w-[85vw] md:w-[600px] snap-center">
              <div className="bg-[#182034] p-8 md:p-12 rounded-xl h-full flex flex-col justify-center">
                <h3 className="text-3xl font-extrabold tracking-tight text-[#ffffff] mb-4">Upcoming Session</h3>
                <p className="text-[#979eb7] text-lg mb-8">Scheduled for Winter 2026: AI Ethics in Municipal Resource Allocation.</p>
                <div className="w-12 h-1 bg-[#ffdbca]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Technical Toolkit (Visual Tag Grid) */}
        <section className="bg-[var(--surface)] py-24 md:py-32 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[var(--text-main)] mb-4">Technical & AI Toolkit</h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto font-medium">The architectural stack behind my research and policy modeling processes.</p>
            </div>
            
            <div className="space-y-16">
              {/* Category 1 */}
              <div>
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-8 border-b border-[var(--border)]/30 pb-2">Data & Systems Architecture</h4>
                <div className="flex flex-wrap gap-3">
                  {['Python', 'SQL', 'Tableau', 'JSON', 'MATLAB', 'AutoCAD', 'Microsoft Project', 'RecDesk', 'Gradescope'].map(tech => (
                    <span key={tech} className="px-5 py-2.5 bg-[var(--surface-elevated)] text-[var(--text-main)] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm hover:bg-[#182034] hover:text-[#ffffff] transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 2 */}
              <div>
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-8 border-b border-[var(--border)]/30 pb-2">AI & Generative Workflows</h4>
                <div className="flex flex-wrap gap-3">
                  {['Anthropic', 'Gamma', 'Eleven Labs', 'QuillBot', 'Grok', 'Gemini AI'].map(tech => (
                    <span key={tech} className="px-5 py-2.5 bg-[#ffdbca] text-[#331200] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm hover:bg-[#ffb68e] transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-8 bg-[#182034] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-[#ffffff] mb-8">Ready to architect resilience?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-[#ffdbca] text-[#331200] text-sm font-bold tracking-widest uppercase rounded-md hover:bg-[#ffb68e] transition-all">
                Collaborate on Research
              </button>
              <button className="px-8 py-4 border border-[#ffffff]/30 text-[#ffffff] text-sm font-bold tracking-widest uppercase rounded-md hover:bg-[var(--surface-elevated)]/10 transition-all">
                Request Full Portfolio
              </button>
            </div>
          </div>
        </section>
      </main>


      {/* Google Translate Integration */}
      <div id="google_translate_element" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}></div>
      <Script
        id="google-translate-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,bn,de,ur,ar,hi,fa',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          `,
        }}
      />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}
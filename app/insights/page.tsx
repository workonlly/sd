'use client';

import Link from 'next/link';
import NewsletterForm from '../newsletter-form';
import Image from 'next/image';

export default function Insights() {
  return (
    <div className="page-shell bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      
      {/* Inject Fonts and Icons directly for single-file independence */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        .asymmetric-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 8.5rem;
        }
        
        @media (max-width: 768px) {
          .asymmetric-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @keyframes underline-expand {
          0% { width: 0; }
          100% { width: 100%; }
        }

        .article-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .article-card::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #f0813a, transparent);
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .article-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(24, 32, 52, 0.16);
        }
        .article-card:hover::before {
          width: 100%;
        }

        .article-title {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          display: inline-block;
        }
        .article-card:hover .article-title {
          transform: translateX(3px);
        }

        .archive-link {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .archive-link:hover {
          transform: translateY(-1px);
        }

        .read-link {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .read-link:hover {
          color: #f0813a;
          transform: translateX(2px);
        }

        .icon-animate {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .archive-link:hover .icon-animate {
          color: #f0813a;
          transform: translateX(2px) translateY(-1px);
        }
      `}} />

    

      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        {/* Editorial Header Section */}
        <header className="mb-24 animate-fade-in-up stagger-1">
          <div className="asymmetric-grid items-end">
            <div>
              <span className="text-[#f0813a] text-[0.6875rem] font-bold uppercase tracking-[0.05em] mb-4 block">Archive & Analysis</span>
              <h1 className="text-[var(--text-main)] text-[3.5rem] font-extrabold leading-[1.1] tracking-[-0.02em]">Insights & Writing</h1>
            </div>
            <div className="pb-2">
              <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-xl">
                Observations on technology, policy, and human welfare. A collection of frameworks, critiques, and proposals at the intersection of computational logic and social equity.
              </p>
            </div>
          </div>
        </header>

        {/* Featured Insights: Tonal Layering */}
        <section className="mb-24 animate-fade-in-up stagger-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article Card 1 */}
            <article className="group bg-[var(--surface-elevated)] flex flex-col h-full border-t-4 border-[#3b1600] p-8 article-card hover:bg-[var(--surface)] animate-fade-in-left stagger-2">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[#d5e3fd] text-[#57657b] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider rounded">Housing Policy</span>
                <time className="text-[var(--text-muted)] text-xs font-medium">October 24, 2025</time>
              </div>
              <h2 className="text-[var(--text-main)] text-xl font-bold leading-snug mb-4 article-title">The Impact of Algorithmic Rent-Setting on Housing Equity</h2>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 flex-grow">
                An examination of how automated valuation models and yield-management software are inadvertently institutionalizing pricing disparities in urban rental markets.
              </p>
              <Link className="inline-flex items-center text-[var(--text-main)] text-sm font-bold read-link" href="#">
                Read Analysis <span className="material-symbols-outlined ms-1 text-sm">arrow_forward</span>
              </Link>
            </article>

            {/* Article Card 2 */}
            <article className="group bg-[var(--surface-elevated)] flex flex-col h-full border-t-4 border-[#f0813a] p-8 article-card hover:bg-[var(--surface)] animate-fade-in-up stagger-2">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[#ffb68e] text-[#763300] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider rounded">Public Health</span>
                <time className="text-[var(--text-muted)] text-xs font-medium">September 12, 2025</time>
              </div>
              <h2 className="text-[var(--text-main)] text-xl font-bold leading-snug mb-4 article-title">Frameworks for Combating Health Misinformation in Local Communities</h2>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 flex-grow">
                Proposing a localized, trust-first digital infrastructure to bridge the gap between scientific consensus and community-level healthcare delivery.
              </p>
              <Link className="inline-flex items-center text-[var(--text-main)] text-sm font-bold read-link" href="#">
                Read Analysis <span className="material-symbols-outlined ms-1 text-sm">arrow_forward</span>
              </Link>
            </article>

            {/* Article Card 3 */}
            <article className="group bg-[var(--surface-elevated)] flex flex-col h-full border-t-4 border-[#182034] p-8 article-card hover:bg-[var(--surface)] animate-fade-in-right stagger-2">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[#d5e3fd] text-[#57657b] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider rounded">AI Governance</span>
                <time className="text-[var(--text-muted)] text-xs font-medium">August 05, 2025</time>
              </div>
              <h2 className="text-[var(--text-main)] text-xl font-bold leading-snug mb-4 article-title">Human-in-the-Loop Pipelines for Educational Data</h2>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 flex-grow">
                Evaluating the ethical imperatives of maintaining pedagogical oversight in automated grading and personalized learning systems for primary education.
              </p>
              <Link className="inline-flex items-center text-[var(--text-main)] text-sm font-bold read-link" href="#">
                Read Analysis <span className="material-symbols-outlined ms-1 text-sm">arrow_forward</span>
              </Link>
            </article>
          </div>
        </section>

        {/* Newsletter / Subscribe Section: Glassmorphism + Tonal Shift */}
        <section className="bg-[var(--surface)] p-12 md:p-20 relative overflow-hidden animate-fade-in-up stagger-3">
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-30">
            <Image alt="Areeb Uzzaman" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0uihthbNiOtDY3BzVd_vF3L0dmKQ0YpW-Cg3zTtv3ohwrw3S8tAjPEmdSFF_pX2FiNUKtIr5s9zb_Y-N19XVfjnuUq2n6dP_u6rc1RDtavo9YPnPDFjkteii_NJHq5My_UXH_PWK8LXZweFx5ebG6RcfclzqveuLeZHNHpjDCx3HiBNgF-8GZEgBpvea8nBmvCg3_woiQkx1PUo7ZP1MMIcVOZJ40-RAVzJnVSGqpj6GO6w_hxoquyjqDt9pA3iwh4sE4q2yi3JcXgw" fill sizes="(max-width: 768px) 0vw, 40vw" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-[var(--text-main)] text-2xl font-bold mb-4">Direct Policy Dispatches</h3>
            <p className="text-[var(--text-muted)] mb-8 text-lg">Stay informed on the latest research and policy critiques. No noise, just analysis.</p>
            <NewsletterForm />
          </div>
        </section>

        {/* Archive List: Content defined by tonal shift, no lines */}
        <section className="mt-24 animate-fade-in-up stagger-3">
          <h4 className="text-[var(--text-main)] text-sm font-bold uppercase tracking-widest mb-12 flex items-center gap-4">
            Prior Publications
            <div className="h-[1px] flex-grow bg-[var(--surface-2)]"></div>
          </h4>
          <div className="space-y-4">
            <Link className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[var(--surface-elevated)] hover:bg-[var(--surface-2)] archive-link animate-fade-in-left stagger-3" href="#">
              <div className="flex flex-col">
                <span className="text-xs text-[#f0813a] font-bold mb-1">Ethical Tech</span>
                <h5 className="text-lg font-bold text-[var(--text-main)]">The Myth of Neutral Algorithms in Social Welfare</h5>
              </div>
              <div className="flex items-center gap-8 mt-4 md:mt-0">
                <span className="text-[var(--text-muted)] text-sm">Journal of Tech & Policy</span>
                <span className="material-symbols-outlined text-[var(--text-muted)] icon-animate">arrow_outward</span>
              </div>
            </Link>
            
            <Link className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[var(--surface-elevated)] hover:bg-[var(--surface-2)] archive-link animate-fade-in-left stagger-4" href="#">
              <div className="flex flex-col">
                <span className="text-xs text-[#f0813a] font-bold mb-1">Data Sovereignty</span>
                <h5 className="text-lg font-bold text-[var(--text-main)]">Decentralized Identities for Stateless Populations</h5>
              </div>
              <div className="flex items-center gap-8 mt-4 md:mt-0">
                <span className="text-[var(--text-muted)] text-sm">Humanitarian Data Review</span>
                <span className="material-symbols-outlined text-[var(--text-muted)] icon-animate">arrow_outward</span>
              </div>
            </Link>
            
            <Link className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[var(--surface-elevated)] hover:bg-[var(--surface-2)] archive-link animate-fade-in-left stagger-5" href="#">
              <div className="flex flex-col">
                <span className="text-xs text-[#f0813a] font-bold mb-1">Smart Cities</span>
                <h5 className="text-lg font-bold text-[var(--text-main)]">Privacy Paradoxes in the Modern Surveillance State</h5>
              </div>
              <div className="flex items-center gap-8 mt-4 md:mt-0">
                <span className="text-[var(--text-muted)] text-sm">Urban Governance Quarterly</span>
                <span className="material-symbols-outlined text-[var(--text-muted)] icon-animate">arrow_outward</span>
              </div>
            </Link>
          </div>
        </section>
      </main>

     
     
    </div>
  );
}
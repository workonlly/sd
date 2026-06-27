import Image from 'next/image';

export default function StrategicImpactSection() {
  return (
    <section className="py-32 px-8 lg:px-24 relative overflow-hidden section-reveal section-delay-2">
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
  );
}

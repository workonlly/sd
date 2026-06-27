export default function AboutSection() {
  return (
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
  );
}

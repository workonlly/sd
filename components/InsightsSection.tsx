import Link from 'next/link';

export default function InsightsSection() {
  return (
    <section className="py-32 bg-[#182034] text-[#ffffff] relative overflow-hidden section-reveal section-delay-3">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#ffdbca] opacity-[0.03] blur-[120px] rounded-full pointer-events-none animate-float hidden dark:hidden"></div>

      <div className="max-w-7xl mx-auto px-8 lg:px-24 relative z-10">
        <div className="mb-16 animate-fade-in-down">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#ffdbca] uppercase mb-4 transition-all duration-500 hover:text-[#ffe5d8] hover:tracking-widest">Insights & Writing</h2>
          <h3 className="text-3xl font-bold max-w-2xl transition-all duration-500 hover:text-[#ffdbca] title-hover-lift">Reflections on the intersection of digital governance and social equity.</h3>
        </div>
        
        <div className="space-y-0 border-t border-white/10">
          
          <Link className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-white/10 hover:bg-white/[0.05] transition-all duration-500 px-4 -mx-4 hover:px-8 rounded-lg hover:-translate-y-1 animate-fade-in-left stagger-1 hover-glow-card shimmer-on-hover icon-drift" href="#">
            <div className="max-w-xl transition-all duration-500 group-hover:translate-x-3">
              <span className="text-[0.6875rem] text-[#ffb68e] font-bold tracking-widest uppercase mb-2 block transition-all duration-500 group-hover:text-[#ffdbca] group-hover:tracking-[0.15em]">MARCH 2024 • POLICY BRIEF</span>
              <h4 className="text-xl md:text-2xl font-bold group-hover:text-[#ffdbca] transition-all duration-500">The Ethics of Algorithmic Aid: Moving Beyond Efficiency</h4>
            </div>
            <span className="material-symbols-outlined text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-8 group-hover:translate-x-0 text-[#ffdbca]">trending_flat</span>
          </Link>
          
          
          <Link className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-white/10 hover:bg-white/[0.05] transition-all duration-500 px-4 -mx-4 hover:px-8 rounded-lg hover:-translate-y-1 animate-fade-in-left stagger-2 hover-glow-card shimmer-on-hover icon-drift" href="#">
            <div className="max-w-xl transition-all duration-500 group-hover:translate-x-3">
              <span className="text-[0.6875rem] text-[#ffb68e] font-bold tracking-widest uppercase mb-2 block transition-all duration-500 group-hover:text-[#ffdbca] group-hover:tracking-[0.15em]">JANUARY 2024 • TECHNOLOGY</span>
              <h4 className="text-xl md:text-2xl font-bold group-hover:text-[#ffdbca] transition-all duration-500">Six Sigma in the Social Sector: Trimming Waste, Feeding Hope</h4>
            </div>
            <span className="material-symbols-outlined text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-8 group-hover:translate-x-0 text-[#ffdbca]">trending_flat</span>
          </Link>
          
          
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
  );
}

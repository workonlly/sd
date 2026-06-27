import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-28 pb-20 overflow-hidden section-reveal">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-[#ffdbca]/40 blur-3xl hidden dark:hidden"></div>
        <div className="absolute top-20 right-0 w-[40rem] h-[40rem] rounded-full bg-[#d5e3fd]/30 blur-3xl hidden dark:hidden"></div>
        <div className="absolute top-0 right-0 h-full w-full lg:w-[42%] bg-gradient-to-b from-[var(--surface)]/70 to-[var(--surface)]/10"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center relative z-10">
        <div className="lg:col-span-7">
          <h1 className="animate-fade-in-up stagger-1 text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.06] tracking-tight text-[var(--text-main)] mb-8">
            Data-driven policy systems for measurable humanitarian outcomes.
          </h1>

          <p className="animate-fade-in-up stagger-2 text-xl md:text-2xl text-[var(--text-muted)] leading-relaxed max-w-2xl mb-10">
            Bridging policy research, process optimization, and digital delivery to help governments and mission-driven organizations act with speed, clarity, and accountability.
          </p>

          <div className="animate-fade-in-up stagger-3 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-12">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-4 hover-glow-card shimmer-on-hover">
              <p className="text-xs tracking-[0.12em] uppercase text-[var(--text-muted)] font-semibold mb-2">Education</p>
              <p className="text-sm rounded-sm bg-white m-1 p-1.5 text-black font-semibold">Master of Public Affairs, Brown University</p>
              <p className="text-sm rounded-sm bg-white m-1 p-1.5 text-black font-semibold">B.S. International Business, University of Maryland</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-4 hover-glow-card shimmer-on-hover">
              <p className="text-xs tracking-[0.12em] uppercase text-[var(--text-muted)] font-semibold mb-3">Professional Credentials</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-md bg-[#ffdbca] text-[#331200] text-xs font-bold tracking-wider">PMP</span>
                <span className="px-3 py-1.5 rounded-md bg-[#d5e3fd] text-[#162039] text-xs font-bold tracking-wider">LSSBB</span>
                <span className="px-3 py-1.5 rounded-md bg-[var(--surface-2)] text-[var(--text-main)] text-xs font-bold tracking-wider border border-[var(--border)]">PSM I</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-4">
            <Link href="/experience" className="group inline-flex items-center gap-2.5 bg-[#f0813a] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shimmer-on-hover icon-drift text-base">
              Explore Experience
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2.5 border border-[var(--border-strong)] text-[var(--text-main)] px-8 py-4 rounded-xl font-bold hover:bg-[var(--surface)] transition-colors duration-300 shimmer-on-hover text-base">
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
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-xs tracking-[0.14em] uppercase opacity-80 mb-2">Current Focus</p>
              <p className="text-xl font-bold leading-tight">Policy and Data Architecture for Public Impact</p>
            </div>
          </div>

          <div className="hidden md:block rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 py-4 shadow-lg hover-glow-card mt-5">
            <p className="text-xs tracking-[0.12em] uppercase text-[var(--text-muted)] mb-1.5">Core Domains</p>
            <p className="text-sm text-[var(--text-main)] font-semibold">Policy Research | Process Design | Humanitarian Operations</p>
          </div>
        </div>
      </div>
    </section>
  );
}

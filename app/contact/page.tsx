'use client';

import Link from 'next/link';
import ContactForm from '../contact-form';

export default function Contact() {
  return (
    <div className="page-shell bg-[var(--background)] text-[var(--foreground)] selection:bg-[#ffdbca] selection:text-[#331200] min-h-screen">

      <main className="pt-32 pb-24 px-8 max-w-4xl mx-auto">
        {/* Header */}
        <section className="mb-20 text-center animate-fade-in-up stagger-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-6 tracking-tight">
            Let's Work Together
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you're interested in research collaboration, policy consultation, or just want to discuss ideas at the intersection of data and social impact, I'd love to hear from you.
          </p>
        </section>

        {/* Contact Form */}
        <section className="premium-card bg-[var(--surface-elevated)] p-12 rounded-2xl shadow-lg border border-[var(--border)] mb-20 animate-scale-in stagger-2">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-8">Send a Message</h2>
          <ContactForm variant="full" />
        </section>

        {/* Additional Contact Info */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="premium-card bg-[var(--surface)] p-8 rounded-xl border-t-4 border-[#f0813a] animate-fade-in-up stagger-1 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <span className="material-symbols-outlined text-[#f0813a] text-3xl mb-4 block">mail</span>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">Email</h3>
            <p className="text-[var(--text-muted)] text-sm">
              For quick inquiries, email me directly at hello@areebuzzaman.com
            </p>
          </div>

          <div className="premium-card bg-[var(--surface)] p-8 rounded-xl border-t-4 border-[#f0813a] animate-fade-in-up stagger-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <span className="material-symbols-outlined text-[#f0813a] text-3xl mb-4 block">schedule</span>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">Availability</h3>
            <p className="text-[var(--text-muted)] text-sm">
              I typically respond within 24-48 hours. For urgent matters, please mention "Urgent" in your subject line.
            </p>
          </div>

          <div className="premium-card bg-[var(--surface)] p-8 rounded-xl border-t-4 border-[#f0813a] animate-fade-in-up stagger-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <span className="material-symbols-outlined text-[#f0813a] text-3xl mb-4 block">link</span>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">Social</h3>
            <p className="text-[var(--text-muted)] text-sm">
              Connect on{' '}
              <Link href="#" className="text-[#f0813a] hover:underline font-semibold">
                LinkedIn
              </Link>
              {' '}or{' '}
              <Link href="#" className="text-[#f0813a] hover:underline font-semibold">
                GitHub
              </Link>
            </p>
          </div>
        </section>
      </main>

    </div>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "./themetoggle";
import LanguageSelector from "./language-selector";
import Script from "next/script";
import AmbientGlow from "./ambient-glow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Areeb Uzzaman | Portfolio",
  description: "Data, policy, and humanitarian impact portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col pt-2 relative"> {/* Added pt-24 to prevent header overlap with content */}
        <AmbientGlow />
        
        {/* Uplifted Navbar */}
        <header className="fixed top-0 z-50 w-full bg-[var(--surface-elevated)]/80 backdrop-blur-xl border-b border-[var(--text-main)]/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-500">
          <nav className="flex justify-between items-center w-full px-8 py-5 max-w-7xl mx-auto font-medium tracking-tight">
            
            {/* Logo / Brand */}
            <Link href="/" className="group relative z-10">
              <div className="text-xl font-extrabold tracking-tighter text-[var(--text-main)] transition-transform duration-300 group-hover:scale-[1.02]">
                Areeb Uzzaman
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 items-center">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/aboutme' },
                { name: 'Projects', path: '/policy_research' },
                { name: 'Insights', path: '/insights' },
                { name: 'Experience', path: '/experience' }
              ].map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className="group relative text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors duration-300 py-2"
                >
                  {link.name}
                  {/* Expanding underline effect */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[var(--text-main)] rounded-full transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                </Link>
              ))}
              
              <div className="h-5 w-px bg-[var(--text-main)]/20 mx-2"></div> {/* Divider */}
              
              <LanguageSelector />
              <ThemeToggle />
              
              <Link 
                className="group relative ms-2 btn-primary magnetic overflow-hidden flex items-center gap-2 text-sm" 
                href="/archieve_login"
              >
                {/* Shine effect on hover */}
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10">Archive Login</span>
                <span className="material-symbols-outlined text-[1.1rem] relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button className="group p-2 -me-2 text-[var(--text-main)] rounded-lg hover:bg-[var(--text-main)]/5 transition-colors">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">menu</span>
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col relative z-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[var(--surface)] w-full border-t border-[var(--text-main)]/5">
          <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-24 py-12 w-full max-w-7xl mx-auto text-sm leading-relaxed text-[var(--text-main)]">
            <div className="mb-6 md:mb-0 font-medium opacity-80">
              © 2024 Areeb Uzzaman. All rights reserved.
            </div>
            <div className="flex gap-8 font-semibold">
              <Link className="text-[var(--text-muted)] hover:text-[var(--text-main)] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out" href="#">LinkedIn</Link>
              <Link className="text-[var(--text-muted)] hover:text-[var(--text-main)] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out" href="#">GitHub</Link>
              <Link className="text-[var(--text-muted)] hover:text-[var(--text-main)] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out" href="#">Email</Link>
            </div>
          </div>
        </footer>

        {/* Google Translate Script */}
        <div id="google_translate_element" style={{ display: "none" }}></div>
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                if (window.google && window.google.translate) {
                  try {
                    new google.translate.TranslateElement({
                      pageLanguage: 'en',
                      includedLanguages: 'en,bn,de,ur,ar,hi,fa,nl,fr,or',
                      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                      autoDisplay: false
                    }, 'google_translate_element');
                  } catch (e) {
                    console.log('Google Translate initialization in progress...');
                  }
                }
              }
              // Ensure the function is available globally
              if (typeof window !== 'undefined') {
                window.googleTranslateElementInit = googleTranslateElementInit;
              }
            `,
          }}
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
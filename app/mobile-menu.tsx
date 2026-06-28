"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./themetoggle";
import LanguageSelector from "./language-selector";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/aboutme' },
    { name: 'Projects', path: '/policy_research' },
    { name: 'Insights', path: '/insights' },
    { name: 'Experience', path: '/experience' }
  ];

  return (
    <div className="md:hidden flex items-center gap-4">
      <ThemeToggle />
      <button 
           onClick={toggleMenu}
        className="group p-2 -me-2 text-[var(--text-main)] rounded-lg hover:bg-[var(--text-main)]/5 transition-colors relative z-50"
        aria-label="Toggle Menu"
        >
        <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">
          {isOpen ? 'close' : 'menu'}
       
           </span>
      </button>  

      
        {isOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40"
             onClick={() => setIsOpen(false)}
        />
      )}

      
      <div 
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-[var(--surface-elevated)] z-50 flex flex-col pt-24 px-8 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
          <div className="flex flex-col gap-6 text-xl font-bold">
          {links.map((link) => (
            <Link 
              key={link.name} 
                 href={link.path}
              onClick={() => setIsOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-px w-full bg-[var(--text-main)]/20 my-2"></div> 
          
             <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] text-base font-semibold">Language</span>
               <LanguageSelector />
          </div>

          <Link 
            onClick={() => setIsOpen(false)}
                className="mt-6 group relative btn-primary magnetic overflow-hidden flex items-center justify-center gap-2 text-lg py-4 rounded-xl" 
            href="/archieve_login"
            >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                
                
                   <span className="relative z-10">Archive Login</span>
            <span className="material-symbols-outlined text-[1.2rem] relative z-10 group-hover:translate-x-1 transition-transform duration-300">
              chevron_right
        
               </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

type Language = "en" | "bn" | "de" | "ur" | "ar" | "hi" | "fa" | "nl" | "fr" | "od";

const LANGUAGES: Record<Language, string> = {
  en: "English",
  bn: "Bengali (বাংলা)",
  de: "German (Deutsch)",
  ur: "Urdu (اردو)",
  ar: "Arabic (العربية)",
  hi: "Hindi (हिंदी)",
  fa: "Persian (فارسی)",
  nl: "Dutch (Nederlands)",
  fr: "French (Français)",
  od: "Odia (ଓଡ଼ିଆ)",
};

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: any;
        _element?: any;
      };
    };
  }
}

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    // Load saved language preference
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && LANGUAGES[savedLang]) {
      setCurrentLang(savedLang);
    }
  }, []);

  function setTranslateCookie(value: string) {
    document.cookie = `googtrans=${value};path=/`;
    document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
  }

  function applyLanguage(lang: Language) {
    // Map custom language codes to Google Translate codes
    const langMap: Record<Language, string> = {
      en: "en",
      bn: "bn",
      de: "de",
      ur: "ur",
      ar: "ar",
      hi: "hi",
      fa: "fa",
      nl: "nl",
      fr: "fr",
      od: "or", // Odia is 'or' in Google Translate
    };

    const googleLangCode = langMap[lang];
    const cookieValue = `/en/${googleLangCode}`;

    setTranslateCookie(cookieValue);
    document.documentElement.lang = googleLangCode;

    // If Google combo exists, trigger it too for immediate switch on current page
    const googleElem = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (googleElem) {
      googleElem.value = googleLangCode;
      googleElem.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Reload guarantees full-route translation consistency.
    window.location.reload();
  }

  function handleLanguageChange(lang: Language) {
    setCurrentLang(lang);
    localStorage.setItem("language", lang);
    setIsOpen(false);
    applyLanguage(lang);
  }

  if (!ready) {
    return (
      <button
        className="p-2 hover:opacity-70 transition-opacity rounded-full"
        aria-label="Language selector"
        disabled
      >
        <span className="sr-only">Loading</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="badge-glass flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[var(--text-main)] hover:shadow-md transition-all"
        aria-label="Select language"
        title="Select language"
      >
        <span className="material-symbols-outlined text-[1rem] text-[var(--text-main)]">language</span>
        <span className="hidden sm:inline">
          {currentLang.toUpperCase()}
        </span>
        <span className={`material-symbols-outlined text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}>expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute end-0 mt-2 w-56 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="py-2">
            {(Object.entries(LANGUAGES) as [Language, string][]).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full text-start px-4 py-2.5 transition-all ${
                  currentLang === code
                    ? "bg-[var(--brand)] text-[var(--brand-contrast)]"
                    : "text-[var(--text-main)] hover:bg-[var(--surface)] hover:text-[var(--text-main)]"
                }`}
              >
                <span className="font-medium">{name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

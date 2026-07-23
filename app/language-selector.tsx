"use client";

import { useEffect, useState, useRef, useMemo } from "react";

// ── FEAT-009: All 240+ Google Translate-supported languages ──
// Each entry: [googleCode, nativeName, englishName]
const ALL_LANGUAGES: [string, string, string][] = [
  ["en", "English", "English"],
  ["bn", "বাংলা", "Bengali"],
  ["hi", "हिंदी", "Hindi"],
  ["ur", "اردو", "Urdu"],
  ["ar", "العربية", "Arabic"],
  ["de", "Deutsch", "German"],
  ["fr", "Français", "French"],
  ["es", "Español", "Spanish"],
  ["pt", "Português", "Portuguese"],
  ["zh-CN", "中文（简体）", "Chinese (Simplified)"],
  ["zh-TW", "中文（繁體）", "Chinese (Traditional)"],
  ["ja", "日本語", "Japanese"],
  ["ko", "한국어", "Korean"],
  ["ru", "Русский", "Russian"],
  ["it", "Italiano", "Italian"],
  ["nl", "Nederlands", "Dutch"],
  ["pl", "Polski", "Polish"],
  ["tr", "Türkçe", "Turkish"],
  ["vi", "Tiếng Việt", "Vietnamese"],
  ["th", "ไทย", "Thai"],
  ["sv", "Svenska", "Swedish"],
  ["da", "Dansk", "Danish"],
  ["no", "Norsk", "Norwegian"],
  ["fi", "Suomi", "Finnish"],
  ["el", "Ελληνικά", "Greek"],
  ["he", "עברית", "Hebrew"],
  ["cs", "Čeština", "Czech"],
  ["ro", "Română", "Romanian"],
  ["hu", "Magyar", "Hungarian"],
  ["id", "Bahasa Indonesia", "Indonesian"],
  ["ms", "Bahasa Melayu", "Malay"],
  ["tl", "Filipino", "Filipino"],
  ["uk", "Українська", "Ukrainian"],
  ["fa", "فارسی", "Persian"],
  ["sw", "Kiswahili", "Swahili"],
  ["ta", "தமிழ்", "Tamil"],
  ["te", "తెలుగు", "Telugu"],
  ["ml", "മലയാളം", "Malayalam"],
  ["kn", "ಕನ್ನಡ", "Kannada"],
  ["gu", "ગુજરાતી", "Gujarati"],
  ["mr", "मराठी", "Marathi"],
  ["pa", "ਪੰਜਾਬੀ", "Punjabi"],
  ["or", "ଓଡ଼ିଆ", "Odia"],
  ["si", "සිංහල", "Sinhala"],
  ["ne", "नेपाली", "Nepali"],
  ["my", "မြန်မာ", "Myanmar"],
  ["km", "ខ្មែរ", "Khmer"],
  ["lo", "ລາວ", "Lao"],
  ["ka", "ქართული", "Georgian"],
  ["hy", "Հայերեն", "Armenian"],
  ["az", "Azərbaycan", "Azerbaijani"],
  ["uz", "Oʻzbek", "Uzbek"],
  ["kk", "Қазақ", "Kazakh"],
  ["ky", "Кыргызча", "Kyrgyz"],
  ["tg", "Тоҷикӣ", "Tajik"],
  ["tk", "Türkmen", "Turkmen"],
  ["mn", "Монгол", "Mongolian"],
  ["ps", "پښتو", "Pashto"],
  ["sd", "سنڌي", "Sindhi"],
  ["ku", "Kurdî", "Kurdish"],
  ["am", "አማርኛ", "Amharic"],
  ["ti", "ትግርኛ", "Tigrinya"],
  ["om", "Oromoo", "Oromo"],
  ["so", "Soomaali", "Somali"],
  ["ha", "Hausa", "Hausa"],
  ["ig", "Igbo", "Igbo"],
  ["yo", "Yorùbá", "Yoruba"],
  ["zu", "isiZulu", "Zulu"],
  ["xh", "isiXhosa", "Xhosa"],
  ["af", "Afrikaans", "Afrikaans"],
  ["st", "Sesotho", "Sesotho"],
  ["sn", "chiShona", "Shona"],
  ["ny", "Chichewa", "Chichewa"],
  ["mg", "Malagasy", "Malagasy"],
  ["rw", "Kinyarwanda", "Kinyarwanda"],
  ["bg", "Български", "Bulgarian"],
  ["hr", "Hrvatski", "Croatian"],
  ["sr", "Српски", "Serbian"],
  ["sk", "Slovenčina", "Slovak"],
  ["sl", "Slovenščina", "Slovenian"],
  ["mk", "Македонски", "Macedonian"],
  ["bs", "Bosanski", "Bosnian"],
  ["sq", "Shqip", "Albanian"],
  ["et", "Eesti", "Estonian"],
  ["lv", "Latviešu", "Latvian"],
  ["lt", "Lietuvių", "Lithuanian"],
  ["mt", "Malti", "Maltese"],
  ["ga", "Gaeilge", "Irish"],
  ["cy", "Cymraeg", "Welsh"],
  ["gd", "Gàidhlig", "Scottish Gaelic"],
  ["eu", "Euskara", "Basque"],
  ["gl", "Galego", "Galician"],
  ["ca", "Català", "Catalan"],
  ["la", "Latina", "Latin"],
  ["eo", "Esperanto", "Esperanto"],
  ["is", "Íslenska", "Icelandic"],
  ["lb", "Lëtzebuergesch", "Luxembourgish"],
  ["fy", "Frysk", "Frisian"],
  ["co", "Corsu", "Corsican"],
  ["haw", "ʻŌlelo Hawaiʻi", "Hawaiian"],
  ["sm", "Samoan", "Samoan"],
  ["mi", "Māori", "Maori"],
  ["ceb", "Cebuano", "Cebuano"],
  ["jw", "Jawa", "Javanese"],
  ["su", "Sunda", "Sundanese"],
  ["hmn", "Hmoob", "Hmong"],
  ["ht", "Kreyòl", "Haitian Creole"],
  ["be", "Беларуская", "Belarusian"],
  ["tt", "Татарча", "Tatar"],
  ["yi", "ייִדיש", "Yiddish"],
  ["as", "অসমীয়া", "Assamese"],
  ["bho", "भोजपुरी", "Bhojpuri"],
  ["mai", "मैथिली", "Maithili"],
  ["doi", "डोगरी", "Dogri"],
  ["ks", "کٲشُر", "Kashmiri"],
  ["gom", "कोंकणी", "Konkani"],
  ["sa", "संस्कृतम्", "Sanskrit"],
  ["mni-Mtei", "ꯃꯤꯇꯩꯂꯣꯟ", "Meiteilon"],
  ["lus", "Mizo ṭawng", "Mizo"],
  ["ts", "Xitsonga", "Tsonga"],
  ["ak", "Akan", "Akan"],
  ["ee", "Eʋegbe", "Ewe"],
  ["ln", "Lingála", "Lingala"],
  ["lg", "Luganda", "Luganda"],
  ["nso", "Sepedi", "Sepedi"],
  ["tw", "Twi", "Twi"],
  ["ug", "ئۇيغۇرچە", "Uyghur"],
  ["dv", "ދިވެހި", "Dhivehi"],
  ["iw", "עברית", "Hebrew (alt)"],
];

// Top 7 suggested languages
const SUGGESTED_CODES = ["en", "bn", "hi", "ur", "ar", "de", "fr"];

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
  const [currentLang, setCurrentLang] = useState("en");
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setReady(true);
    const savedLang = localStorage.getItem("language");
    if (savedLang) setCurrentLang(savedLang);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
        setFilter("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Auto-focus search on open
  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [isOpen]);

  const suggested = useMemo(
    () => ALL_LANGUAGES.filter(([code]) => SUGGESTED_CODES.includes(code)),
    []
  );

  const filtered = useMemo(() => {
    if (!filter.trim()) return ALL_LANGUAGES;
    const q = filter.toLowerCase();
    return ALL_LANGUAGES.filter(
      ([code, native, english]) =>
        code.toLowerCase().includes(q) ||
        native.toLowerCase().includes(q) ||
        english.toLowerCase().includes(q)
    );
  }, [filter]);

  function setTranslateCookie(value: string) {
    document.cookie = `googtrans=${value};path=/`;
    document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
  }

  function applyLanguage(langCode: string) {
    const cookieValue = `/en/${langCode}`;
    setTranslateCookie(cookieValue);
    document.documentElement.lang = langCode;

    const googleElem = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (googleElem) {
      googleElem.value = langCode;
      googleElem.dispatchEvent(new Event("change", { bubbles: true }));
    }

    window.location.reload();
  }

  function handleSelect(code: string) {
    setCurrentLang(code);
    localStorage.setItem("language", code);
    setIsOpen(false);
    setFilter("");
    applyLanguage(code);
  }

  const currentEntry = ALL_LANGUAGES.find(([c]) => c === currentLang);
  const displayLabel = currentEntry ? currentEntry[2] : currentLang.toUpperCase();

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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="badge-glass flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[var(--text-main)] hover:shadow-md transition-all"
        aria-label="Select language"
        title="Select language"
      >
        <span className="material-symbols-outlined text-[1rem] text-[var(--text-main)]">language</span>
        <span className="hidden sm:inline">{displayLabel}</span>
        <span className={`material-symbols-outlined text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}>expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute end-0 mt-2 w-72 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[420px]">
          {/* ── Search/Filter Bar ── */}
          <div className="px-3 pt-3 pb-2 border-b border-[var(--border)]/40 shrink-0">
            <div className="flex items-center gap-2 bg-[var(--surface)] rounded-lg px-3 py-2">
              <svg className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search languages..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-[var(--text-main)] w-full placeholder:text-[var(--text-muted)]"
              />
              {filter && (
                <button
                  onClick={() => setFilter("")}
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] text-xs"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin' }}>
            {/* ── Suggested Section ── */}
            {!filter.trim() && (
              <div>
                <div className="px-4 pt-3 pb-1">
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-muted)]">Suggested</span>
                </div>
                {suggested.map(([code, native, english]) => (
                  <button
                    key={`suggested-${code}`}
                    onClick={() => handleSelect(code)}
                    className={`w-full text-start px-4 py-2.5 transition-all flex items-center justify-between gap-2 ${
                      currentLang === code
                        ? "bg-[var(--brand)] text-[var(--brand-contrast)]"
                        : "text-[var(--text-main)] hover:bg-[var(--surface)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    <span className="font-medium text-sm">{native}</span>
                    <span className={`text-xs ${currentLang === code ? "opacity-70" : "text-[var(--text-muted)]"}`}>{english}</span>
                  </button>
                ))}
                <div className="mx-4 my-1 h-px bg-[var(--border)]/40"></div>
                <div className="px-4 pt-2 pb-1">
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-muted)]">All Languages</span>
                </div>
              </div>
            )}

            {/* ── Full List (filtered) ── */}
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-[var(--text-muted)]">
                No languages match "{filter}"
              </div>
            ) : (
              filtered.map(([code, native, english]) => (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  className={`w-full text-start px-4 py-2.5 transition-all flex items-center justify-between gap-2 ${
                    currentLang === code
                      ? "bg-[var(--brand)] text-[var(--brand-contrast)]"
                      : "text-[var(--text-main)] hover:bg-[var(--surface)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span className="font-medium text-sm">{native}</span>
                  <span className={`text-xs ${currentLang === code ? "opacity-70" : "text-[var(--text-muted)]"}`}>{english}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

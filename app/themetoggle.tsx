"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      applyTheme(savedTheme);
      setReady(true);
      return;
    }

    // Default to light mode for better readability
    const initialTheme: Theme = "light";
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setReady(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  }

  if (!ready) {
    return (
      <button type="button" className="p-2" aria-label="Toggle theme loading" disabled>
        <span className="sr-only">Loading</span>
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="badge-glass p-2 hover:shadow-md transition-all"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Image src="/moon.svg" alt="Moon" width={24} height={24} />
      ) : (
        <Image src="/sun.svg" alt="Sun" width={24} height={24} />
      )}
    </button>
  );
}

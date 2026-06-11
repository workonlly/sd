"use client";

import { useEffect } from "react";

export default function AmbientGlow() {
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const x = `${(event.clientX / window.innerWidth) * 100}%`;
      const y = `${(event.clientY / window.innerHeight) * 100}%`;
      document.documentElement.style.setProperty("--glow-x", x);
      document.documentElement.style.setProperty("--glow-y", y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div className="ambient-glow" aria-hidden="true" />;
}

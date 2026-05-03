"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  dir?: "left" | "right";
};

export default function SectionLabel({ children, className = "mb-5", dir = "left" }: Props) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={`flex items-center gap-2 text-xs uppercase tracking-[0.45em] text-[#D69A66] ${className}`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis
          ? "translateX(0)"
          : dir === "right"
          ? "translateX(32px)"
          : "translateX(-32px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
    >
      <span className="text-[#D69A66]/50">—</span>
      {children}
    </p>
  );
}

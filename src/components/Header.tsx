"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicePageItems } from "../data";
import ContactModal from "./ContactModal";

/* ── Animated sacred-geometry logo ─────────────────────────── */
function LogoMark() {
  return (
    <svg viewBox="-1.12 -1.12 2.24 2.24" className="h-8 w-8 shrink-0" fill="none">
      {/* Outer petal ring — clockwise */}
      <g stroke="rgba(255,255,255,0.68)" strokeWidth="0.038">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={0.52} cy={0} r={0.52} transform={`rotate(${a})`} />
        ))}
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="32s"
          repeatCount="indefinite"
        />
      </g>
      {/* Inner petal ring — counter-clockwise */}
      <g stroke="rgba(255,255,255,0.36)" strokeWidth="0.028">
        {[30, 90, 150, 210, 270, 330].map((a) => (
          <circle key={a} cx={0.34} cy={0} r={0.34} transform={`rotate(${a})`} />
        ))}
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="-360"
          dur="22s"
          repeatCount="indefinite"
        />
      </g>
      {/* Center void */}
      <circle cx={0} cy={0} r={0.19} fill="#0d0d0b" stroke="rgba(255,255,255,0.52)" strokeWidth="0.032" />
    </svg>
  );
}

/* ── Header ─────────────────────────────────────────────────── */
export default function Header() {
  const currentPath = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  const servicesActive =
    currentPath === "/services" ||
    servicePageItems.some((item) => currentPath === `/${item.id}`);

  const navCls = (path: string) =>
    `px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
      currentPath === path
        ? "text-[#d7c4a1] bg-[#d7c4a1]/[0.08]"
        : "text-white/70 hover:text-white hover:bg-white/[0.07]"
    }`;

  return (
    <>
      <style>{`
        @keyframes brand-shine {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .brand-link:hover > .brand-label {
          background-image: linear-gradient(90deg,
            #ffffff 0%, #d7c4a1 18%, #c4b5fd 36%,
            #d7c4a1 54%, #ffffff 72%, #c4b5fd 90%, #d7c4a1 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: brand-shine 2.4s linear infinite;
        }
      `}</style>

      <header className="fixed left-0 right-0 top-0 z-50 px-5 py-4 md:px-10 lg:px-16">
        {/* ── Main pill ── */}
        <div className="nav-item mx-auto flex max-w-[1600px] items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0d0d0b]/70 px-5 py-3 text-white shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">

          {/* Brand */}
          <Link href="/" className="brand-link group flex shrink-0 items-center gap-2.5">
            <LogoMark />
            <span className="brand-label text-xs uppercase tracking-[0.34em] text-white transition-colors duration-300 md:text-sm">
              3D Smart Design
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            <Link href="/o-nas" className={navCls("/o-nas")}>О нас</Link>

            {/* ── Services dropdown ── */}
            <div className="group relative">
              <Link
                href="/services"
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  servicesActive
                    ? "bg-[#d7c4a1]/[0.08] text-[#d7c4a1]"
                    : "text-white/70 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                Услуги
                <span className="inline-block text-[#d7c4a1] transition-transform duration-300 group-hover:rotate-45">
                  +
                </span>
              </Link>

              {/* hover bridge */}
              <div className="pointer-events-none absolute inset-x-0 top-full h-4 group-hover:pointer-events-auto" />

              {/* Dropdown panel */}
              <div className="pointer-events-none absolute right-0 top-[calc(100%+0.6rem)] z-50 w-[540px] -translate-y-2 scale-[0.96] rounded-[2rem] border border-white/10 bg-[#0d0d0b]/97 p-5 opacity-0 shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_0_1px_rgba(215,196,161,0.06)] backdrop-blur-2xl transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">

                {/* panel header */}
                <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#d7c4a1] animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.38em] text-[#d7c4a1]">Наши услуги</span>
                  </div>
                  <span className="rounded-full border border-[#d7c4a1]/20 px-2.5 py-0.5 text-[10px] tabular-nums text-[#d7c4a1]/50">
                    {servicePageItems.length}
                  </span>
                </div>

                {/* 2-column grid */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                  {servicePageItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${item.id}`}
                      className="group/i flex items-start gap-2.5 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-white/[0.05]"
                    >
                      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-white/20 transition-all duration-200 group-hover/i:bg-[#d7c4a1] group-hover/i:shadow-[0_0_6px_rgba(215,196,161,0.6)]" />
                      <span className="text-[11px] leading-snug tracking-[0.04em] text-white/50 transition-colors duration-200 group-hover/i:text-white">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* panel footer */}
                <div className="mt-4 border-t border-white/8 pt-3">
                  <Link
                    href="/services"
                    className="group/all flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-[#d7c4a1]/[0.05]"
                  >
                    <span className="text-[10px] uppercase tracking-[0.28em] text-white/30 transition-colors duration-200 group-hover/all:text-[#d7c4a1]/70">
                      Посмотреть все услуги
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-white/20 transition-all duration-200 group-hover/all:translate-x-0.5 group-hover/all:text-[#d7c4a1]/60">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/portfolio"    className={navCls("/portfolio")}>Портфолио</Link>
            <Link href="/kontakty"     className={navCls("/kontakty")}>Контакты</Link>
            <Link href="/akcii-i-skidki" className={navCls("/akcii-i-skidki")}>Акции</Link>
            <Link href="/novosti"      className={navCls("/novosti")}>Новости</Link>
            <Link href="/blog"         className={navCls("/blog")}>Блог</Link>
            <Link href="/otzyvy-o-nas" className={navCls("/otzyvy-o-nas")}>Отзывы</Link>
          </nav>

          {/* CTA — Заказать звонок */}
          <button
            onClick={() => setModalOpen(true)}
            className="group hidden items-center gap-2 rounded-full border border-[#d7c4a1]/35 px-5 py-2.5 text-[10px] uppercase tracking-[0.22em] text-[#d7c4a1] transition-all duration-300 hover:border-[#d7c4a1] hover:bg-[#d7c4a1] hover:text-[#0d0d0b] hover:shadow-[0_0_32px_rgba(215,196,161,0.28)] md:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Заказать звонок
          </button>
        </div>

        {/* ── Mobile nav strip ── */}
        <nav className="nav-item mt-3 flex gap-3 overflow-x-auto rounded-full border border-white/10 bg-[#0d0d0b]/75 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl lg:hidden">
          <Link className="shrink-0 transition hover:text-white" href="/o-nas">О нас</Link>
          <Link className="shrink-0 transition hover:text-white" href="/services">Услуги</Link>
          <Link className="shrink-0 transition hover:text-white" href="/portfolio">Портфолио</Link>
          <Link className="shrink-0 transition hover:text-white" href="/kontakty">Контакты</Link>
          <Link className="shrink-0 transition hover:text-white" href="/akcii-i-skidki">Акции</Link>
          <Link className="shrink-0 transition hover:text-white" href="/novosti">Новости</Link>
          <Link className="shrink-0 transition hover:text-white" href="/blog">Блог</Link>
          <Link className="shrink-0 transition hover:text-white" href="/otzyvy-o-nas">Отзывы</Link>
        </nav>
      </header>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

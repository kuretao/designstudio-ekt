"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicePageItems } from "../data";
import ContactModal from "./ContactModal";

function LogoMark() {
  return (
    <svg viewBox="-1.12 -1.12 2.24 2.24" className="h-8 w-8 shrink-0" fill="none">
      <g stroke="rgba(255,255,255,0.68)" strokeWidth="0.038">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={0.52} cy={0} r={0.52} transform={`rotate(${a})`} />
        ))}
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="32s" repeatCount="indefinite" />
      </g>
      <g stroke="rgba(215,196,161,0.42)" strokeWidth="0.028">
        {[30, 90, 150, 210, 270, 330].map((a) => (
          <circle key={a} cx={0.34} cy={0} r={0.34} transform={`rotate(${a})`} />
        ))}
        <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="22s" repeatCount="indefinite" />
      </g>
      <circle cx={0} cy={0} r={0.19} fill="#0d0d0b" stroke="rgba(255,255,255,0.52)" strokeWidth="0.032" />
    </svg>
  );
}

export default function Header() {
  const currentPath = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  const servicesActive = currentPath === "/services" || servicePageItems.some((item) => currentPath === `/${item.id}`);
  const navCls = (path: string) =>
    `px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
      currentPath === path ? "text-[#d7c4a1] bg-[#d7c4a1]/[0.08]" : "text-white/70 hover:text-white hover:bg-white/[0.07]"
    }`;

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-5 py-4 md:px-10 lg:px-16">
        <div className="nav-item mx-auto flex max-w-[1600px] items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0d0d0b]/70 px-5 py-3 text-white shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <LogoMark />
            <span className="text-xs uppercase tracking-[0.34em] text-white transition group-hover:text-[#d7c4a1] md:text-sm">
              3D Smart Design
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            <Link href="/o-nas" className={navCls("/o-nas")}>О нас</Link>
            <div className="group relative">
              <Link
                href="/services"
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  servicesActive ? "bg-[#d7c4a1]/[0.08] text-[#d7c4a1]" : "text-white/70 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                Услуги
                <span className="inline-block text-[#d7c4a1] transition-transform duration-300 group-hover:rotate-45">+</span>
              </Link>
              <div className="pointer-events-none absolute inset-x-0 top-full h-4 group-hover:pointer-events-auto" />
              <div className="pointer-events-none absolute right-0 top-[calc(100%+0.6rem)] z-50 w-[560px] -translate-y-2 scale-[0.96] rounded-[2rem] border border-white/10 bg-[#0d0d0b]/97 p-5 opacity-0 shadow-[0_40px_120px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] uppercase tracking-[0.38em] text-[#d7c4a1]">Все услуги</span>
                  <span className="rounded-full border border-[#d7c4a1]/20 px-2.5 py-0.5 text-[10px] text-[#d7c4a1]/60">{servicePageItems.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {servicePageItems.map((item) => (
                    <Link key={item.id} href={`/${item.id}`} className="group/i rounded-xl px-3 py-2.5 transition hover:bg-white/[0.05]">
                      <span className="block text-[11px] leading-snug text-white/58 transition group-hover/i:text-white">{item.title}</span>
                      <span className="mt-1 block text-[10px] text-[#d7c4a1]/55">{item.eyebrow}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/portfolio" className={navCls("/portfolio")}>Портфолио</Link>
            <Link href="/kontakty" className={navCls("/kontakty")}>Контакты</Link>
            <Link href="/akcii-i-skidki" className={navCls("/akcii-i-skidki")}>Акции</Link>
            <Link href="/novosti" className={navCls("/novosti")}>Новости</Link>
            <Link href="/blog" className={navCls("/blog")}>Блог</Link>
            <Link href="/otzyvy-o-nas" className={navCls("/otzyvy-o-nas")}>Отзывы</Link>
          </nav>

          <button
            onClick={() => setModalOpen(true)}
            className="hidden cursor-pointer rounded-full border border-[#d7c4a1]/35 px-5 py-2.5 text-[10px] uppercase tracking-[0.22em] text-[#d7c4a1] transition-all duration-300 hover:border-[#d7c4a1] hover:bg-[#d7c4a1] hover:text-[#0d0d0b] md:block"
          >
            Заказать звонок
          </button>
        </div>

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

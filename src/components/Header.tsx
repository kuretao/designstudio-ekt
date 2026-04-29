"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactInfo, servicePageItems } from "../data";
import ContactModal from "./ContactModal";

function Header() {
  const currentPath = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const linkClass = (path: string) =>
    `transition hover:text-white ${currentPath === path ? "text-[#d7c4a1]" : ""}`;
  const servicesActive =
    currentPath === "/services" || servicePageItems.some((item) => currentPath === `/${item.id}`);

  return (
    <>
    <header className="fixed left-0 right-0 top-0 z-50 px-5 py-4 md:px-10 lg:px-16">
      <div className="nav-item mx-auto flex max-w-[1600px] items-center justify-between gap-5 rounded-full border border-white/10 bg-[#0d0d0b]/70 px-5 py-3 text-white shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <Link href="/" className="shrink-0 text-xs uppercase tracking-[0.34em] text-white md:text-sm">
          3D Smart Design
        </Link>
        <nav className="hidden items-center justify-end gap-4 text-[10px] uppercase tracking-[0.2em] text-white/75 lg:flex">
          <Link className={linkClass("/o-nas")} href="/o-nas">О нас</Link>
          <div className="group relative">
            <Link
              className={`inline-flex items-center gap-2 transition hover:text-white ${servicesActive ? "text-[#d7c4a1]" : ""}`}
              href="/services"
            >
              Услуги
              <span className="text-[#d7c4a1]">+</span>
            </Link>
            <div className="pointer-events-none absolute -left-8 right-0 top-full h-5 group-hover:pointer-events-auto" />
            <div className="pointer-events-none absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[360px] rounded-[1.5rem] border border-white/10 bg-[#0d0d0b]/95 p-3 opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              {servicePageItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.id}`}
                  className="block rounded-2xl px-4 py-3 leading-snug tracking-[0.08em] text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <Link className={linkClass("/portfolio")} href="/portfolio">Портфолио</Link>
          <Link className={linkClass("/kontakty")} href="/kontakty">Контакты</Link>
          <Link className={linkClass("/akcii-i-skidki")} href="/akcii-i-skidki">Акции</Link>
          <Link className={linkClass("/novosti")} href="/novosti">Новости</Link>
          <Link className={linkClass("/blog")} href="/blog">Блог</Link>
          <Link className={linkClass("/otzyvy-o-nas")} href="/otzyvy-o-nas">Отзывы</Link>
        </nav>
        <button
          onClick={() => setModalOpen(true)}
          className="hidden rounded-full border border-[#d7c4a1]/40 px-4 py-2 text-xs text-[#d7c4a1] transition hover:bg-[#d7c4a1] hover:text-[#0d0d0b] md:block"
        >
          {contactInfo.phone}
        </button>
      </div>
      <nav className="nav-item mt-3 flex gap-3 overflow-x-auto rounded-full border border-white/10 bg-[#0d0d0b]/75 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl lg:hidden">
        <Link className="shrink-0 hover:text-white" href="/o-nas">О нас</Link>
        <Link className="shrink-0 hover:text-white" href="/services">Услуги</Link>
        <Link className="shrink-0 hover:text-white" href="/portfolio">Портфолио</Link>
        <Link className="shrink-0 hover:text-white" href="/kontakty">Контакты</Link>
        <Link className="shrink-0 hover:text-white" href="/akcii-i-skidki">Акции</Link>
        <Link className="shrink-0 hover:text-white" href="/novosti">Новости</Link>
        <Link className="shrink-0 hover:text-white" href="/blog">Блог</Link>
        <Link className="shrink-0 hover:text-white" href="/otzyvy-o-nas">Отзывы</Link>
      </nav>
    </header>
    <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Header;

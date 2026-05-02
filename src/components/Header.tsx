"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactModal from "./ContactModal";

const menuItems = [
  { href: "/o-nas", label: "О нас" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/services", label: "Услуги" },
  { href: "/kontakty", label: "Контакты" },
  { href: "/akcii-i-skidki", label: "Акции" },
  { href: "/novosti", label: "Новости" },
  { href: "/blog", label: "Блог" },
  { href: "/otzyvy-o-nas", label: "Отзывы" },
];

function LogoMark() {
  return (
    <span className="flex min-w-[128px] flex-col items-center gap-1 text-center">
      <svg viewBox="-1.12 -1.12 2.24 2.24" className="mx-auto block h-7 w-7 shrink-0" fill="none" aria-hidden="true">
        <g stroke="rgba(255,255,255,0.82)" strokeWidth="0.038">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle key={a} cx={0.52} cy={0} r={0.52} transform={`rotate(${a})`} />
          ))}
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="32s" repeatCount="indefinite" />
        </g>
        <g stroke="rgba(255,255,255,0.52)" strokeWidth="0.028">
          {[30, 90, 150, 210, 270, 330].map((a) => (
            <circle key={a} cx={0.34} cy={0} r={0.34} transform={`rotate(${a})`} />
          ))}
          <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="22s" repeatCount="indefinite" />
        </g>
        <circle cx={0} cy={0} r={0.19} fill="rgba(7,7,7,0.62)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.032" />
      </svg>
      <span className="text-center text-[9px] font-medium uppercase leading-none tracking-[0.42em] text-white">
        3D Smart
        <span className="mt-1 block tracking-[0.5em]">Design</span>
      </span>
    </span>
  );
}

function MenuIcon() {
  return (
    <span className="relative block h-[12px] w-[27px] text-white" aria-hidden="true">
      <span className="absolute left-0 top-[2px] h-px w-[27px] bg-current" />
      <span className="absolute left-0 top-[10px] h-px w-[27px] bg-current" />
    </span>
  );
}

function CloseIcon() {
  return (
    <span className="relative block h-[14px] w-[14px] text-white" aria-hidden="true">
      <span className="absolute left-1/2 top-1/2 h-px w-[15px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
      <span className="absolute left-1/2 top-1/2 h-px w-[15px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
    </span>
  );
}

export default function Header() {
  const currentPath = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const openContact = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };

  const menuLinkCls = (path: string) =>
    `block text-right text-[13px] font-semibold uppercase tracking-[0.17em] transition-[opacity,transform] duration-[820ms] ease-[cubic-bezier(.19,1,.22,1)] md:text-[17px] ${
      currentPath === path ? "text-white/78" : "text-white/40"
    }`;

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/16 bg-[#050505]/10 px-5 text-white backdrop-blur-[8px] md:px-10 lg:px-12">
        <div className="mx-auto grid h-[72px] max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center md:h-[76px]">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="rolls-menu"
            className="flex w-[142px] cursor-pointer items-center gap-[18px] justify-self-start text-[10px] font-semibold uppercase tracking-[0.24em] transition duration-300 hover:text-white/68"
          >
            <MenuIcon />
            <span>Menu</span>
          </button>

          <Link href="/" aria-label="3D Smart Design" onClick={closeMenu} className="justify-self-center transition duration-300 hover:opacity-75">
            <LogoMark />
          </Link>

          <button
            type="button"
            onClick={openContact}
            className="w-[142px] justify-self-end text-right text-[10px] font-semibold uppercase tracking-[0.24em] transition duration-300 hover:text-white/68"
          >
            Написать нам
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[55] bg-black/5 backdrop-blur-[8px] transition-opacity duration-[650ms] ease-[cubic-bezier(.77,0,.18,1)] ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <section
        id="rolls-menu"
        className={`fixed left-0 top-0 z-[70] h-screen w-full max-w-[650px] overflow-hidden bg-[#050505]/18 text-white shadow-[38px_0_120px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition-transform duration-[760ms] ease-[cubic-bezier(.77,0,.18,1)] ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={closeMenu}
          className="absolute left-6 top-8 z-10 flex cursor-pointer items-center gap-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:text-white/66 md:left-[75px] md:top-[50px]"
        >
          <CloseIcon />
          Close
        </button>

        <div className="flex h-screen flex-col items-end justify-center px-8 pb-24 pt-28 md:pr-[145px]">
          <nav aria-label="Основное меню" className="flex w-full max-w-[380px] flex-col items-end gap-[24px] md:gap-[31px]">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={menuLinkCls(item.href)}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translate3d(0, 0, 0)" : "translate3d(-96px, 0, 0)",
                  transitionDelay: menuOpen ? `${560 + index * 85}ms` : "0ms",
                  transitionProperty: "opacity, transform",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "#fff";
                  event.currentTarget.style.transition = "color 140ms ease, opacity 820ms cubic-bezier(.19,1,.22,1), transform 820ms cubic-bezier(.19,1,.22,1)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = currentPath === item.href ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.4)";
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            className={`absolute bottom-9 left-6 flex gap-5 text-[10px] font-bold uppercase tracking-[0.22em] transition-[opacity,transform] duration-[620ms] ease-[cubic-bezier(.77,0,.18,1)] md:left-[75px] ${
              menuOpen ? "translate-x-0 opacity-100 delay-[760ms]" : "-translate-x-8 opacity-0"
            }`}
          >
            <span className="text-white/78">РУ</span>
            <Link href="#" className="text-white/34 transition hover:text-white/78">
              ENG
            </Link>
          </div>
        </div>
      </section>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

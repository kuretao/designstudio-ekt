"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useCms } from "@/src/cms";
import ContactModal from "@/src/modals/ContactModal";

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
  const { menuItems, serviceNavigationGroups, siteSettings } = useCms();
  const { i18n, t } = useTranslation();
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
  const changeLanguage = (locale: "ru" | "en") => {
    i18n.changeLanguage(locale);
    setMenuOpen(false);
  };

  const serviceHrefs = new Set([
    "/services",
    ...serviceNavigationGroups.flatMap((group) => [group.href, ...group.items.map((item) => item.href)]),
  ]);
  const menuByHref = new Map(menuItems.filter((item) => !serviceHrefs.has(item.href)).map((item) => [item.href, item]));
  const featuredMenuLinks = ["/o-nas", "/portfolio", "/kontakty"]
    .map((href) => menuByHref.get(href) ?? (href === "/o-nas" ? { href, label: "О нас" } : href === "/portfolio" ? { href, label: "Портфолио" } : { href, label: "Контакты" }));
  const featuredHrefs = new Set(featuredMenuLinks.map((item) => item.href));
  const secondaryMenuLinks = menuItems.filter((item) => !serviceHrefs.has(item.href) && !featuredHrefs.has(item.href));
  const primaryMenuLinks = [
    featuredMenuLinks[0],
    featuredMenuLinks[1],
    { href: "/services", label: "Услуги" },
    featuredMenuLinks[2],
    ...secondaryMenuLinks,
  ];
  const isServicesActive = currentPath === "/services" || Array.from(serviceHrefs).some((href) => currentPath === href);

  const menuLinkCls = (path: string) =>
    `block text-right text-[13px] font-semibold uppercase tracking-[0.17em] transition-[opacity,transform] duration-[820ms] ease-[cubic-bezier(.19,1,.22,1)] hover:text-[#D69A66] md:text-[17px] ${
      currentPath === path || (path === "/services" && isServicesActive) ? "text-white/78" : "text-white/40"
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
            <span>{t("header.menu")}</span>
          </button>

          <Link href="/" aria-label={siteSettings.siteName} onClick={closeMenu} className="justify-self-center transition duration-300 hover:opacity-75">
            {siteSettings.logoSmall || siteSettings.logo ? (
              <img
                src={siteSettings.logoSmall ?? siteSettings.logo ?? ""}
                alt={siteSettings.siteName}
                className="block max-h-12 max-w-[180px] object-contain"
              />
            ) : (
              <LogoMark />
            )}
          </Link>

          <button
            type="button"
            onClick={openContact}
            className="w-[142px] justify-self-end text-right text-[10px] font-semibold uppercase tracking-[0.24em] transition duration-300 hover:text-white/68"
          >
            {t("header.contact")}
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
        className={`fixed left-0 top-0 z-[70] h-screen w-full max-w-[720px] overflow-hidden bg-[#050505]/18 text-white shadow-[38px_0_120px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition-transform duration-[760ms] ease-[cubic-bezier(.77,0,.18,1)] ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={closeMenu}
          className="absolute left-6 top-8 z-10 flex cursor-pointer items-center gap-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:text-white/66 md:left-[75px] md:top-[50px]"
        >
          <CloseIcon />
          {t("header.close")}
        </button>

        <div className="flex h-screen flex-col items-end overflow-y-auto px-8 pb-24 pt-28 md:pr-[92px] lg:pr-[118px]" data-native-scroll>
          <nav aria-label="Основное меню" className="flex w-full max-w-[520px] flex-col items-end gap-[20px] md:gap-[25px]">
            {primaryMenuLinks.map((item, index) =>
              item.href === "/services" ? (
                <div
                  key="services-menu"
                  className="w-full text-right transition-[opacity,transform] duration-[820ms] ease-[cubic-bezier(.19,1,.22,1)]"
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translate3d(0, 0, 0)" : "translate3d(-96px, 0, 0)",
                    transitionDelay: menuOpen ? `${560 + index * 85}ms` : "0ms",
                    transitionProperty: "opacity, transform",
                  }}
                >
                  <Link href="/services" onClick={closeMenu} className={menuLinkCls("/services")}>
                    Услуги
                  </Link>
                  <div className="mt-5 grid gap-3 border-r border-white/12 pr-4">
                    {serviceNavigationGroups.map((group) => (
                      <div key={group.id} className="grid gap-2">
                        <Link
                          href={group.href}
                          onClick={closeMenu}
                          className={`text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:text-[#D69A66] ${
                            currentPath === group.href ? "text-white/82" : "text-white/58"
                          }`}
                        >
                          {group.title}
                        </Link>
                        <div className="grid gap-1.5">
                          {group.items.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeMenu}
                              className={`text-[12px] leading-snug transition hover:text-[#D69A66] ${
                                currentPath === child.href ? "text-white/72" : "text-white/36"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
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
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div
            className={`absolute bottom-9 left-6 flex gap-5 text-[10px] font-bold uppercase tracking-[0.22em] transition-[opacity,transform] duration-[620ms] ease-[cubic-bezier(.77,0,.18,1)] md:left-[75px] ${
              menuOpen ? "translate-x-0 opacity-100 delay-[760ms]" : "-translate-x-8 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => changeLanguage("ru")}
              className={`transition hover:text-white/78 ${i18n.language === "ru" ? "text-white/78" : "text-white/34"}`}
            >
              РУ
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className={`transition hover:text-white/78 ${i18n.language === "en" ? "text-white/78" : "text-white/34"}`}
            >
              ENG
            </button>
          </div>
        </div>
      </section>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

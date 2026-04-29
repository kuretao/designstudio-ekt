import Link from "next/link";
import { contactInfo, servicePageItems } from "../data";

const navLinks = [
  { href: "/o-nas",           label: "О нас" },
  { href: "/portfolio",       label: "Портфолио" },
  { href: "/kontakty",        label: "Контакты" },
  { href: "/akcii-i-skidki",  label: "Акции и скидки" },
  { href: "/novosti",         label: "Новости" },
  { href: "/blog",            label: "Блог" },
  { href: "/otzyvy-o-nas",    label: "Отзывы" },
];

const socials = [
  { label: "TG",  href: "https://t.me/+79879421242",                            color: "#229ED9" },
  { label: "WA",  href: "https://wa.me/79879421242",                            color: "#25D366" },
  { label: "VB",  href: "viber://chat?number=%2B79879421242",                   color: "#7360F2" },
  { label: "LI",  href: "https://www.linkedin.com/in/3dsmartdesignstudio",      color: "#0A66C2" },
  { label: "BE",  href: "https://www.behance.net/3dsmartdesign",                color: "#1769FF" },
  { label: "PIN", href: "https://ru.pinterest.com/3D_SMART_DESIGN_STUDIO/",     color: "#E60023" },
];

function FooterLogo() {
  return (
    <svg viewBox="-1.12 -1.12 2.24 2.24" className="h-10 w-10 shrink-0" fill="none">
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="0.038">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={0.52} cy={0} r={0.52} transform={`rotate(${a})`} />
        ))}
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="32s" repeatCount="indefinite" />
      </g>
      <g stroke="rgba(255,255,255,0.28)" strokeWidth="0.028">
        {[30, 90, 150, 210, 270, 330].map((a) => (
          <circle key={a} cx={0.34} cy={0} r={0.34} transform={`rotate(${a})`} />
        ))}
        <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="22s" repeatCount="indefinite" />
      </g>
      <circle cx={0} cy={0} r={0.19} fill="#0d0d0b" stroke="rgba(255,255,255,0.42)" strokeWidth="0.032" />
    </svg>
  );
}

export default function Footer() {
  const half = Math.ceil(servicePageItems.length / 2);
  const col1 = servicePageItems.slice(0, half);
  const col2 = servicePageItems.slice(half);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0d0d0b]">
      {/* Glow accent */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #d7c4a1 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">

          {/* ── Col 1 · Brand ── */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <FooterLogo />
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-white">3D Smart Design</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Studio</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/45">
              Студия концептуального дизайна интерьеров, архитектурных проектов и 3D‑визуализаций. Самара и весь мир.
            </p>

            {/* Social pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border px-3 py-1 text-[10px] font-medium tracking-[0.1em] transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: `${s.color}40`,
                    color: s.color,
                    background: `${s.color}10`,
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2 · Услуги ── */}
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.38em] text-[#d7c4a1]">Услуги</p>
            <ul className="space-y-2.5">
              {col1.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${item.id}`}
                    className="group flex items-center gap-2 text-sm text-white/45 transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-3 shrink-0 bg-white/15 transition-all duration-200 group-hover:w-4 group-hover:bg-[#d7c4a1]" />
                    {item.title}
                  </Link>
                </li>
              ))}
              {col2.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${item.id}`}
                    className="group flex items-center gap-2 text-sm text-white/45 transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-3 shrink-0 bg-white/15 transition-all duration-200 group-hover:w-4 group-hover:bg-[#d7c4a1]" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 · Навигация ── */}
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.38em] text-[#d7c4a1]">Разделы</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 text-sm text-white/45 transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-3 shrink-0 bg-white/15 transition-all duration-200 group-hover:w-4 group-hover:bg-[#d7c4a1]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4 · Контакты ── */}
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.38em] text-[#d7c4a1]">Контакты</p>
            <div className="space-y-5">
              {/* Phone */}
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-white/25">Телефон</p>
                <a
                  href={contactInfo.phoneHref}
                  className="text-base font-light text-white transition-colors duration-200 hover:text-[#d7c4a1]"
                >
                  {contactInfo.phone}
                </a>
              </div>

              {/* Email */}
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-white/25">Email</p>
                <div className="space-y-1">
                  {contactInfo.emails.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      className="block text-sm text-white/60 transition-colors duration-200 hover:text-[#d7c4a1]"
                    >
                      {e}
                    </a>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-white/25">График</p>
                <p className="text-sm text-white/55">Пн–Пт: 9:00 – 20:00</p>
                <p className="text-sm text-white/55">Сб–Вс: 10:00 – 19:00</p>
              </div>

              {/* Location */}
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-white/25">Адрес</p>
                <p className="text-sm text-white/55">Самара, Россия</p>
                <p className="text-xs text-white/30">Работаем удалённо по всему миру</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
          <div className="flex flex-col gap-1 text-xs text-white/30 md:flex-row md:items-center md:gap-4">
            <span>© 2026 3D Smart Design Studio</span>
            <span className="hidden md:block h-3 w-px bg-white/15" />
            <span>ИП Шакинене Екатерина Игоревна</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-white/30">
            <Link
              href="/politika-konfidencialnosti"
              className="transition-colors duration-200 hover:text-white/60"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/user/agreement"
              className="transition-colors duration-200 hover:text-white/60"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

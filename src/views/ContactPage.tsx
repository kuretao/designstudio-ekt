"use client";

import { useState, useEffect, useRef } from "react";
import { contactInfo, servicePageItems } from "../data";
import SectionLabel from "../components/SectionLabel";
import CustomSelect from "../components/CustomSelect";

/* ─── icons ─────────────────────────────────────────────────── */
const TgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);
const VbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M11.398.002C8.29.064 1.889 1.336.342 7.649c-.538 2.123-.598 4.373-.161 6.539.667 3.329 3.109 5.581 6.039 6.573v2.751a.487.487 0 0 0 .833.344l2.812-2.93a17.23 17.23 0 0 0 2.124.132c.305 0 .61-.009.917-.025 4.358-.237 8.08-2.434 9.011-6.766.742-3.482.253-8.876-4.08-12.174C15.877.812 13.617-.047 11.398.002zm.127 1.933c1.894-.042 3.827.683 5.459 1.878 3.659 2.713 4.091 7.362 3.45 10.37-.723 3.407-3.698 5.175-7.412 5.376a15.534 15.534 0 0 1-.875.024c-.728 0-1.447-.068-2.156-.188a.483.483 0 0 0-.383.1L7.554 21.47v-2.062a.485.485 0 0 0-.335-.463c-2.778-.815-4.755-2.672-5.286-5.335-.378-1.887-.322-3.84.163-5.695C3.33 3.127 8.558 2.003 11.525 1.935zm2.025 3.246a.484.484 0 0 0-.048.966c2.317.115 3.466 1.274 3.559 3.546a.484.484 0 0 0 .967-.038c-.112-2.748-1.636-4.337-4.478-4.474zm-4.198.686c-.22-.01-.45.07-.61.245-.282.309-.256.575-.212.86.25 1.632.982 3.12 2.038 4.175.954.954 2.249 1.63 3.674 1.9l.099.016c.246.033.524-.052.708-.273.284-.344.277-.623.213-.91a.47.47 0 0 0-.105-.202l-1.235-1.378c-.241-.268-.617-.32-.912-.124l-.617.408c-.19.126-.44.118-.622-.022-.613-.47-1.102-.993-1.452-1.61-.145-.252-.14-.558.012-.796l.393-.585a.68.68 0 0 0-.023-.824L10.1 6.112a.6.6 0 0 0-.748-.243zm4.615 1.405a.484.484 0 0 0-.066.963c.73.054 1.136.464 1.178 1.185a.484.484 0 0 0 .966-.059c-.068-1.19-.796-1.999-2.078-2.089z" />
  </svg>
);
const LiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const BeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.68.768-.63.166-1.3.254-2.006.254H0V4.51h6.938zm-.412 5.477c.583 0 1.06-.14 1.425-.42.36-.28.548-.72.548-1.32 0-.33-.06-.61-.175-.837-.115-.226-.27-.408-.47-.54-.2-.13-.43-.222-.69-.278-.26-.054-.535-.08-.823-.08H3.59v3.475h2.936zm.185 5.71c.32 0 .624-.03.906-.093.283-.06.535-.16.75-.3.217-.14.39-.33.517-.57.126-.24.19-.54.19-.9 0-.72-.207-1.23-.62-1.54-.415-.31-.966-.465-1.647-.465H3.59v3.87h3.12zm10.95-3.965c.42.41.646 1.01.646 1.8h-5.24c.03.73.27 1.28.7 1.66.43.38.95.57 1.57.57.59 0 1.07-.15 1.46-.44.38-.29.62-.62.73-.99h2.34c-.37 1.12-.95 1.95-1.73 2.48-.78.54-1.73.8-2.84.8-.77 0-1.47-.13-2.09-.39-.62-.26-1.15-.62-1.58-1.09-.43-.47-.77-1.03-.99-1.68-.23-.65-.35-1.37-.35-2.14 0-.75.12-1.45.37-2.1.25-.64.6-1.19 1.05-1.66.45-.47.99-.84 1.62-1.1.62-.26 1.31-.39 2.06-.39 1.69 0 3.02.58 3.97 1.76.95 1.17 1.42 2.75 1.42 4.72v.39zm-2.01-2.52c-.33-.37-.82-.56-1.46-.56-.43 0-.79.07-1.08.22-.29.15-.53.33-.72.55-.19.22-.32.46-.4.72-.08.26-.13.5-.13.73h4.21c-.07-.72-.3-1.29-.63-1.66zM15.68 8.12h4.45v1.29H15.68V8.12z" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

/* ─── social links ───────────────────────────────────────────── */
const socials = [
  { label: "Telegram",  href: "https://t.me/+79879421242",                              icon: <TgIcon />,  color: "#229ED9", bg: "rgba(34,158,217,0.12)",  border: "rgba(34,158,217,0.35)" },
  { label: "WhatsApp",  href: "https://wa.me/79879421242",                              icon: <WaIcon />,  color: "#25D366", bg: "rgba(37,211,102,0.12)",  border: "rgba(37,211,102,0.35)" },
  { label: "Viber",     href: "viber://chat?number=%2B79879421242",                     icon: <VbIcon />,  color: "#7360F2", bg: "rgba(115,96,242,0.12)", border: "rgba(115,96,242,0.35)" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/3dsmartdesignstudio",        icon: <LiIcon />,  color: "#0A66C2", bg: "rgba(10,102,194,0.12)",  border: "rgba(10,102,194,0.35)" },
  { label: "Behance",   href: "https://www.behance.net/3dsmartdesign",                  icon: <BeIcon />,  color: "#1769FF", bg: "rgba(23,105,255,0.12)",  border: "rgba(23,105,255,0.35)" },
  { label: "Pinterest", href: "https://ru.pinterest.com/3D_SMART_DESIGN_STUDIO/",       icon: <PinIcon />, color: "#E60023", bg: "rgba(230,0,35,0.12)",    border: "rgba(230,0,35,0.35)"  },
];

/* ─── animated counter ───────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = Math.ceil(to / 40);
      const t = setInterval(() => {
        start = Math.min(start + step, to);
        setVal(start);
        if (start >= to) clearInterval(t);
      }, 30);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── fade-in-up wrapper ─────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-[#f3efe7] outline-none transition placeholder:text-white/25 focus:border-[#d7c4a1]/60 focus:bg-white/[0.07]";

export function ContactSection() {
  const [name, setName] = useState("");
  const [contactVal, setContactVal] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    const subject = encodeURIComponent(service ? `Заявка: ${service}` : "Заявка с сайта 3D Smart Design");
    const body = encodeURIComponent(
      [
        name.trim() && `Имя: ${name.trim()}`,
        contactVal.trim() && `Контакт: ${contactVal.trim()}`,
        service && `Услуга: ${service}`,
        message.trim() && `Комментарий: ${message.trim()}`,
      ]
        .filter(Boolean)
        .join("\n")
    );
    window.location.href = `mailto:3dsmartdesign@bk.ru?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-28 pt-20 md:px-10 lg:px-16">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[600px] w-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(215,196,161,0.35) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="pointer-events-none absolute -right-24 bottom-32 h-[500px] w-[500px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(115,96,242,0.4) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Hero heading ── */}
        <FadeUp delay={0}>
          <SectionLabel>Контакты</SectionLabel>
        </FadeUp>
        <FadeUp delay={80}>
          <h1 className="text-6xl font-light leading-[0.9] tracking-[-0.065em] md:text-8xl lg:text-[10rem]">
            Свяжитесь<br />
            <span className="text-[#d7c4a1]">с нами</span>
          </h1>
        </FadeUp>

        {/* ── Stats strip ── */}
        <FadeUp delay={200} className="mt-12 flex flex-wrap gap-8 border-t border-white/8 pt-8 md:gap-16">
          {[
            { val: 1, suffix: " день", label: "время ответа" },
            { val: 3, suffix: " страны", label: "география проектов" },
            { val: 7, suffix: " лет", label: "на рынке дизайна" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-light tracking-[-0.04em] text-white md:text-4xl">
                <Counter to={s.val} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/35">{s.label}</p>
            </div>
          ))}
        </FadeUp>

        {/* ── Contact info cards ── */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Телефон",
              content: (
                <a href={contactInfo.phoneHref} className="text-2xl font-light text-white transition duration-300 hover:text-[#d7c4a1]">
                  {contactInfo.phone}
                </a>
              ),
              accent: "#d7c4a1",
              delay: 0,
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              ),
            },
            {
              label: "Email",
              content: (
                <div className="space-y-1.5">
                  {contactInfo.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="block text-sm text-white/75 transition hover:text-[#d7c4a1]">{e}</a>
                  ))}
                </div>
              ),
              accent: "#d7c4a1",
              delay: 80,
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              ),
            },
            {
              label: "График",
              content: (
                <div className="space-y-1">
                  <p className="text-sm text-white/75">Пн–Пт: 9:00 – 20:00</p>
                  <p className="text-sm text-white/75">Сб–Вс: 10:00 – 19:00</p>
                </div>
              ),
              accent: "#4ade80",
              delay: 160,
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              label: "Локация",
              content: (
                <div className="space-y-1">
                  <p className="text-sm text-white/75">Самара, Россия</p>
                  <p className="text-xs text-white/35">Работаем удалённо по всему миру</p>
                </div>
              ),
              accent: "#7360F2",
              delay: 240,
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              ),
            },
          ].map((card) => (
            <FadeUp key={card.label} delay={card.delay}>
              <div
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/20"
                style={{ boxShadow: "0 0 0 0 transparent", transition: "transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${card.accent}18`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div className="pointer-events-none absolute right-4 top-4 h-20 w-20 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" style={{ background: card.accent, opacity: 0 }}
                  ref={(el) => { if (el) { el.parentElement?.addEventListener("mouseenter", () => { el.style.opacity = "0.15"; }); el.parentElement?.addEventListener("mouseleave", () => { el.style.opacity = "0"; }); } }} />
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 transition duration-300 group-hover:border-white/20" style={{ color: card.accent }}>
                    {card.icon}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: card.accent }}>{card.label}</p>
                </div>
                {card.content}
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── Social / Messenger row ── */}
        <FadeUp delay={100} className="mt-8">
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: s.border,
                  background: s.bg,
                  color: s.color,
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px_30px ${s.color}30`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
              >
                <span className="transition duration-300 group-hover:scale-110">{s.icon}</span>
                <span className="text-xs font-medium tracking-[0.06em]">{s.label}</span>
              </a>
            ))}
          </div>
        </FadeUp>

        {/* ── Form + Map ── */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Form */}
          <FadeUp delay={0}>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.025] p-8 md:p-10">
              <SectionLabel className="mb-2">Написать нам</SectionLabel>
              <h2 className="mb-8 text-3xl font-light tracking-[-0.04em] text-white">Оставить заявку</h2>
              <div className="grid gap-3">
                <input
                  className={inputCls}
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className={inputCls}
                  placeholder="Телефон или e-mail"
                  value={contactVal}
                  onChange={(e) => setContactVal(e.target.value)}
                />
                <CustomSelect
                  value={service}
                  onChange={setService}
                  placeholder="Выберите услугу"
                  options={servicePageItems.map((item) => ({ value: item.title, label: item.title }))}
                />
                <textarea
                  className={`${inputCls} min-h-[120px] resize-none`}
                  placeholder="Коротко о проекте"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="relative h-14 overflow-hidden rounded-full text-sm font-medium uppercase tracking-[0.24em] transition duration-300"
                  style={{
                    background: sent ? "rgba(74,222,128,0.2)" : "#d7c4a1",
                    color: sent ? "#4ade80" : "#0d0d0b",
                    border: sent ? "1px solid rgba(74,222,128,0.4)" : "none",
                  }}
                >
                  <span className="relative z-10">{sent ? "✓ Заявка отправлена" : "Отправить заявку"}</span>
                  {!sent && (
                    <div
                      className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition duration-500 group-hover:translate-x-full"
                      style={{ transition: "transform 0.6s ease" }}
                    />
                  )}
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Map */}
          <FadeUp delay={120}>
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-[2.5rem] border border-white/10" style={{ minHeight: 360 }}>
                <iframe
                  title="3D Smart Design Studio map"
                  src={contactInfo.mapSrc}
                  className="h-full min-h-[360px] w-full grayscale invert"
                  style={{ filter: "invert(1) grayscale(1) brightness(0.85) contrast(1.1)" }}
                />
              </div>
              {/* Quick info card below map */}
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#d7c4a1]">Студия</p>
                    <p className="mt-1 text-lg font-light text-white">3D Smart Design Studio</p>
                    <p className="mt-0.5 text-sm text-white/40">Самара · Удалённо по всему миру</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#4ade80]" />
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="page-in pt-24">
      <ContactSection />
    </div>
  );
}

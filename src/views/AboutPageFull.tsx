"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionLabel from "../components/SectionLabel";

/* ── helpers ─────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let cur = 0;
      const step = Math.ceil(to / 50);
      const t = setInterval(() => { cur = Math.min(cur + step, to); setVal(cur); if (cur >= to) clearInterval(t); }, 28);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── data ────────────────────────────────────────────────────── */
const stats = [
  { value: 10, suffix: "", label: "лет на рынке", desc: "Успешной практики в дизайне и архитектуре" },
  { value: 25, suffix: "+", label: "специалистов", desc: "Высокопрофессиональная команда студии" },
  { value: 90, suffix: "%", label: "повторных заказов", desc: "Клиенты возвращаются снова и снова" },
  { value: 1500, suffix: "+", label: "заказов в год", desc: "Реализованных проектов разного масштаба" },
];

const steps = [
  {
    n: "01",
    title: "Консультация",
    text: "Знакомимся с вами, собираем информацию о проекте, пожеланиях, бюджете и сроках. Отвечаем на все вопросы.",
  },
  {
    n: "02",
    title: "Анализ и концепция",
    text: "Анализируем задачу, предлагаем дизайн-концепцию с референсами, стилевыми решениями и предварительной сметой.",
  },
  {
    n: "03",
    title: "Договор",
    text: "Фиксируем объём работ, стоимость и сроки. Подписываем договор — всё прозрачно и юридически защищено.",
  },
  {
    n: "04",
    title: "Разработка",
    text: "Создаём проект: эскизы, чертежи, 3D-визуализации. Вносим до 3 итераций правок до полного согласования.",
  },
  {
    n: "05",
    title: "Реализация",
    text: "Сопровождаем проект на стройплощадке или удалённо, контролируем соответствие чертежам и спецификациям.",
  },
  {
    n: "06",
    title: "Сдача объекта",
    text: "Финальный осмотр, устранение замечаний и передача полного пакета документации заказчику.",
  },
];

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "Индивидуальный подход",
    text: "Каждый проект — отражение личности заказчика. Мы не используем шаблонов.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Точность и скорость",
    text: "Соблюдаем сроки и бюджет. Системный подход к каждому этапу работы.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Прозрачность",
    text: "Открытая смета, понятные этапы и постоянная обратная связь на каждом шаге.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Удалённая работа",
    text: "Ведём проекты по всей России и за рубежом через видео-брифы, 3D-презентации и облачные инструменты.",
  },
];

/* ── page ────────────────────────────────────────────────────── */
export default function AboutPageFull() {
  return (
    <div className="page-in pt-24">
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-5 pb-16 pt-20 md:px-10 lg:px-16">
        {/* glow */}
        <div className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full opacity-[0.09]"
          style={{ background: "radial-gradient(circle,#d7c4a1 0%,transparent 70%)", filter: "blur(70px)" }} />

        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeUp delay={0}>
            <SectionLabel>О студии</SectionLabel>
          </FadeUp>
          <FadeUp delay={80}>
            <h1 className="max-w-5xl text-6xl font-light leading-[0.9] tracking-[-0.065em] md:text-8xl lg:text-[9rem]">
              Дизайн, который<br />
              <span className="text-[#d7c4a1]">работает</span>
            </h1>
          </FadeUp>
          <FadeUp delay={200} className="mt-10 max-w-2xl">
            <p className="text-lg leading-relaxed text-white/60 md:text-xl">
              3D Smart Design Studio — коллектив высокопрофессиональных специалистов в области
              дизайна интерьера, архитектурного проектирования, 3D‑визуализации и ландшафтного дизайна в Самаре.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════════ */}
      <section className="px-5 py-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 80}>
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/30 hover:shadow-[0_20px_60px_rgba(215,196,161,0.07)]">
                  <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#d7c4a1]/[0.04] blur-2xl transition duration-500 group-hover:bg-[#d7c4a1]/[0.1]" />
                  <p className="relative text-4xl font-light tracking-[-0.04em] text-white md:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#d7c4a1]">{s.label}</p>
                  <p className="mt-1.5 text-xs leading-snug text-white/35">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PHILOSOPHY ════════════════════════════════════════════ */}
      <section className="border-t border-white/10 px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeUp delay={0}>
              <SectionLabel>Философия</SectionLabel>
              <h2 className="mt-0 text-4xl font-light leading-snug tracking-[-0.045em] text-white md:text-5xl">
                Пространство, в котором хочется жить
              </h2>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="space-y-5 text-[#d8d1c4]">
                <p className="leading-relaxed">
                  Наша цель — создавать среды, где эстетика и практичность неразделимы,
                  а каждое решение отражает индивидуальность заказчика. Мы убеждены,
                  что хороший дизайн — это не декор, а система.
                </p>
                <p className="leading-relaxed">
                  Мы собираем проект как механизм: идея → планировка → материалы → свет →
                  документация → комплектация. Каждый этап обоснован и связан с остальными.
                </p>
                <p className="leading-relaxed">
                  Работаем в Самаре и удалённо с клиентами по всей России и за рубежом,
                  используя современные инструменты коммуникации и 3D‑презентации.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ VALUES ════════════════════════════════════════════════ */}
      <section className="px-5 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp delay={0} className="mb-10">
            <SectionLabel>Наши принципы</SectionLabel>
            <h2 className="text-4xl font-light tracking-[-0.045em] text-white md:text-5xl">
              Почему выбирают нас
            </h2>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 80}>
                <div className="group h-full rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/30">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-[#d7c4a1] transition duration-300 group-hover:border-[#d7c4a1]/40 group-hover:bg-[#d7c4a1]/5">
                    {v.icon}
                  </div>
                  <h3 className="mb-2.5 text-base font-medium text-white">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{v.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/10 px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp delay={0} className="mb-12">
            <SectionLabel>Модель взаимодействия</SectionLabel>
            <h2 className="text-4xl font-light tracking-[-0.045em] text-white md:text-5xl">
              Как мы работаем
            </h2>
          </FadeUp>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <FadeUp key={s.n} delay={i * 60}>
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/30">
                  {/* Large background number */}
                  <div className="pointer-events-none absolute -right-3 -top-3 text-[7rem] font-light leading-none text-white/[0.04] select-none transition duration-500 group-hover:text-[#d7c4a1]/[0.06]">
                    {s.n}
                  </div>
                  <div className="relative z-10">
                    <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.3em] text-[#d7c4a1]/60">
                      Шаг {s.n}
                    </span>
                    <h3 className="mb-3 text-xl font-light text-white">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-white/50">{s.text}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════ */}
      <section className="px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp delay={0}>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.025] px-8 py-16 text-center md:px-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(215,196,161,0.1),transparent_60%)]" />
              <p className="relative mb-4 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">
                — Начнём работу?
              </p>
              <h2 className="relative mx-auto max-w-2xl text-4xl font-light tracking-[-0.045em] md:text-6xl">
                Обсудим ваш проект
              </h2>
              <p className="relative mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#d8d1c4]">
                Расскажите о задаче — проведём бесплатную консультацию и предложим оптимальное решение.
              </p>
              <div className="relative mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/kontakty"
                  className="inline-flex items-center gap-3 rounded-full bg-[#d7c4a1] px-8 py-4 text-sm uppercase tracking-[0.24em] text-[#0d0d0b] transition duration-300 hover:bg-[#f3efe7] hover:shadow-[0_0_48px_rgba(215,196,161,0.35)]"
                >
                  Связаться с нами
                  <span>→</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 px-8 py-4 text-sm uppercase tracking-[0.24em] text-white/70 transition duration-300 hover:border-white/35 hover:text-white"
                >
                  Наши услуги
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

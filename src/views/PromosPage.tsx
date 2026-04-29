"use client";

import { useState } from "react";
import { promos } from "../data";
import ContactModal from "../components/ContactModal";

const badgeColors: Record<string, string> = {
  Интерьер: "border-[#d7c4a1]/40 text-[#d7c4a1]",
  Визуализация: "border-[#7360F2]/40 text-[#7360F2]",
  Ландшафт: "border-[#4ade80]/35 text-[#4ade80]",
};

const highlightColors: Record<string, string> = {
  Интерьер: "text-[#d7c4a1]",
  Визуализация: "text-[#9d8eff]",
  Ландшафт: "text-[#4ade80]",
};

const glowColors: Record<string, string> = {
  Интерьер: "hover:shadow-[0_32px_100px_rgba(215,196,161,0.12)]",
  Визуализация: "hover:shadow-[0_32px_100px_rgba(115,96,242,0.14)]",
  Ландшафт: "hover:shadow-[0_32px_100px_rgba(74,222,128,0.12)]",
};

export default function PromosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePromo, setActivePromo] = useState<string | undefined>();

  const openModal = (title?: string) => {
    setActivePromo(title);
    setModalOpen(true);
  };

  return (
    <>
      <div className="page-in pt-24">
        {/* Hero */}
        <section className="px-5 pb-10 pt-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Special offers</p>
            <div className="grid gap-8 md:grid-cols-[1fr_0.55fr] md:items-end">
              <h1 className="text-6xl font-light leading-[0.92] tracking-[-0.065em] md:text-8xl">
                Акции&nbsp;и скидки
              </h1>
              <div>
                <p className="text-lg leading-relaxed text-[#d8d1c4]">
                  Пакетные условия для комплексных проектов. Стоимость фиксируется после брифа — ниже стартовая структура.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-white/50">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d7c4a1]" />
                  Акции действуют до 31 января 2026
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promo cards */}
        <section className="px-5 py-12 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl space-y-5">
            {promos.map((promo, idx) => (
              <div
                key={promo.id}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.025] transition duration-500 hover:-translate-y-1 hover:border-white/20 ${glowColors[promo.badge]}`}
              >
                <div className="grid lg:grid-cols-[1fr_420px]">
                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between p-8 md:p-12">
                    <div>
                      {/* Meta row */}
                      <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.28em] ${badgeColors[promo.badge]}`}>
                          {promo.badge}
                        </span>
                        <span className="text-xs text-white/35">до {promo.validUntil}</span>
                        <span className="text-xs text-white/25">· #{String(idx + 1).padStart(2, "0")}</span>
                      </div>

                      {/* Highlight price */}
                      <p className={`mb-3 text-4xl font-light tracking-[-0.04em] md:text-5xl ${highlightColors[promo.badge]}`}>
                        {promo.highlight}
                      </p>

                      {/* Title */}
                      <h2 className="max-w-xl text-3xl font-light leading-tight tracking-[-0.04em] text-[#f3efe7] md:text-4xl">
                        {promo.title}
                      </h2>

                      {/* Description */}
                      <p className="mt-5 max-w-lg leading-relaxed text-[#d8d1c4]">
                        {promo.description}
                      </p>

                      {/* Conditions */}
                      <ul className="mt-7 space-y-2.5">
                        {promo.conditions.map((cond, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                            <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${highlightColors[promo.badge]}`} />
                            {cond}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-10">
                      <button
                        onClick={() => openModal(promo.title)}
                        className={`group/btn inline-flex items-center gap-3 rounded-full border px-7 py-4 text-xs uppercase tracking-[0.24em] transition duration-300 ${
                          promo.badge === "Визуализация"
                            ? "border-[#7360F2]/50 text-[#9d8eff] hover:bg-[#7360F2] hover:text-white"
                            : promo.badge === "Ландшафт"
                            ? "border-[#4ade80]/40 text-[#4ade80] hover:bg-[#4ade80] hover:text-[#0d0d0b]"
                            : "border-[#d7c4a1]/50 text-[#d7c4a1] hover:bg-[#d7c4a1] hover:text-[#0d0d0b]"
                        }`}
                      >
                        Записаться на акцию
                        <span className="transition duration-300 group-hover/btn:translate-x-1">→</span>
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative hidden min-h-[400px] overflow-hidden lg:block">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0b] via-[#0d0d0b]/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/50 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-5 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.025] px-8 py-14 text-center md:px-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(215,196,161,0.1),transparent_60%)]" />
              <p className="relative mb-4 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Нужна консультация?</p>
              <h2 className="relative mx-auto max-w-2xl text-4xl font-light tracking-[-0.045em] md:text-6xl">
                Расскажем подробнее о каждой акции
              </h2>
              <p className="relative mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#d8d1c4]">
                Свяжитесь с нами удобным способом — ответим в течение рабочего дня и подберём оптимальный пакет.
              </p>
              <button
                onClick={() => openModal()}
                className="relative mt-10 inline-flex items-center gap-3 rounded-full bg-[#d7c4a1] px-8 py-4 text-sm uppercase tracking-[0.24em] text-[#0d0d0b] transition duration-300 hover:bg-[#f3efe7] hover:shadow-[0_0_48px_rgba(215,196,161,0.35)]"
              >
                Связаться с нами
                <span>→</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} promoTitle={activePromo} />
    </>
  );
}

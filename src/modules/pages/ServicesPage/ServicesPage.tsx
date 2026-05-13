"use client";

import Link from "next/link";
import { projects, servicePageItems, services } from "@/src/data";
import CinematicImage from "@/src/components/common/CinematicImage";
import { GlassPanel } from "@/src/ui";
import SectionLabel from "@/src/components/common/SectionLabel";

const serviceHeroStats = [
  ["10 лет", "опыта в интерьерах, архитектуре и 3D"],
  ["25+", "специалистов под масштаб проекта"],
  ["6", "направлений в единой системе"],
];

function ServicesHero() {
  const heroCards = servicePageItems.slice(0, 3);

  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-16 pt-28 md:px-10 lg:px-16">
      <img src={projects[1].image} alt="Премиальный дизайн интерьера" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.96)_0%,rgba(5,5,5,.74)_48%,rgba(5,5,5,.24)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#050505_0%,rgba(5,5,5,.4)_32%,transparent_72%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
        <div className="pb-6">
          <p className="text-xs uppercase tracking-[0.38em] text-[#D69A66]">Services / 3D Smart Design</p>
          <h1 className="mt-5 max-w-5xl text-6xl font-light leading-[0.9] tracking-[-0.065em] text-white md:text-8xl lg:text-9xl">
            Услуги студии
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#E8E0D8]/85 md:text-xl">
            Проектируем интерьеры, архитектуру, ландшафт и визуализации так, чтобы заказчик видел не набор услуг, а продуманную систему будущего пространства.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/kontakty"
              className="rounded-full border border-[#D69A66] bg-[#D69A66] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E3AD7B]"
            >
              Обсудить проект
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/15 bg-black/25 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/75 backdrop-blur transition duration-300 hover:border-[#D69A66]/70 hover:text-white"
            >
              Смотреть работы
            </Link>
          </div>
        </div>

        <div className="grid gap-4 pb-8">
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-3">
            {serviceHeroStats.map(([value, label]) => (
              <GlassPanel key={value} className="p-5">
                <strong className="block text-3xl font-light tracking-[-0.04em] text-[#D69A66]">{value}</strong>
                <span className="mt-3 block text-xs uppercase leading-relaxed tracking-[0.18em] text-[#D6D1CA]">{label}</span>
              </GlassPanel>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {heroCards.map((item) => (
              <Link
                key={item.id}
                href={`/${item.id}`}
                className="group relative min-h-56 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-300 will-change-transform hover:-translate-y-2 hover:border-[#D69A66]/60"
              >
                <CinematicImage frames={[item.image, projects[0].image, projects[2].image]} alt={item.title} className="absolute inset-0" hint="motion" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/92 via-[#050505]/28 to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#D69A66]">{item.eyebrow}</p>
                  <h2 className="text-xl font-light leading-tight tracking-[-0.035em]">{item.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSummary() {
  return (
    <section id="services" className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Services &amp; pricing</SectionLabel>
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Услуги и цены</h2>
          <p className="text-[#D6D1CA]">
            Стоимость фиксируется после брифа и состава работ. Ниже - понятная стартовая структура по основным направлениям студии.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <GlassPanel key={service.title} className="rounded-[2rem] p-7">
              <div className="mb-8 flex items-start justify-between gap-4">
                <h3 className="text-3xl font-light tracking-[-0.04em]">{service.title}</h3>
                <span className="whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm text-[#D69A66]">
                  {service.price}
                </span>
              </div>
              <p className="leading-relaxed text-[#D6D1CA]">{service.text}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicePages() {
  return (
    <section className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <SectionLabel>Все страницы услуг</SectionLabel>
            <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Направления 3D Smart Design</h2>
          </div>
          <p className="text-lg leading-relaxed text-[#D6D1CA]">
            Перенесены все направления из старого меню: интерьер, коммерческие пространства, комплектация, 3D, ландшафт, архитектура и документация.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicePageItems.map((item, index) => (
            <Link
              key={item.id}
              id={item.id}
              href={`/${item.id}`}
              className="group scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-300 will-change-transform hover:-translate-y-2 hover:border-[#D69A66]/60 hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
            >
              <div className="relative h-72 overflow-hidden">
                <CinematicImage
                  frames={[item.image, projects[(index + 1) % projects.length]?.image, projects[(index + 3) % projects.length]?.image]}
                  alt={item.title}
                  className="absolute inset-0"
                  hint="motion"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-[#D69A66]/10" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#D69A66]">{item.eyebrow}</p>
                  <h3 className="text-3xl font-light tracking-[-0.04em]">{item.title}</h3>
                </div>
              </div>
              <p className="p-6 leading-relaxed text-[#D6D1CA]">{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Workflow() {
  const steps = ["Бриф", "Концепция", "Визуализация", "Чертежи", "Комплектация", "Сопровождение"];

  return (
    <section className="px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Workflow</SectionLabel>
        <h2 className="mb-14 max-w-4xl text-5xl font-light tracking-[-0.055em] md:text-7xl">
          Этапы работы без хаоса и лишней коммуникации
        </h2>
        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <GlassPanel
              key={step}
              className="p-7 lg:px-6 xl:p-7"
              style={{ background: "rgba(255, 255, 255, 0.03)", boxShadow: "none" }}
            >
              <span className="mb-14 block text-sm text-[#D69A66]">0{index + 1}</span>
              <h3 className="whitespace-nowrap pr-2 text-[clamp(1rem,1.12vw,1.25rem)] font-light leading-tight md:text-2xl lg:text-[clamp(1rem,1.12vw,1.25rem)]">
                {step}
              </h3>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <div className="page-in">
      <ServicesHero />
      <ServicesSummary />
      <ServicePages />
    </div>
  );
}

export default ServicesPage;

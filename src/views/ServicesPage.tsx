"use client";

import { servicePageItems, services } from "../data";
import { GlassPanel } from "../ui";

export function ServicesSummary() {
  return (
    <section id="services" className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Services & pricing</p>
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Услуги и цены</h2>
          <p className="text-[#d8d1c4]">
            Стоимость фиксируется после брифа и состава работ. Ниже — понятная стартовая структура.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <GlassPanel key={service.title} className="rounded-[2rem] p-7">
              <div className="mb-8 flex items-start justify-between gap-4">
                <h3 className="text-3xl font-light tracking-[-0.04em]">{service.title}</h3>
                <span className="whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm text-[#d7c4a1]">
                  {service.price}
                </span>
              </div>
              <p className="leading-relaxed text-[#d8d1c4]">{service.text}</p>
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
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Все страницы услуг</p>
            <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Направления 3D Smart Design</h2>
          </div>
          <p className="text-lg leading-relaxed text-[#d8d1c4]">
            Эти блоки соответствуют страницам услуг на 3dsmartdesign.ru и доступны из выпадающего меню.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicePageItems.map((item) => (
            <a
              key={item.id}
              id={item.id}
              href={`/${item.id}`}
              className="group scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-2 hover:border-[#d7c4a1]/60 hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/85 via-transparent to-[#d7c4a1]/10" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#d7c4a1]">Service page</p>
                  <h3 className="text-3xl font-light tracking-[-0.04em]">{item.title}</h3>
                </div>
              </div>
              <p className="p-6 leading-relaxed text-[#d8d1c4]">{item.text}</p>
            </a>
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
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Workflow</p>
        <h2 className="mb-14 max-w-4xl text-5xl font-light tracking-[-0.055em] md:text-7xl">
          Этапы работы без хаоса и лишней коммуникации
        </h2>
        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <div key={step} className="bg-[#0d0d0b] p-7">
              <span className="mb-14 block text-sm text-[#d7c4a1]">0{index + 1}</span>
              <h3 className="text-2xl font-light">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <div className="page-in pt-24">
      <ServicesSummary />
      <ServicePages />
    </div>
  );
}

export default ServicesPage;

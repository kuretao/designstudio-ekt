"use client";

import Link from "next/link";
import { servicePageItems as fallbackServicePageItems } from "@/src/data";
import { useCms } from "@/src/cms";
import { GlassPanel } from "@/src/ui";
import HeroBackdropSlider from "@/src/components/common/HeroBackdropSlider";
import { ContactSection } from "@/src/modules/pages/ContactPage";
import { Workflow } from "@/src/modules/pages/ServicesPage";

type ServicePageItem = (typeof fallbackServicePageItems)[number];

function ServiceDetailPage({ item }: { item: ServicePageItem }) {
  const { servicePageItems } = useCms();
  const currentItem = servicePageItems.find((service) => service.id === item.id) ?? item;

  return (
    <div className="page-in">
      <section className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28 md:px-10 lg:px-16">
        <HeroBackdropSlider
          slides={[
            { image: currentItem.image, alt: currentItem.title },
            { image: servicePageItems[1]?.image, alt: servicePageItems[1]?.title },
            { image: servicePageItems[2]?.image, alt: servicePageItems[2]?.title },
          ]}
        />
        <div className="absolute inset-0 bg-[#050505]/45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.98),rgba(5,5,5,.70),rgba(5,5,5,.28)),radial-gradient(circle_at_72%_18%,rgba(214,154,102,.22),transparent_34%)]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#D69A66]">{currentItem.eyebrow}</p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.94] tracking-[-0.06em] md:text-7xl lg:text-8xl">
              {currentItem.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#D6D1CA] md:text-xl">{currentItem.text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/kontakty"
                className="rounded-full bg-[#D69A66] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#050505] transition hover:bg-[#F5F2EC]"
              >
                Обсудить проект
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/15 px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#D6D1CA] transition hover:border-[#D69A66] hover:text-white"
              >
                Все услуги
              </Link>
            </div>
          </div>

          <GlassPanel className="rounded-[2rem] p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <GlassPanel className="rounded-[1.25rem] p-5">
                <span className="text-xs uppercase tracking-[0.28em] text-white/40">Стоимость</span>
                <strong className="mt-3 block text-3xl font-light text-[#D69A66]">{currentItem.price}</strong>
              </GlassPanel>
              <GlassPanel className="rounded-[1.25rem] p-5">
                <span className="text-xs uppercase tracking-[0.28em] text-white/40">Срок</span>
                <strong className="mt-3 block text-3xl font-light text-white">{currentItem.timeline}</strong>
              </GlassPanel>
            </div>
            <div className="mt-5 grid gap-3">
              {currentItem.deliverables.map((entry) => (
                <div key={entry} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-[#D6D1CA]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D69A66]" />
                  {entry}
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#D69A66]">Почему это работает</p>
            <h2 className="text-4xl font-light tracking-[-0.045em] md:text-6xl">Страница собрана из реальной структуры услуги</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {currentItem.benefits.map((benefit, index) => (
              <GlassPanel key={benefit} className="rounded-[1.5rem] p-6">
                <span className="text-sm text-[#D69A66]">0{index + 1}</span>
                <h3 className="mt-6 text-2xl font-light">{benefit}</h3>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-light tracking-[-0.045em] md:text-6xl">Как движется проект</h2>
            <p className="max-w-xl text-[#D6D1CA]">
              Процесс коротко пересобран из старых страниц: от заявки и исходных данных до финальных файлов, чертежей или сопровождения.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.24)] md:grid-cols-5">
            {currentItem.process.map((step, index) => (
              <GlassPanel key={step} className="p-6">
                <span className="mb-12 block text-sm text-[#D69A66]">0{index + 1}</span>
                <h3 className="text-xl font-light">{step}</h3>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <Workflow />
      <ContactSection />
    </div>
  );
}

export default ServiceDetailPage;

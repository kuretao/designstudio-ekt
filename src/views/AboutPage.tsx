"use client";

import Link from "next/link";
import { projects } from "../data";
import { GlassPanel } from "../ui";
import SectionLabel from "../components/SectionLabel";

const studioFacts = [
  { value: "10 лет", label: "практики в интерьерах, архитектуре и 3D" },
  { value: "25+", label: "специалистов под разные масштабы задач" },
  { value: "90%", label: "клиентов возвращаются с новыми проектами" },
];

const studioPrinciples = [
  "начинаем с сценария жизни, а не с декора",
  "проверяем красоту чертежами, светом и бюджетом",
  "ведем проект до реализации, комплектации и замен",
];

function AboutPage() {
  return (
    <section id="o-nas" className="relative overflow-hidden border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="pointer-events-none absolute right-0 top-20 h-[520px] w-[520px] rounded-full bg-[#d7c4a1]/[0.06] blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionLabel>О нас</SectionLabel>
          <h2 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.055em] md:text-7xl">
            Студия, которая собирает проект как систему
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#d8d1c4]">
            3D Smart Design Studio соединяет интерьер, архитектуру, визуализацию, ландшафт и комплектацию в один спокойный процесс. Клиент видит не набор картинок, а понятный маршрут от идеи до реализации.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {studioFacts.map((fact) => (
              <GlassPanel key={fact.value} className="rounded-[1.25rem] p-5">
                <strong className="block text-3xl font-light text-[#d7c4a1]">{fact.value}</strong>
                <span className="mt-3 block text-sm leading-snug text-[#d8d1c4]">{fact.label}</span>
              </GlassPanel>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/o-nas"
              className="rounded-full bg-[#d7c4a1] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#0d0d0b] transition hover:bg-[#f3efe7]"
            >
              Подробнее о студии
            </Link>
            <Link
              href="/kontakty"
              className="rounded-full border border-white/15 px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#d8d1c4] transition hover:border-[#d7c4a1] hover:text-white"
            >
              Обсудить проект
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.86fr_1.14fr]">
          <div className="grid gap-5">
            {studioPrinciples.map((item, index) => (
              <GlassPanel key={item} className="rounded-[1.5rem] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/50">
                <span className="text-sm text-[#d7c4a1]">0{index + 1}</span>
                <p className="mt-8 text-lg leading-relaxed text-[#f3efe7]">{item}</p>
              </GlassPanel>
            ))}
          </div>

          <div className="group relative min-h-[620px] overflow-hidden rounded-[2.5rem] border border-white/10">
            <img
              src={projects[0].image}
              alt="Интерьерный проект 3D Smart Design Studio"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/90 via-[#0d0d0b]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#d7c4a1]">Design with logic</p>
              <h3 className="max-w-md text-3xl font-light tracking-[-0.04em]">
                Красивое решение должно выдерживать стройку, бюджет и повседневную жизнь.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;

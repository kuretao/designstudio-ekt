"use client";

import Link from "next/link";
import { projects } from "@/src/data";

const quickLinks = [
  { href: "/portfolio", label: "Портфолио", text: "посмотреть уровень работ" },
  { href: "/services", label: "Услуги", text: "выбрать формат проекта" },
  { href: "/blog", label: "Блог", text: "почитать о подходе" },
];

function NotFoundPage() {
  return (
    <section className="page-in relative min-h-screen overflow-hidden px-5 pb-16 pt-28 md:px-10 lg:px-16">
      <img src={projects[0].image} alt="3D Smart Design Studio" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.97)_0%,rgba(5,5,5,.72)_48%,rgba(5,5,5,.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#050505_0%,rgba(5,5,5,.38)_34%,transparent_76%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div className="pb-8">
          <p className="text-xs uppercase tracking-[0.45em] text-[#D69A66]">Error / 404</p>
          <h1 className="mt-5 max-w-5xl text-7xl font-light leading-[0.82] tracking-[-0.075em] text-white md:text-9xl lg:text-[11rem]">
            404
          </h1>
          <h2 className="mt-7 max-w-3xl text-4xl font-light leading-[0.95] tracking-[-0.055em] md:text-6xl">
            Такой страницы нет, но хороший проект можно начать отсюда.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#E8E0D8]/85 md:text-xl">
            Возможно, ссылка устарела или адрес набран с ошибкой. Вернитесь к ключевым разделам студии и продолжите знакомство с работами, услугами и подходом.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-[#D69A66] bg-[#D69A66] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E3AD7B]"
            >
              На главную
            </Link>
            <Link
              href="/kontakty"
              className="rounded-full border border-white/15 bg-black/25 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/75 backdrop-blur transition duration-300 hover:border-[#D69A66]/70 hover:text-white"
            >
              Написать нам
            </Link>
          </div>
        </div>

        <div className="mb-8 grid gap-4">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505]/48 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.34em] text-[#D69A66]">Быстрый маршрут</p>
            <div className="mt-6 grid gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between gap-5 border-b border-white/10 pb-4 transition duration-300 last:border-b-0 last:pb-0 hover:border-[#D69A66]/55"
                >
                  <span>
                    <span className="block text-2xl font-light tracking-[-0.035em] text-white">{item.label}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-[#D6D1CA]">{item.text}</span>
                  </span>
                  <span className="text-2xl text-[#D69A66] transition duration-300 group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;

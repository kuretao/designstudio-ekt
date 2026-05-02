"use client";

import Link from "next/link";
import { projects } from "../data";
import { GlassPanel } from "../ui";
import SectionLabel from "../components/SectionLabel";

const stats = [
  { value: "10 лет", label: "проектируем интерьеры, архитектуру и визуализации" },
  { value: "25+", label: "специалистов подключаются под масштаб задачи" },
  { value: "90%", label: "клиентов возвращаются с новыми проектами" },
  { value: "1500+", label: "задач в год: от рендера до полного сопровождения" },
];

const principles = [
  {
    title: "Сначала сценарий",
    text: "Мы начинаем не с красивой картинки, а с того, как человек будет жить, работать, принимать гостей и двигаться по пространству.",
  },
  {
    title: "Красота держится на чертежах",
    text: "Визуальная идея сразу проверяется планировкой, материалами, светом, узлами, бюджетом и возможностью реализации.",
  },
  {
    title: "Проект не бросается после рендера",
    text: "Помогаем с комплектацией, заменами, подрядчиками и авторским сопровождением, чтобы результат не распался на стройке.",
  },
  {
    title: "Удаленно тоже точно",
    text: "Работаем с клиентами из разных городов через видео-брифы, 3D-презентации, облачные доски и понятные пакеты документации.",
  },
];

const workflow = [
  ["01", "Бриф", "Фиксируем задачу, стиль, бюджет, сроки, состав помещений и ограничения объекта."],
  ["02", "Концепция", "Собираем планировку, референсы, материалы, свет и первый визуальный язык проекта."],
  ["03", "3D и согласование", "Показываем будущий результат до закупок и ремонта, спокойно проходим итерации правок."],
  ["04", "Документация", "Готовим чертежи, ведомости, спецификации и техническую базу для подрядчиков."],
  ["05", "Комплектация", "Подбираем материалы, мебель, свет, аналоги и поставщиков под согласованный бюджет."],
  ["06", "Сопровождение", "Отвечаем на вопросы реализации и помогаем сохранить авторскую идею в реальном объекте."],
];

const directions = [
  "Дизайн интерьера",
  "Коммерческие пространства",
  "Архитектурное проектирование",
  "Архитектурная 3D визуализация",
  "Ландшафтный дизайн",
  "Комплектация объекта",
];

export default function AboutPageFull() {
  return (
    <div className="page-in pt-24">
      <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden px-5 py-20 md:px-10 lg:px-16">
        <img src={projects[0].image} alt="3D Smart Design Studio" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.98),rgba(5,5,5,.78),rgba(5,5,5,.22)),linear-gradient(0deg,#050505,transparent_42%)]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <SectionLabel>О студии</SectionLabel>
            <h1 className="max-w-5xl text-6xl font-light leading-[0.9] tracking-[-0.065em] md:text-8xl lg:text-[8.5rem]">
              Дизайн с умом
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#D6D1CA] md:text-xl">
              3D Smart Design Studio проектирует интерьеры, архитектуру, ландшафт и 3D-визуализацию в Самаре и удаленно. Мы соединяем эстетику, инженерную логику и понятный процесс, чтобы проект можно было не только красиво показать, но и спокойно реализовать.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/kontakty" className="rounded-full bg-[#C58351] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#050505] transition hover:bg-[#F5F2EC]">
                Обсудить проект
              </Link>
              <Link href="/portfolio" className="rounded-full border border-white/15 px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#D6D1CA] transition hover:border-[#C58351] hover:text-white">
                Смотреть работы
              </Link>
            </div>
          </div>

          <GlassPanel className="rounded-[2rem] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#C58351]">Что внутри подхода</p>
            <div className="mt-7 grid gap-3">
              {directions.map((direction) => (
                <div key={direction} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                  <span className="text-sm text-[#F5F2EC]">{direction}</span>
                  <span className="text-[#C58351]">→</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} className="bg-[#050505] p-7">
              <strong className="block text-4xl font-light tracking-[-0.05em] text-[#C58351] md:text-5xl">{stat.value}</strong>
              <p className="mt-5 text-sm leading-relaxed text-[#D6D1CA]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Принципы</SectionLabel>
            <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Не декорируем хаос. Собираем систему.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#D6D1CA]">
              Хороший проект ощущается легко, потому что за ним стоит точная работа: планировочная логика, материалы, свет, документация, бюджет и коммуникация.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {principles.map((item, index) => (
              <GlassPanel key={item.title} className="rounded-[1.5rem] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#C58351]/50">
                <span className="text-sm text-[#C58351]">0{index + 1}</span>
                <h3 className="mt-8 text-2xl font-light tracking-[-0.035em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#D6D1CA]">{item.text}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="group relative min-h-[540px] overflow-hidden rounded-[2rem] border border-white/10">
              <img src={projects[1].image} alt="Интерьерный проект" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 text-2xl font-light">Интерьер как рабочий сценарий жизни</p>
            </div>
            <div className="grid gap-5">
              <div className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white/10">
                <img src={projects[5].image} alt="Архитектурный проект" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-xl font-light">Архитектура и визуализация</p>
              </div>
              <div className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white/10">
                <img src={projects[2].image} alt="Ландшафтный дизайн" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-xl font-light">Ландшафт как продолжение дома</p>
              </div>
            </div>
          </div>
          <div>
            <SectionLabel>Команда</SectionLabel>
            <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Под задачу собирается нужный состав</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#D6D1CA]">
              В проект могут входить дизайнеры, архитекторы, 3D-визуализаторы, комплектаторы и специалисты по рабочей документации. Клиенту не нужно координировать всех отдельно: мы держим проектную логику внутри студии.
            </p>
            <div className="mt-8 grid gap-3">
              {["единая коммуникация", "понятные этапы", "фиксированный состав работ", "реалистичная визуальная подача"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[#D6D1CA]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <SectionLabel>Процесс</SectionLabel>
              <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Как мы работаем</h2>
            </div>
            <p className="text-lg leading-relaxed text-[#D6D1CA]">
              Каждый этап дает понятный результат: от первого разговора до комплекта файлов, с которым можно принимать решения и двигаться дальше.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map(([number, title, text]) => (
              <div key={number} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#C58351]/45">
                <span className="text-sm text-[#C58351]">{number}</span>
                <h3 className="mt-10 text-2xl font-light">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#D6D1CA]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#C58351] p-8 text-[#050505] md:p-12 lg:p-16">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] opacity-60">Начнем с разговора</p>
              <h2 className="max-w-3xl text-4xl font-light tracking-[-0.045em] md:text-6xl">
                Расскажите о проекте, а мы предложим маршрут работы.
              </h2>
            </div>
            <Link href="/kontakty" className="inline-flex h-14 items-center justify-center rounded-full bg-[#050505] px-7 text-xs uppercase tracking-[0.24em] text-[#F5F2EC] transition hover:bg-[#1A1A1A]">
              Связаться
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

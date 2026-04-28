<<<<<<< ours
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
=======
import { useEffect, useMemo, useRef, useState } from "react";
>>>>>>> theirs
import styled, { createGlobalStyle } from "styled-components";
import { atom, useAtom } from "jotai";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

type ProjectCategory = "Интерьеры" | "Архитектура" | "Ландшафт";
type FilterCategory = ProjectCategory | "Все";

type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
};

const activeFilterAtom = atom<FilterCategory>("Все");

const projects: Project[] = [
  {
    id: 1,
    title: "Nord House",
    category: "Архитектура",
    location: "Finland coast",
    year: "2026",
    description:
      "Частная резиденция на береговой линии: строгая геометрия, панорамное остекление и мягкий свет внутри.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90",
    beforeImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 2,
    title: "Atrium Flat",
    category: "Интерьеры",
    location: "Berlin",
    year: "2025",
    description:
      "Минималистичный интерьер с натуральным камнем, скрытым хранением и камерной вечерней атмосферой.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90",
    beforeImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 3,
    title: "Stone Garden",
    category: "Ландшафт",
    location: "Milan",
    year: "2025",
    description:
      "Сад как продолжение архитектуры: сухие злаки, камень, вода и сценарии вечерней подсветки.",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: 4,
    title: "Gallery Office",
    category: "Интерьеры",
    location: "Warsaw",
    year: "2026",
    description:
      "Офис-галерея для дизайн-команды: open space, переговорные капсулы и гибкая экспозиционная зона.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: 5,
    title: "Cliff Villa",
    category: "Архитектура",
    location: "Portugal",
    year: "2024",
    description:
      "Вилла на рельефе с террасами, консольными объемами и видовым бассейном.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: 6,
    title: "Quiet Patio",
    category: "Ландшафт",
    location: "Barcelona",
    year: "2025",
    description:
      "Приватный внутренний двор с теневыми деревьями, фактурной плиткой и тихой зоной отдыха.",
    image:
<<<<<<< ours
      "https://images.unsplash.com/photo-1558521958-0a228e77d984?auto=format&fit=crop&w=2200&q=90",
=======
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2200&q=90",
>>>>>>> theirs
  },
];

const filters: FilterCategory[] = ["Все", "Интерьеры", "Архитектура", "Ландшафт"];
<<<<<<< ours
=======
const portfolioDemoItems = [
  { image: projects[0].image, title: "Facade mood", meta: "Architecture" },
  { image: projects[2].image, title: "Garden light", meta: "Landscape" },
  { image: projects[3].image, title: "Workspace detail", meta: "Interior" },
];
>>>>>>> theirs

const services = [
  {
    title: "Концепция пространства",
    price: "от 1 900 €",
    text: "Планировочная логика, moodboard, референсы, визуальный язык и базовый сценарий света.",
  },
  {
    title: "Дизайн-проект",
    price: "от 75 €/м²",
    text: "Обмерный план, планировка, визуализации, чертежи, спецификации и ведомость материалов.",
  },
  {
    title: "Архитектурная концепция",
    price: "от 6 500 €",
    text: "Объемная модель, фасадные решения, посадка на участок, материалы и презентационный пакет.",
  },
  {
    title: "Авторское сопровождение",
    price: "от 900 €/мес",
    text: "Контроль соответствия проекту, ответы подрядчикам, корректировки и выезды на объект.",
  },
];

const faq = [
  {
    q: "Сколько длится разработка проекта?",
    a: "Концепция занимает 2–4 недели, полный дизайн-проект обычно 8–14 недель. Срок зависит от площади, состава работ и скорости согласований.",
  },
  {
    q: "Можно ли заказать только визуализацию?",
    a: "Да, но мы рекомендуем начинать с планировочной логики: так визуализация становится рабочим инструментом, а не просто красивой картинкой.",
  },
  {
    q: "Вы работаете удаленно?",
    a: "Да. Для удаленных проектов используем видео-брифы, облачные доски, 3D-презентации и подробные чертежи для локальной команды.",
  },
];

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: auto;
    background: #0d0d0b;
  }

  body {
    background: #0d0d0b;
    color: #f3efe7;
    overflow-x: hidden;
  }

  ::selection {
    background: #d7c4a1;
    color: #0d0d0b;
  }
`;

const GlassPanel = styled.div`
  border: 1px solid rgba(243, 239, 231, 0.16);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.025));
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.28);
`;

const Noise = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 60;
  opacity: 0.08;
  mix-blend-mode: overlay;
  background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,.7) 0 1px, transparent 1px),
    radial-gradient(circle at 70% 30%, rgba(255,255,255,.45) 0 1px, transparent 1px);
  background-size: 38px 38px, 61px 61px;
`;

function App() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const storyWordsRef = useRef<HTMLSpanElement[]>([]);
  const [activeProject, setActiveProject] = useState(projects[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -16,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".hero-reveal", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.14,
        ease: "expo.out",
        delay: 0.15,
      });

      gsap.to(".hero-image", {
        scale: 1.08,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const snapSections = gsap.utils.toArray<HTMLElement>(".snap-section");
      snapSections.forEach((section) => {
        gsap.from(section.querySelectorAll(".section-in"), {
          y: 70,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        });
      });

<<<<<<< ours
      ScrollTrigger.create({
        trigger: ".slides-wrap",
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: 1 / (snapSections.length - 1),
          duration: { min: 0.45, max: 0.9 },
          delay: 0.03,
          ease: "power2.inOut",
        },
      });

=======
>>>>>>> theirs
      gsap.set(storyWordsRef.current, { opacity: 0.2, y: 12 });
      gsap.to(storyWordsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-section",
          start: "top center",
          end: "bottom center",
          scrub: 0.8,
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-bg").forEach((bg) => {
        gsap.to(bg, {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

<<<<<<< ours
      gsap.from(".grid-card", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-grid-section",
          start: "top 72%",
        },
      });
=======
>>>>>>> theirs
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const storyText =
    "Мы проектируем не стены, а сценарии жизни: тишину утром, свет на фактуре камня, маршрут взгляда, паузу между городом и домом.";

  return (
    <main ref={mainRef} className="min-h-screen bg-[#0d0d0b] text-[#f3efe7] antialiased">
      <GlobalStyle />
      <Noise />
      <Header />

      <div className="slides-wrap">
        <section ref={heroRef} className="snap-section relative flex min-h-screen overflow-hidden px-5 py-28 md:px-10 lg:px-16">
          <div className="hero-image absolute inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: `url(${projects[0].image})` }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(215,196,161,.18),transparent_32%),linear-gradient(90deg,rgba(13,13,11,.96),rgba(13,13,11,.62),rgba(13,13,11,.25))]" />

          <div className="relative z-10 flex w-full items-end">
            <div className="max-w-6xl">
              <p className="hero-reveal mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Conceptual architecture studio</p>
              <h1 className="hero-reveal max-w-5xl text-6xl font-light leading-[0.92] tracking-[-0.07em] md:text-8xl lg:text-[9.5rem]">
                Тишина формы. Сила пространства.
              </h1>
              <div className="hero-reveal mt-8 grid max-w-4xl gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <p className="text-lg leading-relaxed text-[#d8d1c4] md:text-xl">
                  Создаем архитектуру, интерьеры и ландшафты для частных резиденций, отелей, галерей и премиальных рабочих пространств.
                </p>
                <a href="#contact" className="group inline-flex h-14 items-center justify-center rounded-full border border-[#d7c4a1]/50 px-7 text-sm uppercase tracking-[0.22em] text-[#f3efe7] transition hover:bg-[#d7c4a1] hover:text-[#0d0d0b]">
                  Обсудить проект
                  <span className="ml-3 transition group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <FeatureProject project={projects[0]} label="Избранный проект 01" />

        <section className="snap-section story-section flex min-h-screen items-center px-5 py-28 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <p className="section-in mb-10 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Design philosophy</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.045em] text-[#f3efe7] md:text-6xl lg:text-7xl">
              {storyText.split(" ").map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  ref={(el) => {
                    if (el) storyWordsRef.current[index] = el;
                  }}
                  className="inline-block pr-3"
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>
        </section>

        <FeatureProject project={projects[1]} label="Избранный проект 02" reverse />

        <section className="snap-section portfolio-grid-section min-h-screen px-5 py-28 md:px-10 lg:px-16">
          <PortfolioGrid onSelectProject={setActiveProject} />
        </section>
      </div>

      <ProjectPage project={activeProject} />
      <Services />
      <Workflow />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10 lg:px-16">
      <a href="#" className="nav-item text-sm uppercase tracking-[0.42em] text-white">Forma Studio</a>
      <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.28em] text-white/80 md:flex">
        <a className="nav-item transition hover:text-white" href="#portfolio">Проекты</a>
        <a className="nav-item transition hover:text-white" href="#services">Услуги</a>
        <a className="nav-item transition hover:text-white" href="#faq">FAQ</a>
        <a className="nav-item transition hover:text-white" href="#contact">Контакты</a>
      </nav>
    </header>
  );
}

function FeatureProject({ project, label, reverse = false }: { project: Project; label: string; reverse?: boolean }) {
  return (
    <section className="snap-section relative flex min-h-screen items-end overflow-hidden px-5 py-16 md:px-10 lg:px-16">
      <div className="project-bg absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b] via-[#0d0d0b]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0b]/80 via-transparent to-[#0d0d0b]/60" />

      <div className={`relative z-10 grid w-full gap-8 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:col-start-2" : ""}`}>
        <GlassPanel className="section-in rounded-[2rem] p-7 md:p-10">
          <p className="mb-6 text-xs uppercase tracking-[0.42em] text-[#d7c4a1]">{label}</p>
          <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">{project.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8d1c4] md:text-lg">{project.description}</p>
          <div className="mt-9 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sm text-[#d8d1c4]">
            <div><span className="block text-white">{project.category}</span>Тип</div>
            <div><span className="block text-white">{project.location}</span>Локация</div>
            <div><span className="block text-white">{project.year}</span>Год</div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

function PortfolioGrid({ onSelectProject }: { onSelectProject: (project: Project) => void }) {
  const [activeFilter, setActiveFilter] = useAtom(activeFilterAtom);
<<<<<<< ours
=======
  const gridRef = useRef<HTMLDivElement | null>(null);
>>>>>>> theirs

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Все") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

<<<<<<< ours
=======
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".grid-card");
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 28, scale: 0.97 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
      },
    );
  }, [filteredProjects]);

>>>>>>> theirs
  return (
    <div id="portfolio" className="mx-auto w-full max-w-7xl">
      <div className="mb-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="section-in mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Portfolio</p>
          <h2 className="section-in max-w-3xl text-5xl font-light tracking-[-0.055em] md:text-7xl">Сетка проектов с фильтрацией по направлениям</h2>
<<<<<<< ours
=======
          <div className="section-in mt-8 grid gap-5 md:grid-cols-3">
            {portfolioDemoItems.map((item) => (
              <div
                key={item.title}
                className="group relative h-80 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-2 hover:border-[#d7c4a1]/60 hover:shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/80 via-[#0d0d0b]/10 to-[#d7c4a1]/10 opacity-80 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-4 rounded-[1.55rem] border border-white/0 transition duration-500 group-hover:border-white/25" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#d7c4a1]">{item.meta}</p>
                  <h3 className="text-2xl font-light tracking-[-0.035em] text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
>>>>>>> theirs
        </div>
        <div className="section-in flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
<<<<<<< ours
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-5 py-3 text-xs uppercase tracking-[0.22em] transition ${
                activeFilter === filter
                  ? "border-[#d7c4a1] bg-[#d7c4a1] text-[#0d0d0b]"
                  : "border-white/15 text-[#d8d1c4] hover:border-[#d7c4a1]/60 hover:text-white"
=======
              type="button"
              key={filter}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative overflow-hidden rounded-full border px-5 py-3 text-xs uppercase tracking-[0.22em] transition duration-300 ${
                activeFilter === filter
                  ? "border-[#d7c4a1] bg-[#d7c4a1] text-[#0d0d0b] shadow-[0_0_34px_rgba(215,196,161,0.22)]"
                  : "border-white/15 text-[#d8d1c4] hover:-translate-y-0.5 hover:border-[#d7c4a1]/60 hover:bg-white/[0.04] hover:text-white"
>>>>>>> theirs
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

<<<<<<< ours
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="grid-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left transition hover:-translate-y-1 hover:border-[#d7c4a1]/60"
          >
            <div className="relative h-80 overflow-hidden">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#d7c4a1]">{project.category}</p>
                <h3 className="text-3xl font-light tracking-[-0.04em]">{project.title}</h3>
=======
      <div ref={gridRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <button
            type="button"
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="grid-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left transition duration-500 hover:-translate-y-2 hover:border-[#d7c4a1]/60 hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
          >
            <div className="relative h-80 overflow-hidden">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-[#d7c4a1]/10 transition duration-500 group-hover:from-black/70" />
              <div className="absolute inset-4 rounded-[1.55rem] border border-white/0 transition duration-500 group-hover:border-white/25" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#d7c4a1]">{project.category}</p>
                <h3 className="text-3xl font-light tracking-[-0.04em] transition duration-500 group-hover:translate-x-1">{project.title}</h3>
>>>>>>> theirs
              </div>
            </div>
            <div className="p-6 text-sm leading-relaxed text-[#d8d1c4]">
              {project.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectPage({ project }: { project: Project }) {
  const [compare, setCompare] = useState(52);

  return (
    <section className="px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Project page preview</p>
            <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">{project.title}</h2>
          </div>
          <p className="text-lg leading-relaxed text-[#d8d1c4]">Задача: создать цельный визуальный код объекта — от первого впечатления и маршрута движения до материала, света и деталей реализации.</p>
        </div>

<<<<<<< ours
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10">
          <img src={project.image} alt={project.title} className="h-[78vh] w-full object-cover" />
=======
        <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/55 hover:shadow-[0_34px_120px_rgba(215,196,161,0.14)]">
          <img
            src={project.image}
            alt={project.title}
            className="h-[78vh] w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-125"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_35%,rgba(13,13,11,.38)),linear-gradient(180deg,transparent,rgba(215,196,161,.12))] opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-[#d7c4a1]/35" />
>>>>>>> theirs
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[project.image, projects[2].image, projects[3].image].map((image, index) => (
<<<<<<< ours
            <img key={image} src={image} alt={`${project.title} gallery ${index + 1}`} className="h-80 rounded-[2rem] object-cover" />
=======
            <div
              key={`${image}-${index}`}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-2 hover:border-[#d7c4a1]/60 hover:shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
            >
              <img
                src={image}
                alt={`${project.title} gallery ${index + 1}`}
                className="h-80 w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/65 via-transparent to-[#d7c4a1]/10 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-4 rounded-[1.55rem] border border-white/0 transition duration-500 group-hover:border-white/25" />
            </div>
>>>>>>> theirs
          ))}
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Render / Blueprint</p>
            <h3 className="text-4xl font-light tracking-[-0.045em] md:text-6xl">Сравнение до / после</h3>
            <p className="mt-5 text-[#d8d1c4]">Ползунок можно заменить на реальные чертежи, рендеры или фотографии объекта до реконструкции.</p>
          </div>

<<<<<<< ours
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
            <img src={project.beforeImage || projects[4].image} alt="before" className="h-[520px] w-full object-cover" />
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${compare}%` }}>
              <img src={project.afterImage || project.image} alt="after" className="h-[520px] w-[calc(100vw-40px)] max-w-none object-cover lg:w-[760px]" />
            </div>
            <div className="absolute inset-y-0 w-px bg-[#d7c4a1]" style={{ left: `${compare}%` }} />
=======
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/55 hover:shadow-[0_28px_90px_rgba(215,196,161,0.12)]">
            <img src={project.beforeImage || projects[4].image} alt="before" className="h-[520px] w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:saturate-125" />
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${compare}%` }}>
              <img src={project.afterImage || project.image} alt="after" className="h-[520px] w-[calc(100vw-40px)] max-w-none object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125 lg:w-[760px]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="absolute inset-y-0 w-px bg-[#d7c4a1] shadow-[0_0_28px_rgba(215,196,161,0.9)] transition duration-300 group-hover:w-0.5" style={{ left: `${compare}%` }} />
            <div className="pointer-events-none absolute top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7c4a1]/80 bg-[#0d0d0b]/65 shadow-[0_0_30px_rgba(215,196,161,0.35)] backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-[#d7c4a1] group-hover:shadow-[0_0_42px_rgba(215,196,161,0.75)]" style={{ left: `${compare}%` }} />
>>>>>>> theirs
            <input
              aria-label="Сравнение до и после"
              type="range"
              min="0"
              max="100"
              value={compare}
              onChange={(event) => setCompare(Number(event.target.value))}
              className="absolute inset-x-8 bottom-8 accent-[#d7c4a1]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Services & pricing</p>
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Услуги и цены</h2>
          <p className="text-[#d8d1c4]">Стоимость фиксируется после брифа и состава работ. Ниже — понятная стартовая структура.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <GlassPanel key={service.title} className="rounded-[2rem] p-7">
              <div className="mb-8 flex items-start justify-between gap-4">
                <h3 className="text-3xl font-light tracking-[-0.04em]">{service.title}</h3>
                <span className="whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm text-[#d7c4a1]">{service.price}</span>
              </div>
              <p className="leading-relaxed text-[#d8d1c4]">{service.text}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const steps = ["Бриф", "Концепция", "Визуализация", "Чертежи", "Комплектация", "Сопровождение"];

  return (
    <section className="px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Workflow</p>
        <h2 className="mb-14 max-w-4xl text-5xl font-light tracking-[-0.055em] md:text-7xl">Этапы работы без хаоса и лишней коммуникации</h2>
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

function FAQ() {
  return (
    <section id="faq" className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">FAQ</p>
        <h2 className="mb-12 text-5xl font-light tracking-[-0.055em] md:text-7xl">Частые вопросы</h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <details key={item.q} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 open:border-[#d7c4a1]/50">
              <summary className="cursor-pointer list-none text-2xl font-light tracking-[-0.03em]">
                {item.q}
                <span className="float-right transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-5 leading-relaxed text-[#d8d1c4]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Contact</p>
          <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Расскажите о будущем пространстве</h2>
          <div className="mt-10 space-y-3 text-[#d8d1c4]">
            <a className="block transition hover:text-white" href="mailto:hello@forma.studio">hello@forma.studio</a>
            <a className="block transition hover:text-white" href="tel:+493012345678">+49 30 123 45 678</a>
            <div className="flex gap-3 pt-4">
              <a href="https://t.me/" className="rounded-full border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.18em] hover:border-[#d7c4a1]">Telegram</a>
              <a href="https://wa.me/" className="rounded-full border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.18em] hover:border-[#d7c4a1]">WhatsApp</a>
            </div>
          </div>
        </div>

        <GlassPanel className="rounded-[2rem] p-6 md:p-8">
          <form className="grid gap-4">
            <input className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 outline-none transition placeholder:text-white/35 focus:border-[#d7c4a1]" placeholder="Имя" />
            <input className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 outline-none transition placeholder:text-white/35 focus:border-[#d7c4a1]" placeholder="Email или телефон" />
            <select className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white/70 outline-none transition focus:border-[#d7c4a1]">
              <option>Интерьер</option>
              <option>Архитектура</option>
              <option>Ландшафт</option>
              <option>Коммерческое пространство</option>
            </select>
            <textarea className="min-h-36 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 outline-none transition placeholder:text-white/35 focus:border-[#d7c4a1]" placeholder="Коротко о проекте" />
            <button type="button" className="h-14 rounded-full bg-[#d7c4a1] px-7 text-sm uppercase tracking-[0.24em] text-[#0d0d0b] transition hover:bg-[#f3efe7]">
              Отправить заявку
            </button>
          </form>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10">
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=13.367%2C52.506%2C13.397%2C52.526&layer=mapnik"
              className="h-64 w-full grayscale invert"
            />
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/15 px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-[#d8d1c4] md:flex-row">
        <p>© 2026 Forma Studio. Conceptual architecture & design.</p>
        <div className="flex gap-5">
          <a className="hover:text-white" href="#portfolio">Portfolio</a>
          <a className="hover:text-white" href="#services">Services</a>
          <a className="hover:text-white" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

<<<<<<< ours
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
=======
export default App;
>>>>>>> theirs

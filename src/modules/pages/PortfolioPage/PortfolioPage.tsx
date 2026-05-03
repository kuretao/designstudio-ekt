"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "@/src/data";
import type { Project } from "@/src/types";
import CustomSelect from "@/src/components/forms/CustomSelect";
import SectionLabel from "@/src/components/common/SectionLabel";
import { GlassPanel } from "@/src/ui";

type PortfolioProps = {
  activeProject: Project;
  setActiveProject: (project: Project) => void;
};

type PortfolioGridProps = {
  onSelectProject: (project: Project) => void;
};

function scrollToProjectShowcase() {
  window.setTimeout(() => {
    document.getElementById("project-showcase")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 60);
}

const heroSlides = projects.slice(0, 4).map((project, index) => ({
  project,
  kicker: ["Featured interior", "City apartment", "Landscape story", "Commercial space"][index] || "Selected project",
}));

const directionOptions = ["All projects", ...Array.from(new Set(projects.map((project) => project.category)))];
const directionSelectOptions = directionOptions.slice(1).map((direction) => ({ value: direction, label: direction }));
const squareOptions = [
  { value: "compact", label: "до 100 м²" },
  { value: "medium", label: "100-250 м²" },
  { value: "large", label: "250+ м²" },
];
const toneOptions = [
  { value: "warm", label: "Тёплый" },
  { value: "neutral", label: "Нейтральный" },
  { value: "dark", label: "Тёмный" },
];

function PortfolioHeroSlider({ onSelectProject }: PortfolioGridProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5600);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const scope = heroRef.current;
    if (!scope) return;

    gsap.fromTo(
      scope.querySelectorAll(".hero-copy > *"),
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.08, ease: "power3.out" },
    );

    gsap.fromTo(
      scope.querySelector(".hero-image-active"),
      { scale: 1.08, filter: "brightness(0.58) saturate(0.82)" },
      { scale: 1, filter: "brightness(0.82) saturate(1.08)", duration: 1.2, ease: "expo.out" },
    );
  }, [activeSlide]);

  const moveSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden px-5 md:px-10 lg:px-16">
      {heroSlides.map(({ project }, index) => (
        <div
          key={project.id}
          className={`absolute inset-0 transition duration-[1100ms] ease-out ${
            activeSlide === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={activeSlide !== index}
        >
          <img
            src={project.image}
            alt=""
            className={`h-full w-full object-cover ${activeSlide === index ? "hero-image-active" : ""}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.92)_0%,rgba(5,5,5,.62)_44%,rgba(5,5,5,.18)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(214,154,102,.34),transparent_30%)] mix-blend-screen" />
      <div className="pointer-events-none absolute -inset-x-20 bottom-0 h-52 bg-gradient-to-t from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 overflow-hidden opacity-45">
        <div className="absolute right-[8%] top-[18%] h-[52vh] w-[52vh] rounded-full border border-white/15 animate-[spin_28s_linear_infinite]" />
        <div className="absolute right-[18%] top-[30%] h-[34vh] w-[34vh] rounded-full border border-[#D69A66]/30 animate-[spin_18s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end pb-24 pt-36 md:items-center md:pb-0">
        <div className="hero-copy max-w-4xl">
          <p className="text-xs uppercase tracking-[0.32em] text-[#D69A66]">{slide.kicker}</p>
          <h1 className="mt-5 max-w-4xl text-6xl font-light leading-[0.9] tracking-[-0.065em] text-white md:text-8xl lg:text-9xl">
            {slide.project.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#E8E0D8]/82 md:text-xl">{slide.project.description}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onSelectProject(slide.project);
                scrollToProjectShowcase();
              }}
              className="rounded-full border border-[#D69A66] bg-[#D69A66] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E3AD7B]"
            >
              Смотреть проект
            </button>
            <span className="rounded-full border border-white/15 bg-black/25 px-5 py-4 text-xs uppercase tracking-[0.24em] text-white/75 backdrop-blur">
              {slide.project.category} / {slide.project.location}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-5 right-5 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 md:left-10 md:right-10 lg:left-16 lg:right-16">
        <div className="flex items-center gap-2">
          {heroSlides.map(({ project }, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Слайд ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === index ? "w-12 bg-[#D69A66]" : "w-5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Предыдущий слайд"
            onClick={() => moveSlide(-1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/25 text-xl text-white backdrop-blur transition hover:border-[#D69A66]/70 hover:text-[#D69A66]"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Следующий слайд"
            onClick={() => moveSlide(1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/25 text-xl text-white backdrop-blur transition hover:border-[#D69A66]/70 hover:text-[#D69A66]"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export function PortfolioGrid({ onSelectProject }: PortfolioGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDirection, setActiveDirection] = useState("");
  const [activeSquare, setActiveSquare] = useState("");
  const [activeTone, setActiveTone] = useState("");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const byDirection = activeDirection ? projects.filter((project) => project.category === activeDirection) : projects;

    if (!query) return byDirection;

    return byDirection.filter((project) =>
      [project.title, project.category, project.location, project.year, project.description].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [activeDirection, searchQuery]);

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

  return (
    <div id="portfolio" className="mx-auto w-full max-w-7xl">
      <div className="mb-10 rounded-[2.15rem] bg-[#111111] p-4 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid gap-3 rounded-[1.55rem] border border-white/10 bg-[#1a1a1a] p-3 md:grid-cols-3 lg:w-[620px]">
            <div>
              <span className="mb-2 block px-1 text-xs font-medium text-[#D69A66]">Directions</span>
              <CustomSelect
                value={activeDirection}
                onChange={setActiveDirection}
                placeholder="All projects"
                options={directionSelectOptions}
              />
            </div>

            <div>
              <span className="mb-2 block px-1 text-xs font-medium text-[#D69A66]">Square</span>
              <CustomSelect
                value={activeSquare}
                onChange={setActiveSquare}
                placeholder="All options"
                options={squareOptions}
              />
            </div>

            <div>
              <span className="mb-2 block px-1 text-xs font-medium text-[#D69A66]">Tone</span>
              <CustomSelect
                value={activeTone}
                onChange={setActiveTone}
                placeholder="All options"
                options={toneOptions}
              />
            </div>
          </div>

          <label className="relative block lg:w-[438px]">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Country, City"
              className="h-[54px] w-full rounded-[1.55rem] border border-white/10 bg-[#1d1d1d] px-8 pr-16 text-sm text-white outline-none transition placeholder:text-[#C4A898] focus:border-white/25"
            />
            <span className="pointer-events-none absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white" />
            <span className="pointer-events-none absolute right-[27px] top-[31px] h-2 w-0.5 -rotate-45 bg-white" />
          </label>
        </div>
      </div>

      <div ref={gridRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <button
            type="button"
            key={project.id}
            onClick={() => {
              onSelectProject(project);
              scrollToProjectShowcase();
            }}
            className="grid-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left transition duration-500 hover:-translate-y-2 hover:border-[#D69A66]/60"
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-[#D69A66]/10 transition duration-500 group-hover:from-black/70" />
              <div className="absolute inset-4 rounded-[1.55rem] border border-white/0 transition duration-500 group-hover:border-white/25" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#D69A66]">{project.category}</p>
                <h3 className="text-3xl font-light tracking-[-0.04em] transition duration-500 group-hover:translate-x-1">
                  {project.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-[#D6D1CA]">{project.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D69A66] transition group-hover:gap-3">
                Смотреть проект <span>→</span>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectShowcase({ project }: { project: Project }) {
  const [compare, setCompare] = useState(52);
  const gallery = [project.image, project.afterImage || projects[1].image, project.beforeImage || projects[2].image];

  return (
    <section id="project-showcase" className="scroll-mt-28 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.025]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,154,102,.16),transparent_30%)]" />
          <div className="relative grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="group relative min-h-[620px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-[#050505]/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#D69A66]/40 bg-[#050505]/55 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#D69A66] backdrop-blur">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/15 bg-[#050505]/45 px-4 py-2 text-xs text-white/70 backdrop-blur">
                  {project.location}
                </span>
                <span className="rounded-full border border-white/15 bg-[#050505]/45 px-4 py-2 text-xs text-white/70 backdrop-blur">
                  {project.year}
                </span>
              </div>
            </div>

            <div className="relative flex flex-col justify-between p-7 md:p-10">
              <div>
                <SectionLabel>Выбранный проект</SectionLabel>
                <h2 className="text-5xl font-light leading-[0.95] tracking-[-0.055em] md:text-7xl">{project.title}</h2>
                <p className="mt-7 text-lg leading-relaxed text-[#D6D1CA]">{project.description}</p>
              </div>

              <div className="mt-10 grid gap-4">
                {[
                  ["Задача", "Собрать цельный визуальный код объекта: планировка, материалы, свет и настроение."],
                  ["Результат", "Проект можно презентовать, согласовывать с подрядчиками и использовать как базу реализации."],
                  ["Формат", "3D-ракурсы, подбор решений, рабочая логика и визуальная подача для клиента."],
                ].map(([title, text]) => (
                  <GlassPanel key={title} className="rounded-[1.25rem] p-5">
                    <span className="text-xs uppercase tracking-[0.28em] text-[#D69A66]">{title}</span>
                    <p className="mt-3 text-sm leading-relaxed text-[#D6D1CA]">{text}</p>
                  </GlassPanel>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {gallery.map((image, index) => (
            <div
              key={`${project.id}-${image}-${index}`}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-2 hover:border-[#D69A66]/60 hover:shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
            >
              <img
                src={image}
                alt={`${project.title} gallery ${index + 1}`}
                className="h-80 w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-[#D69A66]/10 opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.24em] text-[#D69A66]">0{index + 1}</span>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionLabel className="mb-4">Render / Blueprint</SectionLabel>
            <h3 className="text-4xl font-light tracking-[-0.045em] md:text-6xl">Сравнение до / после</h3>
            <p className="mt-5 text-[#D6D1CA]">
              Ползунок показывает, как меняется восприятие объекта после визуальной проработки. Здесь можно заменить демо на реальные чертежи, рендеры или фото объекта.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] transition duration-500 hover:-translate-y-1 hover:border-[#D69A66]/55 hover:shadow-[0_28px_90px_rgba(214,154,102,0.12)]">
            <img
              src={project.beforeImage || projects[4].image}
              alt="before"
              className="h-[520px] w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:saturate-125"
            />
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${compare}%` }}>
              <img
                src={project.afterImage || project.image}
                alt="after"
                className="h-[520px] w-[calc(100vw-40px)] max-w-none object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-125 lg:w-[760px]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <div
              className="absolute inset-y-0 w-px bg-[#D69A66] shadow-[0_0_28px_rgba(214,154,102,0.9)] transition duration-300 group-hover:w-0.5"
              style={{ left: `${compare}%` }}
            />
            <div
              className="pointer-events-none absolute top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D69A66]/80 bg-[#050505]/65 shadow-[0_0_30px_rgba(214,154,102,0.35)] backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-[#D69A66] group-hover:shadow-[0_0_42px_rgba(214,154,102,0.75)]"
              style={{ left: `${compare}%` }}
            />
            <input
              aria-label="Сравнение до и после"
              type="range"
              min="0"
              max="100"
              value={compare}
              onChange={(event) => setCompare(Number(event.target.value))}
              className="absolute inset-x-8 bottom-8 accent-[#D69A66]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioPage({ activeProject, setActiveProject }: PortfolioProps) {
  return (
    <div className="page-in">
      <PortfolioHeroSlider onSelectProject={setActiveProject} />
      <section className="px-5 py-24 md:px-10 lg:px-16">
        <PortfolioGrid onSelectProject={setActiveProject} />
      </section>
      <ProjectShowcase project={activeProject} />
    </div>
  );
}

export default PortfolioPage;

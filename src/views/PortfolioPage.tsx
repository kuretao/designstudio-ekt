"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { atom, useAtom } from "jotai";
import gsap from "gsap";
import { filters, portfolioDemoItems, projects } from "../data";
import type { FilterCategory, Project } from "../types";

const activeFilterAtom = atom<FilterCategory>("Все");

type PortfolioProps = {
  activeProject: Project;
  setActiveProject: (project: Project) => void;
};

type PortfolioGridProps = {
  onSelectProject: (project: Project) => void;
};

export function PortfolioGrid({ onSelectProject }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useAtom(activeFilterAtom);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Все") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

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
      <div className="mb-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="section-in mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Portfolio</p>
          <h2 className="section-in max-w-3xl text-5xl font-light tracking-[-0.055em] md:text-7xl">
            Сетка проектов с фильтрацией по направлениям
          </h2>
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
        </div>
        <div className="section-in flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative overflow-hidden rounded-full border px-5 py-3 text-xs uppercase tracking-[0.22em] transition duration-300 ${
                activeFilter === filter
                  ? "border-[#d7c4a1] bg-[#d7c4a1] text-[#0d0d0b] shadow-[0_0_34px_rgba(215,196,161,0.22)]"
                  : "border-white/15 text-[#d8d1c4] hover:-translate-y-0.5 hover:border-[#d7c4a1]/60 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <button
            type="button"
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="grid-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left transition duration-500 hover:-translate-y-2 hover:border-[#d7c4a1]/60 hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-[#d7c4a1]/10 transition duration-500 group-hover:from-black/70" />
              <div className="absolute inset-4 rounded-[1.55rem] border border-white/0 transition duration-500 group-hover:border-white/25" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#d7c4a1]">{project.category}</p>
                <h3 className="text-3xl font-light tracking-[-0.04em] transition duration-500 group-hover:translate-x-1">
                  {project.title}
                </h3>
              </div>
            </div>
            <div className="p-6 text-sm leading-relaxed text-[#d8d1c4]">{project.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectShowcase({ project }: { project: Project }) {
  const [compare, setCompare] = useState(52);

  return (
    <section className="px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Project page preview</p>
            <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">{project.title}</h2>
          </div>
          <p className="text-lg leading-relaxed text-[#d8d1c4]">
            Задача: создать цельный визуальный код объекта — от первого впечатления и маршрута движения до материала,
            света и деталей реализации.
          </p>
        </div>

        <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/55 hover:shadow-[0_34px_120px_rgba(215,196,161,0.14)]">
          <img
            src={project.image}
            alt={project.title}
            className="h-[78vh] w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-125"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_35%,rgba(13,13,11,.38)),linear-gradient(180deg,transparent,rgba(215,196,161,.12))] opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-[#d7c4a1]/35" />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[project.image, projects[2].image, projects[3].image].map((image, index) => (
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
          ))}
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Render / Blueprint</p>
            <h3 className="text-4xl font-light tracking-[-0.045em] md:text-6xl">Сравнение до / после</h3>
            <p className="mt-5 text-[#d8d1c4]">
              Ползунок можно заменить на реальные чертежи, рендеры или фотографии объекта до реконструкции.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/55 hover:shadow-[0_28px_90px_rgba(215,196,161,0.12)]">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <div
              className="absolute inset-y-0 w-px bg-[#d7c4a1] shadow-[0_0_28px_rgba(215,196,161,0.9)] transition duration-300 group-hover:w-0.5"
              style={{ left: `${compare}%` }}
            />
            <div
              className="pointer-events-none absolute top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7c4a1]/80 bg-[#0d0d0b]/65 shadow-[0_0_30px_rgba(215,196,161,0.35)] backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-[#d7c4a1] group-hover:shadow-[0_0_42px_rgba(215,196,161,0.75)]"
              style={{ left: `${compare}%` }}
            />
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

function PortfolioPage({ activeProject, setActiveProject }: PortfolioProps) {
  return (
    <div className="page-in pt-24">
      <section className="min-h-screen px-5 py-28 md:px-10 lg:px-16">
        <PortfolioGrid onSelectProject={setActiveProject} />
      </section>
      <ProjectShowcase project={activeProject} />
    </div>
  );
}

export default PortfolioPage;

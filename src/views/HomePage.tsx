"use client";

import Link from "next/link";
import { projects } from "../data";
import type { Project } from "../types";
import { GlassPanel } from "../ui";
import FAQ from "../components/FAQ";
import AboutPage from "./AboutPage";
import { ContactSection } from "./ContactPage";
import { ContentPagesOverview } from "./ContentPage";
import { PortfolioGrid, ProjectShowcase } from "./PortfolioPage";
import { ServicePages, ServicesSummary, Workflow } from "./ServicesPage";

type HomePageProps = {
  activeProject: Project;
  setActiveProject: (project: Project) => void;
};

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

function HomePage({ activeProject, setActiveProject }: HomePageProps) {
  const storyText =
    "Мы проектируем не стены, а сценарии жизни: утренний свет, маршрут взгляда, тишину материалов и точную документацию для реализации.";

  return (
    <>
      <div className="slides-wrap">
        <section className="hero-section snap-section relative flex min-h-screen overflow-hidden px-5 py-28 md:px-10 lg:px-16">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-55"
            src={`${process.env.NODE_ENV === 'production' ? '/DesignStudio-EKT' : ''}/background.mp4`}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(215,196,161,.18),transparent_32%),linear-gradient(90deg,rgba(13,13,11,.96),rgba(13,13,11,.62),rgba(13,13,11,.25))]" />

          <div className="relative z-10 flex w-full items-end">
            <div className="max-w-6xl">
              <p className="hero-reveal mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">
                Студия дизайна интерьера и архитектуры в Самаре
              </p>
              <h1 className="hero-reveal max-w-5xl text-6xl font-light leading-[0.92] tracking-[-0.07em] md:text-8xl lg:text-[9.5rem]">
                Дизайн с умом.
              </h1>
              <div className="hero-reveal mt-8 grid max-w-4xl gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <p className="text-lg leading-relaxed text-[#d8d1c4] md:text-xl">
                  Создаем интерьеры, архитектуру, 3D-визуализацию и ландшафтные проекты: от концепции до рабочей документации, комплектации и сопровождения.
                </p>
                <Link
                  href="/kontakty"
                  className="group inline-flex h-14 items-center justify-center rounded-full border border-[#d7c4a1]/50 px-7 text-sm uppercase tracking-[0.22em] text-[#f3efe7] transition hover:bg-[#d7c4a1] hover:text-[#0d0d0b]"
                >
                  Обсудить проект
                  <span className="ml-3 transition group-hover:translate-x-1">→</span>
                </Link>
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
                <span key={`${word}-${index}`} className="story-word inline-block pr-3">
                  {word}
                </span>
              ))}
            </h2>
          </div>
        </section>

        <FeatureProject project={projects[2]} label="Избранный проект 02" reverse />

        <section className="snap-section portfolio-grid-section min-h-screen px-5 py-28 md:px-10 lg:px-16">
          <PortfolioGrid onSelectProject={setActiveProject} />
        </section>
      </div>

      <ProjectShowcase project={activeProject} />
      <AboutPage />
      <ServicesSummary />
      <ServicePages />
      <Workflow />
      <FAQ />
      <ContentPagesOverview />
      <ContactSection />
    </>
  );
}

export default HomePage;

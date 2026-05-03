"use client";

import Link from "next/link";
import { projects } from "@/src/data";
import type { Project } from "@/src/types";
import { GlassPanel } from "@/src/ui";
import FAQ from "@/src/components/common/FAQ";
import AboutPage from "@/src/modules/pages/AboutPage";
import { ContactSection } from "@/src/modules/pages/ContactPage";
import { ContentPagesOverview } from "@/src/modules/pages/ContentPage";
import { PortfolioGrid, ProjectShowcase } from "@/src/modules/pages/PortfolioPage";
import { ServicePages, ServicesSummary, Workflow } from "@/src/modules/pages/ServicesPage";

type HomePageProps = {
  activeProject: Project;
  setActiveProject: (project: Project) => void;
};

function FeatureProject({ project, label, reverse = false }: { project: Project; label: string; reverse?: boolean }) {
  return (
    <section className="snap-section relative flex min-h-screen items-end overflow-hidden px-5 py-16 md:px-10 lg:px-16">
      <div className="project-bg absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/60" />

      <div className={`relative z-10 grid w-full gap-8 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:col-start-2" : ""}`}>
        <GlassPanel className="section-in magnetic-card rounded-[2rem] p-7 md:p-10">
          <p className="mb-6 text-xs uppercase tracking-[0.42em] text-[#D69A66]">{label}</p>
          <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">{project.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#D6D1CA] md:text-lg">{project.description}</p>
          <div className="mt-9 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sm text-[#D6D1CA]">
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
            className="hero-video absolute inset-0 h-full w-full object-cover opacity-65"
            src={`${process.env.NODE_ENV === 'production' ? '/DesignStudio-EKT' : ''}/background.mp4`}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(214,154,102,.16),transparent_32%),linear-gradient(90deg,rgba(5,5,5,.92),rgba(5,5,5,.58),rgba(5,5,5,.2))]" />
          <div className="hero-copper-line absolute bottom-0 left-0 z-[1] h-px w-full bg-gradient-to-r from-[#D69A66] via-white/30 to-transparent" />

          <div className="relative z-10 flex w-full items-end">
            <div className="max-w-6xl">
              <p className="hero-reveal mb-5 text-xs uppercase tracking-[0.45em] text-[#D69A66]">
                Студия дизайна интерьера и архитектуры в Самаре
              </p>
              <h1 className="hero-reveal max-w-5xl text-6xl font-light leading-[0.92] tracking-[-0.07em] md:text-8xl lg:text-[9.5rem]">
                Дизайн с умом.
              </h1>
              <div className="hero-reveal mt-8 grid max-w-4xl gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <p className="text-lg leading-relaxed text-[#D6D1CA] md:text-xl">
                  Создаем интерьеры, архитектуру, 3D-визуализацию и ландшафтные проекты: от концепции до рабочей документации, комплектации и сопровождения.
                </p>
                <Link
                  href="/kontakty"
                  className="group inline-flex h-14 items-center justify-center rounded-full border border-[#D69A66]/50 px-7 text-sm uppercase tracking-[0.22em] text-[#F5F2EC] transition hover:bg-[#D69A66] hover:text-[#050505]"
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
            <p className="section-in mb-10 text-xs uppercase tracking-[0.45em] text-[#D69A66]">Design philosophy</p>
            <h2 className="text-4xl font-light leading-tight tracking-[-0.045em] text-[#F5F2EC] md:text-6xl lg:text-7xl">
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

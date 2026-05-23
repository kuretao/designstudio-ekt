"use client";

import Link from "next/link";
import { useCms } from "@/src/cms";
import type { Project } from "@/src/types";
import { GlassPanel } from "@/src/ui";
import FAQ from "@/src/components/common/FAQ";
import ProjectQuiz from "@/src/components/common/ProjectQuiz";
import StyleLab from "@/src/components/common/StyleLab";
import AboutPage from "@/src/modules/pages/AboutPage";
import { ContactSection } from "@/src/modules/pages/ContactPage";
import { ContentPagesOverview } from "@/src/modules/pages/ContentPage";
import { PortfolioGrid, ProjectShowcase } from "@/src/modules/pages/PortfolioPage";
import { ServicePages, ServicesSummary, Workflow } from "@/src/modules/pages/ServicesPage";

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type HomePageProps = {
  activeProject: Project;
  setActiveProject: (project: Project) => void;
};

function FeatureProject({ project, label, reverse = false }: { project: Project; label: string; reverse?: boolean }) {
  return (
    <section className="snap-section feature-project-section relative flex min-h-screen items-end overflow-hidden px-5 py-16 md:px-10 lg:px-16">
      <div className="project-bg absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
      <div className="feature-project-light absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080705] via-[#080705]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080705]/72 via-[#324238]/12 to-[#E8DDCE]/18" />

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
  const { homeHero, projects } = useCms();
  const storyText =
    "Мы проектируем не стены, а сценарии жизни: утренний свет, маршрут взгляда, тишину материалов и точную документацию для реализации.";

  return (
    <>
      <div className="slides-wrap relative isolate overflow-x-hidden bg-[#0f0d0a]">
        <section className="hero-section snap-section relative z-[1] flex min-h-screen overflow-hidden px-5 py-28 md:px-10 lg:px-16">
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover opacity-75"
            src={`${assetPrefix}/background.mp4`}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-light-field absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(232,221,206,.22),transparent_33%),radial-gradient(circle_at_18%_78%,rgba(111,128,106,.16),transparent_36%),linear-gradient(90deg,rgba(8,7,5,.88),rgba(8,7,5,.58)_44%,rgba(15,13,10,.2))]" />
          <div className="hero-copper-line absolute bottom-0 left-0 z-[1] h-px w-full bg-gradient-to-r from-[#D69A66] via-white/30 to-transparent" />

          <div className="relative z-10 flex w-full items-end">
            <div className="max-w-6xl">
              {homeHero.eyebrow ? (
                <p className="hero-reveal mb-5 text-xs uppercase tracking-[0.45em] text-[#D69A66]">
                  {homeHero.eyebrow}
                </p>
              ) : null}
              <h1 className="hero-reveal max-w-5xl text-6xl font-light leading-[0.92] tracking-[-0.07em] md:text-8xl lg:text-[9.5rem]">
                {homeHero.title}
              </h1>
              <div className="hero-reveal mt-8 grid max-w-4xl gap-6 md:grid-cols-[1fr_auto] md:items-end">
                {homeHero.text ? (
                  <p className="text-lg leading-relaxed text-[#D6D1CA] md:text-xl">
                    {homeHero.text}
                  </p>
                ) : null}
                {homeHero.linkHref && homeHero.linkLabel ? (
                  <Link
                    href={homeHero.linkHref}
                    className="group inline-flex h-14 items-center justify-center rounded-full border border-[#D69A66]/50 px-7 text-sm uppercase tracking-[0.22em] text-[#F5F2EC] transition hover:bg-[#D69A66] hover:text-[#0c0b09]"
                  >
                    {homeHero.linkLabel}
                    <span className="ml-3 transition group-hover:translate-x-1">→</span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <FeatureProject project={projects[0]} label="Избранный проект 01" />

        <section className="snap-section story-section relative z-[1] flex min-h-screen items-center  px-5 py-28 md:px-10 lg:px-16">
          <div className="story-backdrop absolute inset-0" aria-hidden="true" />
          
          <div className="relative z-10 mx-auto max-w-6xl">
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

        <section className="snap-section portfolio-grid-section relative z-[1] min-h-screen px-5 py-28 md:px-10 lg:px-16">
          <PortfolioGrid onSelectProject={setActiveProject} />
        </section>
      </div>

      <StyleLab />

      <div className="home-continuation relative overflow-hidden">
        <div className="relative z-10">
          <ProjectShowcase project={activeProject} />
          <AboutPage />
          <ServicesSummary />
          <ServicePages />
          <ProjectQuiz />
          <Workflow />
          <FAQ />
          <ContentPagesOverview />
          <ContactSection />
        </div>
      </div>
    </>
  );
}

export default HomePage;

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { contentPages, projects, servicePageItems } from "./data";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ContentPage from "./pages/ContentPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PortfolioPage from "./pages/PortfolioPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesPage from "./pages/ServicesPage";
import { getCurrentPath, normalizePath } from "./router";
import type { Project } from "./types";
import { GlobalStyle, Noise } from "./ui";

gsap.registerPlugin(ScrollTrigger);

type RoutedPageProps = {
  currentPath: string;
  activeProject: Project;
  setActiveProject: (project: Project) => void;
};

function RoutedPage({ currentPath, activeProject, setActiveProject }: RoutedPageProps) {
  const servicePage = servicePageItems.find((item) => `/${item.id}` === currentPath);
  const contentPage = contentPages.find((page) => `/${page.id}` === currentPath);

  if (servicePage) return <ServiceDetailPage item={servicePage} />;
  if (contentPage) return <ContentPage page={contentPage} />;
  if (currentPath === "/") return <HomePage activeProject={activeProject} setActiveProject={setActiveProject} />;
  if (currentPath === "/o-nas") {
    return (
      <div className="page-in pt-24">
        <AboutPage />
      </div>
    );
  }
  if (currentPath === "/services") return <ServicesPage />;
  if (currentPath === "/portfolio") {
    return <PortfolioPage activeProject={activeProject} setActiveProject={setActiveProject} />;
  }
  if (currentPath === "/kontakty" || currentPath === "/contact") return <ContactPage />;

  return <NotFoundPage />;
}

function App() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  const navigateTo = (path: string) => {
    const nextPath = normalizePath(path);
    if (nextPath !== getCurrentPath()) {
      window.history.pushState(null, "", nextPath);
    }
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRouteClick = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="/"]');
    if (!link || link.target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateTo(link.pathname);
  };

  useEffect(() => {
    const handlePopState = () => setCurrentPath(getCurrentPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -16,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      if (currentPath !== "/") {
        gsap.from(".page-in", {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
        });
        return;
      }

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
          trigger: ".hero-section",
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

      const storyWords = gsap.utils.toArray<HTMLElement>(".story-word");
      gsap.set(storyWords, { opacity: 0.2, y: 12 });
      gsap.to(storyWords, {
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
    }, mainRef);

    return () => ctx.revert();
  }, [currentPath]);

  return (
    <main ref={mainRef} onClick={handleRouteClick} className="min-h-screen bg-[#0d0d0b] text-[#f3efe7] antialiased">
      <GlobalStyle />
      <Noise />
      <Header currentPath={currentPath} />
      <RoutedPage currentPath={currentPath} activeProject={activeProject} setActiveProject={setActiveProject} />
      <Footer />
    </main>
  );
}

export default App;

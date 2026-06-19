"use client";

import { useEffect, useState } from "react";
import { useCms } from "@/src/cms";
import PortfolioPage from "@/src/modules/pages/PortfolioPage";

export default function Page() {
  const { projects } = useCms();
  const [activeProject, setActiveProject] = useState(projects[0]);

  useEffect(() => {
    if (!projects[0]) return;

    setActiveProject((current) => {
      if (!current) return projects[0];
      return (
        projects.find((project) => project.slug === current.slug) ?? projects[0]
      );
    });
  }, [projects]);

  return (
    <PortfolioPage
      activeProject={activeProject}
      setActiveProject={setActiveProject}
    />
  );
}

"use client";

import { useMemo, useState } from "react";
import { useCms } from "@/src/cms";
import type { Project } from "@/src/types";
import PortfolioPage from "./PortfolioPage";

export default function PortfolioProjectClient({ initialProject }: { initialProject: Project }) {
  const { projects } = useCms();
  const resolvedInitialProject = useMemo(
    () => projects.find((project) => project.slug === initialProject.slug) ?? initialProject,
    [initialProject, projects],
  );
  const [activeProject, setActiveProject] = useState(resolvedInitialProject);

  return <PortfolioPage activeProject={activeProject} setActiveProject={setActiveProject} />;
}

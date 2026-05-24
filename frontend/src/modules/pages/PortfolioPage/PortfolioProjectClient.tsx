"use client";

import { useMemo } from "react";
import { useCms } from "@/src/cms";
import type { Project } from "@/src/types";
import PortfolioProjectPage from "./PortfolioProjectPage";

export default function PortfolioProjectClient({ initialProject }: { initialProject: Project }) {
  const { projects } = useCms();
  const currentProject = useMemo(
    () => projects.find((project) => project.slug === initialProject.slug) ?? initialProject,
    [initialProject, projects],
  );

  return <PortfolioProjectPage project={currentProject} />;
}

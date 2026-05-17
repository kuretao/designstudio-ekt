"use client";

import { useState } from "react";
import { useCms } from "@/src/cms";
import PortfolioPage from "@/src/modules/pages/PortfolioPage";

export default function Page() {
  const { projects } = useCms();
  const [activeProject, setActiveProject] = useState(projects[0]);
  return <PortfolioPage activeProject={activeProject} setActiveProject={setActiveProject} />;
}

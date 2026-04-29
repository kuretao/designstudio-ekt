"use client";

import { useState } from "react";
import { projects } from "@/src/data";
import PortfolioPage from "@/src/views/PortfolioPage";

export default function Page() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  return <PortfolioPage activeProject={activeProject} setActiveProject={setActiveProject} />;
}

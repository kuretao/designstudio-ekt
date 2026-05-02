"use client";

import { useState } from "react";
import { projects } from "@/src/data";
import HomePage from "@/src/modules/pages/HomePage";

export default function Page() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  return <HomePage activeProject={activeProject} setActiveProject={setActiveProject} />;
}

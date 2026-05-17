"use client";

import { useEffect, useState } from "react";
import { useCms } from "@/src/cms";
import HomePage from "@/src/modules/pages/HomePage";

export default function Page() {
  const { projects } = useCms();
  const [activeProject, setActiveProject] = useState(projects[0]);

  useEffect(() => {
    if (projects[0]) setActiveProject((current) => current ?? projects[0]);
  }, [projects]);

  return <HomePage activeProject={activeProject} setActiveProject={setActiveProject} />;
}

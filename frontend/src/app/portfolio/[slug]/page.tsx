import { notFound } from "next/navigation";
import { projects } from "@/src/data";
import PortfolioProjectClient from "@/src/modules/pages/PortfolioPage/PortfolioProjectClient";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return <PortfolioProjectClient initialProject={project} />;
}

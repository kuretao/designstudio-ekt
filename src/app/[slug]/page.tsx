import { notFound } from "next/navigation";
import { servicePageItems, contentPages } from "@/src/data";
import ServiceDetailPage from "@/src/modules/pages/ServiceDetailPage";
import ContentPage from "@/src/modules/pages/ContentPage";

// Slugs that have their own dedicated app routes — exclude from [slug]
const DEDICATED_ROUTES = new Set(["novosti", "akcii-i-skidki", "otzyvy-o-nas"]);

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...servicePageItems.map((item) => ({ slug: item.id })),
    ...contentPages
      .filter((page) => !DEDICATED_ROUTES.has(page.id))
      .map((page) => ({ slug: page.id })),
  ];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const servicePage = servicePageItems.find((item) => item.id === slug);
  if (servicePage) return <ServiceDetailPage item={servicePage} />;

  const contentPage = contentPages.find((page) => page.id === slug);
  if (contentPage) return <ContentPage page={contentPage} />;

  notFound();
}

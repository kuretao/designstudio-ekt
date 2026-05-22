import { notFound } from "next/navigation";
import { servicePageItems, contentPages } from "@/src/data";
import ServiceDetailPage from "@/src/modules/pages/ServiceDetailPage";
import ContentPage from "@/src/modules/pages/ContentPage";

// Slugs that have their own dedicated app routes - exclude from [slug].
const DEDICATED_ROUTES = new Set(["novosti", "akcii-i-skidki", "otzyvy-o-nas"]);

export const dynamicParams = true;
export const dynamic = "force-dynamic";

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

  const cmsPage = await loadCmsPage(slug);
  if (cmsPage) return <ContentPage page={cmsPage} />;

  notFound();
}

async function loadCmsPage(slug: string) {
  const cmsBaseUrl = process.env.CMS_API_INTERNAL_URL || "http://localhost:8080/api/v1";

  try {
    const response = await fetch(`${cmsBaseUrl}/pages/${encodeURIComponent(slug)}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;

    const page = await response.json();
    const hero = page.blocks?.[0] ?? {};

    return {
      id: page.id ?? page.slug,
      title: page.title,
      template: page.template,
      body: page.body,
      eyebrow: hero.eyebrow ?? "3D Smart Design",
      text: hero.text ?? hero.subtitle ?? page.seoDescription ?? "",
      image: hero.image,
    };
  } catch {
    return null;
  }
}

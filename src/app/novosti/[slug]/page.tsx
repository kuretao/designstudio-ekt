import { notFound } from "next/navigation";
import { newsArticles } from "@/src/data";
import NewsArticlePage from "@/src/modules/pages/NewsArticlePage";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();
  return <NewsArticlePage article={article} />;
}

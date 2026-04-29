"use client";

import Link from "next/link";
import { newsArticles, type NewsArticle } from "../data";
import { GlassPanel } from "../ui";

function BodyBlock({ block }: { block: NewsArticle["body"][number] }) {
  if (block.type === "heading") {
    return (
      <h2 className="mt-12 text-3xl font-light tracking-[-0.04em] text-[#f3efe7] md:text-4xl">
        {block.text}
      </h2>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="mt-5 space-y-3">
        {block.items?.map((item, i) => (
          <li key={i} className="flex gap-4 leading-relaxed text-[#d8d1c4]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d7c4a1]" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="mt-6 text-lg leading-relaxed text-[#d8d1c4]">{block.text}</p>
  );
}

function NewsArticlePage({ article }: { article: NewsArticle }) {
  const related = newsArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="page-in pt-24">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-5 pb-16 md:px-10 lg:px-16">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b] via-[#0d0d0b]/55 to-[#0d0d0b]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0b]/60 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-[#d7c4a1]/45 bg-[#0d0d0b]/50 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#d7c4a1] backdrop-blur">
              {article.category}
            </span>
            <span className="text-sm text-white/50">{article.date}</span>
            <span className="text-sm text-white/35">{article.readingTime} чтения</span>
          </div>
          <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.055em] md:text-7xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="px-5 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:items-start">
            {/* Article text */}
            <div>
              <p className="text-xl font-light leading-relaxed text-[#f3efe7]">
                {article.preview}
              </p>
              <div className="mt-2 border-t border-white/10" />
              {article.body.map((block, i) => (
                <BodyBlock key={i} block={block} />
              ))}

              {/* Back link */}
              <div className="mt-16 border-t border-white/10 pt-8">
                <Link
                  href="/novosti"
                  className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[#d7c4a1] transition hover:gap-5"
                >
                  ← Все новости
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-32">
              <GlassPanel className="rounded-[1.75rem] p-6">
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#d7c4a1]">Об авторе</p>
                <p className="text-sm leading-relaxed text-[#d8d1c4]">
                  Команда 3D Smart Design Studio — студия концептуального дизайна. Интерьеры, архитектура, ландшафт и 3D-визуализация.
                </p>
              </GlassPanel>
              <GlassPanel className="rounded-[1.75rem] p-6">
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#d7c4a1]">Обсудить проект</p>
                <p className="mb-5 text-sm leading-relaxed text-[#d8d1c4]">
                  Есть идея или вопрос? Свяжитесь с нами — ответим в течение рабочего дня.
                </p>
                <Link
                  href="/kontakty"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#d7c4a1] px-5 py-3 text-xs uppercase tracking-[0.22em] text-[#0d0d0b] transition hover:bg-[#f3efe7]"
                >
                  Написать нам
                </Link>
              </GlassPanel>
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-white/10 px-5 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Читать также</p>
            <h2 className="mb-10 text-4xl font-light tracking-[-0.045em] md:text-6xl">
              Другие новости
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/novosti/${a.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] transition duration-500 hover:-translate-y-2 hover:border-[#d7c4a1]/55 hover:shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/80 via-transparent to-[#d7c4a1]/10" />
                    <span className="absolute left-4 top-4 rounded-full border border-[#d7c4a1]/35 bg-[#0d0d0b]/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#d7c4a1] backdrop-blur">
                      {a.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-xs text-white/40">{a.date}</p>
                    <h3 className="text-lg font-light leading-snug tracking-[-0.03em] transition duration-500 group-hover:translate-x-0.5">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

export default NewsArticlePage;

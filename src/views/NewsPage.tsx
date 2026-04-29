"use client";

import Link from "next/link";
import { newsArticles } from "../data";

function NewsPage() {
  const [featured, ...rest] = newsArticles;

  return (
    <div className="page-in pt-24">
      {/* Hero */}
      <section className="px-5 py-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Studio updates</p>
          <div className="mb-16 grid gap-8 md:grid-cols-[1fr_0.6fr] md:items-end">
            <h1 className="text-6xl font-light leading-[0.92] tracking-[-0.065em] md:text-8xl">
              Новости
            </h1>
            <p className="text-lg leading-relaxed text-[#d8d1c4]">
              Обновления студии, новые услуги, советы по проектированию и тренды рынка.
            </p>
          </div>

          {/* Featured article */}
          <Link
            href={`/novosti/${featured.slug}`}
            className="group relative mb-5 flex min-h-[520px] overflow-hidden rounded-[2.5rem] border border-white/10 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/50 hover:shadow-[0_34px_120px_rgba(0,0,0,0.5)]"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b] via-[#0d0d0b]/50 to-transparent" />
            <div className="relative mt-auto p-8 md:p-12">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#d7c4a1]/40 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#d7c4a1]">
                  {featured.category}
                </span>
                <span className="text-xs text-white/45">{featured.date}</span>
                <span className="text-xs text-white/35">{featured.readingTime} чтения</span>
              </div>
              <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.045em] transition duration-500 group-hover:translate-x-1 md:text-6xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#d8d1c4]">
                {featured.preview}
              </p>
              <div className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[#d7c4a1] transition duration-300 group-hover:gap-5">
                Читать статью <span>→</span>
              </div>
            </div>
          </Link>

          {/* Rest of articles */}
          <div className="grid gap-5 md:grid-cols-3">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/novosti/${article.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] transition duration-500 hover:-translate-y-2 hover:border-[#d7c4a1]/55 hover:shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/80 via-[#0d0d0b]/20 to-[#d7c4a1]/10" />
                  <span className="absolute left-5 top-5 rounded-full border border-[#d7c4a1]/35 bg-[#0d0d0b]/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#d7c4a1] backdrop-blur">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs text-white/40">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readingTime} чтения</span>
                  </div>
                  <h3 className="text-xl font-light leading-snug tracking-[-0.03em] transition duration-500 group-hover:translate-x-0.5">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d8d1c4] line-clamp-3">
                    {article.preview}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d7c4a1] transition duration-300 group-hover:gap-3">
                    Читать <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsPage;

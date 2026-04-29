"use client";

import { contentPages, projects } from "../data";
import { GlassPanel } from "../ui";

type ContentPageItem = (typeof contentPages)[number];

export function ContentPagesOverview() {
  return (
    <section className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Информационные страницы</p>
        <h2 className="mb-12 max-w-4xl text-5xl font-light tracking-[-0.055em] md:text-7xl">
          Акции, новости, блог и отзывы
        </h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {contentPages.map((page) => (
            <a
              key={page.id}
              id={page.id}
              href={`/${page.id}`}
              className="group scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#d7c4a1]/60"
            >
              <p className="mb-8 text-xs uppercase tracking-[0.32em] text-[#d7c4a1]">{page.eyebrow}</p>
              <h3 className="text-3xl font-light tracking-[-0.04em] transition duration-500 group-hover:translate-x-1">
                {page.title}
              </h3>
              <p className="mt-5 leading-relaxed text-[#d8d1c4]">{page.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContentPage({ page }: { page: ContentPageItem }) {
  return (
    <div className="page-in pt-24">
      <section className="px-5 py-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">{page.eyebrow}</p>
          <h1 className="max-w-5xl text-6xl font-light tracking-[-0.06em] md:text-8xl">{page.title}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#d8d1c4]">{page.text}</p>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[projects[0], projects[1], projects[2]].map((project, index) => (
              <GlassPanel
                key={`${page.id}-${project.id}`}
                className="group overflow-hidden rounded-[2rem] p-0 transition duration-500 hover:-translate-y-2 hover:border-[#d7c4a1]/60"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 text-sm text-[#d7c4a1]">0{index + 1}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-light">{project.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#d8d1c4]">{project.description}</p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContentPage;

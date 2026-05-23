"use client";

import { useState } from "react";
import Link from "next/link";
import { contentPages as fallbackContentPages } from "@/src/data";
import { submitLead, useCms } from "@/src/cms";
import { GlassPanel } from "@/src/ui";
import CinematicImage from "@/src/components/common/CinematicImage";
import HeroBackdropSlider from "@/src/components/common/HeroBackdropSlider";
import SectionLabel from "@/src/components/common/SectionLabel";

type ContentPageItem = (typeof fallbackContentPages)[number] & {
  body?: string | null;
  template?: string | null;
};

export function ContentPagesOverview() {
  const { contentPages } = useCms();
  return (
    <section className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Информационные страницы</SectionLabel>
        <h2 className="mb-12 max-w-4xl text-5xl font-light tracking-[-0.055em] md:text-7xl">
          Акции, новости, блог, отзывы и новые разделы
        </h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {contentPages.map((page) => (
            <Link
              key={page.id}
              id={page.id}
              href={`/${page.id}`}
              className="group scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#D69A66]/60"
            >
              <p className="mb-8 text-xs uppercase tracking-[0.32em] text-[#D69A66]">{page.eyebrow}</p>
              <h3 className="text-3xl font-light tracking-[-0.04em] transition duration-500 group-hover:translate-x-1">
                {page.title}
              </h3>
              <p className="mt-5 leading-relaxed text-[#D6D1CA]">{page.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContentPage({ page }: { page: ContentPageItem }) {
  const { careerVacancies, contentPages, newsArticles, projects } = useCms();
  const currentPage: ContentPageItem = (contentPages.find((item) => item.id === page.id) as ContentPageItem | undefined) ?? page;
  const isBlog = currentPage.id === "blog";
  const isCareer = currentPage.id === "karera";
  const isPartners = currentPage.id === "partneram";
  const isTextPage = currentPage.template === "text" && Boolean(currentPage.body?.trim());
  const [partnerName, setPartnerName] = useState("");
  const [partnerContact, setPartnerContact] = useState("");
  const [partnerCompany, setPartnerCompany] = useState("");
  const [partnerMessage, setPartnerMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handlePartnerSubmit = async () => {
    if (!partnerContact.trim()) return;

    await submitLead({
      source: "partner-page",
      name: partnerName.trim(),
      contact: partnerContact.trim(),
      service: partnerCompany.trim(),
      message: partnerMessage.trim(),
    });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputCls =
    "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-[#F5F2EC] outline-none transition placeholder:text-white/25 focus:border-[#D69A66]/60 focus:bg-white/[0.07]";

  return (
    <div className="page-in">
      <section className="relative overflow-hidden px-5 py-28 md:px-10 lg:px-16">
        <HeroBackdropSlider
          slides={[
            { image: projects[0].image, alt: currentPage.title },
            { image: projects[1].image, alt: "Интерьерный проект" },
            { image: projects[2].image, alt: "Ландшафтный проект" },
          ]}
        />
        <div className="absolute inset-0 bg-[#050505]/70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505,rgba(5,5,5,.82),rgba(5,5,5,.45))]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel>{currentPage.eyebrow}</SectionLabel>
          <h1 className="max-w-5xl text-6xl font-light tracking-[-0.06em] md:text-8xl">{currentPage.title}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#D6D1CA]">{currentPage.text}</p>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {isTextPage ? (
            <GlassPanel className="rounded-[2rem] p-7 md:p-10">
              <div className="cms-rich-text" dangerouslySetInnerHTML={{ __html: currentPage.body ?? "" }} />
            </GlassPanel>
          ) : isCareer ? (
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <GlassPanel className="rounded-[2rem] p-7 md:p-9">
                <SectionLabel className="mb-5">Вакансии</SectionLabel>
                {careerVacancies.length > 0 ? (
                  <div className="space-y-4">
                    {careerVacancies.map((vacancy) => (
                      <article key={vacancy.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#D69A66]">
                          <span>{vacancy.format}</span>
                          <span className="h-1 w-1 rounded-full bg-white/25" />
                          <span>{vacancy.workload}</span>
                        </div>
                        <h2 className="mt-4 text-3xl font-light tracking-[-0.04em]">{vacancy.title}</h2>
                        <p className="mt-4 leading-relaxed text-[#D6D1CA]">{vacancy.description}</p>
                        <ul className="mt-5 space-y-2 text-sm text-white/55">
                          {vacancy.requirements.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-px w-4 shrink-0 bg-[#D69A66]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7">
                    <h2 className="text-3xl font-light tracking-[-0.04em]">Открытых вакансий пока нет</h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-[#D6D1CA]">
                      Когда появятся новые роли, их можно будет добавить в `careerVacancies` в `src/data.ts`.
                      Резюме и портфолио можно отправить на почту студии.
                    </p>
                  </div>
                )}
              </GlassPanel>
              <GlassPanel className="rounded-[2rem] p-7 md:p-9">
                <SectionLabel className="mb-5">Отклик</SectionLabel>
                <h2 className="text-3xl font-light tracking-[-0.04em]">Прислать портфолио</h2>
                <p className="mt-4 leading-relaxed text-[#D6D1CA]">
                  Напишите пару строк о себе, приложите ссылку на портфолио и укажите направление: интерьер, архитектура или ландшафт.
                </p>
                <a
                  href="mailto:3dsmartdesign@bk.ru?subject=Отклик%20на%20вакансию%20с%20сайта"
                  className="mt-8 inline-flex rounded-full bg-[#D69A66] px-7 py-4 text-sm font-medium uppercase tracking-[0.22em] text-[#050505] transition hover:bg-[#F5F2EC]"
                >
                  Отправить отклик
                </a>
              </GlassPanel>
            </div>
          ) : isPartners ? (
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <GlassPanel className="rounded-[2rem] p-7 md:p-9">
                <SectionLabel className="mb-5">Форматы</SectionLabel>
                <div className="space-y-5">
                  {[
                    "Материалы, мебель, свет и декор для комплектации проектов",
                    "Подрядные команды для ремонта, строительства и монтажа",
                    "Девелоперские и коммерческие проекты для визуализации",
                    "Коллаборации с шоурумами, брендами и профильными специалистами",
                  ].map((item, index) => (
                    <div key={item} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <span className="text-sm text-[#D69A66]">0{index + 1}</span>
                      <p className="leading-relaxed text-[#D6D1CA]">{item}</p>
                    </div>
                  ))}
                </div>
              </GlassPanel>
              <GlassPanel className="rounded-[2rem] p-7 md:p-9">
                <SectionLabel className="mb-5">Обратная связь</SectionLabel>
                <h2 className="text-3xl font-light tracking-[-0.04em]">Предложить сотрудничество</h2>
                <div className="mt-8 grid gap-3">
                  <input className={inputCls} placeholder="Ваше имя" value={partnerName} onChange={(event) => setPartnerName(event.target.value)} />
                  <input className={inputCls} placeholder="Компания или направление" value={partnerCompany} onChange={(event) => setPartnerCompany(event.target.value)} />
                  <input className={inputCls} placeholder="Телефон, e-mail или Telegram" value={partnerContact} onChange={(event) => setPartnerContact(event.target.value)} />
                  <textarea
                    className={`${inputCls} min-h-[140px] resize-none`}
                    placeholder="Коротко о предложении"
                    value={partnerMessage}
                    onChange={(event) => setPartnerMessage(event.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handlePartnerSubmit}
                    className="h-14 rounded-full bg-[#D69A66] text-sm font-medium uppercase tracking-[0.22em] text-[#050505] transition hover:bg-[#F5F2EC]"
                  >
                    {sent ? "Заявка подготовлена" : "Отправить"}
                  </button>
                </div>
              </GlassPanel>
            </div>
          ) : isBlog ? (
            <div className="grid gap-5 md:grid-cols-3">
              {newsArticles.slice(1).map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/novosti/${article.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-2 hover:border-[#D69A66]/60"
                >
                  <div className="relative h-64 overflow-hidden">
                    <CinematicImage
                      frames={[
                        article.image,
                        newsArticles[(index + 2) % newsArticles.length]?.image,
                        newsArticles[(index + 3) % newsArticles.length]?.image,
                      ]}
                      alt={article.title}
                      fill
                      hint="read"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.28em] text-[#D69A66]">{article.category}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-light leading-tight">{article.title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-[#D6D1CA]">{article.preview}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {[projects[0], projects[1], projects[2]].map((project, index) => (
                <GlassPanel key={`${page.id}-${project.id}`} className="group overflow-hidden rounded-[2rem] p-0 transition duration-500 hover:-translate-y-2 hover:border-[#D69A66]/60">
                  <div className="relative h-72 overflow-hidden">
                    <CinematicImage
                      frames={[
                        project.image,
                        projects[(index + 1) % projects.length]?.image,
                        projects[(index + 2) % projects.length]?.image,
                      ]}
                      alt={project.title}
                      fill
                      hint="motion"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-5 text-sm text-[#D69A66]">0{index + 1}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-light">{project.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#D6D1CA]">{project.description}</p>
                  </div>
                </GlassPanel>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ContentPage;

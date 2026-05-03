"use client";

import Link from "next/link";
import { reviewStats, testimonials } from "@/src/data";
import { GlassPanel } from "@/src/ui";

function ReviewsHero({ featuredReview }: { featuredReview: (typeof testimonials)[number] }) {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-16 pt-28 md:px-10 lg:px-16">
      <img src={featuredReview.image} alt={featuredReview.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.97)_0%,rgba(5,5,5,.72)_50%,rgba(5,5,5,.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#050505_0%,rgba(5,5,5,.42)_34%,transparent_78%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
        <div className="pb-8">
          <p className="text-xs uppercase tracking-[0.38em] text-[#C58351]">Client stories</p>
          <h1 className="mt-5 max-w-5xl text-6xl font-light leading-[0.9] tracking-[-0.065em] text-white md:text-8xl lg:text-9xl">
            Отзывы о нас
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#E8E0D8]/85 md:text-xl">
            Здесь важны не громкие обещания, а то, как клиенты описывают процесс: сроки, внимание к деталям, спокойную коммуникацию и результат, который хочется показывать.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/kontakty"
              className="rounded-full border border-[#C58351] bg-[#C58351] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d19362]"
            >
              Стать клиентом
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/15 bg-black/25 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/75 backdrop-blur transition duration-300 hover:border-[#C58351]/70 hover:text-white"
            >
              Смотреть портфолио
            </Link>
          </div>
        </div>

        <div className="mb-8 grid gap-4">
          <GlassPanel className="review-sheen overflow-hidden rounded-[2rem] p-6">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#C58351]/40 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-[#C58351]">
                {featuredReview.service}
              </span>
              <span className="text-xs text-white/45">{featuredReview.date}</span>
            </div>
            <p className="text-3xl font-light leading-tight tracking-[-0.04em] md:text-5xl">{featuredReview.title}</p>
            <p className="mt-5 text-base leading-relaxed text-[#D6D1CA]">{featuredReview.text}</p>
            <div className="mt-7 border-t border-white/15 pt-5 text-lg text-white">{featuredReview.name}</div>
          </GlassPanel>

          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-3">
            {reviewStats.map((stat) => (
              <div key={stat.value} className="bg-[#050505]/70 p-5 backdrop-blur">
                <span className="block text-2xl font-light text-[#C58351]">{stat.value}</span>
                <span className="mt-2 block text-xs uppercase leading-relaxed tracking-[0.16em] text-[#D6D1CA]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsPage() {
  const featuredReview = testimonials[0];

  return (
    <div className="page-in">
      <ReviewsHero featuredReview={featuredReview} />
      <section className="px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="review-card mb-5 text-xs uppercase tracking-[0.45em] text-[#C58351]">Опыт клиентов</p>
              <h2 className="review-card max-w-5xl text-5xl font-light leading-[0.92] tracking-[-0.055em] md:text-7xl">
                Слова, за которыми виден процесс
              </h2>
            </div>
            <div className="review-card">
              <p className="max-w-xl text-lg leading-relaxed text-[#D6D1CA]">
                Перенесли отзывы с исходной страницы и собрали их в живую презентационную витрину: реальные даты,
                направления работ, короткие выводы и ответы студии.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <GlassPanel className="review-card review-sheen relative overflow-hidden rounded-[2.5rem] p-0">
              <div className="relative min-h-[620px] overflow-hidden">
                <img
                  src={featuredReview.image}
                  alt={featuredReview.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/58 to-[#050505]/10" />
                <div className="absolute inset-x-6 bottom-6 md:inset-x-9 md:bottom-9">
                  <div className="mb-8 inline-flex rounded-full border border-[#C58351]/45 bg-[#050505]/60 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#C58351] backdrop-blur">
                    {featuredReview.service}
                  </div>
                  <p className="max-w-3xl text-3xl font-light leading-tight tracking-[-0.04em] md:text-5xl">
                    {featuredReview.title}
                  </p>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#D6D1CA] md:text-lg">
                    {featuredReview.text}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/15 pt-6">
                    <span className="text-xl text-white">{featuredReview.name}</span>
                    <span className="text-sm text-[#D6D1CA]">{featuredReview.date}</span>
                  </div>
                </div>
              </div>
            </GlassPanel>

            <div className="grid gap-5">
              {testimonials.slice(1).map((review, index) => (
                <GlassPanel
                  key={review.name}
                  className="review-card review-sheen relative overflow-hidden rounded-[2rem] p-6 transition duration-500 hover:-translate-y-2 hover:border-[#C58351]/60 hover:shadow-[0_24px_90px_rgba(0,0,0,0.38)]"
                >
                  <div className="flex gap-5">
                    <div className="hidden h-28 w-24 shrink-0 overflow-hidden rounded-[1.25rem] sm:block">
                      <img src={review.image} alt={review.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[#C58351]/12 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#C58351]">
                          0{index + 2}
                        </span>
                        <span className="text-xs uppercase tracking-[0.18em] text-white/50">{review.service}</span>
                      </div>
                      <h2 className="text-3xl font-light leading-tight tracking-[-0.04em]">{review.title}</h2>
                      <p className="mt-4 leading-relaxed text-[#D6D1CA]">{review.text}</p>
                      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <span className="text-white">{review.name}</span>
                        <span className="text-[#D6D1CA]">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="review-card">
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#C58351]">Диалог со студией</p>
            <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">Ответы администратора без сухой формальности</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#D6D1CA]">
              Для страницы оставили не только клиентские впечатления, но и короткий ответ студии — так блок выглядит
              живым и поддерживает доверие.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#C58351] via-white/15 to-transparent md:block" />
            <div className="grid gap-5">
              {testimonials.map((review, index) => (
                <div key={`${review.name}-reply`} className="review-card relative md:pl-14">
                  <span className="absolute left-0 top-7 hidden h-3 w-3 rounded-full bg-[#C58351] shadow-[0_0_28px_rgba(197,131,81,0.8)] md:block" />
                  <GlassPanel className="rounded-[1.75rem] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#C58351]/50">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-[#C58351]">Ответ на отзыв #{index + 1}</span>
                      <span className="text-xs uppercase tracking-[0.18em] text-white/45">Администратор</span>
                    </div>
                    <p className="text-lg leading-relaxed text-[#F5F2EC]">{review.adminReply}</p>
                  </GlassPanel>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <GlassPanel className="review-card overflow-hidden rounded-[2.5rem] p-0">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[420px] overflow-hidden">
                <img src={testimonials[1].image} alt="Оставить отзыв" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="mb-4 text-xs uppercase tracking-[0.36em] text-[#C58351]">Оставить отзыв</p>
                  <h2 className="max-w-lg text-4xl font-light tracking-[-0.05em] md:text-6xl">
                    Расскажите, каким был ваш проект
                  </h2>
                </div>
              </div>
              <form className="grid gap-4 p-6 md:p-9">
                <input
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 outline-none transition placeholder:text-white/35 focus:border-[#C58351]"
                  placeholder="Имя *"
                />
                <input
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 outline-none transition placeholder:text-white/35 focus:border-[#C58351]"
                  placeholder="E-mail *"
                />
                <textarea
                  className="min-h-44 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 outline-none transition placeholder:text-white/35 focus:border-[#C58351]"
                  placeholder="Текст *"
                />
                <p className="text-sm leading-relaxed text-[#D6D1CA]">
                  Отправленное сообщение появится после проверки администратором сайта.
                </p>
                <button
                  type="button"
                  className="h-14 rounded-full bg-[#C58351] px-7 text-sm uppercase tracking-[0.24em] text-[#050505] transition hover:bg-[#F5F2EC]"
                >
                  Отправить отзыв
                </button>
              </form>
            </div>
          </GlassPanel>
        </div>
      </section>
    </div>
  );
}

export default ReviewsPage;

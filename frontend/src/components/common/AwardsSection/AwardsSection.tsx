"use client";

import Link from "next/link";
import { useCms } from "@/src/cms";
import SectionLabel from "@/src/components/common/SectionLabel";

type AwardsSectionProps = {
  compact?: boolean;
  showLink?: boolean;
};

function AwardDocument({ title, image }: { title: string; image?: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-[#F5F2EC] p-5 text-[#171511]">
      <div className="h-full border border-[#D69A66]/45 p-4">
        <div className="mx-auto mb-6 h-12 w-12 rounded-full border border-[#D69A66]/45" />
        <div className="mx-auto h-2 w-28 rounded-full bg-[#D69A66]/45" />
        <div className="mx-auto mt-3 h-1.5 w-36 rounded-full bg-[#171511]/16" />
        <div className="mt-10 space-y-2">
          <div className="h-1.5 rounded-full bg-[#171511]/14" />
          <div className="h-1.5 rounded-full bg-[#171511]/10" />
          <div className="h-1.5 w-3/4 rounded-full bg-[#171511]/10" />
        </div>
      </div>
    </div>
  );
}

export default function AwardsSection({ compact = false, showLink = true }: AwardsSectionProps) {
  const { awards } = useCms();

  if (!awards.length) return null;

  return (
    <section className={`border-t border-white/10 px-5 ${compact ? "py-20" : "py-28"} md:px-10 lg:px-16`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1fr] md:items-end">
          <div>
            <SectionLabel>Награды и дипломы</SectionLabel>
            <h2 className="mt-4 max-w-4xl text-5xl font-light leading-[0.98] tracking-[-0.045em] md:text-7xl">
              Подтверждения опыта и доверия
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="max-w-2xl text-lg leading-relaxed text-[#D6D1CA]">
              Дипломы, сертификаты и благодарности показывают, что студия работает открыто, системно и подтверждает качество не только портфолио.
            </p>
            {showLink ? (
              <Link
                href="/nagrady-i-diplomy"
                className="mt-6 inline-flex rounded-full border border-[#D69A66]/55 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#D69A66] transition hover:bg-[#D69A66] hover:text-[#050505]"
              >
                Все награды
              </Link>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {awards.map((award) => (
            <article
              key={`${award.title}-${award.year}`}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-[#D69A66]/55"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#171511]">
                <AwardDocument title={award.title} image={award.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-transparent opacity-75" />
                <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/72 backdrop-blur">
                  {award.year}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[#D69A66]">{award.issuer}</p>
                <h3 className="mt-3 text-2xl font-light leading-tight tracking-[-0.025em]">{award.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#D6D1CA]">{award.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

const trustedDevelopers = [
  {
    name: "Capital Group",
    note: "Крупная российская девелоперская компания в Москве и МО",
    logo: "https://3dsmartdesign.ru/thumb/2/UTjcjjirjkNIb7gi9Ntcqw/400r/d/capital_group_companies.jpg",
  },
  {
    name: "ГК Новый ДОН",
    note: "Девелопер в Самарской области",
    logo: "https://3dsmartdesign.ru/thumb/2/RlgeH9Y3csLYczkYsgNu2Q/400r/d/new_don.png",
  },
  {
    name: "Донстрой",
    note: "Ведущий девелопер Москвы",
    logo: "https://3dsmartdesign.ru/thumb/2/g2LV_n-kEBXik20WYSCS1A/400r/d/donstroy.png",
  },
  {
    name: "Новое время",
    note: "Девелоперские проекты",
    logo: "https://3dsmartdesign.ru/thumb/2/y2JTTt1Emb3k-aLkhLOnPg/400r/d/new_time.png",
  },
  {
    name: "ГК СтройСтиль",
    note: "Строительная группа в Самарской области",
    logo: "https://3dsmartdesign.ru/thumb/2/kLTN_w8WucjQyKHSlM_5XA/400r/d/stroy_stil.png",
  },
  {
    name: "СЗ Парковый",
    note: "Специализированный застройщик",
    logo: "https://3dsmartdesign.ru/thumb/2/CArE8uFr4NxRaKGKgcHC1g/400r/d/parkoviy.jpg",
  },
  {
    name: "СЗ Весна",
    note: "Специализированный застройщик",
    logo: "https://3dsmartdesign.ru/thumb/2/vwriae_lbfxG4f5fGZ5EGA/400r/d/vesna.png",
  },
  {
    name: "Берег",
    note: "Девелоперские проекты",
    logo: "https://3dsmartdesign.ru/thumb/2/jVJTB_JBkAeGhqSVfGu42g/400r/d/bereg.png",
  },
];

export default function BrandStrip() {
  return (
    <section className="border-y border-white/8 bg-[#0c0b09]/45 px-5 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 grid gap-3 md:grid-cols-[0.55fr_1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.38em] text-[#D69A66]">Нам доверяют</p>
            <h2 className="mt-3 text-3xl font-light tracking-[-0.04em] text-white md:text-5xl">Девелоперы и застройщики</h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-[#D6D1CA] md:justify-self-end md:text-right">
            Проекты студии выбирают частные клиенты, девелоперы и строительные компании, которым важны понятная визуализация и аккуратная реализация.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
          {trustedDevelopers.map((brand) => (
            <div
              key={brand.name}
              className="group flex min-h-32 flex-col items-center justify-center bg-[#11100d]/88 px-5 py-6 text-center transition hover:bg-white/[0.055]"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="max-h-12 max-w-[160px] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-95"
              />
              <p className="mt-4 text-sm font-medium tracking-[0.04em] text-white/68">{brand.name}</p>
              <p className="mt-1 text-xs leading-snug text-white/34">{brand.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

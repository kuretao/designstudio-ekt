"use client";

const brands = ["ArchDaily", "Houzz", "PinWin", "Domclick", "Cian", "Avito", "Яндекс Карты"];

export default function BrandStrip() {
  return (
    <section className="border-y border-white/8 bg-[#0c0b09]/45 px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-xs uppercase tracking-[0.38em] text-[#D69A66]">Партнеры и площадки</p>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-7">
          {brands.map((brand) => (
            <div key={brand} className="flex h-20 items-center justify-center bg-[#11100d]/88 px-4 text-center text-sm font-medium tracking-[0.08em] text-white/58 transition hover:bg-white/[0.055] hover:text-white">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

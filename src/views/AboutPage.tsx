"use client";

import { GlassPanel } from "../ui";
import SectionLabel from "../components/SectionLabel";

function AboutPage() {
  return (
    <section id="o-nas" className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <SectionLabel>О нас</SectionLabel>
          <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">
            Студия концептуального дизайна. Дизайн с умом.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Работаем с интерьерами, архитектурой, ландшафтом и 3D-визуализацией.",
            "Собираем проект как систему: идея, планировка, материалы, свет, документация и комплектация.",
            "Ведём проекты в Самаре и удалённо с другими регионами.",
            "Сохраняем текущий визуальный стиль: тёмная сцена, спокойная типографика и премиальные акценты.",
          ].map((text, index) => (
            <GlassPanel
              key={text}
              className="rounded-[2rem] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#d7c4a1]/50"
            >
              <span className="mb-8 block text-sm text-[#d7c4a1]">0{index + 1}</span>
              <p className="text-lg leading-relaxed text-[#d8d1c4]">{text}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;

import { servicePageItems } from "../data";
import { GlassPanel } from "../ui";
import { ContactSection } from "./ContactPage";
import { Workflow } from "./ServicesPage";

type ServicePageItem = (typeof servicePageItems)[number];

function ServiceDetailPage({ item }: { item: ServicePageItem }) {
  return (
    <div className="page-in pt-24">
      <section className="px-5 py-28 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Услуга</p>
            <h1 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">{item.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#d8d1c4]">{item.text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="/kontakty"
                className="rounded-full bg-[#d7c4a1] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#0d0d0b] transition hover:bg-[#f3efe7]"
              >
                Обсудить проект
              </a>
              <a
                href="/services"
                className="rounded-full border border-white/15 px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#d8d1c4] transition hover:border-[#d7c4a1] hover:text-white"
              >
                Все услуги
              </a>
            </div>
          </div>
          <div className="group relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-white/10">
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/90 via-[#0d0d0b]/20 to-[#d7c4a1]/10" />
            <div className="absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-3">
              {["Концепция", "Визуализация", "Документация"].map((step) => (
                <GlassPanel key={step} className="rounded-[1.25rem] p-4 text-sm text-[#d8d1c4]">
                  {step}
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Workflow />
      <ContactSection />
    </div>
  );
}

export default ServiceDetailPage;

import { contactInfo, servicePageItems } from "../data";
import { GlassPanel } from "../ui";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Контакты</p>
          <h2 className="text-5xl font-light tracking-[-0.055em] md:text-7xl">
            Свяжитесь с 3D Smart Design Studio
          </h2>
          <div className="mt-10 grid gap-4 text-[#d8d1c4]">
            <GlassPanel className="rounded-[1.5rem] p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#d7c4a1]">Телефон</p>
              <a className="text-2xl text-white transition hover:text-[#d7c4a1]" href={contactInfo.phoneHref}>
                {contactInfo.phone}
              </a>
            </GlassPanel>
            <GlassPanel className="rounded-[1.5rem] p-5">
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#d7c4a1]">Email</p>
              {contactInfo.emails.map((email) => (
                <a key={email} className="block text-lg transition hover:text-white" href={`mailto:${email}`}>
                  {email}
                </a>
              ))}
            </GlassPanel>
            <GlassPanel className="rounded-[1.5rem] p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#d7c4a1]">График и адрес</p>
              <p>{contactInfo.schedule}</p>
              <p className="mt-2">{contactInfo.address}</p>
            </GlassPanel>
          </div>
        </div>

        <GlassPanel className="rounded-[2rem] p-6 md:p-8">
          <form className="grid gap-4">
            <input
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 outline-none transition placeholder:text-white/35 focus:border-[#d7c4a1]"
              placeholder="Имя"
            />
            <input
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 outline-none transition placeholder:text-white/35 focus:border-[#d7c4a1]"
              placeholder="Email или телефон"
            />
            <select className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white/70 outline-none transition focus:border-[#d7c4a1]">
              {servicePageItems.slice(0, 6).map((item) => (
                <option key={item.id}>{item.title}</option>
              ))}
            </select>
            <textarea
              className="min-h-36 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 outline-none transition placeholder:text-white/35 focus:border-[#d7c4a1]"
              placeholder="Коротко о проекте"
            />
            <button
              type="button"
              className="h-14 rounded-full bg-[#d7c4a1] px-7 text-sm uppercase tracking-[0.24em] text-[#0d0d0b] transition hover:bg-[#f3efe7]"
            >
              Отправить заявку
            </button>
          </form>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10">
            <iframe
              title="3D Smart Design Studio map"
              src={contactInfo.mapSrc}
              className="h-64 w-full grayscale invert"
            />
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <div className="page-in pt-24">
      <ContactSection />
    </div>
  );
}

export default ContactPage;

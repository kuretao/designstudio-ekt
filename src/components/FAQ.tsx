import { faq } from "../data";

function FAQ() {
  return (
    <section id="faq" className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">FAQ</p>
        <h2 className="mb-12 text-5xl font-light tracking-[-0.055em] md:text-7xl">Частые вопросы</h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 open:border-[#d7c4a1]/50"
            >
              <summary className="cursor-pointer list-none text-2xl font-light tracking-[-0.03em]">
                {item.q}
                <span className="float-right transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-5 leading-relaxed text-[#d8d1c4]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;

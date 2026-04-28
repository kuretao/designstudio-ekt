import { contactInfo, servicePageItems } from "../data";

type HeaderProps = {
  currentPath: string;
};

function Header({ currentPath }: HeaderProps) {
  const linkClass = (path: string) =>
    `transition hover:text-white ${currentPath === path ? "text-[#d7c4a1]" : ""}`;
  const servicesActive =
    currentPath === "/services" || servicePageItems.some((item) => currentPath === `/${item.id}`);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-5 py-4 md:px-10 lg:px-16">
      <div className="nav-item mx-auto flex max-w-[1600px] items-center justify-between gap-5 rounded-full border border-white/10 bg-[#0d0d0b]/70 px-5 py-3 text-white shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <a href="/" className="shrink-0 text-xs uppercase tracking-[0.34em] text-white md:text-sm">
          3D Smart Design
        </a>
        <nav className="hidden items-center justify-end gap-4 text-[10px] uppercase tracking-[0.2em] text-white/75 lg:flex">
          <a className={linkClass("/o-nas")} href="/o-nas">
            О нас
          </a>
          <div className="group relative">
            <a
              className={`inline-flex items-center gap-2 transition hover:text-white ${servicesActive ? "text-[#d7c4a1]" : ""}`}
              href="/services"
            >
              Услуги
              <span className="text-[#d7c4a1]">+</span>
            </a>
            <div className="pointer-events-none absolute -left-8 right-0 top-full h-5 group-hover:pointer-events-auto" />
            <div className="pointer-events-none absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[360px] rounded-[1.5rem] border border-white/10 bg-[#0d0d0b]/95 p-3 opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              {servicePageItems.map((item) => (
                <a
                  key={item.id}
                  href={`/${item.id}`}
                  className="block rounded-2xl px-4 py-3 leading-snug tracking-[0.08em] text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
          <a className={linkClass("/portfolio")} href="/portfolio">
            Портфолио
          </a>
          <a className={linkClass("/kontakty")} href="/kontakty">
            Контакты
          </a>
          <a className={linkClass("/akcii-i-skidki")} href="/akcii-i-skidki">
            Акции
          </a>
          <a className={linkClass("/novosti")} href="/novosti">
            Новости
          </a>
          <a className={linkClass("/blog")} href="/blog">
            Блог
          </a>
          <a className={linkClass("/otzyvy-o-nas")} href="/otzyvy-o-nas">
            Отзывы
          </a>
        </nav>
        <a
          href={contactInfo.phoneHref}
          className="hidden rounded-full border border-[#d7c4a1]/40 px-4 py-2 text-xs text-[#d7c4a1] transition hover:bg-[#d7c4a1] hover:text-[#0d0d0b] md:block"
        >
          {contactInfo.phone}
        </a>
      </div>
      <nav className="nav-item mt-3 flex gap-3 overflow-x-auto rounded-full border border-white/10 bg-[#0d0d0b]/75 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl lg:hidden">
        <a className="shrink-0 hover:text-white" href="/o-nas">
          О нас
        </a>
        <a className="shrink-0 hover:text-white" href="/services">
          Услуги
        </a>
        <a className="shrink-0 hover:text-white" href="/portfolio">
          Портфолио
        </a>
        <a className="shrink-0 hover:text-white" href="/kontakty">
          Контакты
        </a>
        <a className="shrink-0 hover:text-white" href="/akcii-i-skidki">
          Акции
        </a>
        <a className="shrink-0 hover:text-white" href="/novosti">
          Новости
        </a>
        <a className="shrink-0 hover:text-white" href="/blog">
          Блог
        </a>
        <a className="shrink-0 hover:text-white" href="/otzyvy-o-nas">
          Отзывы
        </a>
      </nav>
    </header>
  );
}

export default Header;

function Footer() {
  return (
    <footer className="border-t border-white/15 px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-[#d8d1c4] md:flex-row">
        <p>© 2026 3D Smart Design Studio. Студия концептуального дизайна.</p>
        <div className="flex flex-wrap gap-5">
          <a className="hover:text-white" href="/o-nas">
            О нас
          </a>
          <a className="hover:text-white" href="/services">
            Услуги
          </a>
          <a className="hover:text-white" href="/portfolio">
            Портфолио
          </a>
          <a className="hover:text-white" href="/kontakty">
            Контакты
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

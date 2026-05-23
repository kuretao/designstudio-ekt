export type SiteLocale = "ru" | "en";

export const resources = {
  ru: {
    translation: {
      header: {
        menu: "Menu",
        close: "Close",
        contact: "Написать нам",
      },
      menu: {
        about: "О нас",
        portfolio: "Портфолио",
        services: "Услуги",
        blog: "Блог",
        contacts: "Контакты",
      },
      footer: {
        brandText: "Студия концептуального дизайна интерьеров, архитектурного проектирования и ландшафтного дизайна.",
        services: "Услуги",
        sections: "Разделы",
        contacts: "Контакты",
        phone: "Телефон",
        schedule: "График",
        address: "Адрес",
        career: "Карьера",
        partners: "Партнерам",
        privacy: "Политика конфиденциальности",
        agreement: "Пользовательское соглашение",
        remote: "Работаем удалённо по всему миру",
      },
      fixed: {
        vk: "VK",
        telegram: "Telegram",
        max: "MAX",
      },
      services: {
        "dizajn-interyera": "Дизайн интерьера",
        "dizajn-interera-kommercheskogo-prostranstva": "Дизайн коммерческого пространства",
        "komplektaciya-ob-ekta": "Комплектация объекта",
        "3d-vizualizaciya": "3D визуализация",
        "arhitekturnaya-3d-vizualizaciya": "Архитектурная 3D визуализация",
        "landshaftnyj-dizajn": "Ландшафтный дизайн",
        "virtualnyj-3d-tur-360": "Виртуальный 3D тур 360°",
        "arhitekturnoe-proektirovanie": "Архитектурное проектирование",
        "eskiznyj-proekt": "Эскизный проект",
        "rabochaya-dokumentaciya": "Рабочая документация",
      },
    },
  },
  en: {
    translation: {
      header: {
        menu: "Menu",
        close: "Close",
        contact: "Contact us",
      },
      menu: {
        about: "About",
        portfolio: "Portfolio",
        services: "Services",
        blog: "Blog",
        contacts: "Contacts",
      },
      footer: {
        brandText: "Conceptual interior design, architectural design and landscape design studio.",
        services: "Services",
        sections: "Sections",
        contacts: "Contacts",
        phone: "Phone",
        schedule: "Hours",
        address: "Location",
        career: "Careers",
        partners: "Partners",
        privacy: "Privacy Policy",
        agreement: "User Agreement",
        remote: "Remote projects worldwide",
      },
      fixed: {
        vk: "VK",
        telegram: "Telegram",
        max: "MAX",
      },
      services: {
        "dizajn-interyera": "Interior Design",
        "dizajn-interera-kommercheskogo-prostranstva": "Commercial Interior Design",
        "komplektaciya-ob-ekta": "Project Procurement",
        "3d-vizualizaciya": "3D Visualization",
        "arhitekturnaya-3d-vizualizaciya": "Architectural 3D Visualization",
        "landshaftnyj-dizajn": "Landscape Design",
        "virtualnyj-3d-tur-360": "Virtual 3D Tour 360°",
        "arhitekturnoe-proektirovanie": "Architectural Design",
        "eskiznyj-proekt": "Concept Design",
        "rabochaya-dokumentaciya": "Working Documentation",
      },
    },
  },
} as const;

export function menuKeyByHref(href: string) {
  if (href === "/o-nas") return "menu.about";
  if (href === "/portfolio") return "menu.portfolio";
  if (href === "/services") return "menu.services";
  if (href === "/blog") return "menu.blog";
  if (href === "/kontakty") return "menu.contacts";
  return null;
}

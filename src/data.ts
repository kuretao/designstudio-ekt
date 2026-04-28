import type { FilterCategory, Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Nord House",
    category: "Архитектура",
    location: "Finland coast",
    year: "2026",
    description:
      "Частная резиденция на береговой линии: строгая геометрия, панорамное остекление и мягкий свет внутри.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90",
    beforeImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 2,
    title: "Atrium Flat",
    category: "Интерьеры",
    location: "Berlin",
    year: "2025",
    description:
      "Минималистичный интерьер с натуральным камнем, скрытым хранением и камерной вечерней атмосферой.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90",
    beforeImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 3,
    title: "Stone Garden",
    category: "Ландшафт",
    location: "Milan",
    year: "2025",
    description:
      "Сад как продолжение архитектуры: сухие злаки, камень, вода и сценарии вечерней подсветки.",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: 4,
    title: "Gallery Office",
    category: "Интерьеры",
    location: "Warsaw",
    year: "2026",
    description:
      "Офис-галерея для дизайн-команды: open space, переговорные капсулы и гибкая экспозиционная зона.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: 5,
    title: "Cliff Villa",
    category: "Архитектура",
    location: "Portugal",
    year: "2024",
    description:
      "Вилла на рельефе с террасами, консольными объемами и видовым бассейном.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: 6,
    title: "Quiet Patio",
    category: "Ландшафт",
    location: "Barcelona",
    year: "2025",
    description:
      "Приватный внутренний двор с теневыми деревьями, фактурной плиткой и тихой зоной отдыха.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2200&q=90",
  },
];

export const filters: FilterCategory[] = ["Все", "Интерьеры", "Архитектура", "Ландшафт"];

export const portfolioDemoItems = [
  { image: projects[0].image, title: "Facade mood", meta: "Architecture" },
  { image: projects[2].image, title: "Garden light", meta: "Landscape" },
  { image: projects[3].image, title: "Workspace detail", meta: "Interior" },
];

export const servicePageItems = [
  {
    id: "dizajn-interyera",
    title: "Дизайн интерьера",
    text: "Концепция, планировка, визуализации, чертежи и подбор материалов для частных пространств.",
    image: projects[1].image,
  },
  {
    id: "dizajn-interera-kommercheskogo-prostranstva",
    title: "Дизайн интерьера коммерческого пространства",
    text: "Проектируем офисы, шоурумы, рестораны и общественные зоны с понятной логикой движения и бренда.",
    image: projects[3].image,
  },
  {
    id: "komplektaciya-ob-ekta",
    title: "Комплектация объекта",
    text: "Собираем ведомости, подбираем позиции и сопровождаем закупки, чтобы проект не распался на этапе реализации.",
    image: projects[0].beforeImage || projects[0].image,
  },
  {
    id: "3d-vizualizaciya",
    title: "3D визуализация",
    text: "Фотореалистичные ракурсы для согласования идеи, презентации инвестору и контроля будущего результата.",
    image: projects[2].image,
  },
  {
    id: "arhitekturnaya-3d-vizualizaciya",
    title: "Архитектурная 3D визуализация",
    text: "Визуализация фасадов, посадки на участок, материалов, вечерних сценариев и окружения объекта.",
    image: projects[4].image,
  },
  {
    id: "landshaftnyj-dizajn",
    title: "Ландшафтный дизайн",
    text: "Сады, приватные дворы, террасы и сценарии подсветки как продолжение архитектуры и интерьера.",
    image: projects[5].image,
  },
  {
    id: "virtualnyj-3d-tur-360",
    title: "Виртуальный 3D тур 360°",
    text: "Интерактивная прогулка по будущему пространству для удалённых согласований и точных решений.",
    image: projects[1].afterImage || projects[1].image,
  },
  {
    id: "arhitekturnoe-proektirovanie",
    title: "Архитектурное проектирование",
    text: "Объём, фасады, планировочные решения, материалы и логика объекта до выпуска рабочей документации.",
    image: projects[0].image,
  },
  {
    id: "eskiznyj-proekt",
    title: "Эскизный проект",
    text: "Быстрый и точный первый пакет решений: идея, объём, планировка, стилистика и ключевые ракурсы.",
    image: projects[4].image,
  },
  {
    id: "rabochaya-dokumentaciya",
    title: "Рабочая документация",
    text: "Чертежи, спецификации и техническая база, по которой подрядчики могут реализовать проект без догадок.",
    image: projects[3].image,
  },
];

export const contentPages = [
  {
    id: "akcii-i-skidki",
    title: "Акции и скидки",
    eyebrow: "Special offers",
    text: "Пакетные условия для комплексных проектов: интерьер, визуализация, комплектация и авторское сопровождение.",
  },
  {
    id: "novosti",
    title: "Новости",
    eyebrow: "Studio updates",
    text: "Публикуем новые проекты, этапы реализации и важные обновления по услугам студии.",
  },
  {
    id: "blog",
    title: "Блог",
    eyebrow: "Design notes",
    text: "Материалы о планировках, визуализации, комплектации, работе с подрядчиками и подготовке к ремонту.",
  },
  {
    id: "otzyvy-o-nas",
    title: "Отзывы о нас",
    eyebrow: "Client feedback",
    text: "Отзывы клиентов о проектировании, сроках, коммуникации и сопровождении на этапе реализации.",
  },
];

export const contactInfo = {
  phone: "+7 (987) 942-12-42",
  phoneHref: "tel:+79879421242",
  emails: ["3dsmartdesign@bk.ru", "info@3dsmartdesign.ru"],
  schedule: "Пн-Пт 9:00-20:00, Сб-Вс 10:00-19:00",
  address: "Работаем в Самаре или удаленно с другими регионами",
  mapSrc:
    "https://www.openstreetmap.org/export/embed.html?bbox=49.92%2C53.12%2C50.30%2C53.30&layer=mapnik&marker=53.1959%2C50.1002",
};

export const services = [
  {
    title: "Концепция пространства",
    price: "от 1 900 EUR",
    text: "Планировочная логика, moodboard, референсы, визуальный язык и базовый сценарий света.",
  },
  {
    title: "Дизайн-проект",
    price: "от 75 EUR/м2",
    text: "Обмерный план, планировка, визуализации, чертежи, спецификации и ведомость материалов.",
  },
  {
    title: "Архитектурная концепция",
    price: "от 6 500 EUR",
    text: "Объемная модель, фасадные решения, посадка на участок, материалы и презентационный пакет.",
  },
  {
    title: "Авторское сопровождение",
    price: "от 900 EUR/мес",
    text: "Контроль соответствия проекту, ответы подрядчикам, корректировки и выезды на объект.",
  },
];

export const faq = [
  {
    q: "Сколько длится разработка проекта?",
    a: "Концепция занимает 2-4 недели, полный дизайн-проект обычно 8-14 недель. Срок зависит от площади, состава работ и скорости согласований.",
  },
  {
    q: "Можно ли заказать только визуализацию?",
    a: "Да, но мы рекомендуем начинать с планировочной логики: так визуализация становится рабочим инструментом, а не просто красивой картинкой.",
  },
  {
    q: "Вы работаете удаленно?",
    a: "Да. Для удаленных проектов используем видео-брифы, облачные доски, 3D-презентации и подробные чертежи для локальной команды.",
  },
];

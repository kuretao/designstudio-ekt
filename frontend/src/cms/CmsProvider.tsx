"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  awards,
  careerVacancies,
  contactInfo,
  contentPages,
  faq,
  messengerLinks,
  newsArticles,
  partners,
  projects,
  requiredHomeHeroTitle,
  promos,
  reviewStats,
  serviceNavigationGroups as fallbackServiceNavigationGroups,
  servicePageItems as fallbackServicePageItems,
  services,
  testimonials,
} from "@/src/data";

type SiteSettings = {
  siteName: string;
  seoTitle: string;
  seoDescription: string;
  logo: string | null;
  logoSmall: string | null;
  favicon: string | null;
  appleTouchIcon: string | null;
  socialPreviewImage: string | null;
  compareEyebrow: string;
  compareTitle: string;
  compareText: string;
};

type HomeHero = {
  eyebrow: string;
  title: string;
  text: string;
  linkLabel: string;
  linkHref: string;
};

type HomeStory = {
  eyebrow: string;
  text: string;
};

type AnimationControls = {
  enabled: boolean;
  smoothScroll: boolean;
  pageReveal: boolean;
};

type CmsData = {
  siteSettings: SiteSettings;
  homeHero: HomeHero;
  homeStory: HomeStory;
  projects: typeof projects;
  servicePageItems: typeof fallbackServicePageItems;
  serviceNavigationGroups: typeof fallbackServiceNavigationGroups;
  services: typeof services;
  newsArticles: typeof newsArticles;
  promos: typeof promos;
  testimonials: typeof testimonials;
  faq: typeof faq;
  contactInfo: typeof contactInfo;
  messengerLinks: typeof messengerLinks;
  animationControls: AnimationControls;
  contentPages: typeof contentPages;
  careerVacancies: typeof careerVacancies;
  reviewStats: typeof reviewStats;
  awards: typeof awards;
  partners: typeof partners;
  menuItems: { href: string; label: string }[];
  ready: boolean;
};

const fallbackData: CmsData = {
  siteSettings: {
    siteName: "3D Smart Design Studio",
    seoTitle: `${requiredHomeHeroTitle} | 3D Smart Design Studio`,
    seoDescription:
      "Дизайн интерьера, архитектурное проектирование, 3D-визуализация, ландшафтный дизайн, комплектация и авторский надзор в Самаре.",
    logo: null,
    logoSmall: null,
    favicon: null,
    appleTouchIcon: null,
    socialPreviewImage: null,
    compareEyebrow: "Render / Blueprint",
    compareTitle: "Сравнение до / после",
    compareText:
      "Ползунок показывает, как меняется восприятие объекта после визуальной проработки. Здесь можно заменить демо на реальные чертежи, рендеры или фото объекта.",
  },
  homeHero: {
    eyebrow: "3D Smart Design Studio",
    title: requiredHomeHeroTitle,
    text: "Создаем интерьеры, архитектуру, 3D-визуализацию и ландшафтные проекты: от концепции до рабочей документации, комплектации и сопровождения.",
    linkLabel: "Обсудить проект",
    linkHref: "/kontakty",
  },
  homeStory: {
    eyebrow: "Философия проекта",
    text: "Мы проектируем не стены, а сценарии жизни: утренний свет, маршрут взгляда, тишину материалов и точную документацию для реализации.",
  },
  projects,
  servicePageItems: fallbackServicePageItems,
  serviceNavigationGroups: fallbackServiceNavigationGroups,
  services,
  newsArticles,
  promos,
  testimonials,
  faq,
  contactInfo,
  messengerLinks,
  animationControls: {
    enabled: true,
    smoothScroll: true,
    pageReveal: true,
  },
  contentPages,
  careerVacancies,
  reviewStats,
  awards,
  partners,
  menuItems: [
    { href: "/o-nas", label: "О нас" },
    { href: "/portfolio", label: "Портфолио" },
    { href: "/services", label: "Услуги" },
    { href: "/blog", label: "Блог" },
    { href: "/kontakty", label: "Контакты" },
  ],
  ready: false,
};

const CmsContext = createContext<CmsData>(fallbackData);

function makeProjectSlug(project: {
  slug?: string;
  title?: string;
  id?: number;
}) {
  if (project.slug) return project.slug;

  const base = project.title || `project-${project.id ?? ""}`;
  return base
    .toLowerCase()
    .replace(/["'«»]/g, "")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeAsset(path?: string | null) {
  const value = path?.trim();
  if (!value) return null;

  if (
    /^(https?:)?\/\//i.test(value) ||
    value.startsWith("data:") ||
    value.startsWith("/")
  ) {
    return value;
  }

  return `/storage/${value.replace(/^\/+/, "")}`;
}

function normalizeImageList(value: unknown): string[] {
  const rawItems = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/\r?\n/u)
      : [];

  return Array.from(
    new Set(
      rawItems
        .map((item) => normalizeAsset(typeof item === "string" ? item : ""))
        .filter((item): item is string => Boolean(item)),
    ),
  );
}

function normalizeBlock(block: any) {
  const images = normalizeImageList(
    block?.images?.length ? block.images : block?.image,
  );

  return {
    type: block?.type ?? "text",
    eyebrow: block?.eyebrow ?? null,
    title: block?.title ?? null,
    subtitle: block?.subtitle ?? null,
    text: block?.text ?? null,
    image: images[0] ?? null,
    images,
    linkLabel: block?.linkLabel ?? null,
    linkHref: block?.linkHref ?? null,
  };
}

function mergeServiceItems(payloadServices: any[]) {
  const byId = new Map(
    payloadServices
      .map((service: any) => ({ ...service, id: service.id ?? service.slug }))
      .filter((service: any) => service.id)
      .map((service: any) => [service.id, service]),
  );

  const merged = fallbackServicePageItems.map((fallback) => {
    const service = byId.get(fallback.id);

    if (!service) return fallback;

    byId.delete(fallback.id);

    return {
      ...fallback,
      ...service,
      deliverables:
        Array.isArray(service.deliverables) && service.deliverables.length
          ? service.deliverables
          : fallback.deliverables,
      benefits:
        Array.isArray(service.benefits) && service.benefits.length
          ? service.benefits
          : fallback.benefits,
      process:
        Array.isArray(service.process) && service.process.length
          ? service.process
          : fallback.process,
      image: service.image || fallback.image,
      price: service.price || fallback.price,
      timeline: service.timeline || fallback.timeline,
      eyebrow: service.eyebrow || fallback.eyebrow,
      text: service.text || fallback.text,
    };
  });

  return [...merged, ...Array.from(byId.values())];
}

function normalizeServiceNavigationGroups(payloadGroups: any[]) {
  const groups = payloadGroups
    .map((group: any, index: number) => {
      const href = typeof group?.href === "string" ? group.href : "";
      const title = typeof group?.title === "string" ? group.title : "";

      if (!href || !title) {
        return null;
      }

      const items = Array.isArray(group?.items)
        ? group.items
            .map((item: any) => ({
              label: typeof item?.label === "string" ? item.label : "",
              href: typeof item?.href === "string" ? item.href : "",
            }))
            .filter((item: any) => item.label && item.href)
        : [];

      return {
        id: String(group.id ?? href ?? `service-group-${index}`),
        title,
        href,
        description:
          typeof group?.description === "string" ? group.description : "",
        items,
      };
    })
    .filter(
      (group): group is (typeof fallbackServiceNavigationGroups)[number] =>
        Boolean(group),
    );

  return groups;
}

function normalizePayload(payload: any): CmsData {
  const settings = payload?.settings ?? {};
  const apiServices =
    Array.isArray(payload?.services) && payload.services.length
      ? mergeServiceItems(payload.services)
      : fallbackServicePageItems;
  const apiProjects = (
    Array.isArray(payload?.projects) && payload.projects.length
      ? payload.projects
      : projects
  ).map((project: any) => ({
    ...project,
    slug: makeProjectSlug(project),
  }));
  const payloadPages = Array.isArray(payload?.pages) ? payload.pages : [];
  const homePage = payloadPages.find(
    (page: any) => page.slug === "home" || page.id === "home",
  );
  const homeBlocks = Array.isArray(homePage?.blocks)
    ? homePage.blocks.map(normalizeBlock)
    : [];
  const homeBlock =
    homeBlocks.find((block: any) => block.type === "hero") ??
    homeBlocks[0] ??
    {};
  const homeStoryBlock = homeBlocks.find(
    (block: any) => block.type === "text",
  );
  const homeTitle =
    typeof homeBlock.title === "string" ? homeBlock.title.trim() : "";
  const normalizedHomeTitle = homeTitle.toLowerCase();
  const shouldUseRequiredHomeTitle =
    !homeTitle ||
    ["дизайн с умом", "дизайн с умом."].includes(normalizedHomeTitle) ||
    (normalizedHomeTitle.includes("дизайн интерьера") &&
      normalizedHomeTitle.includes("архитектур") &&
      !normalizedHomeTitle.includes("ландшафт"));
  const contentPayloadPages = payloadPages.filter(
    (page: any) => page.slug !== "home" && page.id !== "home",
  );
  const apiPages = contentPayloadPages.length
    ? contentPayloadPages.map((page: any) => {
        const blocks = Array.isArray(page.blocks)
          ? page.blocks.map(normalizeBlock)
          : [];
        const hero = blocks.find((block: any) => block.type === "hero") ?? {};
        return {
          id: page.id ?? page.slug,
          slug: page.slug,
          title: page.title,
          template: page.template,
          body: page.body,
          eyebrow: hero.eyebrow ?? "3D Smart Design Studio",
          text: hero.text ?? hero.subtitle ?? page.seoDescription ?? "",
          image: hero.image ?? apiProjects[0]?.image,
          images: hero.images ?? [],
          blocks,
        };
      })
    : contentPages;

  return {
    siteSettings: {
      siteName: settings.siteName ?? fallbackData.siteSettings.siteName,
      seoTitle: settings.seoTitle ?? fallbackData.siteSettings.seoTitle,
      seoDescription:
        settings.seoDescription ?? fallbackData.siteSettings.seoDescription,
      logo: settings.logo ?? null,
      logoSmall: settings.logoSmall ?? null,
      favicon: settings.favicon ?? null,
      appleTouchIcon: settings.appleTouchIcon ?? null,
      socialPreviewImage: settings.socialPreviewImage ?? null,
      compareEyebrow: settings.compareEyebrow ?? fallbackData.siteSettings.compareEyebrow,
      compareTitle: settings.compareTitle ?? fallbackData.siteSettings.compareTitle,
      compareText: settings.compareText ?? fallbackData.siteSettings.compareText,
    },
    homeHero: homePage
      ? {
          eyebrow: homeBlock.eyebrow ?? "",
          title: shouldUseRequiredHomeTitle ? requiredHomeHeroTitle : homeTitle,
          text: homeBlock.subtitle ?? homeBlock.text ?? "",
          linkLabel: homeBlock.linkLabel ?? "",
          linkHref: homeBlock.linkHref ?? "",
        }
      : fallbackData.homeHero,
    homeStory: homeStoryBlock
      ? {
          eyebrow: homeStoryBlock.eyebrow ?? fallbackData.homeStory.eyebrow,
          text: homeStoryBlock.text ?? fallbackData.homeStory.text,
        }
      : fallbackData.homeStory,
    projects: apiProjects,
    servicePageItems: apiServices,
    serviceNavigationGroups: Array.isArray(payload?.serviceNavigationGroups)
      ? normalizeServiceNavigationGroups(payload.serviceNavigationGroups)
      : fallbackServiceNavigationGroups,
    services: apiServices.map((item: any) => ({
      title: item.title,
      price: item.price,
      text: item.text,
    })),
    newsArticles:
      Array.isArray(payload?.news) && payload.news.length
        ? payload.news
        : newsArticles,
    promos:
      Array.isArray(payload?.promos) && payload.promos.length
        ? payload.promos
        : promos,
    testimonials:
      Array.isArray(payload?.reviews) && payload.reviews.length
        ? payload.reviews
        : testimonials,
    faq:
      Array.isArray(payload?.faqs) && payload.faqs.length ? payload.faqs : faq,
    contactInfo: {
      ...contactInfo,
      phone: settings.phone ?? contactInfo.phone,
      phoneHref: settings.phoneHref ?? contactInfo.phoneHref,
      emails: settings.emails?.length ? settings.emails : contactInfo.emails,
      schedule: settings.schedule ?? contactInfo.schedule,
      address: settings.address ?? contactInfo.address,
      mapSrc: settings.mapSrc ?? contactInfo.mapSrc,
    },
    messengerLinks: {
      ...messengerLinks,
      phoneHref: settings.messengers?.phoneHref ?? messengerLinks.phoneHref,
      max: settings.messengers?.max ?? messengerLinks.max,
      telegram: settings.messengers?.telegram ?? messengerLinks.telegram,
      vk: settings.messengers?.vk ?? messengerLinks.vk,
    },
    animationControls: {
      enabled:
        settings.animations?.enabled ?? fallbackData.animationControls.enabled,
      smoothScroll:
        settings.animations?.smoothScroll ??
        fallbackData.animationControls.smoothScroll,
      pageReveal:
        settings.animations?.pageReveal ??
        fallbackData.animationControls.pageReveal,
    },
    contentPages: apiPages,
    careerVacancies: Array.isArray(payload?.vacancies)
      ? payload.vacancies
      : careerVacancies,
    reviewStats,
    awards: Array.isArray(payload?.awards) && payload.awards.length ? payload.awards : awards,
    partners: Array.isArray(payload?.partners) && payload.partners.length ? payload.partners : partners,
    menuItems:
      Array.isArray(payload?.menuItems) && payload.menuItems.length
        ? payload.menuItems
        : fallbackData.menuItems,
    ready: true,
  };
}

const POLL_INTERVAL = 30_000;

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CmsData>(fallbackData);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1";
    let cmsAvailable = true;

    const load = (signal: AbortSignal) =>
      fetch(`${baseUrl}/all`, {
        signal,
        headers: { Accept: "application/json" },
        cache: "no-store",
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(`CMS request failed: ${response.status}`);
          return response.json();
        })
        .then((payload) => setData(normalizePayload(payload)))
        .catch((error) => {
          if (error.name !== "AbortError") {
            cmsAvailable = false;

            if (process.env.NODE_ENV !== "production") {
              console.warn("CMS fallback data is active", error);
            }
          }
        });

    const controller = new AbortController();
    load(controller.signal);

    const timer = setInterval(() => {
      if (!cmsAvailable) return;

      const c = new AbortController();
      load(c.signal);
    }, POLL_INTERVAL);

    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, []);

  const value = useMemo(() => data, [data]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}

export async function submitLead(payload: Record<string, unknown>) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1";
  const response = await fetch(`${baseUrl}/leads`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Lead request failed: ${response.status}`);
  }

  return response.json();
}

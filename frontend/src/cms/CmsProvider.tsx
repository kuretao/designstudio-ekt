"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  careerVacancies,
  contactInfo,
  contentPages,
  faq,
  messengerLinks,
  newsArticles,
  projects,
  promos,
  reviewStats,
  servicePageItems,
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
};

type HomeHero = {
  eyebrow: string;
  title: string;
  text: string;
  linkLabel: string;
  linkHref: string;
};

type AnimationControls = {
  enabled: boolean;
  smoothScroll: boolean;
  pageReveal: boolean;
};

type CmsData = {
  siteSettings: SiteSettings;
  homeHero: HomeHero;
  projects: typeof projects;
  servicePageItems: typeof servicePageItems;
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
  menuItems: { href: string; label: string }[];
  ready: boolean;
};

const fallbackData: CmsData = {
  siteSettings: {
    siteName: "3D Smart Design Studio",
    seoTitle: "3D Smart Design Studio",
    seoDescription: "Студия концептуального дизайна. Интерьеры, архитектура, ландшафт.",
    logo: null,
    logoSmall: null,
    favicon: null,
    appleTouchIcon: null,
    socialPreviewImage: null,
  },
  homeHero: {
    eyebrow: "Студия дизайна интерьера и архитектуры в Самаре",
    title: "Дизайн с умом.",
    text:
      "Создаем интерьеры, архитектуру, 3D-визуализацию и ландшафтные проекты: от концепции до рабочей документации, комплектации и сопровождения.",
    linkLabel: "Обсудить проект",
    linkHref: "/kontakty",
  },
  projects,
  servicePageItems,
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

function makeProjectSlug(project: { slug?: string; title?: string; id?: number }) {
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

  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:") || value.startsWith("/")) {
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
  const images = normalizeImageList(block?.images?.length ? block.images : block?.image);

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

function normalizePayload(payload: any): CmsData {
  const settings = payload?.settings ?? {};
  const apiServices = Array.isArray(payload?.services) && payload.services.length ? payload.services : servicePageItems;
  const apiProjects = (Array.isArray(payload?.projects) && payload.projects.length ? payload.projects : projects).map((project: any) => ({
    ...project,
    slug: makeProjectSlug(project),
  }));
  const payloadPages = Array.isArray(payload?.pages) ? payload.pages : [];
  const homePage = payloadPages.find((page: any) => page.slug === "home" || page.id === "home");
  const homeBlocks = Array.isArray(homePage?.blocks) ? homePage.blocks.map(normalizeBlock) : [];
  const homeBlock = homeBlocks.find((block: any) => block.type === "hero") ?? homeBlocks[0] ?? {};
  const contentPayloadPages = payloadPages.filter((page: any) => page.slug !== "home" && page.id !== "home");
  const apiPages =
    contentPayloadPages.length
      ? contentPayloadPages.map((page: any) => {
          const blocks = Array.isArray(page.blocks) ? page.blocks.map(normalizeBlock) : [];
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
      seoDescription: settings.seoDescription ?? fallbackData.siteSettings.seoDescription,
      logo: settings.logo ?? null,
      logoSmall: settings.logoSmall ?? null,
      favicon: settings.favicon ?? null,
      appleTouchIcon: settings.appleTouchIcon ?? null,
      socialPreviewImage: settings.socialPreviewImage ?? null,
    },
    homeHero: homePage
      ? {
          eyebrow: homeBlock.eyebrow ?? "",
          title: homeBlock.title ?? fallbackData.homeHero.title,
          text: homeBlock.subtitle ?? homeBlock.text ?? "",
          linkLabel: homeBlock.linkLabel ?? "",
          linkHref: homeBlock.linkHref ?? "",
        }
      : fallbackData.homeHero,
    projects: apiProjects,
    servicePageItems: apiServices,
    services: apiServices.map((item: any) => ({
      title: item.title,
      price: item.price,
      text: item.text,
    })),
    newsArticles: Array.isArray(payload?.news) && payload.news.length ? payload.news : newsArticles,
    promos: Array.isArray(payload?.promos) && payload.promos.length ? payload.promos : promos,
    testimonials: Array.isArray(payload?.reviews) && payload.reviews.length ? payload.reviews : testimonials,
    faq: Array.isArray(payload?.faqs) && payload.faqs.length ? payload.faqs : faq,
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
      enabled: settings.animations?.enabled ?? fallbackData.animationControls.enabled,
      smoothScroll: settings.animations?.smoothScroll ?? fallbackData.animationControls.smoothScroll,
      pageReveal: settings.animations?.pageReveal ?? fallbackData.animationControls.pageReveal,
    },
    contentPages: apiPages,
    careerVacancies: Array.isArray(payload?.vacancies) ? payload.vacancies : careerVacancies,
    reviewStats,
    menuItems: Array.isArray(payload?.menuItems) && payload.menuItems.length ? payload.menuItems : fallbackData.menuItems,
    ready: true,
  };
}

const POLL_INTERVAL = 30_000;

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CmsData>(fallbackData);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1";

    const load = (signal: AbortSignal) =>
      fetch(`${baseUrl}/all`, {
        signal,
        headers: { Accept: "application/json" },
        cache: "no-store",
      })
        .then((response) => {
          if (!response.ok) throw new Error(`CMS request failed: ${response.status}`);
          return response.json();
        })
        .then((payload) => setData(normalizePayload(payload)))
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.warn("CMS fallback data is active", error);
          }
        });

    const controller = new AbortController();
    load(controller.signal);

    const timer = setInterval(() => {
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

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

type CmsData = {
  projects: typeof projects;
  servicePageItems: typeof servicePageItems;
  services: typeof services;
  newsArticles: typeof newsArticles;
  promos: typeof promos;
  testimonials: typeof testimonials;
  faq: typeof faq;
  contactInfo: typeof contactInfo;
  messengerLinks: typeof messengerLinks;
  contentPages: typeof contentPages;
  careerVacancies: typeof careerVacancies;
  reviewStats: typeof reviewStats;
  menuItems: { href: string; label: string }[];
  ready: boolean;
};

const fallbackData: CmsData = {
  projects,
  servicePageItems,
  services,
  newsArticles,
  promos,
  testimonials,
  faq,
  contactInfo,
  messengerLinks,
  contentPages,
  careerVacancies,
  reviewStats,
  menuItems: [
    { href: "/o-nas", label: "О нас" },
    { href: "/portfolio", label: "Портфолио" },
    { href: "/services", label: "Услуги" },
    { href: "/kontakty", label: "Контакты" },
    { href: "/akcii-i-skidki", label: "Акции" },
    { href: "/novosti", label: "Новости" },
    { href: "/blog", label: "Блог" },
    { href: "/otzyvy-o-nas", label: "Отзывы" },
    { href: "/karera", label: "Карьера" },
    { href: "/partneram", label: "Партнерам" },
  ],
  ready: false,
};

const CmsContext = createContext<CmsData>(fallbackData);

function normalizePayload(payload: any): CmsData {
  const settings = payload?.settings ?? {};
  const apiServices = Array.isArray(payload?.services) && payload.services.length ? payload.services : servicePageItems;
  const apiProjects = Array.isArray(payload?.projects) && payload.projects.length ? payload.projects : projects;
  const apiPages =
    Array.isArray(payload?.pages) && payload.pages.length
      ? payload.pages.map((page: any) => {
          const hero = page.blocks?.[0] ?? {};
          return {
            id: page.id ?? page.slug,
            title: page.title,
            eyebrow: hero.eyebrow ?? "3D Smart Design",
            text: hero.text ?? hero.subtitle ?? "",
            image: hero.image ?? apiProjects[0]?.image,
          };
        })
      : contentPages;

  return {
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

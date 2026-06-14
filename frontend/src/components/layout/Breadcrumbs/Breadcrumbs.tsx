"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCms } from "@/src/cms";
import { isSeoLandingPath } from "@/src/data";

type Crumb = {
  label: string;
  href: string;
};

const routeLabels: Record<string, string> = {
  "/akcii-i-skidki": "Акции",
  "/blog": "Блог",
  "/nagrady-i-diplomy": "Награды и дипломы",
  "/kontakty": "Контакты",
  "/karera": "Карьера",
  "/novosti": "Новости",
  "/o-nas": "О нас",
  "/otzyvy-o-nas": "Отзывы",
  "/partneram": "Партнерам",
  "/politika-konfidencialnosti": "Политика конфиденциальности",
  "/portfolio": "Портфолио",
  "/services": "Услуги",
  "/user/agreement": "Пользовательское соглашение",
};

function slugToLabel(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { newsArticles, projects, serviceNavigationGroups, servicePageItems } = useCms();

  if (pathname === "/" || isSeoLandingPath(pathname)) return null;

  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  const crumbs: Crumb[] = [{ label: "Главная", href: "/" }];
  const serviceGroup = serviceNavigationGroups.find((group) =>
    group.href === normalizedPath || group.items.some((item) => item.href === normalizedPath),
  );
  const serviceChild = serviceGroup?.items.find((item) => item.href === normalizedPath);

  if (serviceGroup) {
    crumbs.push({ label: "Услуги", href: "/services" });
    crumbs.push({ label: serviceGroup.title, href: serviceGroup.href });

    if (serviceChild && serviceChild.href !== serviceGroup.href) {
      const serviceTitle = servicePageItems.find((item) => `/${item.id}` === serviceChild.href)?.title ?? serviceChild.label;
      crumbs.push({ label: serviceTitle, href: serviceChild.href });
    }
  } else if (normalizedPath.startsWith("/portfolio/")) {
    const slug = normalizedPath.split("/").filter(Boolean).at(-1) ?? "";
    const project = projects.find((item) => item.slug === slug);
    crumbs.push({ label: "Портфолио", href: "/portfolio" });
    crumbs.push({ label: project?.title ?? slugToLabel(slug), href: normalizedPath });
  } else if (normalizedPath.startsWith("/novosti/")) {
    const slug = normalizedPath.split("/").filter(Boolean).at(-1) ?? "";
    const article = newsArticles.find((item) => item.slug === slug);
    crumbs.push({ label: "Новости", href: "/novosti" });
    crumbs.push({ label: article?.title ?? slugToLabel(slug), href: normalizedPath });
  } else {
    crumbs.push({ label: routeLabels[normalizedPath] ?? slugToLabel(normalizedPath.split("/").filter(Boolean).join("-")), href: normalizedPath });
  }

  return (
    <nav
      aria-label="Хлебные крошки"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      className="fixed left-0 right-0 top-[72px] z-[45] border-b border-white/10 bg-[#050505]/38 px-5 text-white backdrop-blur-[10px] md:top-[76px] md:px-10 lg:px-12"
    >
      <ol className="mx-auto flex h-10 max-w-[1680px] items-center gap-2 overflow-x-auto whitespace-nowrap text-[11px] text-white/54">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li
              key={`${crumb.href}-${index}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-2"
            >
              {isLast ? (
                <span itemProp="name" className="max-w-[58vw] truncate text-white/78 md:max-w-none">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} itemProp="item" className="transition hover:text-[#D69A66]">
                  <span itemProp="name">{crumb.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={`${index + 1}`} />
              {!isLast && <span className="text-white/24">→</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

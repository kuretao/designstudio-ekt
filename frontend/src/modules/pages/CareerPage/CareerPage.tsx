"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useCms } from "@/src/cms";
import CinematicImage from "@/src/components/common/CinematicImage";
import HeroBackdropSlider from "@/src/components/common/HeroBackdropSlider";
import { localizedValue, siteLocaleFromLanguage } from "@/src/i18n";
import { GlassPanel } from "@/src/ui";

type Vacancy = {
  id: string;
  title: string;
  titleRu?: string | null;
  titleEn?: string | null;
  department: string;
  departmentRu?: string | null;
  departmentEn?: string | null;
  format: string;
  formatRu?: string | null;
  formatEn?: string | null;
  location: string;
  locationRu?: string | null;
  locationEn?: string | null;
  experience: string;
  experienceRu?: string | null;
  experienceEn?: string | null;
  salary: string;
  salaryRu?: string | null;
  salaryEn?: string | null;
  lead: string;
  leadRu?: string | null;
  leadEn?: string | null;
  tasks: string[];
  tasksRu?: string[] | null;
  tasksEn?: string[] | null;
  requirements: string[];
  requirementsRu?: string[] | null;
  requirementsEn?: string[] | null;
  perks: string[];
  perksRu?: string[] | null;
  perksEn?: string[] | null;
  image: string;
};

const fallbackVacancies: Vacancy[] = [
  {
    id: "interior-designer",
    title: "Дизайнер интерьера",
    titleRu: "Дизайнер интерьера",
    titleEn: "Interior Designer",
    department: "Интерьеры",
    departmentRu: "Интерьеры",
    departmentEn: "Interiors",
    format: "Гибрид / удаленно",
    formatRu: "Гибрид / удаленно",
    formatEn: "Hybrid / remote",
    location: "Самара или другой город",
    locationRu: "Самара или другой город",
    locationEn: "Samara or another city",
    experience: "от 2 лет",
    experienceRu: "от 2 лет",
    experienceEn: "2+ years",
    salary: "от 90 000 ₽ + проектный бонус",
    salaryRu: "от 90 000 ₽ + проектный бонус",
    salaryEn: "from 90,000 RUB + project bonus",
    lead: "Для жилых проектов: планировки, концепции, 3D-постановка задач и уверенная коммуникация с клиентом.",
    leadRu: "Для жилых проектов: планировки, концепции, 3D-постановка задач и уверенная коммуникация с клиентом.",
    leadEn: "For residential projects: layouts, concepts, 3D task setting, and confident client communication.",
    tasks: ["вести проект от брифа до рабочей документации", "собирать мудборды и концептуальные решения", "готовить ТЗ для визуализаторов и смежников"],
    tasksRu: ["вести проект от брифа до рабочей документации", "собирать мудборды и концептуальные решения", "готовить ТЗ для визуализаторов и смежников"],
    tasksEn: ["manage a project from brief to working documentation", "assemble moodboards and concept solutions", "prepare tasks for visualizers and adjacent specialists"],
    requirements: ["портфолио реализованных или детально проработанных интерьеров", "понимание эргономики, материалов и узлов", "спокойная, точная коммуникация с клиентами"],
    requirementsRu: ["портфолио реализованных или детально проработанных интерьеров", "понимание эргономики, материалов и узлов", "спокойная, точная коммуникация с клиентами"],
    requirementsEn: ["portfolio of completed or deeply developed interiors", "understanding of ergonomics, materials, and construction details", "calm, precise client communication"],
    perks: ["сильная команда визуализации", "понятные этапы и чек-листы", "проекты квартир и домов разного масштаба"],
    perksRu: ["сильная команда визуализации", "понятные этапы и чек-листы", "проекты квартир и домов разного масштаба"],
    perksEn: ["strong visualization team", "clear stages and checklists", "apartment and house projects of different scales"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "3d-visualizer",
    title: "3D-визуализатор интерьеров",
    titleRu: "3D-визуализатор интерьеров",
    titleEn: "Interior 3D Visualizer",
    department: "3D production",
    departmentRu: "3D production",
    departmentEn: "3D production",
    format: "Удаленно",
    formatRu: "Удаленно",
    formatEn: "Remote",
    location: "Любой город",
    locationRu: "Любой город",
    locationEn: "Any city",
    experience: "от 1,5 лет",
    experienceRu: "от 1,5 лет",
    experienceEn: "1.5+ years",
    salary: "сдельно, от 3 500 ₽ за ракурс",
    salaryRu: "сдельно, от 3 500 ₽ за ракурс",
    salaryEn: "piecework, from 3,500 RUB per view",
    lead: "Нужен человек с аккуратным светом, материалами и вниманием к атмосфере, а не только к геометрии.",
    leadRu: "Нужен человек с аккуратным светом, материалами и вниманием к атмосфере, а не только к геометрии.",
    leadEn: "We need someone with careful lighting, materials, and attention to atmosphere, not just geometry.",
    tasks: ["создавать фотореалистичные интерьерные ракурсы", "работать по ТЗ дизайнера и референсам", "готовить быстрые превью и финальные рендеры"],
    tasksRu: ["создавать фотореалистичные интерьерные ракурсы", "работать по ТЗ дизайнера и референсам", "готовить быстрые превью и финальные рендеры"],
    tasksEn: ["create photorealistic interior views", "work from designer briefs and references", "prepare quick previews and final renders"],
    requirements: ["3ds Max + Corona/V-Ray или сопоставимый стек", "чистые сцены и понятная организация файлов", "вкус к натуральным материалам, свету и композиции"],
    requirementsRu: ["3ds Max + Corona/V-Ray или сопоставимый стек", "чистые сцены и понятная организация файлов", "вкус к натуральным материалам, свету и композиции"],
    requirementsEn: ["3ds Max + Corona/V-Ray or a comparable stack", "clean scenes and clear file organization", "a feel for natural materials, light, and composition"],
    perks: ["регулярный поток задач", "удаленная работа без лишних созвонов", "референсы и ТЗ без хаоса"],
    perksRu: ["регулярный поток задач", "удаленная работа без лишних созвонов", "референсы и ТЗ без хаоса"],
    perksEn: ["regular task flow", "remote work without excessive calls", "references and briefs without chaos"],
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "architect",
    title: "Архитектор-проектировщик",
    titleRu: "Архитектор-проектировщик",
    titleEn: "Architectural Designer",
    department: "Архитектура",
    departmentRu: "Архитектура",
    departmentEn: "Architecture",
    format: "Проектная занятость",
    formatRu: "Проектная занятость",
    formatEn: "Project-based",
    location: "Самара / удаленно",
    locationRu: "Самара / удаленно",
    locationEn: "Samara / remote",
    experience: "от 3 лет",
    experienceRu: "от 3 лет",
    experienceEn: "3+ years",
    salary: "обсуждается по проекту",
    salaryRu: "обсуждается по проекту",
    salaryEn: "discussed per project",
    lead: "Для коттеджей и малых коммерческих объектов: фасады, планировочная логика, рабочие решения.",
    leadRu: "Для коттеджей и малых коммерческих объектов: фасады, планировочная логика, рабочие решения.",
    leadEn: "For cottages and small commercial properties: facades, planning logic, and working solutions.",
    tasks: ["разрабатывать планировочные и фасадные концепции", "готовить комплект чертежей для согласования", "координироваться с визуализаторами и дизайнерами"],
    tasksRu: ["разрабатывать планировочные и фасадные концепции", "готовить комплект чертежей для согласования", "координироваться с визуализаторами и дизайнерами"],
    tasksEn: ["develop planning and facade concepts", "prepare drawing sets for approval", "coordinate with visualizers and designers"],
    requirements: ["уверенная работа с Archicad/Revit или AutoCAD", "понимание конструктивной и инженерной логики", "портфолио частных домов или коммерческих объектов"],
    requirementsRu: ["уверенная работа с Archicad/Revit или AutoCAD", "понимание конструктивной и инженерной логики", "портфолио частных домов или коммерческих объектов"],
    requirementsEn: ["confident work in Archicad/Revit or AutoCAD", "understanding of structural and engineering logic", "portfolio of private homes or commercial properties"],
    perks: ["проектная загрузка без офисной рутины", "задачи на стыке архитектуры и визуализации", "адекватные сроки на проработку"],
    perksRu: ["проектная загрузка без офисной рутины", "задачи на стыке архитектуры и визуализации", "адекватные сроки на проработку"],
    perksEn: ["project workload without office routine", "tasks between architecture and visualization", "reasonable timelines for development"],
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "project-manager",
    title: "Менеджер дизайн-проектов",
    titleRu: "Менеджер дизайн-проектов",
    titleEn: "Design Project Manager",
    department: "Производство",
    departmentRu: "Производство",
    departmentEn: "Production",
    format: "Гибрид",
    formatRu: "Гибрид",
    formatEn: "Hybrid",
    location: "Самара",
    locationRu: "Самара",
    locationEn: "Samara",
    experience: "от 2 лет",
    experienceRu: "от 2 лет",
    experienceEn: "2+ years",
    salary: "от 80 000 ₽",
    salaryRu: "от 80 000 ₽",
    salaryEn: "from 80,000 RUB",
    lead: "Человек, который держит сроки, документы и коммуникацию так, чтобы дизайнеры могли спокойно проектировать.",
    leadRu: "Человек, который держит сроки, документы и коммуникацию так, чтобы дизайнеры могли спокойно проектировать.",
    leadEn: "A person who keeps timelines, documents, and communication steady so designers can focus on design.",
    tasks: ["вести календарь проекта и контроль этапов", "собирать вводные от клиента и команды", "готовить статусы, счета и простую проектную документацию"],
    tasksRu: ["вести календарь проекта и контроль этапов", "собирать вводные от клиента и команды", "готовить статусы, счета и простую проектную документацию"],
    tasksEn: ["manage project schedules and stage control", "collect inputs from clients and the team", "prepare statuses, invoices, and simple project documentation"],
    requirements: ["опыт в дизайне, ремонте, архитектуре или смежной сфере", "структурность и бережная настойчивость", "умение переводить хаос в понятный список действий"],
    requirementsRu: ["опыт в дизайне, ремонте, архитектуре или смежной сфере", "структурность и бережная настойчивость", "умение переводить хаос в понятный список действий"],
    requirementsEn: ["experience in design, renovation, architecture, or a related field", "structure and tactful persistence", "ability to turn chaos into a clear action list"],
    perks: ["влияние на качество процесса", "команда без микроменеджмента", "рост в операционное управление студией"],
    perksRu: ["влияние на качество процесса", "команда без микроменеджмента", "рост в операционное управление студией"],
    perksEn: ["influence on process quality", "team without micromanagement", "growth into studio operations"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "procurement-specialist",
    title: "Специалист по комплектации",
    titleRu: "Специалист по комплектации",
    titleEn: "Procurement Specialist",
    department: "Комплектация",
    departmentRu: "Комплектация",
    departmentEn: "Procurement",
    format: "Гибрид / частичная занятость",
    formatRu: "Гибрид / частичная занятость",
    formatEn: "Hybrid / part-time",
    location: "Самара",
    locationRu: "Самара",
    locationEn: "Samara",
    experience: "от 1 года",
    experienceRu: "от 1 года",
    experienceEn: "1+ year",
    salary: "фикс + бонус",
    salaryRu: "фикс + бонус",
    salaryEn: "fixed pay + bonus",
    lead: "Для подбора материалов, мебели, света и поставщиков без случайных решений и сорванных сроков.",
    leadRu: "Для подбора материалов, мебели, света и поставщиков без случайных решений и сорванных сроков.",
    leadEn: "For selecting materials, furniture, lighting, and suppliers without random decisions or missed deadlines.",
    tasks: ["подбирать позиции под концепцию и бюджет", "вести таблицы, аналоги и статусы заказов", "коммуницировать с салонами, поставщиками и подрядчиками"],
    tasksRu: ["подбирать позиции под концепцию и бюджет", "вести таблицы, аналоги и статусы заказов", "коммуницировать с салонами, поставщиками и подрядчиками"],
    tasksEn: ["select items for the concept and budget", "maintain tables, alternatives, and order statuses", "communicate with showrooms, suppliers, and contractors"],
    requirements: ["знание рынка отделочных материалов и мебели", "внимание к артикулам, срокам и ценам", "умение предлагать аналоги без потери визуальной идеи"],
    requirementsRu: ["знание рынка отделочных материалов и мебели", "внимание к артикулам, срокам и ценам", "умение предлагать аналоги без потери визуальной идеи"],
    requirementsEn: ["knowledge of the finishing materials and furniture market", "attention to SKUs, timelines, and prices", "ability to suggest alternatives without losing the visual idea"],
    perks: ["живые проекты, а не абстрактные подборки", "контакт с дизайнерами и поставщиками", "гибкий формат занятости"],
    perksRu: ["живые проекты, а не абстрактные подборки", "контакт с дизайнерами и поставщиками", "гибкий формат занятости"],
    perksEn: ["real projects, not abstract selections", "contact with designers and suppliers", "flexible employment format"],
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=85",
  },
];

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#F5F2EC] outline-none transition placeholder:text-white/25 focus:border-[#D69A66]/60 focus:bg-white/[0.07]";

function localizedArray(
  locale: "ru" | "en",
  ru?: string[] | null,
  en?: string[] | null,
  fallback: string[] = [],
) {
  if (locale === "en") {
    return en?.length ? en : fallback;
  }

  return ru?.length ? ru : fallback;
}

function ApplyModal({ vacancy, onClose }: { vacancy: Vacancy | null; onClose: () => void }) {
  const { t } = useTranslation();
  const backdropRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!vacancy) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [vacancy, onClose]);

  useEffect(() => {
    if (!vacancy) return;
    setSent(false);
    setError("");
  }, [vacancy]);

  if (!vacancy) return null;

  const handleSubmit = () => {
    if (!name.trim() || !contact.trim()) {
      setError(t("career.requiredError"));
      return;
    }

    if (!agreed) {
      setError(t("career.agreeError"));
      return;
    }

    const payload = {
      source: "career-page",
      vacancyId: vacancy.id,
      vacancyTitle: vacancy.title,
      name: name.trim(),
      contact: contact.trim(),
      portfolio: portfolio.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("careerApplication", JSON.stringify(payload));
    setSent(true);
    setError("");
  };

  return (
    <div
      ref={backdropRef}
      onClick={(event) => event.target === backdropRef.current && onClose()}
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      style={{ background: "rgba(5,5,5,0.85)", backdropFilter: "blur(14px)" }}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] shadow-[0_40px_120px_rgba(0,0,0,0.75)]">
        <div className="pointer-events-none absolute -top-28 right-0 h-64 w-64 rounded-full bg-[#D69A66]/10 blur-3xl" />

        <div className="relative px-6 pb-4 pt-6 md:px-8">
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/35 transition hover:border-white/25 hover:text-white"
          >
            ×
          </button>
          <p className="mb-1 text-[10px] uppercase tracking-[0.4em] text-[#D69A66]">{t("career.applyTitle")}</p>
          <h2 className="pr-10 text-3xl font-light tracking-[-0.04em] text-[#F5F2EC]">{vacancy.title}</h2>
          <p className="mt-2 text-sm text-[#D6D1CA]">{vacancy.department} · {vacancy.format}</p>
        </div>

        <div className="mx-6 border-t border-white/8 md:mx-8" />

        <div className="grid gap-3 px-6 py-5 md:px-8">
          <div className="grid gap-3 md:grid-cols-2">
            <input className={inputCls} placeholder={t("career.namePlaceholder")} value={name} onChange={(event) => setName(event.target.value)} />
            <input className={inputCls} placeholder={t("career.contactPlaceholder")} value={contact} onChange={(event) => setContact(event.target.value)} />
          </div>
          <input className={inputCls} placeholder={t("career.portfolioPlaceholder")} value={portfolio} onChange={(event) => setPortfolio(event.target.value)} />
          <textarea
            className={`${inputCls} min-h-32 resize-none`}
            placeholder={t("career.messagePlaceholder")}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <label className="flex cursor-pointer items-start gap-3 pt-1">
            <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} className="mt-1 accent-[#D69A66]" />
            <span className="text-xs leading-relaxed text-white/40">
              {t("career.privacyPrefix")}{" "}
              <Link href="/politika-konfidencialnosti" target="_blank" className="text-[#D69A66]/70 underline underline-offset-2">
                {t("career.privacyLink")}
              </Link>{" "}
              {t("career.privacySuffix")}
            </span>
          </label>

          {error && <p className="rounded-2xl border border-[#D69A66]/25 bg-[#D69A66]/10 px-4 py-3 text-sm text-[#F5F2EC]">{error}</p>}
          {sent && (
            <p className="rounded-2xl border border-[#D69A66]/25 bg-[#D69A66]/10 px-4 py-3 text-sm text-[#F5F2EC]">
              {t("career.sent")}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="h-14 rounded-full bg-[#D69A66] px-7 text-sm font-medium uppercase tracking-[0.24em] text-[#050505] transition hover:bg-[#F5F2EC]"
          >
            {t("career.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}

function VacancyCard({
  vacancy,
  vacancies,
  onApply,
}: {
  vacancy: Vacancy;
  vacancies: Vacancy[];
  onApply: (vacancy: Vacancy) => void;
}) {
  const { t } = useTranslation();
  const currentIndex = Math.max(vacancies.findIndex((item) => item.id === vacancy.id), 0);

  return (
    <GlassPanel className="group overflow-hidden rounded-[2rem] transition duration-500 hover:-translate-y-1 hover:border-[#D69A66]/55 hover:shadow-[0_24px_90px_rgba(0,0,0,0.38)]">
      <div className="grid lg:grid-cols-[0.72fr_1fr]">
        <div className="relative min-h-72 overflow-hidden">
          <CinematicImage
            frames={[
              vacancy.image,
              vacancies[(currentIndex + 1) % vacancies.length]?.image,
              vacancies[(currentIndex + 2) % vacancies.length]?.image,
            ]}
            alt={vacancy.title}
            fill
            hint="role"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/88 via-[#050505]/28 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-[#D69A66]/40 bg-[#050505]/55 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#D69A66] backdrop-blur">
            {vacancy.department}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-5 flex flex-wrap gap-2 text-xs text-white/45">
            <span className="rounded-full border border-white/10 px-3 py-1">{vacancy.format}</span>
            <span className="rounded-full border border-white/10 px-3 py-1">{vacancy.location}</span>
            <span className="rounded-full border border-white/10 px-3 py-1">{vacancy.experience}</span>
          </div>
          <h2 className="text-4xl font-light leading-tight tracking-[-0.045em] text-[#F5F2EC]">{vacancy.title}</h2>
          <p className="mt-3 text-lg text-[#D69A66]">{vacancy.salary}</p>
          <p className="mt-5 max-w-2xl leading-relaxed text-[#D6D1CA]">{vacancy.lead}</p>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/35">{t("career.tasks")}</p>
              <ul className="space-y-2">
                {vacancy.tasks.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#D69A66]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/35">{t("career.important")}</p>
              <ul className="space-y-2">
                {vacancy.requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#D69A66]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {vacancy.perks.map((perk) => (
              <span key={perk} className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-white/45">
                {perk}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onApply(vacancy)}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#D69A66]/50 px-7 py-4 text-xs uppercase tracking-[0.24em] text-[#D69A66] transition hover:bg-[#D69A66] hover:text-[#050505]"
          >
            {t("career.apply")}
            <span>→</span>
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}

export default function CareerPage() {
  const { careerVacancies } = useCms();
  const { i18n, t } = useTranslation();
  const locale = siteLocaleFromLanguage(i18n.language);
  const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null);
  const departments = useMemo(
    () =>
      locale === "en"
        ? ["Interiors", "3D visualization", "Procurement", "Architecture", "Landscape"]
        : ["Интерьеры", "3D-визуализация", "Комплектация", "Архитектура", "Ландшафт"],
    [locale],
  );
  const vacancies = useMemo(() => {
    const source = careerVacancies.length
      ? careerVacancies.map((item, index) => {
          const fallback = fallbackVacancies[index % fallbackVacancies.length];

          return {
            id: item.id,
            title: localizedValue(locale, item.titleRu, item.titleEn, item.title),
            department: fallback.department,
            departmentRu: fallback.departmentRu,
            departmentEn: fallback.departmentEn,
            format: localizedValue(locale, item.employmentRu, item.employmentEn, item.employment ?? fallback.format),
            location: localizedValue(locale, item.locationRu, item.locationEn, item.location ?? fallback.location),
            experience: fallback.experience,
            experienceRu: fallback.experienceRu,
            experienceEn: fallback.experienceEn,
            salary: localizedValue(locale, item.salaryRu, item.salaryEn, item.salary ?? fallback.salary),
            lead: localizedValue(locale, item.descriptionRu, item.descriptionEn, item.description ?? fallback.lead),
            tasks: localizedArray(locale, item.responsibilitiesRu, item.responsibilitiesEn, item.responsibilities),
            requirements: localizedArray(locale, item.requirementsRu, item.requirementsEn, item.requirements),
            perks: localizedArray(locale, fallback.perksRu, fallback.perksEn, fallback.perks),
            image: fallback.image,
          };
        })
      : fallbackVacancies.map((item) => ({
          ...item,
          title: localizedValue(locale, item.titleRu, item.titleEn, item.title),
          department: localizedValue(locale, item.departmentRu, item.departmentEn, item.department),
          format: localizedValue(locale, item.formatRu, item.formatEn, item.format),
          location: localizedValue(locale, item.locationRu, item.locationEn, item.location),
          experience: localizedValue(locale, item.experienceRu, item.experienceEn, item.experience),
          salary: localizedValue(locale, item.salaryRu, item.salaryEn, item.salary),
          lead: localizedValue(locale, item.leadRu, item.leadEn, item.lead),
          tasks: localizedArray(locale, item.tasksRu, item.tasksEn, item.tasks),
          requirements: localizedArray(locale, item.requirementsRu, item.requirementsEn, item.requirements),
          perks: localizedArray(locale, item.perksRu, item.perksEn, item.perks),
        }));

    return source.filter((item) => item.title && item.lead);
  }, [careerVacancies, locale]);
  const defaultVacancy = vacancies[0] ?? null;

  return (
    <>
      <div className="page-in">
        <section className="relative min-h-screen overflow-hidden px-5 pb-16 pt-28 md:px-10 lg:px-16">
          <HeroBackdropSlider
            slides={[
              {
                image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=2200&q=90",
                alt: "Команда дизайн-студии за рабочим столом",
              },
              { image: vacancies[0]?.image ?? fallbackVacancies[0].image, alt: vacancies[0]?.title ?? fallbackVacancies[0].title },
              { image: vacancies[1]?.image ?? fallbackVacancies[1].image, alt: vacancies[1]?.title ?? fallbackVacancies[1].title },
            ]}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.96)_0%,rgba(5,5,5,.74)_48%,rgba(5,5,5,.24)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#050505_0%,rgba(5,5,5,.42)_34%,transparent_78%)]" />

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="pb-8">
              <p className="text-xs uppercase tracking-[0.38em] text-[#D69A66]">{t("career.heroEyebrow")}</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3rem,6.4vw,6.2rem)] font-light leading-[0.94] tracking-[-0.045em] text-white">
                {t("career.heroTitle")}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#E8E0D8]/85 md:text-xl">
                {t("career.heroText")}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#vacancies"
                  className="rounded-full border border-[#D69A66] bg-[#D69A66] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E3AD7B]"
                >
                  {t("career.viewVacancies")}
                </a>
                <button
                  type="button"
                  onClick={() => defaultVacancy && setActiveVacancy(defaultVacancy)}
                  disabled={!defaultVacancy}
                  className="rounded-full border border-white/15 bg-black/25 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/75 backdrop-blur transition duration-300 hover:border-[#D69A66]/70 hover:text-white"
                >
                  {t("career.sendResume")}
                </button>
              </div>
            </div>

            <div className="mb-8 grid gap-4">
              <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  ["5", t("career.openDirections")],
                  [locale === "en" ? "hybrid" : "гибрид", t("career.hybridWork")],
                  [locale === "en" ? "project" : "проектно", t("career.projectStart")],
                ].map(([value, label]) => (
                  <GlassPanel key={value} className="p-5">
                    <strong className="block text-3xl font-light tracking-[-0.04em] text-[#D69A66]">{value}</strong>
                    <span className="mt-3 block text-xs uppercase leading-relaxed tracking-[0.18em] text-[#D6D1CA]">{label}</span>
                  </GlassPanel>
                ))}
              </div>

              <GlassPanel className="rounded-[2rem] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[#D69A66]">{t("career.whoWeNeed")}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {departments.map((department) => (
                    <span key={department} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/60">
                      {department}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </div>
        </section>

        <section id="vacancies" className="px-5 py-24 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
              <div>
                <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#D69A66]">{t("career.openPositions")}</p>
                <h2 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.055em] md:text-7xl">
                  {t("career.sectionTitle")}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-[#D6D1CA]">
                {t("career.sectionText")}
              </p>
            </div>

            <div className="grid gap-5">
              {vacancies.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} vacancies={vacancies} onApply={setActiveVacancy} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-5 py-24 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <GlassPanel className="overflow-hidden rounded-[2.5rem] p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
                <div>
                  <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#D69A66]">{t("career.noRole")}</p>
                  <h2 className="max-w-3xl text-5xl font-light leading-tight tracking-[-0.055em] md:text-7xl">
                    {t("career.noRoleTitle")}
                  </h2>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-[#D6D1CA]">
                    {t("career.noRoleText")}
                  </p>
                  <button
                    type="button"
                    onClick={() => defaultVacancy && setActiveVacancy(defaultVacancy)}
                    disabled={!defaultVacancy}
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#D69A66] px-8 py-4 text-sm uppercase tracking-[0.24em] text-[#050505] transition hover:bg-[#F5F2EC]"
                  >
                    {t("career.submit")}
                    <span>→</span>
                  </button>
                </div>
              </div>
            </GlassPanel>
          </div>
        </section>
      </div>

      <ApplyModal vacancy={activeVacancy} onClose={() => setActiveVacancy(null)} />
    </>
  );
}

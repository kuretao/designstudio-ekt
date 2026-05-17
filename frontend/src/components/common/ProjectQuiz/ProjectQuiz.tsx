"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { submitLead, useCms } from "@/src/cms";
import { GlassPanel } from "@/src/ui";
import SectionLabel from "@/src/components/common/SectionLabel";

type QuizOption = {
  label: string;
  note?: string;
  minArea?: number;
  maxArea?: number;
  pricePerMeter?: number;
  fixedPrice?: number;
  timeline?: string;
  visual?: "modern" | "classic" | "loft" | "eco" | "consult";
};

type QuizQuestion = {
  id: string;
  title: string;
  goal: string;
  options: QuizOption[];
};

type Answers = Record<string, QuizOption>;

const questions: QuizQuestion[] = [
  {
    id: "object",
    title: "Тип объекта",
    goal: "Поможет понять масштаб и специфику проекта.",
    options: [
      { label: "Квартира в новостройке", note: "Чистый старт и гибкая планировка" },
      { label: "Квартира во вторичном жилье", note: "Учитываем демонтаж и существующие узлы" },
      { label: "Частный дом / коттедж", note: "Интерьер, архитектура и участок в одной логике" },
      { label: "Коммерческое помещение", note: "Офис, кафе, шоурум или другое пространство" },
      { label: "Только отдельная зона", note: "Кухня, гостиная, спальня или кабинет" },
    ],
  },
  {
    id: "area",
    title: "Площадь объекта",
    goal: "Нужна для первичного расчета стоимости.",
    options: [
      { label: "До 50 м²", minArea: 35, maxArea: 50 },
      { label: "50-100 м²", minArea: 50, maxArea: 100 },
      { label: "100-200 м²", minArea: 100, maxArea: 200 },
      { label: "Более 200 м²", minArea: 200, maxArea: 320 },
    ],
  },
  {
    id: "scope",
    title: "Какой объем услуг вам необходим?",
    goal: "Поймем, нужен полный цикл или отдельный этап.",
    options: [
      {
        label: "Полный дизайн-проект",
        note: "Чертежи, 3D-визуализация и комплектация",
        pricePerMeter: 1500,
        timeline: "8-14 недель",
      },
      {
        label: "Только 3D-визуализация",
        note: "Когда планировка и ТЗ уже готовы",
        fixedPrice: 45000,
        timeline: "от 5 рабочих дней",
      },
      {
        label: "Архитектурное проектирование",
        note: "Для строительства дома с нуля",
        pricePerMeter: 1800,
        timeline: "10-18 недель",
      },
      {
        label: "Удаленное проектирование",
        note: "Если объект находится в другом городе",
        pricePerMeter: 1300,
        timeline: "6-12 недель",
      },
    ],
  },
  {
    id: "style",
    title: "В каком стиле вы видите будущий интерьер?",
    goal: "Так дизайнер быстрее поймет визуальное направление.",
    options: [
      { label: "Современный", note: "Минимализм, контемпорари", visual: "modern" },
      { label: "Неоклассика", note: "Элегантность и мягкий уют", visual: "classic" },
      { label: "Лофт / индустриальный", note: "Фактура, металл, выразительная геометрия", visual: "loft" },
      { label: "Скандинавский / эко", note: "Свет, воздух, натуральные материалы", visual: "eco" },
      { label: "Пока не определился", note: "Нужна консультация дизайнера", visual: "consult" },
    ],
  },
  {
    id: "start",
    title: "Когда планируете приступать к реализации?",
    goal: "Оценим приоритет и ближайшие свободные окна команды.",
    options: [
      { label: "Срочно", note: "Нужно было вчера" },
      { label: "В ближайший месяц" },
      { label: "В течение 3-6 месяцев" },
      { label: "Пока просто прицениваюсь" },
    ],
  },
];

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#F5F2EC] outline-none transition placeholder:text-white/25 focus:border-[#D69A66]/60 focus:bg-white/[0.07]";

const formatRub = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);

function StylePreview({ type }: { type?: QuizOption["visual"] }) {
  if (!type) return null;

  const previewClass = {
    modern: "from-[#F5F2EC] via-[#8A9186] to-[#15130f]",
    classic: "from-[#E8DDCE] via-[#D69A66] to-[#5E5142]",
    loft: "from-[#2D2A25] via-[#8F6A4B] to-[#111111]",
    eco: "from-[#F5F2EC] via-[#75816D] to-[#2E3A2D]",
    consult: "from-[#D69A66] via-[#F5F2EC] to-[#171511]",
  }[type];

  return (
    <span className={`relative h-10 w-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${previewClass}`}>
      <span className="absolute left-2 top-2 h-2 w-8 rounded-full bg-black/20" />
      <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border border-white/50" />
    </span>
  );
}

function buildMockEstimate(answers: Answers) {
  const area = answers.area;
  const scope = answers.scope;
  const minArea = area?.minArea ?? 50;
  const maxArea = area?.maxArea ?? 100;
  const pricePerMeter = scope?.pricePerMeter ?? 1200;
  const min = scope?.fixedPrice ?? Math.round(minArea * pricePerMeter);
  const max = scope?.fixedPrice ? scope.fixedPrice * 2 : Math.round(maxArea * pricePerMeter);

  return {
    price: `${formatRub(min)} - ${formatRub(max)}`,
    timeline: scope?.timeline ?? "3-12 недель",
  };
}

export default function ProjectQuiz() {
  const { messengerLinks } = useCms();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [submittedTo, setSubmittedTo] = useState<string | null>(null);
  const [showContactError, setShowContactError] = useState(false);

  const currentQuestion = questions[step];
  const isContactStep = step >= questions.length;
  const estimate = useMemo(() => buildMockEstimate(answers), [answers]);
  const progress = Math.round((Math.min(step, questions.length) / questions.length) * 100);

  const selectOption = (option: QuizOption) => {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: option }));
    setStep((current) => Math.min(current + 1, questions.length));
  };

  const submitMockLead = async (channel: "MAX" | "Telegram") => {
    if (!contact.trim() || !agreed) {
      setShowContactError(true);
      return;
    }

    const payload = {
      source: "project-cost-quiz",
      channel,
      name: name.trim(),
      contact: contact.trim(),
      answers: Object.fromEntries(Object.entries(answers).map(([key, value]) => [key, value.label])),
      estimate,
      createdAt: new Date().toISOString(),
    };

    await submitLead({
      source: "project-cost-quiz",
      channel,
      name: name.trim(),
      contact: contact.trim(),
      payload,
    });

    localStorage.setItem("projectQuizLead", JSON.stringify(payload));
    setSubmittedTo(channel);
    setShowContactError(false);
    window.open(channel === "Telegram" ? messengerLinks.telegram : messengerLinks.max, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="project-quiz" className="border-t border-white/10 px-5 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Project quiz</SectionLabel>

        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <h2 className="max-w-5xl text-5xl font-light tracking-[-0.055em] md:text-7xl">
              Рассчитайте точную стоимость и сроки вашего проекта за 1 минуту
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#D6D1CA]">
              Ответьте на 5 вопросов, и мы подготовим персональное предложение. Бонусом отправим PDF-чек-лист
              «Подготовка к ремонту: с чего начать».
            </p>
          </div>

          <GlassPanel className="rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[#D69A66]">Предварительный ориентир</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <div>
                <span className="block text-sm text-white/35">Стоимость</span>
                <strong className="mt-1 block text-2xl font-light tracking-[-0.04em] text-[#F5F2EC]">{estimate.price}</strong>
              </div>
              <div>
                <span className="block text-sm text-white/35">Сроки</span>
                <strong className="mt-1 block text-2xl font-light tracking-[-0.04em] text-[#F5F2EC]">{estimate.timeline}</strong>
              </div>
            </div>
          </GlassPanel>
        </div>

        <GlassPanel className="overflow-hidden rounded-[2rem]">
          <div className="grid min-h-[620px] lg:grid-cols-[0.42fr_0.58fr]">
            <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 bg-[#0c0b09]/65 p-7 md:p-9 lg:border-b-0 lg:border-r">
              <img
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85"
                alt="Интерьер с мягким светом и натуральными материалами"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c0b09]/95 via-[#0c0b09]/76 to-[#2A3028]/58" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/35">
                  <span>{isContactStep ? "Финал" : `Вопрос ${step + 1} из ${questions.length}`}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#D69A66] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>

                <div className="mt-10 space-y-3">
                  {questions.map((question, index) => (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => setStep(index)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        index === step
                          ? "border-[#D69A66]/55 bg-[#D69A66]/10 text-[#F5F2EC]"
                          : answers[question.id]
                          ? "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/20"
                          : "border-white/8 bg-black/10 text-white/30"
                      }`}
                    >
                      <span className="pr-3">{question.title}</span>
                      <span className="text-[#D69A66]">{answers[question.id] ? "✓" : `0${index + 1}`}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="relative z-10 mt-10 text-sm leading-relaxed text-[#D6D1CA]/75">
                Сейчас работает моковая логика: ответы сохраняются в браузере и выводятся в консоль. Позже этот payload можно отправить на backend без изменения интерфейса.
              </p>
            </div>

            <div className="flex flex-col justify-between p-7 md:p-9">
              {!isContactStep ? (
                <>
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.32em] text-[#D69A66]">{currentQuestion.goal}</p>
                    <h3 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.045em] text-[#F5F2EC] md:text-5xl">
                      {currentQuestion.title}
                    </h3>
                  </div>

                  <div className="mt-10 grid gap-3">
                    {currentQuestion.options.map((option) => {
                      const selected = answers[currentQuestion.id]?.label === option.label;

                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => selectOption(option)}
                          className={`group flex min-h-20 items-center gap-4 rounded-2xl border p-4 text-left transition duration-300 ${
                            selected
                              ? "border-[#D69A66]/70 bg-[#D69A66]/12"
                              : "border-white/10 bg-white/[0.025] hover:-translate-y-0.5 hover:border-[#D69A66]/45 hover:bg-white/[0.05]"
                          }`}
                        >
                          <StylePreview type={option.visual} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-lg font-light leading-tight text-[#F5F2EC]">{option.label}</span>
                            {option.note && <span className="mt-1 block text-sm leading-relaxed text-[#D6D1CA]/65">{option.note}</span>}
                          </span>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm text-[#D69A66] transition group-hover:border-[#D69A66]/50">
                            {selected ? "✓" : "→"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep((current) => Math.max(current - 1, 0))}
                      disabled={step === 0}
                      className="rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.22em] text-white/55 transition hover:border-white/25 hover:text-white disabled:pointer-events-none disabled:opacity-35"
                    >
                      Назад
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(questions.length)}
                      disabled={Object.keys(answers).length < questions.length}
                      className="rounded-full border border-[#D69A66]/40 px-5 py-3 text-xs uppercase tracking-[0.22em] text-[#D69A66] transition hover:bg-[#D69A66] hover:text-[#050505] disabled:pointer-events-none disabled:opacity-35"
                    >
                      К расчету
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex min-h-full flex-col justify-between">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.32em] text-[#D69A66]">Спасибо! Мы уже начали расчет вашего проекта.</p>
                    <h3 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.045em] text-[#F5F2EC] md:text-5xl">
                      Укажите, куда прислать расчет и ваш бонус
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#D6D1CA]">
                      Оставьте контакт, а мы подготовим персональное предложение и PDF-чек-лист по старту ремонта.
                    </p>
                  </div>

                  <div className="mt-10 grid gap-3">
                    <input className={inputCls} placeholder="Ваше имя" value={name} onChange={(event) => setName(event.target.value)} />
                    <input
                      className={inputCls}
                      placeholder="Телефон, e-mail или @username"
                      value={contact}
                      onChange={(event) => {
                        setContact(event.target.value);
                        setShowContactError(false);
                      }}
                    />
                    {showContactError && (
                      <p className="text-sm text-[#D69A66]">
                        Добавьте контакт и подтвердите согласие, чтобы мы знали, куда отправить расчет.
                      </p>
                    )}

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => submitMockLead("MAX")}
                        className="rounded-2xl border border-[#D69A66]/45 bg-[#D69A66] px-5 py-4 text-sm font-medium uppercase tracking-[0.16em] text-[#050505] transition hover:bg-[#F5F2EC]"
                      >
                        Получить расчет в MAX
                      </button>
                      <button
                        type="button"
                        onClick={() => submitMockLead("Telegram")}
                        className="rounded-2xl border border-[#D69A66]/45 bg-white/[0.04] px-5 py-4 text-sm font-medium uppercase tracking-[0.16em] text-[#D69A66] transition hover:bg-[#D69A66] hover:text-[#050505]"
                      >
                        Получить расчет в Telegram
                      </button>
                    </div>

                    <label className="mt-3 flex cursor-pointer items-start gap-3">
                      <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} className="mt-1 accent-[#D69A66]" />
                      <span className="text-xs leading-relaxed text-white/40">
                        Я ознакомился(-ась) с{" "}
                        <Link href="/user/agreement" target="_blank" className="text-[#D69A66]/70 underline underline-offset-2">
                          пользовательским соглашением
                        </Link>{" "}
                        и{" "}
                        <Link href="/politika-konfidencialnosti" target="_blank" className="text-[#D69A66]/70 underline underline-offset-2">
                          политикой конфиденциальности
                        </Link>
                        .
                      </span>
                    </label>
                    {submittedTo && (
                      <p className="rounded-2xl border border-[#D69A66]/25 bg-[#D69A66]/10 px-4 py-3 text-sm text-[#F5F2EC]">
                        Мок-заявка сохранена. Канал: {submittedTo}. Payload уже готов для подключения backend.
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(questions.length - 1)}
                      className="rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.22em] text-white/55 transition hover:border-white/25 hover:text-white"
                    >
                      Назад
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAnswers({});
                        setName("");
                        setContact("");
                        setSubmittedTo(null);
                        setStep(0);
                      }}
                      className="rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.22em] text-white/55 transition hover:border-white/25 hover:text-white"
                    >
                      Пройти заново
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { messengerLinks } from "../data";

type Props = {
  open: boolean;
  onClose: () => void;
  promoTitle?: string;
};

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const ViberIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M11.398.002C8.29.064 1.889 1.336.342 7.649c-.538 2.123-.598 4.373-.161 6.539.667 3.329 3.109 5.581 6.039 6.573v2.751a.487.487 0 0 0 .833.344l2.812-2.93a17.23 17.23 0 0 0 2.124.132c.305 0 .61-.009.917-.025 4.358-.237 8.08-2.434 9.011-6.766.742-3.482.253-8.876-4.08-12.174C15.877.812 13.617-.047 11.398.002zm.127 1.933c1.894-.042 3.827.683 5.459 1.878 3.659 2.713 4.091 7.362 3.45 10.37-.723 3.407-3.698 5.175-7.412 5.376a15.534 15.534 0 0 1-.875.024c-.728 0-1.447-.068-2.156-.188a.483.483 0 0 0-.383.1L7.554 21.47v-2.062a.485.485 0 0 0-.335-.463c-2.778-.815-4.755-2.672-5.286-5.335-.378-1.887-.322-3.84.163-5.695C3.33 3.127 8.558 2.003 11.525 1.935zm2.025 3.246a.484.484 0 0 0-.048.966c2.317.115 3.466 1.274 3.559 3.546a.484.484 0 0 0 .967-.038c-.112-2.748-1.636-4.337-4.478-4.474zm-4.198.686c-.22-.01-.45.07-.61.245-.282.309-.256.575-.212.86.25 1.632.982 3.12 2.038 4.175.954.954 2.249 1.63 3.674 1.9l.099.016c.246.033.524-.052.708-.273.284-.344.277-.623.213-.91a.47.47 0 0 0-.105-.202l-1.235-1.378c-.241-.268-.617-.32-.912-.124l-.617.408c-.19.126-.44.118-.622-.022-.613-.47-1.102-.993-1.452-1.61-.145-.252-.14-.558.012-.796l.393-.585a.68.68 0 0 0-.023-.824L10.1 6.112a.6.6 0 0 0-.748-.243zm4.615 1.405a.484.484 0 0 0-.066.963c.73.054 1.136.464 1.178 1.185a.484.484 0 0 0 .966-.059c-.068-1.19-.796-1.999-2.078-2.089z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#f3efe7] outline-none transition placeholder:text-white/25 focus:border-[#d7c4a1]/60 focus:bg-white/[0.07]";

export default function ContactModal({ open, onClose, promoTitle }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [agreed, setAgreed] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Build pre-filled message for messengers
  const buildMsg = (label: string) => {
    const parts = [`Привет! Пишу через сайт 3D Smart Design.`];
    if (name.trim()) parts.push(`Меня зовут ${name.trim()}.`);
    if (contact.trim()) parts.push(`Мои контакты: ${contact.trim()}.`);
    if (promoTitle) parts.push(`Интересует акция: «${promoTitle}».`);
    return encodeURIComponent(parts.join(" "));
  };

  const messengerHrefs = {
    telegram: `https://t.me/+79879421242`,
    whatsapp: `https://wa.me/79879421242?text=${buildMsg("WhatsApp")}`,
    viber: `viber://chat?number=%2B79879421242`,
  };

  const messengers = [
    {
      key: "telegram" as const,
      label: "Telegram",
      color: "from-[#229ED9]/20 to-[#229ED9]/5 border-[#229ED9]/30 hover:border-[#229ED9]/70",
      accent: "text-[#229ED9]",
      glow: "hover:shadow-[0_8px_40px_rgba(34,158,217,0.25)]",
      icon: <TelegramIcon />,
    },
    {
      key: "whatsapp" as const,
      label: "WhatsApp",
      color: "from-[#25D366]/20 to-[#25D366]/5 border-[#25D366]/30 hover:border-[#25D366]/70",
      accent: "text-[#25D366]",
      glow: "hover:shadow-[0_8px_40px_rgba(37,211,102,0.25)]",
      icon: <WhatsAppIcon />,
    },
    {
      key: "viber" as const,
      label: "Viber",
      color: "from-[#7360F2]/20 to-[#7360F2]/5 border-[#7360F2]/30 hover:border-[#7360F2]/70",
      accent: "text-[#7360F2]",
      glow: "hover:shadow-[0_8px_40px_rgba(115,96,242,0.25)]",
      icon: <ViberIcon />,
    },
  ];

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && onClose()}
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      style={{ background: "rgba(13,13,11,0.85)", backdropFilter: "blur(14px)" }}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#111110]"
        style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(215,196,161,0.07)" }}
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-[#d7c4a1]/8 blur-3xl" />

        {/* Header */}
        <div className="relative px-6 pb-4 pt-6">
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/35 transition hover:border-white/25 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p className="mb-1 text-[10px] uppercase tracking-[0.4em] text-[#d7c4a1]">Связаться с нами</p>
          <h2 className="text-2xl font-light tracking-[-0.035em] text-[#f3efe7]">
            {promoTitle ? "Записаться на акцию" : "Напишите нам"}
          </h2>
          {promoTitle && (
            <p className="mt-1.5 text-sm text-[#d8d1c4]">«{promoTitle}»</p>
          )}
        </div>

        <div className="mx-6 border-t border-white/8" />

        {/* Messengers — horizontal row */}
        <div className="px-6 pt-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/30">Написать в мессенджере</p>
          <div className="grid grid-cols-4 gap-2">
            {messengers.map((m) => (
              <a
                key={m.key}
                href={messengerHrefs[m.key]}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-2 rounded-2xl border bg-gradient-to-b px-2 py-3.5 transition duration-300 ${m.color} ${m.glow} ${!agreed ? "pointer-events-none opacity-40" : ""}`}
                tabIndex={agreed ? 0 : -1}
              >
                <span className={`transition duration-300 group-hover:scale-110 ${m.accent}`}>{m.icon}</span>
                <p className={`text-[10px] font-medium leading-none ${m.accent}`}>{m.label}</p>
              </a>
            ))}
            <a
              href={messengerLinks.phoneHref}
              className={`group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-2 py-3.5 transition duration-300 hover:border-white/25 hover:bg-white/[0.07] ${!agreed ? "pointer-events-none opacity-40" : ""}`}
            >
              <span className="text-[#d7c4a1] transition duration-300 group-hover:scale-110"><PhoneIcon /></span>
              <p className="text-[10px] font-medium leading-none text-white/50 group-hover:text-white/75">Звонок</p>
            </a>
          </div>
        </div>

        <div className="mx-6 mt-4 border-t border-white/8" />

        {/* Form fields */}
        <div className="space-y-2.5 px-6 pt-4">
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
          <input
            type="text"
            placeholder="Телефон или e-mail"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={inputCls}
          />
          <button
            disabled={!agreed}
            onClick={() => {
              const subject = encodeURIComponent(promoTitle ? `Запись на акцию: ${promoTitle}` : "Заявка с сайта 3D Smart Design");
              const body = encodeURIComponent(
                [
                  name.trim() ? `Имя: ${name.trim()}` : "",
                  contact.trim() ? `Контакт: ${contact.trim()}` : "",
                  promoTitle ? `Акция: ${promoTitle}` : "",
                ]
                  .filter(Boolean)
                  .join("\n")
              );
              window.location.href = `mailto:3dsmartdesign@bk.ru?subject=${subject}&body=${body}`;
            }}
            className={`w-full rounded-2xl py-3.5 text-sm font-medium tracking-[0.06em] transition duration-300 ${
              agreed
                ? "bg-[#d7c4a1] text-[#0d0d0b] hover:bg-[#f3efe7] hover:shadow-[0_0_32px_rgba(215,196,161,0.3)]"
                : "cursor-not-allowed bg-white/5 text-white/20"
            }`}
          >
            Отправить заявку
          </button>
        </div>

        {/* Consent checkbox */}
        <div className="px-6 pb-2 pt-4">
          <label className="flex cursor-pointer items-start gap-3">
            <div className="relative mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer sr-only"
              />
              <div className={`h-4 w-4 rounded border transition duration-200 ${agreed ? "border-[#d7c4a1] bg-[#d7c4a1]" : "border-white/25 bg-white/5"}`}>
                {agreed && (
                  <svg viewBox="0 0 12 12" fill="none" className="h-4 w-4 p-0.5">
                    <path d="M2 6l3 3 5-5" stroke="#0d0d0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs leading-relaxed text-white/40">
              Я ознакомился(-ась) с{" "}
              <Link
                href="/user/agreement"
                target="_blank"
                className="text-[#d7c4a1]/70 underline underline-offset-2 transition hover:text-[#d7c4a1]"
                onClick={(e) => e.stopPropagation()}
              >
                пользовательским соглашением
              </Link>{" "}
              и{" "}
              <Link
                href="/politika-konfidencialnosti"
                target="_blank"
                className="text-[#d7c4a1]/70 underline underline-offset-2 transition hover:text-[#d7c4a1]"
                onClick={(e) => e.stopPropagation()}
              >
                политикой конфиденциальности
              </Link>{" "}
              и даю согласие на обработку персональных данных.
            </span>
          </label>
        </div>

        <p className="px-6 pb-5 pt-3 text-center text-[11px] text-white/20">
          Отвечаем в течение рабочего дня · Пн–Пт 9:00–20:00
        </p>
      </div>
    </div>
  );
}

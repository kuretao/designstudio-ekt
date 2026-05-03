"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { messengerLinks } from "@/src/data";

type Props = {
  open: boolean;
  onClose: () => void;
  promoTitle?: string;
};

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#F5F2EC] outline-none transition placeholder:text-white/25 focus:border-[#C58351]/60 focus:bg-white/[0.07]";

export default function ContactModal({ open, onClose, promoTitle }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [agreed, setAgreed] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const message = encodeURIComponent(
    [
      "Привет! Пишу через сайт 3D Smart Design.",
      name.trim() ? `Меня зовут ${name.trim()}.` : "",
      contact.trim() ? `Мои контакты: ${contact.trim()}.` : "",
      promoTitle ? `Интересует акция: ${promoTitle}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
  );

  const messengerItems = [
    { label: "Telegram", href: messengerLinks.telegram, color: "border-[#C58351]/35 text-[#C58351]" },
    { label: "WhatsApp", href: `${messengerLinks.whatsapp}?text=${message}`, color: "border-[#C58351]/35 text-[#C58351]" },
    { label: "Viber", href: messengerLinks.viber, color: "border-[#C58351]/35 text-[#C58351]" },
    { label: "Звонок", href: messengerLinks.phoneHref, color: "border-[#C58351]/35 text-[#C58351]" },
  ];

  return (
    <div
      ref={backdropRef}
      onClick={(event) => event.target === backdropRef.current && onClose()}
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      style={{ background: "rgba(5,5,5,0.85)", backdropFilter: "blur(14px)" }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] shadow-[0_40px_120px_rgba(0,0,0,0.75)]">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-[#C58351]/10 blur-3xl" />

        <div className="relative px-6 pb-4 pt-6">
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/35 transition hover:border-white/25 hover:text-white"
          >
            ×
          </button>
          <p className="mb-1 text-[10px] uppercase tracking-[0.4em] text-[#C58351]">Связаться с нами</p>
          <h2 className="text-2xl font-light tracking-[-0.035em] text-[#F5F2EC]">
            {promoTitle ? "Записаться на акцию" : "Напишите нам"}
          </h2>
          {promoTitle && <p className="mt-1.5 text-sm text-[#D6D1CA]">«{promoTitle}»</p>}
        </div>

        <div className="mx-6 border-t border-white/8" />

        <div className="px-6 pt-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/30">Написать в мессенджере</p>
          <div className="grid grid-cols-4 gap-2">
            {messengerItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`rounded-2xl border bg-white/[0.03] px-2 py-3.5 text-center text-[10px] font-medium transition hover:bg-white/[0.07] ${item.color} ${!agreed ? "pointer-events-none opacity-40" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mx-6 mt-4 border-t border-white/8" />

        <div className="space-y-2.5 px-6 pt-4">
          <input type="text" placeholder="Ваше имя" value={name} onChange={(event) => setName(event.target.value)} className={inputCls} />
          <input type="text" placeholder="Телефон или e-mail" value={contact} onChange={(event) => setContact(event.target.value)} className={inputCls} />
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
                  .join("\n"),
              );
              window.location.href = `mailto:3dsmartdesign@bk.ru?subject=${subject}&body=${body}`;
            }}
            className={`w-full rounded-2xl py-3.5 text-sm font-medium tracking-[0.06em] transition duration-300 ${
              agreed ? "bg-[#C58351] text-[#050505] hover:bg-[#F5F2EC]" : "cursor-not-allowed bg-white/5 text-white/20"
            }`}
          >
            Отправить заявку
          </button>
        </div>

        <div className="px-6 pb-2 pt-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} className="mt-1 accent-[#C58351]" />
            <span className="text-xs leading-relaxed text-white/40">
              Я ознакомился(-ась) с{" "}
              <Link href="/user/agreement" target="_blank" className="text-[#C58351]/70 underline underline-offset-2">
                пользовательским соглашением
              </Link>{" "}
              и{" "}
              <Link href="/politika-konfidencialnosti" target="_blank" className="text-[#C58351]/70 underline underline-offset-2">
                политикой конфиденциальности
              </Link>
              .
            </span>
          </label>
        </div>

        <p className="px-6 pb-5 pt-3 text-center text-[11px] text-white/20">
          Отвечаем в течение рабочего дня · Пн-Пт 9:00-20:00
        </p>
      </div>
    </div>
  );
}

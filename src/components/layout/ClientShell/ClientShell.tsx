"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { messengerLinks } from "@/src/data";
import { GlobalStyle, Noise } from "@/src/ui";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/akcii-i-skidki": "Акции",
  "/blog": "Блог",
  "/kontakty": "Контакты",
  "/novosti": "Новости",
  "/o-nas": "О нас",
  "/otzyvy-o-nas": "Отзывы",
  "/politika-konfidencialnosti": "Политика",
  "/portfolio": "Портфолио",
  "/services": "Услуги",
  "/user/agreement": "Соглашение",
};

const floatingMessengers = [
  {
    label: "MAX",
    icon: "max",
    href: messengerLinks.max,
  },
  {
    label: "TG",
    icon: "telegram",
    href: messengerLinks.telegram,
  },
];

function getRouteLabel(path: string) {
  if (routeLabels[path]) return routeLabels[path];
  if (path.startsWith("/novosti/")) return "Новости";

  const slug = path.split("/").filter(Boolean).at(-1);
  if (!slug) return "Home";

  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function MessengerIcon({ icon }: { icon: string }) {
  if (icon === "telegram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M20.2 4.8 3.9 11.1c-1.1.44-1.1 1.05-.2 1.33l4.18 1.3 1.6 4.9c.2.56.1.78.68.78.44 0 .64-.2.9-.44l2.16-2.1 4.5 3.32c.82.45 1.42.22 1.63-.76l2.95-13.9c.3-1.2-.45-1.74-1.78-1.23Z"
          fill="currentColor"
        />
        <path d="m8.08 13.48 9.68-6.1c.45-.28.86-.13.52.17l-8.28 7.48-.32 3.42" stroke="#050505" strokeOpacity="0.5" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M5.2 15.8V8.2c0-1.55 1.72-2.48 3-1.62l3.8 2.55 3.8-2.55c1.28-.86 3 .07 3 1.62v7.6c0 1.55-1.72 2.48-3 1.62L12 14.87l-3.8 2.55c-1.28.86-3-.07-3-1.62Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.15 9.55 12 12.1l3.85-2.55M8.15 14.45 12 11.9l3.85 2.55" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
    </svg>
  );
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const previousPathRef = useRef<string | null>(null);
  const [backLabel, setBackLabel] = useState("Home");
  const pathname = usePathname();
  const router = useRouter();
  const showBackHome = pathname !== "/";

  const goBackHome = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  useEffect(() => {
    const storedPreviousPath = window.sessionStorage.getItem("previousPath");
    if (storedPreviousPath && storedPreviousPath !== pathname) {
      setBackLabel(getRouteLabel(storedPreviousPath));
    }

    const previousPath = previousPathRef.current;
    if (previousPath && previousPath !== pathname) {
      window.sessionStorage.setItem("previousPath", previousPath);
      setBackLabel(getRouteLabel(previousPath));
    }

    previousPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion || coarsePointer || window.innerWidth < 900) return;

    let targetScroll = window.scrollY;
    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const syncTarget = () => {
      targetScroll = window.scrollY;
    };

    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        document.body.style.overflow === "hidden" ||
        target?.closest("[data-native-scroll], textarea, input, select, [role='dialog']")
      ) {
        return;
      }

      event.preventDefault();
      const delta = event.deltaMode === 1 ? event.deltaY * 32 : event.deltaY;
      targetScroll = gsap.utils.clamp(0, maxScroll(), targetScroll + delta);

      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 0.05,
        ease: "power1.out",
        overwrite: "auto",
        onUpdate: ScrollTrigger.update,
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", syncTarget, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", syncTarget);
    };
  }, []);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(pointer: fine)").matches;

      ScrollTrigger.refresh();

      gsap.set(".motion-progress", { scaleX: 0, transformOrigin: "left center" });
      gsap.to(".motion-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: () => ScrollTrigger.maxScroll(window),
          scrub: 0.2,
        },
      });

      if (reducedMotion) return;

      gsap
        .timeline({ defaults: { ease: "expo.inOut" } })
        .set(".motion-curtain", { autoAlpha: 1, scaleX: 1, transformOrigin: "center" })
        .to(".motion-curtain", { autoAlpha: 0, scaleX: 0, duration: 1.1 });

      gsap.fromTo(
        "header",
        { y: -18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.22, ease: "power3.out" },
      );

      const revealTargets = gsap.utils.toArray<HTMLElement>(
        ".section-in, .grid-card, .review-card, .page-in section > div, footer .grid > div",
      );

      gsap.set(revealTargets, { autoAlpha: 0, y: 48, clipPath: "inset(12% 0 0 0)" });
      ScrollTrigger.batch(revealTargets, {
        start: "top 86%",
        once: true,
        interval: 0.08,
        batchMax: 8,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform,clipPath",
          });
        },
      });

      if (pathname !== "/") {
        gsap.fromTo(
          ".page-in",
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.9, delay: 0.16, ease: "power3.out", clearProps: "opacity,visibility,transform" },
        );
      }

      if (pathname === "/") {
        gsap
          .timeline()
          .fromTo(
            ".hero-video",
            { scale: 1.16, filter: "brightness(0.62) contrast(1.15) saturate(0.9)" },
            { scale: 1, filter: "brightness(0.78) contrast(1.06) saturate(0.95)", duration: 1.8, ease: "expo.out" },
            0,
          )
          .from(
            ".hero-reveal",
            {
              y: 110,
              autoAlpha: 0,
              clipPath: "inset(0 0 100% 0)",
              duration: 1.25,
              stagger: 0.13,
              ease: "expo.out",
              clearProps: "opacity,visibility,transform,clipPath",
            },
            0.24,
          )
          .fromTo(
            ".hero-copper-line",
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 1.05, ease: "power4.out" },
            0.82,
          );

        gsap.to(".hero-video", {
          scale: 1.08,
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        const storyWords = gsap.utils.toArray<HTMLElement>(".story-word");
        gsap.set(storyWords, { opacity: 0.22, y: 14, color: "rgba(245,242,236,0.42)" });
        gsap.to(storyWords, {
          opacity: 1,
          y: 0,
          color: "#F5F2EC",
          stagger: 0.035,
          ease: "none",
          scrollTrigger: {
            trigger: ".story-section",
            start: "top center",
            end: "bottom center",
            scrub: 0.8,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".project-bg, .parallax-media").forEach((media) => {
        gsap.to(media, {
          scale: 1.12,
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: media.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      if (finePointer) {
        const cursor = mainRef.current?.querySelector<HTMLElement>(".motion-cursor");
        const cursorCore = mainRef.current?.querySelector<HTMLElement>(".motion-cursor-core");

        if (cursor && cursorCore) {
          gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
          const moveX = gsap.quickTo(cursor, "x", { duration: 0.36, ease: "power3.out" });
          const moveY = gsap.quickTo(cursor, "y", { duration: 0.36, ease: "power3.out" });

          const onMove = (event: PointerEvent) => {
            moveX(event.clientX);
            moveY(event.clientY);
            gsap.to(cursor, { autoAlpha: 1, duration: 0.05 });
          };
          const onEnter = (event: PointerEvent) => {
            if ((event.target as HTMLElement | null)?.closest("a, button, [role='button']")) {
              gsap.to(cursorCore, { scale: 1.3, borderColor: "rgba(252, 252, 252, 0.66)", backgroundColor: "rgba(255, 255, 255, 0.18)", duration: 0.16, ease: "power2.out" });
            }
          };
          const onLeave = () => {
            gsap.to(cursorCore, { scale: 1, borderColor: "rgba(255, 255, 255, 0.5)", backgroundColor: "rgba(255, 255, 255, 0.1)", duration: 0.16, ease: "power2.out" });
          };

          window.addEventListener("pointermove", onMove);
          document.addEventListener("pointerover", onEnter);
          document.addEventListener("pointerout", onLeave);

          cleanups.push(() => {
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerover", onEnter);
            document.removeEventListener("pointerout", onLeave);
          });
        }

        gsap.utils.toArray<HTMLElement>(".grid-card, .review-card, .magnetic-card").forEach((card) => {
          const onMove = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotationY: x * 5,
              rotationX: y * -5,
              y: -6,
              transformPerspective: 900,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
          };
          const onLeave = () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.55)", overwrite: "auto" });
          };

          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerleave", onLeave);

          cleanups.push(() => {
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerleave", onLeave);
          });
        });
      }

      window.setTimeout(() => ScrollTrigger.refresh(), 120);
    }, mainRef);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [pathname]);

  return (
    <main ref={mainRef} className="min-h-screen bg-[#050505] text-[#F5F2EC] antialiased">
      <GlobalStyle />
      <div className="motion-progress fixed left-0 top-0 z-[100] h-px w-full origin-left scale-x-0 bg-[#C58351]" />
      <div className="motion-curtain pointer-events-none fixed inset-0 z-[98] origin-left scale-x-0" />
      <div className="motion-cursor pointer-events-none fixed left-0 top-0 z-[120] hidden h-4 w-4 md:block">
        <div className="motion-cursor-core h-full w-full rounded-full border border-[rgba(197,131,81,0.5)] bg-[rgba(197,131,81,0.1)]" />
      </div>
      <Noise />
      {showBackHome && (
        <button
          type="button"
          onClick={goBackHome}
          className="fixed left-5 top-24 z-[45] flex h-10 items-center gap-3 rounded-full border border-white/10 bg-[#171717]/72 px-5 text-sm font-medium text-white/86 backdrop-blur-md transition duration-300 hover:border-white/20 hover:bg-[#202020]/82 hover:text-white md:left-12 md:top-28"
        >
          <span className="text-lg leading-none text-white/76">‹</span>
          <span>{backLabel}</span>
        </button>
      )}
      <div className="fixed bottom-5 right-5 z-[45] flex flex-col gap-2 md:bottom-8 md:right-8">
        {floatingMessengers.map((messenger) => (
          <a
            key={messenger.label}
            href={messenger.href}
            target="_blank"
            rel="noreferrer"
            aria-label={messenger.label}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/18 bg-white/12 text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/34 hover:bg-white/18"
          >
            <MessengerIcon icon={messenger.icon} />
          </a>
        ))}
      </div>
      {children}
    </main>
  );
}

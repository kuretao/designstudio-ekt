"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { GlobalStyle, Noise } from "../ui";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

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
        .set(".motion-curtain", { scaleX: 1, transformOrigin: "left center" })
        .to(".motion-curtain", { scaleX: 0, duration: 1.05 });

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
      {children}
    </main>
  );
}

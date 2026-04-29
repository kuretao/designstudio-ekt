"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlobalStyle, Noise } from "../ui";

gsap.registerPlugin(ScrollTrigger);

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -16,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      if (pathname !== "/") {
        gsap.fromTo(
          ".page-in",
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
          },
        );

        const reviewCards = gsap.utils.toArray<HTMLElement>(".review-card");
        if (reviewCards.length) {
          gsap.set(reviewCards, { opacity: 1, visibility: "visible" });
          gsap.fromTo(
            reviewCards,
            { y: 32, scale: 0.985 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              visibility: "visible",
              clearProps: "opacity,visibility,transform",
              delay: 0.1,
              duration: 0.8,
              stagger: 0.07,
              ease: "power3.out",
              overwrite: "auto",
            },
          );
        }

        gsap.from(".review-card img", {
          scale: 1.06,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        });
        return;
      }

      gsap.from(".hero-reveal", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.14,
        ease: "expo.out",
        delay: 0.15,
      });

      gsap.to(".hero-image", {
        scale: 1.08,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const snapSections = gsap.utils.toArray<HTMLElement>(".snap-section");
      snapSections.forEach((section) => {
        gsap.from(section.querySelectorAll(".section-in"), {
          y: 70,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        });
      });

      const storyWords = gsap.utils.toArray<HTMLElement>(".story-word");
      gsap.set(storyWords, { opacity: 0.2, y: 12 });
      gsap.to(storyWords, {
        opacity: 1,
        y: 0,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-section",
          start: "top center",
          end: "bottom center",
          scrub: 0.8,
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-bg").forEach((bg) => {
        gsap.to(bg, {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <main ref={mainRef} className="min-h-screen bg-[#0d0d0b] text-[#f3efe7] antialiased">
      <GlobalStyle />
      <Noise />
      {children}
    </main>
  );
}

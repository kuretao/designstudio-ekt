"use client";

import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-black: #050505;
    --color-graphite: #171717;
    --color-graphite-soft: #22201f;
    --color-white: #F5F2EC;
    --color-copper: #C58351;
  }

  html {
    scroll-behavior: auto;
    background: var(--color-black);
  }

  body {
    background:
      radial-gradient(circle at 72% 18%, rgba(197, 131, 81, 0.12), transparent 28rem),
      radial-gradient(circle at 12% 72%, rgba(255, 255, 255, 0.045), transparent 24rem),
      linear-gradient(135deg, var(--color-black) 0%, #0b0b0b 42%, var(--color-graphite) 100%);
    color: var(--color-white);
    overflow-x: hidden;
    scrollbar-width: none;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  ::selection {
    background: var(--color-copper);
    color: var(--color-black);
  }

  a,
  button {
    -webkit-tap-highlight-color: transparent;
  }

  .motion-cursor {
    will-change: transform, opacity;
  }

  .motion-progress {
    box-shadow: 0 0 24px rgba(197, 131, 81, 0.55);
    will-change: transform;
  }

  .motion-curtain {
    background:
      linear-gradient(90deg, rgba(245, 242, 236, 0.08), rgba(197, 131, 81, 0.08) 44%, rgba(5, 5, 5, 0.18)),
      rgba(10, 10, 10, 0.22);
    backdrop-filter: blur(22px) saturate(0.82);
    -webkit-backdrop-filter: blur(22px) saturate(0.82);
    border-right: 1px solid rgba(245, 242, 236, 0.12);
    will-change: transform, opacity, backdrop-filter;
  }

  .hero-video,
  .project-bg,
  .parallax-media {
    will-change: transform;
  }

  .magnetic-card {
    transform-style: preserve-3d;
    will-change: transform;
  }

  .copper-text {
    color: var(--color-copper);
  }

  @keyframes reviewFloat {
    0%, 100% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }

    50% {
      transform: translate3d(0, -16px, 0) rotate(1.5deg);
    }
  }

  @keyframes reviewSweep {
    0% {
      transform: translateX(-120%);
    }

    100% {
      transform: translateX(120%);
    }
  }

  .review-orbit {
    animation: reviewFloat 8s ease-in-out infinite;
  }

  .review-orbit-delayed {
    animation: reviewFloat 9s ease-in-out 1.4s infinite;
  }

  .review-sheen::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(110deg, transparent 0%, rgba(197, 131, 81, 0.16) 48%, transparent 62%);
    opacity: 0;
    transform: translateX(-120%);
  }

  .review-sheen:hover::before {
    opacity: 1;
    animation: reviewSweep 1.15s ease forwards;
  }
`;

export const GlassPanel = styled.div`
  border: 1px solid rgba(245, 242, 236, 0.14);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.018)),
    linear-gradient(180deg, rgba(197, 131, 81, 0.055), transparent 54%);
  backdrop-filter: blur(22px);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.08);
`;

export const Noise = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 60;
  opacity: 0.055;
  mix-blend-mode: overlay;
  background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,.7) 0 1px, transparent 1px),
    radial-gradient(circle at 70% 30%, rgba(255,255,255,.45) 0 1px, transparent 1px);
  background-size: 38px 38px, 61px 61px;
`;

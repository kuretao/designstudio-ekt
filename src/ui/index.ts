"use client";

import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-black: #0c0b09;
    --color-graphite: #181713;
    --color-graphite-soft: #24221d;
    --color-white: #F5F2EC;
    --color-copper: #D69A66;
  }

  html {
    scroll-behavior: auto;
    background: var(--color-black);
  }

  body {
    background:
      radial-gradient(circle at 72% 18%, rgba(214,154,102, 0.13), transparent 28rem),
      radial-gradient(circle at 14% 72%, rgba(116, 128, 106, 0.1), transparent 25rem),
      linear-gradient(135deg, #0c0b09 0%, #15130f 42%, #1d1b17 100%);
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
    box-shadow: 0 0 24px rgba(214,154,102, 0.55);
    will-change: transform;
  }

  .motion-curtain {
    background:
      linear-gradient(90deg, rgba(245, 242, 236, 0.08), rgba(214,154,102, 0.08) 44%, rgba(5, 5, 5, 0.18)),
      rgba(10, 10, 10, 0.22);
    backdrop-filter: blur(22px) saturate(0.82);
    -webkit-backdrop-filter: blur(22px) saturate(0.82);
    border-right: 1px solid rgba(245, 242, 236, 0.12);
    will-change: transform, opacity, backdrop-filter;
  }

  .hero-video,
  .project-bg {
    will-change: transform;
  }

  .snap-section {
    isolation: isolate;
  }

  /* Card-stacking scroll effect */
  .slides-wrap .snap-section {
    transform-origin: center top;
    border-radius: 0px;
    will-change: transform, border-radius, opacity;
  }

  .page-in {
    position: relative;
    isolation: isolate;
    background:
      linear-gradient(rgba(245, 242, 236, 0.024) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 242, 236, 0.022) 1px, transparent 1px),
      radial-gradient(circle at 82% 8%, rgba(214, 154, 102, 0.08), transparent 28rem),
      radial-gradient(circle at 10% 32%, rgba(126, 139, 116, 0.07), transparent 26rem),
      linear-gradient(180deg, #171511 0%, #12110e 44%, #171611 100%);
    background-size: 132px 132px, 132px 132px, auto, auto, auto;
  }

  .page-in > * {
    position: relative;
    z-index: 1;
  }

  .slides-wrap {
    background:
      linear-gradient(180deg, #11100d 0%, #18150f 34%, #121710 66%, #171511 100%);
    box-shadow: inset 0 -120px 160px rgba(8, 7, 5, 0.42);
  }

  .portfolio-grid-section {
    background:
      linear-gradient(rgba(245, 242, 236, 0.024) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 242, 236, 0.022) 1px, transparent 1px),
      radial-gradient(circle at 82% 8%, rgba(214, 154, 102, 0.08), transparent 28rem),
      radial-gradient(circle at 10% 32%, rgba(126, 139, 116, 0.07), transparent 26rem),
      linear-gradient(180deg, #171511 0%, #12110e 44%, #171611 100%);
    background-size: 132px 132px, 132px 132px, auto, auto, auto;
  }

  .hero-video {
    filter: brightness(0.82) contrast(1.04) saturate(0.92);
  }

  .hero-light-field {
    background:
      linear-gradient(100deg, rgba(5, 5, 5, 0.36) 0%, rgba(5, 5, 5, 0.18) 48%, rgba(232, 221, 206, 0.1) 100%),
      repeating-linear-gradient(115deg, rgba(245, 242, 236, 0.045) 0 1px, transparent 1px 88px);
    mix-blend-mode: screen;
    opacity: 0.55;
  }

  .feature-project-light {
    background:
      radial-gradient(circle at 78% 15%, rgba(232, 221, 206, 0.25), transparent 26rem),
      radial-gradient(circle at 9% 74%, rgba(111, 128, 106, 0.2), transparent 24rem),
      linear-gradient(120deg, rgba(5, 5, 5, 0.08), rgba(232, 221, 206, 0.12));
    mix-blend-mode: soft-light;
  }

  .story-section {
    background:
      radial-gradient(circle at 16% 20%, rgba(214, 154, 102, 0.18), transparent 24rem),
      radial-gradient(circle at 84% 78%, rgba(126, 139, 116, 0.16), transparent 24rem),
      linear-gradient(115deg, #1c1914 0%, #222019 48%, #263025 100%);
  }

  .story-backdrop {
    background:
      radial-gradient(circle at 78% 18%, rgba(232, 221, 206, 0.08), transparent 20rem),
      linear-gradient(90deg, rgba(14, 12, 9, 0.18), rgba(24, 21, 16, 0.46) 52%, rgba(38, 48, 37, 0.28)),
      repeating-linear-gradient(90deg, rgba(245, 242, 236, 0.045) 0 1px, transparent 1px 132px);
  }

  .home-continuation {
    background:
      linear-gradient(rgba(245, 242, 236, 0.024) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 242, 236, 0.022) 1px, transparent 1px),
      radial-gradient(circle at 82% 8%, rgba(214, 154, 102, 0.08), transparent 28rem),
      radial-gradient(circle at 10% 28%, rgba(126, 139, 116, 0.08), transparent 26rem),
      linear-gradient(180deg, #171511 0%, #12110e 44%, #171611 100%);
    background-size: 132px 132px, 132px 132px, auto, auto, auto;
  }

  .premium-footer {
    background:
      linear-gradient(rgba(245, 242, 236, 0.026) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 242, 236, 0.024) 1px, transparent 1px),
      #171511;
    background-size: 132px 132px;
  }

  .premium-footer::before {
    content: none;
  }

  @media (max-width: 767px) {
    .hero-video {
      opacity: 0.62;
    }

    .hero-light-field {
      opacity: 0.46;
    }

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
    background: linear-gradient(110deg, transparent 0%, rgba(214,154,102, 0.16) 48%, transparent 62%);
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
    linear-gradient(180deg, rgba(214,154,102, 0.055), transparent 54%);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
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

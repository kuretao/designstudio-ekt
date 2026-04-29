"use client";

import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: auto;
    background: #0d0d0b;
  }

  body {
    background: #0d0d0b;
    color: #f3efe7;
    overflow-x: hidden;
  }

  ::selection {
    background: #d7c4a1;
    color: #0d0d0b;
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
    background: linear-gradient(110deg, transparent 0%, rgba(215, 196, 161, 0.16) 48%, transparent 62%);
    opacity: 0;
    transform: translateX(-120%);
  }

  .review-sheen:hover::before {
    opacity: 1;
    animation: reviewSweep 1.15s ease forwards;
  }
`;

export const GlassPanel = styled.div`
  border: 1px solid rgba(243, 239, 231, 0.16);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.025));
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.28);
`;

export const Noise = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 60;
  opacity: 0.08;
  mix-blend-mode: overlay;
  background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,.7) 0 1px, transparent 1px),
    radial-gradient(circle at 70% 30%, rgba(255,255,255,.45) 0 1px, transparent 1px);
  background-size: 38px 38px, 61px 61px;
`;

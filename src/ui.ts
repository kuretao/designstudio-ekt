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

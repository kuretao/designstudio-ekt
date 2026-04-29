import type { Metadata } from "next";
import StyledRegistry from "@/src/components/StyledRegistry";
import ClientShell from "@/src/components/ClientShell";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Smart Design Studio",
  description: "Студия концептуального дизайна. Интерьеры, архитектура, ландшафт.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <StyledRegistry>
          <ClientShell>
            <Header />
            {children}
            <Footer />
          </ClientShell>
        </StyledRegistry>
      </body>
    </html>
  );
}

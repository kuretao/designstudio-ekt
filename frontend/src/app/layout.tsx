import type { Metadata } from "next";
import StyledRegistry from "@/src/components/providers/StyledRegistry";
import ClientShell from "@/src/components/layout/ClientShell";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import SiteMetadata from "@/src/components/layout/SiteMetadata/SiteMetadata";
import { CmsProvider } from "@/src/cms";
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
          <CmsProvider>
            <SiteMetadata />
            <ClientShell>
              <Header />
              {children}
              <Footer />
            </ClientShell>
          </CmsProvider>
        </StyledRegistry>
      </body>
    </html>
  );
}

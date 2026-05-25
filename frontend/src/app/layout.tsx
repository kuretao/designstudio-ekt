import type { Metadata } from "next";
import StyledRegistry from "@/src/components/providers/StyledRegistry";
import ClientShell from "@/src/components/layout/ClientShell";
import Header from "@/src/components/layout/Header";
import Breadcrumbs from "@/src/components/layout/Breadcrumbs";
import Footer from "@/src/components/layout/Footer";
import SiteMetadata from "@/src/components/layout/SiteMetadata/SiteMetadata";
import { CmsProvider } from "@/src/cms";
import { SiteI18nProvider } from "@/src/i18n";
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
          <SiteI18nProvider>
            <CmsProvider>
              <SiteMetadata />
              <ClientShell>
                <Header />
                <Breadcrumbs />
                {children}
                <Footer />
              </ClientShell>
            </CmsProvider>
          </SiteI18nProvider>
        </StyledRegistry>
      </body>
    </html>
  );
}

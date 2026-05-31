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
  title:
    "Студия дизайна интерьера, архитектуры и ландшафта в Самаре | 3D Smart Design Studio",
  description:
    "3D Smart Design Studio: дизайн интерьера, архитектурное проектирование, 3D-визуализация, ландшафтный дизайн, комплектация и авторский надзор в Самаре.",
  keywords: [
    "дизайн интерьера Самара",
    "архитектура Самара",
    "ландшафтный дизайн Самара",
    "3D-визуализация",
    "3D Smart Design Studio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

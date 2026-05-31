import type { Metadata } from "next";
import ServicesPage from "@/src/modules/pages/ServicesPage";

export const metadata: Metadata = {
  title:
    "Услуги дизайна интерьера, архитектуры, 3D-визуализации и ландшафта | 3D Smart Design Studio",
  description:
    "Услуги 3D Smart Design Studio в Самаре: дизайн интерьера, архитектурное проектирование, 3D-визуализация, ландшафтный дизайн, комплектация и авторский надзор.",
  keywords: [
    "дизайн интерьера Самара",
    "архитектурное проектирование",
    "3D-визуализация",
    "ландшафтный дизайн",
    "3D Smart Design Studio",
  ],
};

export default function Page() {
  return <ServicesPage />;
}

import type { Metadata } from "next";
import AwardsPage from "@/src/modules/pages/AwardsPage";

export const metadata: Metadata = {
  title: "Награды и дипломы | 3D Smart Design Studio",
  description:
    "Дипломы, сертификаты и благодарственные письма студии 3D Smart Design Studio.",
};

export default function Page() {
  return <AwardsPage />;
}

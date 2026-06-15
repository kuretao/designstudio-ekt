import type { Metadata } from "next";
import VirtualTourAppPage from "@/src/modules/pages/VirtualTourAppPage";

export const metadata: Metadata = {
  title: "Демо виртуального 3D-тура | 3D Smart Design Studio",
  description:
    "Полноэкранный демо-интерфейс виртуального 3D-тура по дому с 360° панорамами, хотспотами и мини-планом.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <VirtualTourAppPage />;
}

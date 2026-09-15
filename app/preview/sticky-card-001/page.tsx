// CSS que o Lenis pede para assumir o scroll do documento (altura e overscroll).
import "lenis/dist/lenis.css";

import { StickyCard001Preview } from "@/components/showcase/demos/sticky-card-001-preview";

export const metadata = {
  title: "Sticky Card 001 — preview",
};

export default function Page() {
  return <StickyCard001Preview />;
}

// CSS que o Lenis pede para assumir o scroll do documento (altura e overscroll).
import "lenis/dist/lenis.css";

import { StickyCard002Preview } from "@/components/showcase/demos/sticky-card-002-preview";

export const metadata = {
  title: "Sticky Card 002 — preview",
};

export default function Page() {
  return <StickyCard002Preview />;
}

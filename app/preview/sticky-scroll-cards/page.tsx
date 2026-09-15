// CSS que o Lenis pede para assumir o scroll do documento (altura e overscroll).
import "lenis/dist/lenis.css";

import { StickyScrollCards } from "@/components/ui/sticky-scroll-cards";

export const metadata = {
  title: "Sticky Scroll Cards — preview",
};

export default function Page() {
  return <StickyScrollCards />;
}

"use client";

// O componente usa useState mas não traz "use client" — a diretiva precisa vir
// de quem o importa, senão o Next tenta renderizá-lo como Server Component.

import { ViewOnMap } from "@/components/ui/view-on-map";

export function ViewOnMapDemo() {
  return (
    <ViewOnMap
      locationName="Big Belly Burger"
      address="75 Charles St, Boston, MA 02114"
    />
  );
}

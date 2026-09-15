"use client";

import SlidingEaseVerticalBars from "@/components/ui/sliding-ease-vertical-bars";

/**
 * Roda em rota isolada (modo quadro) porque o componente mede a JANELA —
 * window.innerWidth/innerHeight — e não o container. No palco da vitrine o
 * canvas sairia do tamanho da página, cortado pela caixa, e o centro de
 * influência do mouse cairia fora da área visível. Dentro do iframe a janela
 * é o próprio quadro, e o componente se comporta como foi projetado.
 */
export function SlidingEaseVerticalBarsPreview() {
  return (
    <div className="relative h-screen w-full">
      <SlidingEaseVerticalBars />
    </div>
  );
}

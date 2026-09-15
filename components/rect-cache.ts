/**
 * Helper que o Glass.tsx do Canvas UI importa de "../rect-cache" — o arquivo
 * não é publicado no registry deles, então esta implementação foi escrita a
 * partir do uso: o Glass lê `.current` a cada pointermove para converter as
 * coordenadas da janela em coordenadas locais do canvas. O rect precisa estar
 * atualizado sem chamar getBoundingClientRect() a cada evento — daí o cache
 * invalidado por scroll e resize.
 */
export interface RectCache {
  /** Bounding rect atual do elemento observado. */
  readonly current: DOMRect;
  /** Remove os listeners e o observer. */
  destroy: () => void;
}

export function createRectCache(element: Element): RectCache {
  let rect = element.getBoundingClientRect();

  const update = () => {
    rect = element.getBoundingClientRect();
  };

  const observer = new ResizeObserver(update);
  observer.observe(element);

  // capture: true pega a rolagem de qualquer ancestral, não só a da janela.
  window.addEventListener("scroll", update, { passive: true, capture: true });
  window.addEventListener("resize", update, { passive: true });

  return {
    get current() {
      return rect;
    },
    destroy() {
      observer.disconnect();
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
    },
  };
}

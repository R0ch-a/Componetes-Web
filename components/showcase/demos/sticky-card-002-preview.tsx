"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import { useEffect } from "react";
import { StickyCard002 } from "@/components/ui/skiper-17";

/**
 * Espelha o `Skiper17` do arquivo original, com duas diferenças:
 * - imagens remotas, já que /images/lummi/ não existe neste repo;
 * - `h-screen` no lugar de `h-full`, porque aqui o componente é a raiz da rota
 *   e não herda altura de nenhum container.
 */
const CARDS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
    alt: "Montanhas ao entardecer",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=85",
    alt: "Floresta iluminada pelo sol",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&q=85",
    alt: "Estrada entre árvores",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=85",
    alt: "Luz atravessando as folhas",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=85",
    alt: "Campo dourado ao pôr do sol",
  },
];

export function StickyCard002Preview() {
  /**
   * O refresh que o componente dispara no próprio ResizeObserver acontece antes
   * de a página ter altura rolável: nesse momento o `end: "+=innerHeight*n"`
   * é achatado para 0, o pin-spacer nasce sem padding e o scroll nunca ganha
   * curso. Um refresh depois da montagem (e outro no load, quando as imagens
   * terminam) recalcula com a página já medida.
   */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 300);
    const t2 = setTimeout(refresh, 1200);
    window.addEventListener("load", refresh);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="h-screen w-full bg-[#0e0e10]">
        <StickyCard002 cards={CARDS} />
      </div>
    </ReactLenis>
  );
}

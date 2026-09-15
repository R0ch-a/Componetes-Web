"use client";

import { useScroll } from "framer-motion";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import { StickyCard_001 } from "@/components/ui/skiper-16";

/**
 * Espelha o `Skiper16` do arquivo original. Foi preciso remontar a orquestração
 * aqui porque o `Skiper16` traz a lista de imagens fixa em /images/lummi/, que
 * não existe neste repo, e não aceita props. O `StickyCard_001` é exportado
 * justamente para esse tipo de composição.
 */
const PROJECTS = [
  {
    title: "Montanhas ao entardecer",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=85",
  },
  {
    title: "Floresta iluminada pelo sol",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=85",
  },
  {
    title: "Estrada entre árvores",
    src: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1000&q=85",
  },
  {
    title: "Luz atravessando as folhas",
    src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1000&q=85",
  },
  {
    title: "Campo dourado ao pôr do sol",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1000&q=85",
  },
];

export function StickyCard001Preview() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-[100vh] pt-[50vh]"
      >
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
            scroll down to see card stack
          </span>
        </div>
        {PROJECTS.map((project, i) => {
          const targetScale = Math.max(0.5, 1 - (PROJECTS.length - i - 1) * 0.1);
          return (
            <StickyCard_001
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </ReactLenis>
  );
}

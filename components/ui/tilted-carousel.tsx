"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TiltedCarouselItem {
  src: string;
  title: string;
}

export interface TiltedCarouselProps {
  items: TiltedCarouselItem[];
  /** Slide aberto na montagem. */
  initialIndex?: number;
  /** Graus de rotação em Y por slide de distância. */
  rotationStep?: number;
  /** Escala dos slides que não estão ativos. */
  inactiveScale?: number;
  /** Desfoque aplicado ao título dos slides inativos. */
  inactiveBlur?: string;
  className?: string;
}

export function TiltedCarousel({
  items,
  initialIndex = 0,
  rotationStep = 60,
  inactiveScale = 0.85,
  inactiveBlur = "blur(2px)",
  className,
}: TiltedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(items.length - 1, 0)),
  );

  const toPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const toNext = () =>
    setActiveIndex((prev) => Math.min(items.length - 1, prev + 1));

  if (items.length === 0) return null;

  return (
    <div className={cn("select-none p-2 text-neutral-800", className)}>
      <div className="mx-auto w-30 md:w-50">
        {/* A esteira anda uma fração do próprio comprimento a cada slide. */}
        <motion.div
          className="flex w-fit"
          animate={{ x: `${(-activeIndex * 100) / items.length}%` }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
        >
          {items.map((item, i) => {
            const isActive = activeIndex === i;
            return (
              // A perspectiva mora no pai: sem ela o rotateY vira achatamento.
              <div className="perspective-midrange" key={item.src}>
                <motion.div
                  className="flex aspect-3/4 w-30 flex-col items-center gap-2 will-change-[transform,scale] md:w-50"
                  animate={{
                    rotateY: (activeIndex - i) * rotationStep,
                    scale: isActive ? 1 : inactiveScale,
                  }}
                  transition={{ type: "spring", bounce: 0.1, duration: 1 }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    onClick={() => setActiveIndex(i)}
                    className="h-full w-full cursor-pointer rounded-lg object-cover"
                  />

                  <motion.div
                    className="whitespace-nowrap text-xs will-change-[opacity,filter] md:text-sm"
                    animate={{
                      filter: isActive ? "blur(0px)" : inactiveBlur,
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    {item.title}
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Controles. No original eram `fixed` na janela; aqui acompanham o
          componente, para ele poder ser usado embutido. */}
      <div className="mx-auto mt-8 flex w-fit items-center justify-center gap-4 rounded-full border border-neutral-200/80 bg-neutral-200/50 px-2 text-neutral-700 shadow-sm backdrop-blur-sm">
        <button
          type="button"
          onClick={toPrev}
          aria-label="Slide anterior"
          className="cursor-pointer p-2"
        >
          <ChevronLeft />
        </button>

        <div className="flex w-[180px] items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Ir para ${item.title}`}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-[width,background-color] duration-300",
                activeIndex === i ? "w-7 bg-current" : "w-2 bg-current/30",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={toNext}
          aria-label="Próximo slide"
          className="cursor-pointer p-2"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

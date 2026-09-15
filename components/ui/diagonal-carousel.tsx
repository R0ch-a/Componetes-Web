"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagonalCarouselItem {
  src: string;
  title: string;
}

export interface DiagonalCarouselProps {
  items: DiagonalCarouselItem[];
  /** Slide aberto na montagem. */
  initialIndex?: number;
  /** Graus de rotação acumulados por slide de distância. */
  rotationStep?: number;
  /** Deslocamento vertical por slide de distância, em % da altura. */
  offsetStep?: number;
  /** Escala dos slides que não estão ativos. */
  inactiveScale?: number;
  className?: string;
}

export function DiagonalCarousel({
  items,
  initialIndex = 0,
  rotationStep = 30,
  offsetStep = 50,
  inactiveScale = 0.6,
  className,
}: DiagonalCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(items.length - 1, 0)),
  );

  const toPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const toNext = () =>
    setActiveIndex((prev) => Math.min(items.length - 1, prev + 1));

  if (items.length === 0) return null;

  return (
    <div className={cn("select-none text-neutral-800", className)}>
      <div className="mx-auto w-[clamp(120px,80vmin,300px)]">
        {/* A esteira anda uma fração do próprio comprimento a cada slide. */}
        <motion.div
          className="flex w-fit"
          animate={{ x: `${(-activeIndex * 100) / items.length}%` }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
        >
          {items.map((item, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={item.src}
                className="flex aspect-square w-[clamp(120px,80vmin,300px)] flex-col items-center gap-2 will-change-[transform,scale]"
                animate={{
                  rotate: (i - activeIndex) * rotationStep,
                  scale: isActive ? 1 : inactiveScale,
                  y: `${(i - activeIndex) * offsetStep}%`,
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
              >
                <div
                  className={cn(
                    "whitespace-nowrap text-xs transition-all duration-300 will-change-[opacity,filter] md:text-sm",
                    isActive ? "scale-100 opacity-100" : "scale-75 opacity-0",
                  )}
                >
                  {item.title}
                </div>

                <img
                  src={item.src}
                  alt={item.title}
                  onClick={() => setActiveIndex(i)}
                  className="h-full w-full cursor-pointer rounded-2xl object-cover"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controles. No original eram `fixed` na janela; aqui acompanham o
          componente, para ele poder ser usado embutido. */}
      <div className="mx-auto mt-6 flex w-fit items-center justify-center gap-4 rounded-full border border-neutral-200/80 bg-neutral-200/50 px-2 text-neutral-700 shadow-sm backdrop-blur-sm">
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

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ProgramStackItem {
  name: string;
  /** Texto pequeno à direita do nome: versão, categoria, o que fizer sentido. */
  tag?: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  /** Rótulo da chamada no rodapé do card. */
  action?: string;
}

export interface ProgramStackProps {
  programs: ProgramStackItem[];
  /** Intervalo do avanço automático, em ms. 0 desliga. */
  autoPlayInterval?: number;
  /** Distância de rolagem acumulada para trocar de card. */
  wheelThreshold?: number;
  className?: string;
}

/** Posições da pilha: o ativo na frente e os três seguintes recuando na diagonal. */
const SLOTS = [
  { z: 30, offset: 0, scale: 1, opacity: 1 },
  { z: 20, offset: 24, scale: 0.98, opacity: 0.6 },
  { z: 10, offset: 48, scale: 0.96, opacity: 0.3 },
  { z: 0, offset: 72, scale: 0.94, opacity: 0 },
];

export function ProgramStack({
  programs,
  autoPlayInterval = 5000,
  wheelThreshold = 60,
  className,
}: ProgramStackProps) {
  const total = programs.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (index: number) => {
      if (total === 0) return;
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  // Avanço automático, suspenso enquanto o ponteiro está sobre a pilha.
  useEffect(() => {
    if (!autoPlayInterval || paused || total <= 1) return;
    const timer = setInterval(
      () => setCurrent((i) => (i + 1) % total),
      autoPlayInterval,
    );
    return () => clearInterval(timer);
  }, [autoPlayInterval, paused, total]);

  // A roda do mouse avança a pilha. O listener precisa ser não-passivo para
  // poder chamar preventDefault e impedir que a página role junto.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || total <= 1) return;

    let accumulated = 0;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      accumulated += event.deltaY;
      if (accumulated > wheelThreshold) {
        setCurrent((i) => (i + 1) % total);
        accumulated = 0;
      } else if (accumulated < -wheelThreshold) {
        setCurrent((i) => (i - 1 + total) % total);
        accumulated = 0;
      }
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [total, wheelThreshold]);

  if (total === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={containerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative h-[280px] cursor-ns-resize md:h-[220px]"
      >
        {programs.map((program, index) => {
          const distance = (index - current + total) % total;
          const slot = SLOTS[Math.min(distance, SLOTS.length - 1)];
          const isActive = distance === 0;
          const Tag = program.href ? "a" : "div";

          return (
            <Tag
              key={program.name}
              {...(program.href
                ? { href: program.href, target: "_blank", rel: "noreferrer" }
                : {})}
              aria-hidden={slot.opacity === 0}
              className="group absolute left-0 top-0 block w-full rounded-xl border border-[#646669]/20 bg-[#323437]/40 p-5 backdrop-blur-[8px]"
              style={{
                zIndex: slot.z,
                opacity: slot.opacity,
                pointerEvents: slot.opacity === 0 ? "none" : undefined,
                transform: `translate(${slot.offset}px, ${slot.offset}px) scale(${slot.scale})`,
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              tabIndex={isActive ? undefined : -1}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                {program.icon && (
                  <div className="w-fit rounded-lg border border-[#646669] bg-[#2C2E31] p-3 text-[#E2B714]">
                    {program.icon}
                  </div>
                )}

                <div className="flex-grow">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#D1D0C5]">
                      {program.name}
                    </h3>
                    {program.tag && (
                      <span className="font-mono text-xs uppercase tracking-widest text-[#646669]">
                        {program.tag}
                      </span>
                    )}
                  </div>

                  <p className="mb-3 text-sm leading-relaxed text-[#D1D0C5]/80">
                    {program.description}
                  </p>

                  <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-[#E2B714]">
                    {program.action ?? "Execute"}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Tag>
          );
        })}
      </div>

      <div className="mt-10 flex justify-end gap-1.5">
        {programs.map((program, index) => (
          <button
            key={program.name}
            type="button"
            onClick={() => go(index)}
            aria-label={`Ir para ${program.name}`}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              index === current ? "w-8 bg-[#E2B714]" : "w-4 bg-[#323437]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

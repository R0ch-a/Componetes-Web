"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ScrollStageItem {
  /** Nome curto exibido no HUD. */
  name: string;
  /** Título do cabeçalho do card. */
  title: string;
  /** Etiqueta à direita do cabeçalho (com o ponto luminoso). */
  badge?: string;
  content: ReactNode;
}

export interface ScrollStagesProps {
  stages: ScrollStageItem[];
  /** Altura total da área rolável, em vh. O original usa 800 para 6 cards. */
  scrollHeightVh?: number;
  className?: string;
}

/** Posições de repouso do topo e do fundo da pilha, em pixels. */
const TOP_Y = -60;
const BOTTOM_Y = 220;
/** Fatia do começo e do fim do scroll usada só para respiro. */
const MARGIN = 0.05;

export function ScrollStages({
  stages,
  scrollHeightVh = 800,
  className,
}: ScrollStagesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const total = stages.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || total === 0) return;

    let ticking = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionTotal = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, sectionTotal > 0 ? scrolled / sectionTotal : 0));

      const adj = Math.max(0, Math.min(1, (p - MARGIN) / (1 - 2 * MARGIN)));
      const head = adj * total;
      const activeIdx = Math.min(total - 1, Math.max(0, Math.floor(head)));

      setActive(activeIdx);
      setProgress(p);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const d = i - head;
        let y: number;
        let sc: number;
        let op: number;
        let rot: number;
        let blur: number;
        let z: number;

        if (d >= 0) {
          // Ainda na fila, empilhado acima do card da vez.
          const depth = Math.min(d, 4);
          const visible = d < 4 ? 1 : 0;
          const easeDepth = depth * depth;
          y = TOP_Y + depth * 10 + easeDepth * 2;
          sc = 1 - depth * 0.03;
          op = visible;
          rot = depth * 0.6;
          blur = depth > 0 ? depth * 0.6 : 0;
          z = 200 - Math.floor(depth);
        } else {
          const t = -d;
          if (t < 1) {
            // Saindo de cena: desliza para baixo com smoothstep.
            const e = t * t * (3 - 2 * t);
            y = TOP_Y + (BOTTOM_Y - TOP_Y) * e;
            sc = 1 - 0.06 * e;
            op = 1 - 0.55 * e;
            rot = -t * 5;
            blur = t * 1.4;
            z = 150 - Math.floor(t * 30);
          } else {
            // Já passou: descansa embaixo, desbotando.
            const depth = Math.min(t - 1, 4);
            const visible = depth < 4 ? 1 : 0;
            y = BOTTOM_Y + depth * 9;
            sc = 0.94 - depth * 0.02;
            op = visible ? 0.42 - depth * 0.07 : 0;
            rot = -5 - depth * 0.8;
            blur = 1.4 + depth * 0.5;
            z = 100 - Math.floor(depth);
          }
        }

        card.style.transform = `translate3d(0px,${y}px,0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
        card.style.opacity = String(Math.max(0, Math.min(1, op)));
        card.style.filter = `blur(${blur.toFixed(2)}px)`;
        card.style.zIndex = String(Math.floor(z));
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [total]);

  if (total === 0) return null;

  return (
    <div
      ref={sectionRef}
      className={cn("relative", className)}
      style={{ height: `${scrollHeightVh}vh` }}
    >
      <div className="sticky top-0 grid h-screen w-full place-items-center overflow-hidden">
        {/* HUD */}
        <div className="absolute left-1/2 top-8 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border border-[#323437] bg-[#181a1d]/70 px-[18px] py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#646669] backdrop-blur-[10px]">
          Stage
          <span className="-ml-2.5 font-semibold text-[#E2B714]">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="h-3 w-px bg-[#323437]" />
          <span className="tracking-[0.15em] text-[#e2e2e6]">
            {stages[active].name}
          </span>
        </div>

        {/* Cards */}
        {stages.map((stage, index) => (
          <article
            key={stage.name}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute overflow-hidden border border-[#323437] bg-[#181a1d] shadow-[0_24px_48px_rgba(0,0,0,.55),0_8px_16px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.03)]"
            style={{
              width: "min(820px, 88vw)",
              height: "min(480px, 58vh)",
              willChange: "transform, opacity, filter",
            }}
          >
            <header className="absolute inset-x-0 top-0 z-[5] flex items-center justify-between border-b border-[#323437] bg-black/25 px-[22px] py-3.5">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#646669]">
                <span className="text-xs font-semibold text-[#E2B714]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold normal-case tracking-tight text-[#e2e2e6]">
                  {stage.title}
                </span>
              </div>
              {stage.badge && (
                <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-[#646669]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E2B714] shadow-[0_0_6px_rgba(226,183,20,.6)]" />
                  {stage.badge}
                </div>
              )}
            </header>

            <div className="absolute inset-0 top-14 grid place-items-center overflow-hidden bg-gradient-to-b from-transparent to-black/20">
              {stage.content}
            </div>
          </article>
        ))}

        {/* Barra de progresso */}
        <div className="absolute bottom-8 left-1/2 z-50 w-[280px] -translate-x-1/2">
          <div className="relative h-0.5 overflow-hidden bg-[#323437]">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#E2B714] to-[#f5d050] shadow-[0_0_8px_rgba(226,183,20,.4)] transition-[width] duration-[80ms] ease-linear"
              style={{ width: `${(progress * 100).toFixed(1)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#646669]">
            <span>start</span>
            <span className="font-semibold text-[#E2B714]">
              {(progress * 100).toFixed(0)}%
            </span>
            <span>end</span>
          </div>
        </div>
      </div>
    </div>
  );
}

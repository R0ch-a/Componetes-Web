"use client";

import { useEffect, useRef } from "react";
import type { ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export type FlyingTextOrder = "random" | "ltr" | "rtl" | "outward";

export interface FlyingTextProps {
  /** O texto. Só string: cada caractere é medido e recriado como span. */
  children: string;
  /** Direção do vento em graus: 0 = direita, 90 = cima, 180 = esquerda. */
  windAngle?: number;
  /** Distância percorrida na direção do vento, em px. */
  windStrength?: number;
  /** Desvio perpendicular aleatório, em px. */
  scatter?: number;
  /** Rotação máxima em qualquer eixo, em graus. */
  maxRotation?: number;
  /** Espalhamento dos tempos de início entre as letras (0–1). */
  stagger?: number;
  /** Movimento máximo em Z, em px. */
  depth?: number;
  /** true: o scroll revela o texto. false: espalha. */
  reverse?: boolean;
  /** Ordem em que as letras partem. */
  order?: FlyingTextOrder;
  /** 0 = ordem uniforme, 1 = stagger totalmente aleatório. */
  randomness?: number;
  /** Deriva lateral durante o voo, em px. */
  gustiness?: number;
  /** Ciclos da senoide durante o voo. */
  gustFrequency?: number;
  /** Quanto a fase da senoide se espalha entre as letras (0–1). */
  gustPhaseSpread?: number;
  /** Ponto de partida no viewport (0–1). null usa o padrão do modo. */
  startY?: number | null;
  /** Fração da janela de scroll ocupada pela animação (0–1). */
  animationDuration?: number;
  /** Easing do GSAP. null usa power3.in / power3.out conforme o modo. */
  easing?: string | null;
  /** Semente do gerador aleatório: o mesmo valor dá sempre o mesmo voo. */
  seed?: number;
  /** Elemento renderizado. */
  as?: ElementType;
  className?: string;
}

// --- Gerador aleatório semeado (sfc32 + splitmix32) -------------------------
function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function seededRandom(seed: number) {
  let s = seed >>> 0;
  const splitmix32 = () => {
    s = (s + 0x9e3779b9) | 0;
    let t = s ^ (s >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return (t ^ (t >>> 15)) >>> 0;
  };
  const rng = sfc32(splitmix32(), splitmix32(), splitmix32(), splitmix32());
  for (let i = 0; i < 12; i++) rng(); // aquece o estado
  return rng;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface CharSpan extends HTMLSpanElement {
  _x: number;
  _normX: number;
}

export function FlyingText({
  children,
  windAngle = 25,
  windStrength = 400,
  scatter = 80,
  maxRotation = 360,
  stagger = 0.5,
  depth = 120,
  reverse = false,
  order = "random",
  randomness = 0,
  gustiness = 0,
  gustFrequency = 1,
  gustPhaseSpread = 1,
  startY = null,
  animationDuration = 1,
  easing = null,
  seed = 42,
  as: Component = "p",
  className,
}: FlyingTextProps) {
  const rootRef = useRef<HTMLElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    const placeholder = placeholderRef.current;
    const overlay = overlayRef.current;
    if (!el || !placeholder || !overlay) return;

    gsap.registerPlugin(ScrollTrigger);

    const raw = children.replace(/\s+/g, " ").trim();
    let rng = seededRandom(seed);
    const rand = (min: number, max: number) => min + rng() * (max - min);

    let st: ScrollTrigger | null = null;
    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;

    // Mede cada caractere com a Range API e cria um span absoluto na posição exata.
    const measureAndCreateChars = () => {
      const containerRect = el.getBoundingClientRect();
      const textNode = placeholder.firstChild;
      const chars: CharSpan[] = [];
      if (!textNode) return chars;

      for (let i = 0; i < raw.length; i++) {
        if (raw[i] === " ") continue;

        const range = document.createRange();
        range.setStart(textNode, i);
        range.setEnd(textNode, i + 1);
        const r = range.getBoundingClientRect();

        const span = document.createElement("span") as CharSpan;
        span.textContent = raw[i];
        span.classList.add("fly-char");
        span.style.cssText = [
          "position:absolute",
          `left:${r.left - containerRect.left}px`,
          `top:${r.top - containerRect.top}px`,
          `width:${r.width}px`,
          `height:${r.height}px`,
          "white-space:nowrap",
          "will-change:transform,opacity",
        ].join(";");
        span._x = r.left - containerRect.left;
        overlay.appendChild(span);
        chars.push(span);
      }

      // Normaliza o x para as ordens funcionarem em texto de várias linhas.
      const xs = chars.map((c) => c._x);
      const xMin = Math.min(...xs);
      const xRange = Math.max(...xs) - xMin || 1;
      chars.forEach((c) => {
        c._normX = (c._x - xMin) / xRange;
      });

      return chars;
    };

    const charStartTime = (char: CharSpan, total: number) => {
      if (total <= 1) return 0;
      const x = char._normX;
      let ordered: number;
      switch (order) {
        case "ltr":
          ordered = x * stagger;
          break;
        case "rtl":
          ordered = (1 - x) * stagger;
          break;
        case "outward":
          ordered = (1 - Math.abs(x - 0.5) * 2) * stagger;
          break;
        default:
          return rand(0, stagger);
      }
      return ordered * (1 - randomness) + rand(0, stagger) * randomness;
    };

    const buildTimeline = (chars: CharSpan[]) => {
      const timeline = gsap.timeline({ paused: true });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const from = reverse ? { opacity: 0 } : { opacity: 1 };
        const to = reverse ? { opacity: 1 } : { opacity: 0 };
        timeline.fromTo(el, from, { ...to, duration: 1 });
        return timeline;
      }

      const radians = (windAngle * Math.PI) / 180;
      const windX = Math.cos(radians);
      const windY = -Math.sin(radians); // inverte o Y do CSS para o vento subir
      // Eixo perpendicular ao vento, usado pela rajada.
      const perpX = Math.sin(radians);
      const perpY = Math.cos(radians);

      const sharedAmp =
        gustiness > 0 ? rand(0.1, 1.0) * gustiness * (rng() > 0.5 ? 1 : -1) : 0;

      chars.forEach((char, i) => {
        const startTime = charStartTime(char, chars.length);
        const duration = rand(1 - randomness * 0.5, 1 + randomness * 0.5);
        const scatterAngle = rand(0, Math.PI * 2);
        const scatterDist = rand(0, scatter);
        const syncPhase = Math.PI * gustFrequency * startTime;
        const indexPhase = (i / Math.max(1, chars.length - 1)) * Math.PI * 2;
        const phase = lerp(syncPhase, indexPhase, gustPhaseSpread);

        const fx = windX * windStrength + Math.cos(scatterAngle) * scatterDist;
        const fy = windY * windStrength + Math.sin(scatterAngle) * scatterDist;
        const fz = rand(-depth, depth);
        const rx = rand(-maxRotation, maxRotation);
        const ry = rand(-maxRotation * 0.7, maxRotation * 0.7);
        const rz = rand(-maxRotation * 0.3, maxRotation * 0.3);

        const scattered = {
          x: fx,
          y: fy,
          z: fz,
          rotationX: rx,
          rotationY: ry,
          rotationZ: rz,
          opacity: 0,
        };
        const natural = {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          opacity: 1,
        };

        if (gustiness > 0) {
          const individualAmp =
            rand(0.1, 1.0) * gustiness * (rng() > 0.5 ? 1 : -1);
          const amp = lerp(sharedAmp, individualAmp, gustPhaseSpread);

          // Tira a tendência da senoide para ela valer 0 em t=0 e t=1,
          // qualquer que seja a fase — sem mudar o formato do caminho no meio.
          const s0 = Math.sin(phase);
          const s1 = Math.sin(Math.PI * gustFrequency + phase);
          const gustSine = (t: number) =>
            amp *
            (Math.sin(Math.PI * gustFrequency * t + phase) - s0 - t * (s1 - s0));

          const sineAt = (t: number) => {
            const s = reverse ? 1 - t : t;
            return {
              x: s * fx + perpX * gustSine(t),
              y: s * fy + perpY * gustSine(t),
              z: s * fz,
              rotationX: rx * s,
              rotationY: ry * s,
              rotationZ: rz * s,
              opacity: clamp01((1 - s) / 0.6),
            };
          };

          // Evita o pulo do primeiro quadro.
          gsap.set(char, sineAt(0));

          const proxy = { t: 0 };
          timeline.to(
            proxy,
            {
              t: 1,
              duration,
              ease: easing ? easing : "power3.in",
              immediateRender: true,
              onUpdate() {
                gsap.set(char, sineAt(proxy.t));
              },
            },
            startTime,
          );
        } else {
          const [from, to] = reverse
            ? [scattered, natural]
            : [natural, scattered];
          timeline.fromTo(
            char,
            from,
            {
              ...to,
              duration,
              ease: easing ?? (reverse ? "power3.out" : "power3.in"),
            },
            startTime,
          );
        }
      });

      // Estica a linha do tempo para a animação ocupar só a fração pedida.
      if (animationDuration > 0 && animationDuration < 1) {
        timeline.call(() => {}, [], timeline.duration() / animationDuration);
      }

      return timeline;
    };

    const setup = () => {
      if (cancelled) return;
      st?.kill();
      tl?.kill();
      overlay.innerHTML = "";

      const chars = measureAndCreateChars();
      if (!chars.length) return;

      gsap.set(chars, { transformPerspective: 500 });
      tl = buildTimeline(chars);

      const startPct = Math.round((startY ?? (reverse ? 0.85 : 0.65)) * 100);
      st = ScrollTrigger.create({
        trigger: el,
        start: `top ${startPct}%`,
        end: reverse ? "top 20%" : "bottom top",
        scrub: 1,
        animation: tl,
      });
    };

    // Mede só depois das fontes carregarem: o rect de cada letra depende delas.
    document.fonts.ready.then(() => {
      if (!cancelled) setup();
    });

    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastW = 0;
    let lastH = 0;
    const ro = new ResizeObserver(([entry]) => {
      rng = seededRandom(seed);
      const size = entry.contentBoxSize?.[0];
      if (!size) return;
      const { inlineSize: w, blockSize: h } = size;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 200);
    });
    ro.observe(el);

    return () => {
      cancelled = true;
      clearTimeout(resizeTimer);
      ro.disconnect();
      st?.kill();
      tl?.kill();
      overlay.innerHTML = "";
    };
  }, [
    children,
    windAngle,
    windStrength,
    scatter,
    maxRotation,
    stagger,
    depth,
    reverse,
    order,
    randomness,
    gustiness,
    gustFrequency,
    gustPhaseSpread,
    startY,
    animationDuration,
    easing,
    seed,
  ]);

  const text = children.replace(/\s+/g, " ").trim();

  return (
    <Component ref={rootRef} className={cn("relative", className)}>
      {/* Cópia acessível, lida por leitores de tela. */}
      <span className="sr-only">{text}</span>

      {/* Segura as dimensões naturais do texto; invisível. */}
      <span
        ref={placeholderRef}
        aria-hidden="true"
        style={{
          visibility: "hidden",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {text}
      </span>

      {/* Recebe os spans por caractere, criados no efeito. */}
      <span
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
        }}
      />
    </Component>
  );
}

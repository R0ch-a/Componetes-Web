"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface DottedGlobeProps {
  /**
   * Mapa equirretangular usado como máscara de terra/oceano. Espera um mapa
   * specular da Terra: água clara, continentes escuros. A primeira URL que
   * carregar é usada.
   */
  mapUrls?: string[];
  /** Quantidade de pontos na grade (o passo em latitude sai de sqrt(density/2)). */
  density?: number;
  /** Lado do quadrado de cada ponto, em pixels CSS. */
  dotSize?: number;
  /** Rotação automática, em radianos por segundo. Negativo inverte. */
  spinSpeed?: number;
  /** Inclinação do eixo, em graus. */
  tilt?: number;
  /** Cor dos pontos, em RGB. */
  color?: [number, number, number];
  /** Desenhar os pontos do hemisfério oposto. */
  showFarSide?: boolean;
  /** Opacidade máxima dos pontos do verso. */
  farOpacity?: number;
  /** Zoom pela roda do mouse. Captura o scroll enquanto o ponteiro está sobre o globo. */
  zoom?: boolean;
  /** Texto exibido enquanto o mapa carrega. */
  loadingLabel?: string;
  className?: string;
}

/** Latitudes acima disso viram borrões sólidos ao serem projetadas. */
const LAT_CAP = (78 * Math.PI) / 180;

// Fora do componente: default de array criado a cada render mudaria a
// identidade das dependências e refaria a máscara à toa.
const DEFAULT_MAP_URLS = ["/textures/earth-specular.jpg"];
const DEFAULT_COLOR: [number, number, number] = [17, 17, 17];

interface GlobePoint {
  x: number;
  y: number;
  z: number;
  backShow: boolean;
}

export function DottedGlobe({
  mapUrls = DEFAULT_MAP_URLS,
  density = 40000,
  dotSize = 2.2,
  spinSpeed = 0.1,
  tilt = 18,
  color = DEFAULT_COLOR,
  showFarSide = true,
  farOpacity = 0.18,
  zoom: allowZoom = true,
  loadingLabel = "carregando mapa-múndi…",
  className,
}: DottedGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let frameId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const [cr, cg, cb] = color;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(rect.width, 1) * dpr;
      canvas.height = Math.max(rect.height, 1) * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    // --- Máscara de terra/oceano ------------------------------------------
    const loadImage = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });

    const buildMask = async () => {
      let img: HTMLImageElement | null = null;
      for (const url of mapUrls) {
        try {
          img = await loadImage(url);
          break;
        } catch {
          // tenta a próxima
        }
      }
      if (!img) throw new Error("nenhuma URL de mapa carregou");

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = 1024;
      maskCanvas.height = 512;
      const mctx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!mctx) throw new Error("contexto 2d indisponível");
      mctx.drawImage(img, 0, 0, maskCanvas.width, maskCanvas.height);

      const w = maskCanvas.width;
      const h = maskCanvas.height;
      const data = mctx.getImageData(0, 0, w, h).data;
      const m = new Uint8Array(w * h);
      // No mapa specular, claro = água e escuro = terra.
      for (let i = 0, j = 0; i < data.length; i += 4, j++) {
        m[j] = data[i] < 80 ? 1 : 0;
      }
      return { w, h, m };
    };

    // --- Grade de pontos ---------------------------------------------------
    const buildPoints = (mask: { w: number; h: number; m: Uint8Array }) => {
      const isLand = (lon: number, lat: number) => {
        let u = (lon + Math.PI) / (2 * Math.PI);
        let v = (Math.PI / 2 - lat) / Math.PI;
        u = u - Math.floor(u);
        if (v < 0) v = 0;
        else if (v >= 1) v = 0.9999;
        const x = (u * mask.w) | 0;
        const y = (v * mask.h) | 0;
        return mask.m[y * mask.w + x] === 1;
      };

      const latSteps = Math.max(40, Math.round(Math.sqrt(density / 2)));
      const lonSteps = latSteps * 2;
      const pts: GlobePoint[] = [];

      for (let i = 0; i < latSteps; i++) {
        const lat = Math.PI / 2 - ((i + 0.5) / latSteps) * Math.PI;
        if (Math.abs(lat) > LAT_CAP) continue;
        const cy = Math.cos(lat);
        const sy = Math.sin(lat);
        for (let j = 0; j < lonSteps; j++) {
          const lon = -Math.PI + ((j + 0.5) / lonSteps) * 2 * Math.PI;
          if (!isLand(lon, lat)) continue;
          pts.push({
            // z negativo para o leste ficar à direita de quem olha.
            x: cy * Math.cos(lon),
            y: sy,
            z: -cy * Math.sin(lon),
            backShow: j % 4 === 0,
          });
        }
      }
      return pts;
    };

    // --- Estado de rotação -------------------------------------------------
    let points: GlobePoint[] = [];
    let rotY = 0;
    let rotX = 0;
    let scale = 1;
    let autoSpin = spinSpeed;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      rotY += autoSpin * dt;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (points.length) {
        const cx = w / 2;
        const cy = h / 2;
        const R = Math.min(w, h) * 0.42 * scale;

        const totalRotX = rotX + (tilt * Math.PI) / 180;
        const cosX = Math.cos(totalRotX);
        const sinX = Math.sin(totalRotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const baseSize = dotSize * dpr;

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          // Rotação em Y (longitude) e depois em X (inclinação).
          const x1 = p.x * cosY + p.z * sinY;
          const z1 = -p.x * sinY + p.z * cosY;
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = p.y * sinX + z1 * cosX;

          const px = cx + x1 * R;
          const py = cy - y2 * R;

          // Comprime os pontos perto dos polos sem virar mancha.
          const latFalloff = Math.sqrt(1 - p.y * p.y);

          if (z2 >= 0) {
            const s = baseSize * (0.6 + 0.4 * latFalloff);
            const edge = z2 < 0.1 ? z2 * 9 : 1;
            ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${(0.92 * edge).toFixed(3)})`;
            ctx.fillRect(px - s / 2, py - s / 2, s, s);
          } else if (showFarSide && p.backShow) {
            const a = farOpacity * (1 + z2);
            if (a > 0.015) {
              ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${a.toFixed(3)})`;
              const s = baseSize * 0.55 * (0.5 + 0.5 * latFalloff);
              ctx.fillRect(px - s / 2, py - s / 2, s, s);
            }
          }
        }
      }

      frameId = requestAnimationFrame(frame);
    };

    // --- Interação ---------------------------------------------------------
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let momentumY = 0;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      canvas.setPointerCapture(e.pointerId);
      lastX = e.clientX;
      lastY = e.clientY;
      autoSpin = 0;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.005;
      rotX = Math.max(-1.2, Math.min(1.2, rotX + dy * 0.005));
      momentumY = dx * 0.005;
    };
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      // Retoma o giro na direção do arremesso e depois volta à velocidade base.
      autoSpin =
        momentumY !== 0
          ? Math.sign(momentumY) * Math.max(spinSpeed, Math.abs(momentumY) * 12)
          : spinSpeed;
      resumeTimer = setTimeout(() => {
        autoSpin = spinSpeed * (autoSpin < 0 ? -1 : 1);
      }, 600);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scale *= e.deltaY > 0 ? 0.94 : 1.06;
      scale = Math.max(0.6, Math.min(2.2, scale));
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    if (allowZoom) canvas.addEventListener("wheel", onWheel, { passive: false });

    // --- Boot --------------------------------------------------------------
    buildMask()
      .then((mask) => {
        if (cancelled) return;
        points = buildPoints(mask);
        setReady(true);
        last = performance.now();
        frameId = requestAnimationFrame(frame);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      clearTimeout(resumeTimer);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [
    mapUrls,
    density,
    dotSize,
    spinSpeed,
    tilt,
    color,
    showFarSide,
    farOpacity,
    allowZoom,
  ]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        className="block h-full w-full cursor-grab touch-none active:cursor-grabbing"
      />

      {!ready && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 grid place-items-center font-mono text-[11px] uppercase tracking-[0.12em] opacity-55 transition-opacity duration-500",
          )}
        >
          {failed ? "falha ao carregar o mapa-múndi" : loadingLabel}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface WaveLandscapeProps {
  /** Pontos na horizontal (eixo X). */
  cols?: number;
  /** Pontos em profundidade (eixo Z). */
  rows?: number;
  /** Distância entre pontos, em unidades de mundo. */
  spacing?: number;
  /** Altura das ondas. */
  amplitude?: number;
  /** Escala de tempo da animação. */
  speed?: number;
  /** Cor das linhas, em RGB. As opacidades das três passadas são fixas. */
  lineColor?: [number, number, number];
  /** Cor de fundo pintada a cada quadro. */
  background?: string;
  /** Brilho quente atrás da malha. Passe null para remover. */
  glow?: string | null;
  /** Vinheta por cima da malha. Passe null para remover. */
  vignette?: string | null;
  /** Deslocamento da câmera conforme o ponteiro (0 desliga). */
  parallax?: number;
  className?: string;
  children?: ReactNode;
}

const DEFAULT_GLOW =
  "radial-gradient(ellipse 60% 45% at 58% 72%, rgba(232, 93, 34, 0.22), transparent 60%), radial-gradient(ellipse 40% 30% at 68% 80%, rgba(240, 90, 30, 0.12), transparent 70%)";

const DEFAULT_VIGNETTE =
  "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)";

export function WaveLandscape({
  cols = 55,
  rows = 38,
  spacing = 56,
  amplitude = 60,
  speed = 0.00038,
  lineColor = [246, 244, 239],
  background = "#000",
  glow = DEFAULT_GLOW,
  vignette = DEFAULT_VIGNETTE,
  parallax = 1,
  className,
  children,
}: WaveLandscapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const [lr, lg, lb] = lineColor;
    let width = 0;
    let height = 0;
    let frameId = 0;

    // O original media a janela; aqui o canvas acompanha o próprio container,
    // para o componente servir tanto em tela cheia quanto dentro de uma caixa.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    // Câmera olhando para baixo a ~45°, logo atrás da borda próxima da malha.
    const cam = { fov: 1000, pitch: 0.785, y: 420, z: -100 };

    const xs = new Float32Array(cols);
    const zs = new Float32Array(rows);
    const halfW = (cols - 1) * spacing * 0.5;
    for (let i = 0; i < cols; i++) xs[i] = i * spacing - halfW;
    for (let j = 0; j < rows; j++) zs[j] = j * spacing;

    const projX = new Float32Array(cols * rows);
    const projY = new Float32Array(cols * rows);
    const projVis = new Uint8Array(cols * rows);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (parallax) window.addEventListener("mousemove", onPointerMove);

    // Ondas sobrepostas em direções diferentes: o campo não fica alinhado à grade.
    const heightAt = (x: number, z: number, t: number) => {
      const a = Math.sin(x * 0.012 + z * 0.004 + t * 0.9) * 1.0;
      const b = Math.sin(-x * 0.006 + z * 0.014 + t * 1.2) * 0.75;
      const c = Math.sin(x * 0.018 - z * 0.011 + t * 0.6) * 0.45;
      const d = Math.cos((x + z) * 0.009 - t * 0.8) * 0.3;
      return (a + b + c + d) * amplitude * 0.5;
    };

    const frame = (now: number) => {
      const t = now * speed;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const sinP = Math.sin(cam.pitch);
      const cosP = Math.cos(cam.pitch);
      const camX = pointer.x * 80 * parallax;
      const camYOffset = pointer.y * 10 * parallax;

      for (let j = 0; j < rows; j++) {
        const z = zs[j];
        for (let i = 0; i < cols; i++) {
          const x = xs[i];
          const y = heightAt(x, z, t);

          const cx = x - camX;
          const cy = y - (cam.y + camYOffset);
          const cz = z - cam.z;

          // Rotação em torno de X (a câmera inclina para baixo).
          const ry = cy * cosP + cz * sinP;
          const rz = -cy * sinP + cz * cosP;

          const idx = j * cols + i;
          if (rz > 1) {
            const k = cam.fov / rz;
            projX[idx] = width * 0.5 + cx * k;
            projY[idx] = height * 0.5 - ry * k;
            projVis[idx] = 1;
          } else {
            projVis[idx] = 0;
          }
        }
      }

      ctx.lineWidth = 0.6;
      ctx.lineCap = "round";

      // Diagonais: dão o aspecto triangulado.
      ctx.beginPath();
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = j * cols + i;
          const b = (j + 1) * cols + (i + 1);
          if (projVis[a] && projVis[b]) {
            ctx.moveTo(projX[a], projY[a]);
            ctx.lineTo(projX[b], projY[b]);
          }
        }
      }
      ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, 0.16)`;
      ctx.stroke();

      // Linhas horizontais, um pouco mais fortes.
      ctx.beginPath();
      for (let j = 0; j < rows; j++) {
        let started = false;
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          if (projVis[idx]) {
            if (!started) {
              ctx.moveTo(projX[idx], projY[idx]);
              started = true;
            } else {
              ctx.lineTo(projX[idx], projY[idx]);
            }
          } else {
            started = false;
          }
        }
      }
      ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, 0.28)`;
      ctx.stroke();

      // Linhas de profundidade.
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        let started = false;
        for (let j = 0; j < rows; j++) {
          const idx = j * cols + i;
          if (projVis[idx]) {
            if (!started) {
              ctx.moveTo(projX[idx], projY[idx]);
              started = true;
            } else {
              ctx.lineTo(projX[idx], projY[idx]);
            }
          } else {
            started = false;
          }
        }
      }
      ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, 0.18)`;
      ctx.stroke();

      frameId = requestAnimationFrame(frame);
    };

    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
    };
  }, [
    cols,
    rows,
    spacing,
    amplitude,
    speed,
    lineColor,
    background,
    parallax,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ background }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      {glow && (
        <div
          className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
          style={{ background: glow }}
        />
      )}

      {vignette && (
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{ background: vignette }}
        />
      )}

      {children && <div className="relative z-[4] h-full w-full">{children}</div>}
    </div>
  );
}

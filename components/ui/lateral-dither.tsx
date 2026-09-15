"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LateralDitherProps {
  /** Cor do ponto aceso, em RGB 0–255. O fundo é sempre preto. */
  tone?: [number, number, number];
  /** Lado do pixel do dither, em px de CSS. O Neon Dither usa 4. */
  pixelSize?: number;
  /** Velocidade da animação. 0.5775 é a do Neon Dither. */
  speed?: number;
  /** Escala do padrão. Maior = faixa de transição mais larga. 1.1775 é a do Neon Dither. */
  scale?: number;
  /** Multiplicador da ida e volta da frente. 0 deixa a frente parada. */
  amplitude?: number;
  /**
   * Onde a frente repousa, em fração da largura contada da esquerda. 0.5 põe
   * no meio, como o original põe na meia altura.
   */
  front?: number;
  className?: string;
  children?: ReactNode;
}

/*
 * O MESMO DITHER DO NEON DITHER, GIRADO E SEM A CURVA EM S
 *
 * O Neon Dither usa o formato "wave" do @paper-design/shaders:
 *
 *   wave  = cos(.5x - 2t) * sin(1.5x + t) * (.75 + .25cos(3t))
 *   shape = 1 - smoothstep(-1, 1, y + wave)
 *
 * A frente sobe e desce com `wave`, e como `wave` depende de x, cada coluna
 * sobe numa altura diferente — daí a curva em S. A biblioteca não oferece
 * prop para desligar isso, então o shader abaixo reproduz a mesma matemática
 * com duas trocas:
 *
 *   1. x = 0 dentro do `wave`: sobra só o movimento no tempo, idêntico ao da
 *      coluna central do original, aplicado à frente inteira. A borda fica
 *      reta e vai e volta.
 *   2. A "altura" do original vira -x: a massa densa nasce na lateral direita.
 *
 * O resto é cópia fiel: mesmo espaço de coordenadas (px / menor dimensão,
 * dividido pela escala, vezes 4), mesma Bayer 4x4 ancorada no centro da caixa,
 * mesmo corte step(.5, shape + bayer - .5), mesmo relógio (t = .5 * segundos *
 * speed).
 */

const VERT = `attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

// colunas, linhas do buffer (uma célula por pixel de buffer)
uniform vec2 u_cells;
// lado da célula (px), menor dimensão da caixa (px), escala, repouso da frente (unidades do padrão)
uniform vec4 u_space;
// t (já no relógio do shader original), amplitude
uniform vec2 u_motion;
uniform vec3 u_tone;

// Bayer 4x4 sem array (GLSL ES 1.0). Gera a mesma matriz da biblioteca:
// 0 8 2 10 / 12 4 14 6 / 3 11 1 9 / 15 7 13 5, dividida por 16.
float bayer2(vec2 a) {
  a = floor(a);
  return fract(dot(a, vec2(0.5, a.y * 0.75)));
}
float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

void main() {
  // Coordenada centrada na caixa, em células — como o pxSizeUV da biblioteca.
  vec2 pxUV = gl_FragCoord.xy - 0.5 * u_cells;
  vec2 cellCenter = floor(pxUV) + 0.5;

  // Espaço do formato "wave": px / menor dimensão, / escala, * 4.
  vec2 s = cellCenter * u_space.x / u_space.y / u_space.z * 4.0;

  float t = u_motion.x;
  // Coluna x = 0 do "wave" original: cos(-2t) * sin(t) * (.75 + .25cos(3t)).
  float wave = cos(2.0 * t) * sin(t) * (0.75 + 0.25 * cos(3.0 * t)) * u_motion.y;

  // Girado para vir da direita: onde o original usa y, aqui entra -x.
  float shape = 1.0 - smoothstep(-1.0, 1.0, -(s.x - u_space.w) + wave);

  float dithering = bayer4(floor(pxUV)) - 0.5;
  float on = step(0.5, shape + dithering);
  gl_FragColor = vec4(u_tone * on, 1.0);
}`;

export function LateralDither({
  tone = [31, 31, 31],
  pixelSize = 4,
  speed = 0.5775,
  scale = 1.1775,
  amplitude = 1,
  front = 0.5,
  className,
  children,
}: LateralDitherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lidos a cada quadro: trocar a cor pelo switch não reinicia o shader nem o relógio.
  const params = useRef({ tone, speed, scale, amplitude, front });
  params.current = { tone, speed, scale, amplitude, front };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("lateral-dither / shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("lateral-dither / link:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uCells = gl.getUniformLocation(program, "u_cells");
    const uSpace = gl.getUniformLocation(program, "u_space");
    const uMotion = gl.getUniformLocation(program, "u_motion");
    const uTone = gl.getUniformLocation(program, "u_tone");

    /* Uma célula por pixel de buffer, com o lado arredondado para pixels
       inteiros de dispositivo — a grade não treme em DPR fracionário. */
    let cols = 1;
    let rows = 1;
    let cssCell = pixelSize;
    let largura = 1;
    let menorLado = 1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      const cellDevice = Math.max(1, Math.round(pixelSize * dpr));
      cssCell = cellDevice / dpr;
      largura = Math.max(1, rect.width);
      menorLado = Math.max(1, Math.min(rect.width, rect.height));
      cols = Math.max(1, Math.ceil((rect.width * dpr) / cellDevice));
      rows = Math.max(1, Math.ceil((rect.height * dpr) / cellDevice));
      if (canvas.width !== cols || canvas.height !== rows) {
        canvas.width = cols;
        canvas.height = rows;
      }
      canvas.style.width = `${(cols * cellDevice) / dpr}px`;
      canvas.style.height = `${(rows * cellDevice) / dpr}px`;
      gl.viewport(0, 0, cols, rows);
      desenhar();
    };

    /* Relógio igual ao da biblioteca: acumula ms * speed só enquanto roda.
       Pausar (fora da tela, aba oculta) não faz a frente saltar ao voltar. */
    let acumulado = 0;
    let ultimo = performance.now();
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const desenhar = () => {
      const p = params.current;
      const t = 0.5 * acumulado * 1e-3;
      // Repouso da frente, convertido de fração da largura para o espaço do padrão.
      const repouso = (((p.front - 0.5) * largura) / menorLado / p.scale) * 4;
      gl.uniform2f(uCells, cols, rows);
      gl.uniform4f(uSpace, cssCell, menorLado, p.scale, repouso);
      gl.uniform2f(uMotion, t, p.amplitude);
      gl.uniform3f(uTone, p.tone[0] / 255, p.tone[1] / 255, p.tone[2] / 255);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let visivel = true;

    const quadro = (agora: number) => {
      raf = 0;
      const dt = Math.min(agora - ultimo, 100);
      ultimo = agora;
      acumulado += dt * params.current.speed;
      desenhar();
      if (visivel && !document.hidden) raf = requestAnimationFrame(quadro);
    };

    const ligar = () => {
      // Com movimento reduzido fica um quadro parado: a frente aparece, só não anda.
      if (reduzido) {
        desenhar();
        return;
      }
      if (raf === 0 && visivel && !document.hidden) {
        ultimo = performance.now();
        raf = requestAnimationFrame(quadro);
      }
    };

    const parar = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(([entrada]) => {
      visivel = entrada?.isIntersecting ?? true;
      if (visivel) ligar();
      else parar();
    });
    io.observe(container);

    const onVisibilidade = () => (document.hidden ? parar() : ligar());
    document.addEventListener("visibilitychange", onVisibilidade);

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    ligar();

    return () => {
      parar();
      io.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilidade);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [pixelSize]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden bg-black", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 block"
        style={{ imageRendering: "pixelated" }}
      />
      {children && <div className="relative z-[1] h-full w-full">{children}</div>}
    </div>
  );
}

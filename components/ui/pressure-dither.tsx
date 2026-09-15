"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PressureDitherProps {
  /** Lado de cada pixel do dither, em px de CSS. */
  pixelSize?: number;
  /**
   * Tons disponíveis contando o preto. O padrão 2 é dither de 1 bit: preto e
   * um tom só, e a densidade dos pontos faz todo o trabalho. Acima disso
   * entram tons intermediários do preto até `tone`.
   */
  levels?: number;
  /** Velocidade com que a frente de onda se afasta do cursor, em px/s. */
  speed?: number;
  /** Distância entre duas faixas de compressão dentro do pulso, em px. */
  wavelength?: number;
  /** Espessura do pacote de onda que viaja, em px. */
  packetWidth?: number;
  /** Quanto o pulso perde de força por segundo. */
  decay?: number;
  /** Distância em que o pulso cai à metade só por se espalhar, em px. */
  spread?: number;
  /** Multiplicador geral do brilho. */
  intensity?: number;
  /** Intervalo mínimo entre dois pulsos soltos pelo movimento, em ms. */
  emitInterval?: number;
  /** Cor do ponto aceso, em RGB 0–255. O fundo é sempre preto. */
  tone?: [number, number, number];
  /** Um clique solta um pulso mais forte. */
  pulseOnClick?: boolean;
  /**
   * Raio, em px, do núcleo sólido em volta do cursor: ali todo pixel fica
   * aceso, sem dither. Acompanha o ponteiro sem atraso. 0 desliga.
   */
  coreRadius?: number;
  className?: string;
  children?: ReactNode;
}

/*
 * ONDA LONGITUDINAL, E NÃO TRANSVERSAL
 *
 * Numa onda transversal (a do Neon Dither) o meio se desloca perpendicular à
 * propagação: a forma sobe e desce enquanto viaja. Numa longitudinal — som,
 * pressão — o meio se desloca NA direção da propagação, e o que se vê é
 * densidade: faixas de compressão e rarefação que se afastam da fonte.
 *
 * Dither é o meio certo para isso, porque densidade de pontos é exatamente o
 * que ele desenha. Cada pulso é um pacote que viaja para fora do ponto onde o
 * cursor estava; dentro do pacote, um cosseno ao longo da distância alterna
 * faixas densas e esparsas. Muitos pulsos se somam por superposição.
 */

const VERT = `attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const fragmentSource = (emitters: number) => `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define EMITTERS ${emitters}

// xy: posição em células (eixo y do GL), z: nascimento (s), w: força
uniform vec4 u_emit[EMITTERS];
// velocidade, comprimento de onda, largura do pacote (células/s e células), decaimento (1/s)
uniform vec4 u_wave;
// níveis, intensidade, espalhamento (células), tempo (s)
uniform vec4 u_look;
uniform vec3 u_tone;
// xy: posição do cursor em células (eixo y do GL), z: raio do núcleo (células), w: presença (0 ou 1)
uniform vec4 u_cursor;

// Bayer 4x4 sem array: GLSL ES 1.0 não aceita inicializador de array.
float bayer2(vec2 a) {
  a = floor(a);
  return fract(dot(a, vec2(0.5, a.y * 0.75)));
}
float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

void main() {
  // O canvas tem uma célula por pixel de buffer, então gl_FragCoord já é o
  // centro da célula: o pulso é avaliado uma vez por "pixel grande".
  vec2 cell = gl_FragCoord.xy;

  // Núcleo sólido em volta do cursor: cor cheia, sem dither. Vem antes do laço
  // de pulsos de propósito — dentro do disco o resultado já é conhecido, e
  // sair cedo poupa o cálculo de todos os emissores nessas células.
  if (u_cursor.w > 0.5 && distance(cell, u_cursor.xy) <= u_cursor.z) {
    gl_FragColor = vec4(u_tone, 1.0);
    return;
  }

  float time = u_look.w;
  float field = 0.0;

  for (int i = 0; i < EMITTERS; i++) {
    vec4 e = u_emit[i];
    if (e.w <= 0.0) continue;
    float age = time - e.z;
    if (age < 0.0) continue;

    float d = distance(cell, e.xy);
    // x = posição relativa à frente de onda, que está em age * velocidade.
    float x = d - age * u_wave.x;
    float envelope = exp(-(x * x) / (u_wave.z * u_wave.z));
    // Compressão e rarefação ao longo da direção de propagação.
    float bands = 0.5 + 0.5 * cos(6.2831853 * x / u_wave.y);
    float attenuation = e.w * exp(-age * u_wave.w) / (1.0 + d / u_look.z);
    field += envelope * bands * attenuation;
  }

  // Saturação suave: muitos pulsos sobrepostos clareiam sem estourar em branco chapado.
  field = 1.0 - exp(-field * u_look.y * 1.6);

  float steps = max(u_look.x - 1.0, 1.0);
  float v = field * steps;
  // O +1/32 no limiar é o que mantém o preto preto: sem ele, a célula de
  // limiar zero da matriz acenderia mesmo com campo nulo e a janela ociosa
  // mostraria uma grade fantasma de pontos.
  float threshold = bayer4(cell) + 0.03125;
  float q = (floor(v) + step(threshold, fract(v))) / steps;

  gl_FragColor = vec4(u_tone * q, 1.0);
}`;

/** Abaixo disso o pulso é invisível e a vaga dele pode ser liberada. */
const LIMIAR_DE_VIDA = 0.02;

export function PressureDither({
  pixelSize = 3,
  levels = 2,
  speed = 360,
  wavelength = 22,
  packetWidth = 60,
  decay = 1.6,
  spread = 240,
  intensity = 1,
  emitInterval = 70,
  tone = [31, 31, 31],
  pulseOnClick = true,
  coreRadius = 40,
  className,
  children,
}: PressureDitherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parâmetros num ref, lidos a cada quadro: ajustar uma prop não derruba o
  // contexto WebGL nem apaga os pulsos em curso. Só pixelSize reconstrói,
  // porque muda o tamanho do buffer.
  const params = useRef({
    levels,
    speed,
    wavelength,
    packetWidth,
    decay,
    spread,
    intensity,
    emitInterval,
    tone,
    pulseOnClick,
    coreRadius,
  });
  params.current = {
    levels,
    speed,
    wavelength,
    packetWidth,
    decay,
    spread,
    intensity,
    emitInterval,
    tone,
    pulseOnClick,
    coreRadius,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
    });
    // Sem WebGL a janela continua existindo — só fica preta, sem efeito.
    if (!gl) return;

    // WebGL1 garante só 16 vetores de uniform no fragment shader. Quatro vão
    // para u_wave, u_look, u_tone e u_cursor; o resto vira vaga de pulso. Na
    // maioria das GPUs cabe o teto de 32; num dispositivo no mínimo da
    // especificação ficam 12 — a conta fecha exata em 16 — e os pulsos mais
    // velhos são reciclados um pouco antes de sumir.
    const maxUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS) as number;
    const N = Math.max(8, Math.min(32, maxUniforms - 4));

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("pressure-dither / shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSource(N));
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("pressure-dither / link:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    // Um triângulo que cobre a tela inteira.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uEmit = gl.getUniformLocation(program, "u_emit");
    const uWave = gl.getUniformLocation(program, "u_wave");
    const uLook = gl.getUniformLocation(program, "u_look");
    const uTone = gl.getUniformLocation(program, "u_tone");
    const uCursor = gl.getUniformLocation(program, "u_cursor");

    /* ---- Posição do cursor, em px relativos ao container ----
       Guardada em px, e não em células: a conversão acontece na hora de
       desenhar. Se o canvas for redimensionado entre o evento e o quadro
       (zoom, troca de DPR, janela esticada), uma posição já convertida estaria
       na escala de célula antiga e o disco sairia do lugar até o próximo
       movimento. */
    let cursorPx = 0;
    let cursorPy = 0;
    let cursorDentro = false;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- Pulsos: fila circular. Como são emitidos em ordem de tempo, a
       próxima vaga a ser sobrescrita é sempre a do pulso mais velho. ---- */
    const emit = new Float32Array(N * 4);
    let head = 0;

    const algumVivo = () => {
      for (let i = 0; i < N; i++) if (emit[i * 4 + 3] > 0) return true;
      return false;
    };

    /* ---- Tamanho: UMA célula por pixel de buffer ----
       O buffer tem só colunas x linhas de células e o CSS amplia com
       image-rendering: pixelated. Sai ~9x mais barato que avaliar o pulso por
       pixel de tela, e cada "pixel grande" tem um tom só.

       O lado da célula é arredondado para pixels INTEIROS de dispositivo. Com
       DPR 1.5 e pixelSize 3 a célula daria 4,5px, e a ampliação alternaria
       colunas de 4 e 5 — uma trama irregular atravessando o dither. Inteiro, a
       grade fica uniforme; o canvas passa um pouco do container e o overflow
       corta a sobra. */
    let cols = 1;
    let rows = 1;
    let cssCell = pixelSize;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      const cellDevice = Math.max(1, Math.round(pixelSize * dpr));
      cssCell = cellDevice / dpr;
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

    let t0 = performance.now();
    let raf = 0;

    const desenhar = () => {
      const p = params.current;
      const t = (performance.now() - t0) / 1000;

      // Libera as vagas cujo pulso já não aparece.
      let vivo = false;
      for (let i = 0; i < N; i++) {
        const w = emit[i * 4 + 3];
        if (w <= 0) continue;
        const idade = t - emit[i * 4 + 2];
        if (idade > 0 && w * Math.exp(-idade * p.decay) < LIMIAR_DE_VIDA) {
          emit[i * 4 + 3] = 0;
        } else {
          vivo = true;
        }
      }

      // Com movimento reduzido a frente não viaja: sobra um halo parado de
      // faixas concêntricas em volta do cursor, que apaga sozinho.
      const velocidade = reduzido ? 0 : p.speed;
      gl.uniform4fv(uEmit, emit);
      gl.uniform4f(uWave, velocidade / cssCell, p.wavelength / cssCell, p.packetWidth / cssCell, p.decay);
      gl.uniform4f(uLook, p.levels, p.intensity, p.spread / cssCell, t);
      gl.uniform3f(uTone, p.tone[0] / 255, p.tone[1] / 255, p.tone[2] / 255);
      gl.uniform4f(
        uCursor,
        cursorPx / cssCell,
        // gl_FragCoord cresce para CIMA; o ponteiro, para baixo.
        rows - cursorPy / cssCell,
        p.coreRadius / cssCell,
        cursorDentro && p.coreRadius > 0 ? 1 : 0,
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      return vivo;
    };

    const quadro = () => {
      raf = 0;
      // O laço só roda enquanto houver pulso vivo: janela ociosa não gasta nada.
      if (desenhar()) raf = requestAnimationFrame(quadro);
    };

    const acordar = () => {
      if (raf === 0) raf = requestAnimationFrame(quadro);
    };

    /** Coordenada da tela -> célula do buffer. gl_FragCoord cresce para CIMA; o ponteiro, para baixo. */
    const paraCelula = (clientX: number, clientY: number): [number, number] => {
      const rect = container.getBoundingClientRect();
      return [(clientX - rect.left) / cssCell, rows - (clientY - rect.top) / cssCell];
    };

    const soltarPulso = (clientX: number, clientY: number, forca: number) => {
      // Sem pulso vivo, o relógio recomeça do zero. Em sessões longas o tempo
      // cresceria sem limite, e em GPU mediump a subtração tempo - nascimento
      // perderia precisão depois de alguns milhares de segundos.
      if (!algumVivo()) t0 = performance.now();
      const [x, y] = paraCelula(clientX, clientY);
      const base = head * 4;
      emit[base] = x;
      emit[base + 1] = y;
      emit[base + 2] = (performance.now() - t0) / 1000;
      emit[base + 3] = forca;
      head = (head + 1) % N;
      acordar();
    };

    /* ---- Cursor ----
       A força do pulso acompanha a velocidade do ponteiro: passar devagar
       solta ondas suaves, varrer rápido solta frentes fortes. */
    let ultimoPulso = -Infinity;
    let ultimoX = 0;
    let ultimoY = 0;
    let ultimoT = 0;

    const onMove = (event: PointerEvent) => {
      const agora = performance.now();
      const dt = Math.max(1, agora - ultimoT);
      const velocidadePx = (Math.hypot(event.clientX - ultimoX, event.clientY - ultimoY) / dt) * 1000;
      ultimoX = event.clientX;
      ultimoY = event.clientY;
      ultimoT = agora;

      // O núcleo acompanha TODO movimento, não só os que soltam pulso. Os pulsos
      // são limitados a um a cada emitInterval; se o disco dependesse deles,
      // ficaria até 70ms atrás do ponteiro e pareceria arrastado.
      const rect = container.getBoundingClientRect();
      cursorPx = event.clientX - rect.left;
      cursorPy = event.clientY - rect.top;
      cursorDentro = true;
      acordar();

      if (agora - ultimoPulso < params.current.emitInterval) return;
      ultimoPulso = agora;
      soltarPulso(event.clientX, event.clientY, Math.min(1, 0.35 + velocidadePx / 1800));
    };

    const onDown = (event: PointerEvent) => {
      if (!params.current.pulseOnClick) return;
      soltarPulso(event.clientX, event.clientY, 1.6);
    };

    const onLeave = () => {
      cursorDentro = false;
      acordar();
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerdown", onDown);
    container.addEventListener("pointerleave", onLeave);

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("pointerleave", onLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [pixelSize]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-black", className)}
    >
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

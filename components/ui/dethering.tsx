"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DetheringProps {
  /** Lado da célula, em px de CSS. */
  cellSize?: number;
  /** Quanto o ponto ocupa da célula, no pixel mais escuro. */
  fill?: number;
  /** Quanto o ponto CLARO engorda além do preenchimento base. */
  fillVariation?: number;
  /** Degraus de quantização do brilho. 0 = contínuo. */
  levels?: number;
  /** Ganho de brilho. */
  gain?: number;
  /** Velocidade da deriva. */
  speed?: number;
  /** Escala do ruído. */
  noiseScale?: number;
  /** Nuvem em 0, fumaça conforme sobe. É o parâmetro que define o caráter. */
  warp?: number;
  /** Oitavas do fbm, de 1 a 6. */
  octaves?: number;
  /** Gama aplicado ao brilho. */
  contrast?: number;
  /** Vinheta das bordas. 0 = campo de sangria total. */
  vignette?: number;
  /**
   * Altura da dissolução do rodapé, em fração da altura do canvas. 0 desliga
   * e deixa só o degradê de cor, que corta a grade numa borda reta.
   */
  fadeHeight?: number;
  /** Onde a dissolução termina, também contado do rodapé. */
  fadeStart?: number;
  /** Cor do ponto, em hex. */
  color?: string;
  /** Fundo da hero, atrás do campo. */
  background?: string;
  /**
   * Cor da página abaixo da hero — o alvo do degradê que fecha a diferença
   * de cor. Passe null para remover a camada.
   */
  fadeTo?: string | null;
  className?: string;
  children?: ReactNode;
}

const VERT = `attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_ponteiro;
uniform float u_cel;
uniform float u_preench;
uniform float u_preenchVar;
uniform float u_niveis;
uniform float u_ganho;
uniform float u_vel;
uniform float u_escala;
uniform float u_warp;
uniform float u_oitavas;
uniform float u_contraste;
uniform float u_faixa;
uniform float u_desv;
uniform float u_desvIni;
uniform vec3  u_cor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float ruido(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

/* O número de oitavas é regulável, mas o laço precisa de limite constante:
   GLSL ES 1.0 não aceita contagem vinda de uniform. Por isso o laço vai até 6
   e sai antes com break. */
float fbm(vec2 p) {
  float v = 0.0, a = 0.5, soma = 0.0;
  for (int i = 0; i < 6; i++) {
    if (float(i) >= u_oitavas) break;
    v += a * ruido(p);
    soma += a;
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return soma > 0.0 ? v / soma : 0.0;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv   = frag / u_res;

  /* O ruído é amostrado no CENTRO da célula, nunca no pixel: é o que faz cada
     ponto ter um brilho só. Amostrando por pixel o ponto sairia com gradiente
     interno e a grade se perderia. */
  vec2 celula = floor(frag / u_cel);
  vec2 centro = (celula + 0.5) * u_cel;
  vec2 cuv    = centro / u_res;

  vec2 p = vec2(cuv.x * (u_res.x / u_res.y), cuv.y) * u_escala;

  vec2 deriva = (u_ponteiro - 0.5) * 0.35;
  float t = u_time * u_vel;

  /* u_warp é o botão "nuvem <-> fumaça". Em 0 o ruído não é deslocado e o campo
     fica em manchas moles e arredondadas. Quanto maior, mais o ruído puxa a si
     mesmo e mais aparecem filamentos e redemoinhos — o aspecto de fumaça. */
  vec2 q = vec2(fbm(p + vec2(0.0, t)),
                fbm(p + vec2(5.2, 1.3) - t * 0.8));
  float f = fbm(p + u_warp * q + deriva + vec2(t * 0.35, -t * 0.2));

  f *= 0.88 + 0.12 * sin(u_time * 0.42);

  float lum = pow(clamp(f, 0.0, 1.0), u_contraste) * u_ganho;

  /* Vinheta das bordas. Em 0 desaparece e o campo preenche tudo, que é o que
     uma hero de largura total pede. */
  float faixa = smoothstep(0.02, 0.30, uv.y) * smoothstep(1.02, 0.72, uv.y)
              * smoothstep(0.0, 0.10, uv.x) * smoothstep(1.0, 0.90, uv.x);
  lum *= mix(1.0, faixa, u_faixa);

  /* Quantização opcional: 0 = contínuo. */
  if (u_niveis >= 2.0) {
    lum = floor(max(lum, 0.0) * u_niveis) / u_niveis;
  }

  vec2 local = abs(frag - centro) / (u_cel * 0.5);
  float d = max(local.x, local.y);

  /* ---- Desvanecimento do rodapé ----
     Ataca o RAIO do ponto, e não o alfa. São coisas diferentes na tela: baixando
     o alfa o ponto continua do mesmo TAMANHO e só fica transparente, então a
     grade inteira permanece legível e o campo vira um véu cinza uniforme.
     Encolhendo o raio a grade se desfaz.

     Em GLSL o eixo Y do gl_FragCoord cresce para CIMA, então o rodapé é
     uv.y = 0 e a conta é um smoothstep subindo dali. */
  float fim = 1.0;
  if (u_desv > 0.0) {
    fim = smoothstep(u_desvIni, u_desvIni + u_desv, uv.y);
  }

  /* ---- Variação do preenchimento pelo brilho ----
     O ponto claro engorda até u_preenchVar ACIMA do preenchimento base; conforme
     escurece, encolhe de volta ao valor base.

     A normalização por u_ganho não é detalhe: lum tem teto em u_ganho, não em
     1.0, então "u_preench + u_preenchVar * lum" nunca entregaria a variação
     inteira que a prop promete — com ganho 0.85 o pixel mais claro receberia
     0.17 de uma variação pedida de 0.2.

     Vem DEPOIS da quantização de propósito: assim o tamanho do ponto anda nos
     mesmos degraus que o brilho, em vez de variar continuamente sobre um brilho
     que pula. */
  float claro = u_ganho > 0.0 ? clamp(lum / u_ganho, 0.0, 1.0) : 0.0;
  float preench = u_preench + u_preenchVar * claro;

  /* Piso do clamp em 0.0: com um piso positivo sobraria sempre um ponto mínimo
     aceso e o campo nunca zeraria de fato. */
  float raio = clamp(preench * (0.22 + lum * 1.05) * fim, 0.0, 1.0);
  float m = 1.0 - smoothstep(raio - 0.22, raio, d);

  float brilho = 0.06 + lum * 1.25;
  gl_FragColor = vec4(u_cor * brilho, m * (0.10 + lum * 1.6));
}`;

/* O degradê é feito por MÁSCARA sobre uma cor sólida, e não por
   `linear-gradient(transparent, cor)`. Interpolar a partir de `transparent`
   passa por preto transparente, o que suja o meio do degradê quando o fundo da
   página não é preto. Com máscara, a rampa é de alfa puro e o componente aceita
   qualquer cor de fundo. */
const MASCARA_FIM =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 26%, rgba(0,0,0,0.85) 66%, #000 88%)";

/** Máscara do fallback: replica na marra o desvanecimento que o shader faria. */
const MASCARA_RESERVA = "linear-gradient(to bottom, #000 50%, transparent 96%)";

function hexParaRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16) / 255,
    parseInt(h.substring(2, 4), 16) / 255,
    parseInt(h.substring(4, 6), 16) / 255,
  ];
}

/**
 * Campo dot-matrix procedural em WebGL, dissolvendo-se no rodapé.
 *
 * A dissolução são DUAS camadas, e a distinção é o ponto todo do componente:
 *
 *   1. O SHADER encolhe o raio do ponto até zero (`fadeHeight`). É o que
 *      dissolve a GRADE — só baixar a opacidade deixaria a grade inteira
 *      visível como um véu cinza uniforme.
 *   2. A camada de cor (`fadeTo`) fecha a diferença entre o fundo da hero e o
 *      fundo da página. Sozinha, ela CORTA a grade numa borda reta.
 *
 * A camada de cor começa mais abaixo do que o desvanecimento dos pontos de
 * propósito: os pontos precisam já estar sumindo quando o fundo começa a fechar,
 * senão o degradê come um campo ainda cheio e lê como neblina.
 *
 * Sem WebGL entra uma grade estática em gradiente repetido, com a mesma
 * dissolução feita por máscara: melhor um campo parado do que um retângulo.
 */
export function Dethering({
  cellSize = 5.5,
  fill = 0.7,
  fillVariation = 0.2,
  levels = 16,
  gain = 0.85,
  speed = 0.09,
  noiseScale = 1.8,
  warp = 3,
  octaves = 6,
  contrast = 0.4,
  vignette = 0,
  fadeHeight = 0.42,
  fadeStart = 0.02,
  color = "#e8e9ec",
  background = "#000",
  fadeTo = "#000",
  className,
  children,
}: DetheringProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [semWebgl, setSemWebgl] = useState(false);

  useEffect(() => {
    const tela = canvasRef.current;
    if (!tela) return;

    const gl = tela.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      depth: false,
    });
    if (!gl) {
      setSemWebgl(true);
      return;
    }

    const compilar = (tipo: number, src: string) => {
      const s = gl.createShader(tipo);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("dethering / shader:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vs = compilar(gl.VERTEX_SHADER, VERT);
    const fs = compilar(gl.FRAGMENT_SHADER, FRAG);
    const prog = vs && fs ? gl.createProgram() : null;
    if (!vs || !fs || !prog) {
      setSemWebgl(true);
      return;
    }

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("dethering / link:", gl.getProgramInfoLog(prog));
      setSemWebgl(true);
      return;
    }
    gl.useProgram(prog);
    setSemWebgl(false);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U: Record<string, WebGLUniformLocation | null> = {};
    [
      "u_res",
      "u_time",
      "u_ponteiro",
      "u_cel",
      "u_preench",
      "u_preenchVar",
      "u_niveis",
      "u_ganho",
      "u_vel",
      "u_escala",
      "u_warp",
      "u_oitavas",
      "u_contraste",
      "u_faixa",
      "u_desv",
      "u_desvIni",
      "u_cor",
    ].forEach((n) => {
      U[n] = gl.getUniformLocation(prog, n);
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const RGB = hexParaRgb(color);
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- Tamanho ---- */
    let dpr = 1;
    const medir = () => {
      // Teto de 2: acima disso o custo por pixel quadruplica e a célula fica
      // pequena demais para ler como grade.
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = tela.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (tela.width !== w || tela.height !== h) {
        tela.width = w;
        tela.height = h;
      }
      gl.viewport(0, 0, tela.width, tela.height);
    };
    const observer = new ResizeObserver(medir);
    observer.observe(tela);
    medir();

    /* ---- Ponteiro ----
       O ouvinte fica na window, e não no canvas: assim o campo continua
       respondendo com o cursor sobre o texto da hero, e o canvas pode ficar com
       pointer-events:none sem perder o efeito. */
    const alvo = [0.5, 0.5];
    const suave = [0.5, 0.5];
    const onPointer = (e: PointerEvent) => {
      const r = tela.getBoundingClientRect();
      alvo[0] = (e.clientX - r.left) / r.width;
      alvo[1] = (e.clientY - r.top) / r.height;
    };
    if (!reduz) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    /* ---- Laço ---- */
    const t0 = performance.now();
    let raf: number | null = null;

    const quadro = () => {
      // Persegue o ponteiro com atraso: lê como inércia da massa, e não como
      // algo grudado no cursor.
      suave[0] += (alvo[0] - suave[0]) * 0.03;
      suave[1] += (alvo[1] - suave[1]) * 0.03;

      // Com movimento reduzido o tempo fica num instante fixo: a nuvem aparece
      // formada, só não anda.
      const t = reduz ? 12.0 : (performance.now() - t0) / 1000;

      gl.uniform2f(U.u_res, tela.width, tela.height);
      gl.uniform1f(U.u_time, t);
      gl.uniform2f(U.u_ponteiro, suave[0], suave[1]);
      gl.uniform1f(U.u_cel, cellSize * dpr);
      gl.uniform1f(U.u_preench, fill);
      gl.uniform1f(U.u_preenchVar, fillVariation);
      gl.uniform1f(U.u_niveis, levels);
      gl.uniform1f(U.u_ganho, gain);
      gl.uniform1f(U.u_vel, speed);
      gl.uniform1f(U.u_escala, noiseScale);
      gl.uniform1f(U.u_warp, warp);
      gl.uniform1f(U.u_oitavas, octaves);
      gl.uniform1f(U.u_contraste, contrast);
      gl.uniform1f(U.u_faixa, vignette);
      gl.uniform1f(U.u_desv, fadeHeight);
      gl.uniform1f(U.u_desvIni, fadeStart);
      gl.uniform3f(U.u_cor, RGB[0], RGB[1], RGB[2]);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = reduz ? null : requestAnimationFrame(quadro);
    };

    const ligar = () => {
      if (raf === null) raf = requestAnimationFrame(quadro);
    };
    const parar = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    // Fora da tela ou em aba oculta não há o que mostrar: com seis oitavas por
    // pixel, deixar o laço rodando ali custa bateria a troco de nada.
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => (e.isIntersecting ? ligar() : parar()));
      },
      { threshold: 0.02 }
    );
    io.observe(tela);

    const onVis = () => (document.hidden ? parar() : ligar());
    document.addEventListener("visibilitychange", onVis);

    ligar();

    return () => {
      parar();
      io.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [
    cellSize,
    fill,
    fillVariation,
    levels,
    gain,
    speed,
    noiseScale,
    warp,
    octaves,
    contrast,
    vignette,
    fadeHeight,
    fadeStart,
    color,
  ]);

  return (
    <div
      className={cn(
        "relative h-[78vh] max-h-[860px] min-h-[520px] w-full overflow-hidden",
        className
      )}
      style={{ background }}
    >
      {/* O canvas tem alfa: o fundo vem do container, não dele. */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] block h-full w-full"
      />

      {semWebgl && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            backgroundImage: `radial-gradient(circle, ${color}29 1px, transparent 1.6px)`,
            backgroundSize: "6px 6px",
            WebkitMaskImage: MASCARA_RESERVA,
            maskImage: MASCARA_RESERVA,
          }}
        />
      )}

      {fadeTo && (
        <div
          aria-hidden
          // -bottom-px mata a fresta de subpixel no zoom.
          className="pointer-events-none absolute inset-x-0 -bottom-px z-[2] h-[45%]"
          style={{
            background: fadeTo,
            WebkitMaskImage: MASCARA_FIM,
            maskImage: MASCARA_FIM,
          }}
        />
      )}

      {children && (
        /* O conteúdo ocupa só a parte de CIMA da hero, e o texto se centra
           dentro dela. A metade de baixo fica livre porque é onde a dissolução
           acontece — é o que o componente existe para mostrar.

           Altura percentual, e não padding-bottom percentual: padding em
           porcentagem resolve contra a LARGURA do bloco que o contém, mesmo
           quando é padding vertical, e o texto subiria ou desceria conforme a
           janela fosse larga ou estreita. */
        <div className="relative z-[3] mx-auto flex h-[68%] max-w-[1100px] flex-col justify-center px-8">
          {children}
        </div>
      )}
    </div>
  );
}

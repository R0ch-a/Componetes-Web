"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ParticleGraphStats {
  /** Nós na nuvem. */
  nodes: number;
  /** Ligações desenhadas no último quadro. */
  links: number;
  fps: number;
}

export interface ParticleGraphProps {
  /** Quantidade de nós. Mudar reconstrói a nuvem. */
  nodes?: number;
  /** Escala do grafo projetado. */
  scale?: number;
  /** Raio da esfera onde os nós nascem e onde a deriva reflete. */
  spread?: number;
  /** Distância máxima (em unidades de mundo) para dois nós virarem uma linha. */
  linkDistance?: number;
  /** Distância da câmera até o centro da nuvem. */
  cameraDistance?: number;

  /** Espessura das linhas, em px. */
  lineWidth?: number;
  /** Opacidade da primeira passada de linhas. */
  lineOpacity?: number;
  /** Reforço dado aos pares mais próximos, numa segunda passada. 0 desliga. */
  lineBoost?: number;

  /** Tamanho base do vértice, antes do halo e da perspectiva. */
  nodeSize?: number;
  nodeOpacity?: number;
  /** Multiplicador do raio do brilho em volta do vértice. */
  nodeGlow?: number;
  /** Amplitude do pulso de tamanho. 0 deixa os vértices parados. */
  pulseAmount?: number;
  pulseSpeed?: number;

  /** Rotação do conjunto, em radianos por segundo. */
  rotationY?: number;
  rotationZ?: number;
  /** Velocidade da deriva de cada nó. Nunca é amortecida. */
  drift?: number;

  /** Raio de ação do cursor, em unidades de mundo. */
  cursorRadius?: number;
  /** Força do empurrão. 0 desliga a interação. */
  cursorForce?: number;
  /** Componente tangencial: gira em torno do raio em vez de só afastar. */
  cursorSwirl?: number;
  /** Quanto o amasso perde de velocidade por segundo. */
  cursorDecay?: number;
  /** Rigidez da mola que traz o nó de volta ao lugar. */
  cursorSpring?: number;

  /** Cor das linhas, em RGB. */
  lineColor?: [number, number, number];
  /** Cor dos vértices, em RGB. */
  nodeColor?: [number, number, number];
  /** Cor de fundo, repintada a cada quadro. Precisa ser opaca. */
  background?: string;

  /** Chamado ~2x por segundo com nós, ligações e fps. */
  onStats?: (stats: ParticleGraphStats) => void;
  className?: string;
  children?: ReactNode;
}

/**
 * Grafo 3D em canvas 2D, com repulsão do cursor.
 *
 * POR QUE CANVAS 2D E NÃO THREE.JS
 * A geometria continua 3D — pontos no espaço, rotação por matriz e projeção em
 * perspectiva são feitas aqui. O que muda é o desenho. O `linewidth` do
 * LineBasicMaterial é ignorado pelo WebGL na prática (trava em 1px), e como a
 * espessura precisa ser ajustável, o canvas 2D vence: `lineWidth` vale de
 * verdade e o brilho aditivo sai com globalCompositeOperation = "lighter".
 *
 * FÍSICA — "grafo deriva, cursor amassa e passa"
 * Cada nó tem DOIS campos de velocidade, e essa separação é o que faz o efeito
 * funcionar: a deriva (constante, nunca amortecida) mantém o grafo vivo, e o
 * amasso (impulso do cursor) decai a cada quadro. Com um campo só seria preciso
 * escolher entre amortecer — matando a deriva junto — ou não amortecer,
 * acumulando energia até o grafo se desmontar.
 */
export function ParticleGraph({
  nodes = 110,
  scale = 0.87,
  spread = 260,
  linkDistance = 110,
  cameraDistance = 610,
  lineWidth = 0.9,
  lineOpacity = 0.2,
  lineBoost = 1,
  nodeSize = 5,
  nodeOpacity = 0.7,
  nodeGlow = 2.4,
  pulseAmount = 0.5,
  pulseSpeed = 0.9,
  rotationY = 0.03,
  rotationZ = 0.045,
  drift = 0.3,
  cursorRadius = 150,
  cursorForce = 1,
  cursorSwirl = 0.3,
  cursorDecay = 1.6,
  cursorSpring = 3,
  lineColor = [138, 138, 148],
  nodeColor = [255, 255, 255],
  background = "#09090B",
  onStats,
  className,
  children,
}: ParticleGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // O callback vive num ref: se entrasse nas dependências, uma função criada no
  // render do pai reconstruiria a nuvem inteira a cada render do pai.
  const statsRef = useRef(onStats);
  statsRef.current = onStats;

  const lineKey = lineColor.join(",");
  const nodeKey = nodeColor.join(",");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const [lr, lg, lb] = lineKey.split(",").map(Number);
    const [nr, ng, nb] = nodeKey.split(",").map(Number);

    let W = 0;
    let H = 0;
    let frameId = 0;

    // O original media a janela; aqui o canvas acompanha o próprio container,
    // para o componente servir tanto em tela cheia quanto dentro de uma caixa.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      W = Math.max(rect.width, 1);
      H = Math.max(rect.height, 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    /* Sprite do nó: gradiente radial desenhado uma vez num canvas próprio e
       depois só copiado. Redesenhar o gradiente por nó e por quadro seria o
       gargalo do laço. */
    const sprite = (() => {
      const s = 64;
      const c = document.createElement("canvas");
      c.width = s;
      c.height = s;
      const g = c.getContext("2d");
      if (!g) return c;
      const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      grad.addColorStop(0, `rgba(${nr},${ng},${nb},1)`);
      grad.addColorStop(0.2, `rgba(${nr},${ng},${nb},0.8)`);
      grad.addColorStop(0.5, `rgba(${nr},${ng},${nb},0.2)`);
      grad.addColorStop(1, `rgba(${nr},${ng},${nb},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, s, s);
      return c;
    })();

    /* Estado das partículas — arrays tipados, sem alocação no laço. */
    const N = Math.max(1, Math.round(nodes));
    const hx = new Float32Array(N); // CASA — anda com a deriva, reflete na borda
    const hy = new Float32Array(N);
    const hz = new Float32Array(N);
    const ax = new Float32Array(N); // AMASSO — deslocamento em relação à casa
    const ay_ = new Float32Array(N);
    const az_ = new Float32Array(N);
    const vx_ = new Float32Array(N); // velocidade do amasso
    const vy_ = new Float32Array(N);
    const vz_ = new Float32Array(N);
    const bx = new Float32Array(N); // velocidade de deriva (módulo constante)
    const by = new Float32Array(N);
    const bz = new Float32Array(N);
    const px = new Float32Array(N); // posição final = casa + amasso
    const py = new Float32Array(N);
    const pz = new Float32Array(N);
    const fase = new Float32Array(N);
    const sx = new Float32Array(N); // projeção: tela x, y, profundidade, visível
    const sy = new Float32Array(N);
    const sd = new Float32Array(N);
    const svis = new Uint8Array(N);

    for (let i = 0; i < N; i++) {
      // Distribuição uniforme EM VOLUME dentro da esfera:
      //   acos(2u-1)  evita o acúmulo nos polos de sortear phi direto.
      //   cbrt(u) * R evita o núcleo denso de sortear o raio direto.
      //
      // O cbrt não é capricho: a deriva aleatória com reflexão na borda converge
      // justamente para o uniforme em volume. Semear uniforme no RAIO criava um
      // núcleo denso que se desmanchava nos primeiros 20 segundos — as ligações
      // caíam de 619 para 313 sozinhas, e a cena ficava visivelmente mais rala
      // do que quando abriu. Começando no equilíbrio, a densidade do primeiro
      // quadro é a mesma de dez minutos depois.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = spread * Math.cbrt(Math.random());
      px[i] = hx[i] = r * Math.sin(phi) * Math.cos(theta);
      py[i] = hy[i] = r * Math.sin(phi) * Math.sin(theta);
      pz[i] = hz[i] = r * Math.cos(phi);

      bx[i] = Math.random() - 0.5;
      by[i] = Math.random() - 0.5;
      bz[i] = Math.random() - 0.5;

      fase[i] = Math.random() * Math.PI * 2;
    }

    /* Cursor. O original escutava o document, porque o canvas era a página
       inteira; aqui as coordenadas vêm relativas ao container. O mousemove
       borbulha dos filhos, então o efeito vale mesmo sobre o texto da hero. */
    let mx = -9999;
    let my = -9999;
    let temMouse = false;
    const onMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mx = event.clientX - rect.left;
      my = event.clientY - rect.top;
      temMouse = true;
    };
    const onLeave = () => {
      temMouse = false;
    };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const t0 = performance.now();
    let ultimo = t0;
    let quadros = 0;
    let fpsT = t0;

    const frame = (now: number) => {
      frameId = requestAnimationFrame(frame);

      // dt limitado: ao voltar de uma aba em segundo plano o delta seria enorme
      // e a nuvem daria um salto.
      const dt = Math.min((now - ultimo) / 1000, 0.05);
      ultimo = now;
      const t = (now - t0) / 1000;
      quadros++;

      // ---- rotação do conjunto (Y depois Z) ----
      const angY = reduzido ? 0 : t * rotationY;
      const angZ = reduzido ? 0 : t * rotationZ;
      const cy = Math.cos(angY);
      const sny = Math.sin(angY);
      const cz = Math.cos(angZ);
      const snz = Math.sin(angZ);

      // ---- raio do cursor, trazido para o espaço LOCAL ----
      // Girar o raio pelo inverso da rotação é mais barato do que girar todos os
      // nós: a matriz de rotação é ortogonal, então o inverso é a transposta.
      let temRaio = false;
      let rox = 0;
      let roy = 0;
      let roz = 0;
      let rdx = 0;
      let rdy = 0;
      let rdz = 0;
      const camZ = cameraDistance;
      const foco = H * 0.9; // distância focal em px
      const esc = scale;

      if (temMouse && !reduzido && cursorForce > 0) {
        // direção no espaço da câmera: da câmera (0,0,camZ) para o pixel
        let vx = (mx - W / 2) / foco;
        let vy = -(my - H / 2) / foco;
        let vz = -1;
        const inv = 1 / Math.sqrt(vx * vx + vy * vy + 1);
        vx *= inv;
        vy *= inv;
        vz *= inv;
        // A posição renderizada é Rz*Ry*(p*esc). Para comparar com p, que a
        // física guarda sem escala, o raio volta pela transposta E divide por
        // esc. Sem isso o cursor amassaria fora do lugar sempre que a escala
        // saísse de 1 — direção não muda com escala uniforme, só a origem.
        roz = camZ / esc;
        const t1x = cz * rox + snz * roy;
        const t1y = -snz * rox + cz * roy;
        rox = cy * t1x - sny * roz;
        roz = sny * t1x + cy * roz;
        roy = t1y;
        const t2x = cz * vx + snz * vy;
        const t2y = -snz * vx + cz * vy;
        rdx = cy * t2x - sny * vz;
        rdz = sny * t2x + cy * vz;
        rdy = t2y;
        temRaio = true;
      }

      const raio = cursorRadius / esc;
      const raio2 = raio * raio;
      const forca = 900 * cursorForce;
      const decai = Math.exp(-cursorDecay * dt);
      // O limite É o raio da nuvem, sem folga. Com uma folga de 60 o grafo
      // nascia num raio e se acomodava noutro maior, e só esse degrau já diluía
      // a densidade pela razão dos volumes — as ligações caíam um terço sem que
      // nada mais tivesse mudado.
      const limite = spread;

      /* ---- física ----
         CASA + AMASSO, e não um campo de posição só.

           casa   -> anda com a deriva e reflete na borda. Nunca sabe que o
                     cursor existe. É o "grafo deriva".
           amasso -> deslocamento em relação à casa. O cursor empurra, uma mola
                     traz de volta a zero. É o "cursor amassa e passa".

         A primeira versão não tinha casa: o empurrão virava posição e ficava.
         Medido, o cursor abria um buraco de 51% que 2,5s depois só tinha
         recuperado 27% — na prática o mouse cavava túneis permanentes no grafo.
         Com a mola o amasso desaparece sozinho, e a deriva continua por baixo
         sem ser amortecida junto. */
      for (let i = 0; i < N; i++) {
        // --- casa: deriva com reflexão ---
        const Hx = hx[i] + bx[i] * drift * 60 * dt;
        const Hy = hy[i] + by[i] * drift * 60 * dt;
        const Hz = hz[i] + bz[i] * drift * 60 * dt;

        const dc = Math.sqrt(Hx * Hx + Hy * Hy + Hz * Hz) || 1e-5;
        if (dc > limite) {
          // Refletir inverte só a componente radial e preserva o módulo: a
          // deriva segue viva. Freando, o nó encostava na borda e empurrava
          // contra ela para sempre, e a nuvem virava casca com o meio vazio.
          const nx = Hx / dc;
          const ny = Hy / dc;
          const nz = Hz / dc;
          const saindo = bx[i] * nx + by[i] * ny + bz[i] * nz;
          if (saindo > 0) {
            bx[i] -= 2 * saindo * nx;
            by[i] -= 2 * saindo * ny;
            bz[i] -= 2 * saindo * nz;
          }
        }
        hx[i] = Hx;
        hy[i] = Hy;
        hz[i] = Hz;

        // --- amasso: empurrão do cursor + mola de volta ---
        let Ax = ax[i];
        let Ay = ay_[i];
        let Az = az_[i];
        const x = Hx + Ax;
        const y = Hy + Ay;
        const z = Hz + Az;

        if (temRaio) {
          const wx = x - rox;
          const wy = y - roy;
          const wz = z - roz;
          const proj = wx * rdx + wy * rdy + wz * rdz;
          if (proj > 0) {
            // só à frente da câmera
            let rx = wx - rdx * proj;
            let ry = wy - rdy * proj;
            let rz = wz - rdz * proj;
            const d2 = rx * rx + ry * ry + rz * rz;
            if (d2 < raio2) {
              const d = Math.sqrt(d2) || 1e-5;
              const inv2 = 1 / d;
              rx *= inv2;
              ry *= inv2;
              rz *= inv2;
              const queda = 1 - d / raio;
              const f = queda * queda * forca * dt;
              // componente tangencial: gira em torno do raio em vez de só
              // afastar, o que tira o aspecto de buraco perfeitamente redondo
              const tx = rdy * rz - rdz * ry;
              const ty = rdz * rx - rdx * rz;
              const tz = rdx * ry - rdy * rx;
              vx_[i] += (rx + tx * cursorSwirl) * f;
              vy_[i] += (ry + ty * cursorSwirl) * f;
              vz_[i] += (rz + tz * cursorSwirl) * f;
            }
          }
        }

        vx_[i] -= Ax * cursorSpring * dt;
        vy_[i] -= Ay * cursorSpring * dt;
        vz_[i] -= Az * cursorSpring * dt;

        vx_[i] *= decai;
        vy_[i] *= decai;
        vz_[i] *= decai;

        Ax += vx_[i] * dt;
        Ay += vy_[i] * dt;
        Az += vz_[i] * dt;
        ax[i] = Ax;
        ay_[i] = Ay;
        az_[i] = Az;

        px[i] = Hx + Ax;
        py[i] = Hy + Ay;
        pz[i] = Hz + Az;
      }

      // ---- projeção ----
      // O plano próximo não fica colado na câmera: com a distância baixa e a
      // nuvem larga, um nó que passe raspando teria foco/prof gigante e viraria
      // um borrão do tamanho da tela. Cortando em PERTO o tamanho máximo do
      // sprite fica limitado, e o alfa some antes do corte para o nó não
      // desaparecer de estalo.
      const PERTO = 90;
      const cxs = W / 2;
      const cys = H / 2;
      for (let i = 0; i < N; i++) {
        const X = px[i] * esc;
        const Y = py[i] * esc;
        const Z = pz[i] * esc;
        // Ry
        const rx2 = cy * X + sny * Z;
        const rz2 = -sny * X + cy * Z;
        // Rz
        const fx = cz * rx2 - snz * Y;
        const fy = snz * rx2 + cz * Y;
        const prof = camZ - rz2;
        if (prof < PERTO) {
          svis[i] = 0;
          continue;
        }
        const k = foco / prof;
        sx[i] = cxs + fx * k;
        sy[i] = cys - fy * k;
        sd[i] = prof;
        svis[i] = 1;
      }

      // ---- desenho ----
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter"; // brilho aditivo

      // linhas
      const lig = linkDistance * esc;
      const lig2 = lig * lig;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = `rgb(${lr}, ${lg}, ${lb})`;
      let links = 0;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        if (!svis[i]) continue;
        const aix = px[i] * esc;
        const aiy = py[i] * esc;
        const aiz = pz[i] * esc;
        for (let j = i + 1; j < N; j++) {
          if (!svis[j]) continue;
          const ddx = aix - px[j] * esc;
          const ddy = aiy - py[j] * esc;
          const ddz = aiz - pz[j] * esc;
          if (ddx * ddx + ddy * ddy + ddz * ddz >= lig2) continue;
          links++;
          // Alfa por segmento exigiria um stroke por linha. Agrupar num path
          // único é muito mais rápido, e a perda visual é pequena porque a
          // variação de alfa aqui é sutil.
          ctx.moveTo(sx[i], sy[i]);
          ctx.lineTo(sx[j], sy[j]);
        }
      }
      ctx.globalAlpha = lineOpacity;
      ctx.stroke();

      // Segunda passada, só nos pares mais próximos, para dar o reforço que o
      // fade pede sem pagar um stroke por linha.
      if (lineBoost > 0.02) {
        ctx.beginPath();
        const perto2 = lig2 * 0.3;
        for (let i = 0; i < N; i++) {
          if (!svis[i]) continue;
          const bix = px[i] * esc;
          const biy = py[i] * esc;
          const biz = pz[i] * esc;
          for (let j = i + 1; j < N; j++) {
            if (!svis[j]) continue;
            const ex = bix - px[j] * esc;
            const ey = biy - py[j] * esc;
            const ez = biz - pz[j] * esc;
            if (ex * ex + ey * ey + ez * ez >= perto2) continue;
            ctx.moveTo(sx[i], sy[i]);
            ctx.lineTo(sx[j], sy[j]);
          }
        }
        ctx.globalAlpha = lineOpacity * lineBoost * 0.9;
        ctx.stroke();
      }

      // nós
      for (let i = 0; i < N; i++) {
        if (!svis[i]) continue;
        const pulso = 1 + pulseAmount * Math.sin(t * pulseSpeed + fase[i]);
        // tamanho cai com a profundidade: é o que dá leitura de volume
        const tam = nodeSize * pulso * (camZ / sd[i]) * nodeGlow;
        const meio = tam / 2;
        const entra = Math.min((sd[i] - PERTO) / (PERTO * 1.5), 1);
        ctx.globalAlpha = nodeOpacity * entra;
        ctx.drawImage(sprite, sx[i] - meio, sy[i] - meio, tam, tam);
      }
      ctx.globalAlpha = 1;

      if (now >= fpsT + 500) {
        statsRef.current?.({
          nodes: N,
          links,
          fps: Math.round((quadros * 1000) / (now - fpsT)),
        });
        fpsT = now;
        quadros = 0;
      }
    };

    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [
    nodes,
    scale,
    spread,
    linkDistance,
    cameraDistance,
    lineWidth,
    lineOpacity,
    lineBoost,
    nodeSize,
    nodeOpacity,
    nodeGlow,
    pulseAmount,
    pulseSpeed,
    rotationY,
    rotationZ,
    drift,
    cursorRadius,
    cursorForce,
    cursorSwirl,
    cursorDecay,
    cursorSpring,
    background,
    // As cores entram como string: o array literal do pai muda de identidade a
    // cada render e reiniciaria a simulação sem nenhum valor ter mudado.
    lineKey,
    nodeKey,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ background }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />

      {children && <div className="relative z-[2] h-full w-full">{children}</div>}
    </div>
  );
}

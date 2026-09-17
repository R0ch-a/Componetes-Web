import React from 'react';

/**
 * A fonte colada trouxe só o JSX — as classes `button03*` vêm de uma folha de
 * estilo que não veio junto, e o CSS abaixo é reconstrução a partir das
 * capturas de referência. Dois pontos que só as imagens revelam: os blocos
 * NÃO se movem (ficam parados numa grade e só trocam de cor, aos pares, dos
 * dois lados) e `data-text` alimenta um typewriter — no hover a palavra some
 * inteira e é reescrita letra a letra. `--index` (0 a 4) é o passo do
 * escalonamento, não distância. Trocar por inteiro quando a fonte aparecer.
 */
const css = `
  .button03 {
    --button03-pixel: 11px;
    --button03-fill: var(--primary);
    --button03-void: var(--background);
    --button03-ink: var(--primary-foreground);
    --button03-step: 70ms;

    position: relative;
    display: inline-block;
    max-width: 100%;
    padding: 19px 2.2rem;
    color: var(--button03-ink);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
  }

  .button03_bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .button03_bg-mid {
    position: absolute;
    inset: 0;
    background-color: var(--button03-fill);
  }

  /* Grade de 2 colunas por 6 linhas de cada lado: os doze vãos entram aos
     pares, as duas células do par fora da barra — a de dentro encostada nela,
     a de fora um quadrado adiante. A grade é mais alta que a barra, então a
     quebra passa da borda de cima e de baixo. */
  .button03_bg-left,
  .button03_bg-right {
    position: absolute;
    top: 50%;
    width: calc(var(--button03-pixel) * 2);
    height: calc(var(--button03-pixel) * 6);
    display: flex;
    flex-wrap: wrap;
    transform: translateY(-50%);
  }

  .button03_bg-left {
    right: 100%;
  }

  .button03_bg-right {
    left: 100%;
  }

  /* Nada se move: só a cor muda, escalonada pelo próprio índice. Os vãos de
     índice 0 nunca acendem — daí serem cinco por lado, não doze. */
  .button03_bg-pixel {
    width: var(--button03-pixel);
    height: var(--button03-pixel);
    background-color: transparent;
    transition: background-color 120ms steps(1);
    transition-delay: calc(var(--index) * var(--button03-step));
  }

  /* Repouso: acende a célula colada na barra. A grade da esquerda é espelhada,
     então o par de dentro é o par nas duas, mas com paridade invertida. */
  .button03_bg-left .button03_bg-pixel:nth-child(even),
  .button03_bg-right .button03_bg-pixel:nth-child(odd) {
    background-color: color-mix(
      in srgb,
      var(--button03-fill) calc(min(1, var(--index)) * 100%),
      transparent
    );
  }

  /* Hover: a de dentro apaga e a de fora acende. O quadrado parece ter pulado
     para fora, mas nenhum pixel saiu do lugar — é troca de cor. */
  .button03:hover .button03_bg-left .button03_bg-pixel:nth-child(even),
  .button03:hover .button03_bg-right .button03_bg-pixel:nth-child(odd),
  .button03:focus-visible .button03_bg-left .button03_bg-pixel:nth-child(even),
  .button03:focus-visible .button03_bg-right .button03_bg-pixel:nth-child(odd) {
    background-color: transparent;
  }

  .button03:hover .button03_bg-left .button03_bg-pixel:nth-child(odd),
  .button03:hover .button03_bg-right .button03_bg-pixel:nth-child(even),
  .button03:focus-visible .button03_bg-left .button03_bg-pixel:nth-child(odd),
  .button03:focus-visible .button03_bg-right .button03_bg-pixel:nth-child(even) {
    background-color: color-mix(
      in srgb,
      var(--button03-fill) calc(min(1, var(--index)) * 100%),
      transparent
    );
  }

  /* Typewriter: o texto real só reserva a largura, o clone de data-text é o
     que aparece. No hover a largura vai a zero e volta em passos. */
  .button03_inner {
    position: relative;
    display: block;
  }

  .button03_text {
    visibility: hidden;
  }

  .button03_inner::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  .button03:hover .button03_inner::after,
  .button03:focus-visible .button03_inner::after {
    animation: button03-type 760ms steps(11) forwards;
  }

  @keyframes button03-type {
    from { width: 0; }
    to { width: 100%; }
  }

  .button03:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    .button03_bg-pixel {
      transition-duration: 1ms;
      transition-delay: 0ms;
    }
    .button03:hover .button03_inner::after,
    .button03:focus-visible .button03_inner::after {
      animation-duration: 1ms;
    }
  }
`;

export const Button03 = ({ text = "Pixel-Broke" }) => {
  // Define the index patterns for left and right pixels
  const leftPixelIndices = [0, 0, 1, 3, 4, 0, 0, 2, 0, 0, 0, 1];
  const rightPixelIndices = [3, 0, 0, 0, 4, 0, 0, 2, 1, 3, 0, 0];

  return (
    <a href="#" className="button03 w-inline-block">
      <style>{css}</style>
      <span className="button03_bg">
        <span className="button03_bg-left">
          {leftPixelIndices.map((index, i) => (
            <span
              key={`left-${i}`}
              style={{ '--index': index }as React.CSSProperties}
              className="button03_bg-pixel"
            ></span>
          ))}
        </span>
        <span className="button03_bg-mid"></span>
        <span className="button03_bg-right">
          {rightPixelIndices.map((index, i) => (
            <span
              key={`right-${i}`}
              style={{ '--index': index }as React.CSSProperties}
              className="button03_bg-pixel"
            ></span>
          ))}
        </span>
      </span>
      <span data-text={text} className="button03_inner">
        <span className="button03_text">{text}</span>
      </span>
    </a>
  );
};

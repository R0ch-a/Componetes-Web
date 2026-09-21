import React from 'react';

/**
 * O registry do 21st.dev publica este componente sem CSS — `registryDependencies`
 * volta vazio, e o `Component.tsx` destrancado é só o markup exportado do
 * Webflow. A folha abaixo é a do bundle público da demo
 * (cdn.21st.dev/nextjsshop/pixel-broke-button/default/bundle.*.html), transcrita
 * sem alteração de semântica: só desminificada e comentada.
 *
 * O mecanismo é o inverso do que o nome sugere: a barra é um bloco preto cheio
 * com uma grade 3x4 de quadrados pretos em cada ponta, e o hover APAGA cinco
 * deles por lado. Os buracos é que desenham a quebra. `--index` não posiciona
 * nada — é só o multiplicador do atraso (40ms por passo); quais células apagam
 * está fixo no seletor, e as posições batem uma a uma com os índices não-zero
 * dos vetores do JSX (esquerda 3,4,5,8,12 / direita 1,5,8,9,10).
 */
const css = `
  .button03 {
    color: #f9f4eb;
    letter-spacing: -.02em;
    text-transform: uppercase;
    -webkit-user-select: none;
    user-select: none;
    font-size: .875rem;
    line-height: 1em;
    text-decoration: none;
    display: grid;
  }

  /* Fundo e rótulo ocupam a mesma célula: um por cima do outro, sem position. */
  .button03_bg {
    grid-area: 1/1;
    grid-template-columns: auto 1fr auto;
    display: grid;
  }

  .button03_bg-left {
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
  }

  /* aspect-ratio 1 é o que torna a célula quadrada e, por tabela, dá a largura
     das pontas: a altura da barra dividida por quatro linhas. */
  .button03_bg-pixel {
    aspect-ratio: 1;
    background-color: #000;
    width: 100%;
    height: 100%;
  }

  .button03_bg-mid {
    background-color: #000;
  }

  .button03_bg-right {
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
  }

  .button03_inner {
    grid-area: 1/1;
    padding: .875rem 3rem;
    display: grid;
  }

  .button03_text {
    grid-area: 1/1;
  }

  .button03 {
    --characters: 11;
    -webkit-tap-highlight-color: transparent;
  }

  /* transition sem duração = duração zero: o quadrado não desvanece, pisca
     para fora. O escalonamento inteiro mora no delay. */
  .button03_bg-pixel {
    transition: opacity;
    transition-delay: calc(var(--index)*40ms);
  }

  /* As duas células apagadas em repouso — o degrau no canto superior esquerdo
     e no inferior direito. */
  .button03_bg-left .button03_bg-pixel:first-child,
  .button03_bg-right .button03_bg-pixel:nth-child(12) {
    opacity: 0;
  }

  .button03_inner:after {
    content: attr(data-text);
    pointer-events: none;
    white-space: nowrap;
    opacity: 0;
    grid-area: 1/1;
    width: 0;
    margin: 0 auto;
    transition: width;
    overflow: clip;
  }

  @media (hover:hover) and (pointer:fine) {
    .button03:is(:hover,:focus-visible) .button03_bg-left .button03_bg-pixel:is(:nth-child(3),:nth-child(4),:nth-child(5),:nth-child(8),:nth-child(12)),
    .button03:is(:hover,:focus-visible) .button03_bg-right .button03_bg-pixel:is(:first-child,:nth-child(5),:nth-child(8),:nth-child(9),:nth-child(10)) {
      opacity: 0;
    }

    /* O typewriter: o clone de data-text abre de 0 a 100% de largura em onze
       passos, com overflow clip. O texto real apaga por baixo. */
    .button03:is(:hover,:focus-visible) .button03_inner:after {
      opacity: 1;
      width: 100%;
      transition: width .5s steps(var(--characters));
    }

    .button03:is(:hover,:focus-visible) .button03_text {
      opacity: 0;
    }
  }

  /* No toque não há hover: o mesmo recorte sai no :active. Aqui o atalho
     transition zera o delay de propósito — resposta imediata ao dedo. */
  @media (hover:none) or (pointer:coarse) {
    .button03_bg-pixel {
      transition: opacity .2s;
    }

    .button03:active .button03_bg-left .button03_bg-pixel:is(:nth-child(3),:nth-child(4),:nth-child(5),:nth-child(8),:nth-child(12)),
    .button03:active .button03_bg-right .button03_bg-pixel:is(:first-child,:nth-child(5),:nth-child(8),:nth-child(9),:nth-child(10)) {
      opacity: 0;
      transition: opacity;
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

import React from 'react';

/**
 * O registry do 21st.dev publica este componente sem CSS — o snippet traz só o
 * markup. A folha abaixo é a do bundle público da demo
 * (cdn.21st.dev/nextjsshop/nextjsshop-button/default/bundle.*.html),
 * desminificada e comentada, sem alteração de semântica. Mesmo autor e mesma
 * família do Pixel-Broke Button.
 *
 * À direita da barra há duas grades 5x5 sobrepostas na mesma célula. A de
 * baixo tem 25 pixels (o 13º, o do centro, já apagado) e forma um bloco
 * sólido; a de cima tem 11 pixels posicionados um a um por `grid-area` e
 * começa invisível. No hover as duas trocam: o bloco se dissolve e os 11
 * desenham uma seta para cima e para a direita. `--index` só entra no atraso
 * (60ms por passo) — sorteado entre 0 e 3 no bloco e entre 4 e 7 na seta, por
 * isso a seta só começa a aparecer depois que o bloco já foi embora.
 */
const css = `
  .button01 {
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

  .dark .button01 {
    color: #000;
  }

  .button01_bg {
    grid-area: 1/1;
    grid-template-columns: 1fr auto;
    display: grid;
  }

  .button01_bg-mid {
    background-color: #000;
  }

  .dark .button01_bg-mid {
    background-color: #fff;
  }

  .button01_bg-right {
    grid-area: 1/2;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    display: grid;
  }

  .button01_bg-pixel {
    aspect-ratio: 1;
    background-color: #000;
    width: 100%;
    height: 100%;
  }

  .dark .button01_bg-pixel {
    background-color: #fff;
  }

  /* Mesma célula de grid que o bloco: a seta nasce por cima dele. */
  .button01_bg-right-overlay {
    grid-area: 1/2;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    display: grid;
  }

  .button01_inner {
    grid-area: 1/1;
    padding: .875rem 3.75rem .875rem 1rem;
    display: grid;
    overflow: clip;
  }

  .button01_text {
    grid-area: 1/1;
  }

  .button01 {
    --characters: 10;
    -webkit-tap-highlight-color: transparent;
  }

  /* transition sem duração = duração zero: pisca, não desvanece. */
  .button01_bg-pixel {
    transition: opacity;
    transition-delay: calc(var(--index)*60ms);
  }

  .button01_bg-pixel:nth-child(13) {
    opacity: 0;
  }

  .button01_bg-right-overlay .button01_bg-pixel {
    opacity: 0;
    transition-delay: 0s;
  }

  .button01_inner:after {
    content: attr(data-text);
    pointer-events: none;
    white-space: nowrap;
    opacity: 0;
    grid-area: 1/1;
    width: 0;
    transition: width;
    overflow: clip;
  }

  /* Os 11 pixels da seta, posicionados um a um (linha/coluna). */
  .button01_bg-right-overlay .button01_bg-pixel:first-child { grid-area: 1/2; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(2) { grid-area: 1/3; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(3) { grid-area: 1/4; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(4) { grid-area: 1/5; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(5) { grid-area: 2/4; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(6) { grid-area: 2/5; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(7) { grid-area: 3/3; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(8) { grid-area: 3/5; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(9) { grid-area: 4/2; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(10) { grid-area: 4/5; }
  .button01_bg-right-overlay .button01_bg-pixel:nth-child(11) { grid-area: 5/1; }

  @media (hover:hover) and (pointer:fine) {
    .button01:is(:hover,:focus-visible) .button01_inner:after {
      opacity: 1;
      width: 100%;
      transition: width .5s steps(var(--characters));
    }

    .button01:is(:hover,:focus-visible) .button01_text,
    .button01:is(:hover,:focus-visible) .button01_bg-right .button01_bg-pixel {
      opacity: 0;
    }

    .button01:is(:hover,:focus-visible) .button01_bg-right-overlay .button01_bg-pixel {
      opacity: 1;
      transition-delay: calc(var(--index)*60ms);
    }
  }

  /* Na fonte a primeira regra deste bloco aponta para .button-pixel-broke_bg-pixel,
     sobra do Pixel-Broke Button: não casa com nada. Mantida como veio. */
  @media (hover:none) or (pointer:coarse) {
    .button-pixel-broke_bg-pixel {
      transition: opacity .2s;
    }

    .button01:active .button01_bg-right .button01_bg-pixel {
      opacity: 0;
      transition: opacity;
    }

    .button01:active .button01_bg-right-overlay .button01_bg-pixel {
      opacity: 1;
      transition: opacity;
    }
  }
`;

export const Button01 = () => {
  return (
    <a href="#" className="button01">
      <style>{css}</style>
      <span className="button01_bg">
        <span className="button01_bg-mid"></span>
        <span className="button01_bg-right">
          {[...Array(25)].map((_, index) => (
            <span
              key={`pixel-${index}`}
              style={{ '--index': Math.floor(Math.random() * 4) } as React.CSSProperties}
              className="button01_bg-pixel"
            ></span>
          ))}
        </span>
        <span className="button01_bg-right-overlay">
          {[...Array(11)].map((_, index) => (
            <span
              key={`overlay-${index}`}
              style={{ '--index': 4 + Math.floor(Math.random() * 4) }as React.CSSProperties}
              className="button01_bg-pixel"
            ></span>
          ))}
        </span>
      </span>
      <span data-text="Nextjsshop" className="button01_inner">
        <span className="button01_text">Nextjsshop</span>
      </span>
    </a>
  );
};

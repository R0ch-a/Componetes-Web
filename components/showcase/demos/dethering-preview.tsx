"use client";

import { Dethering } from "@/components/ui/dethering";

/**
 * Mesma hero do dethering.html. A seção abaixo existe para o degradê ter onde
 * desaguar: sem nada depois da hero, a dissolução não tem o que mostrar.
 */
export function DetheringPreview() {
  return (
    <div className="min-h-screen bg-black font-[system-ui] text-[#e8e9ec]">
      <Dethering>
        {/* O <span> não é decorativo: o realce tem de acompanhar as LINHAS, e
            fundo no <p> viraria um retângulo em volta do parágrafo inteiro. */}
        <p className="-ml-[0.5em] mb-[18px] font-mono text-[10px] uppercase tracking-[0.22em]">
          {/* O letter-spacing também vale depois do último caractere, então a
              faixa já nasce com folga à direita; o padding menor compensa. */}
          <span className="box-decoration-clone bg-[#111114] px-[0.5em] py-[0.3em] pr-[0.28em] text-[#f2f2f4]">
            Componente · campo procedural
          </span>
        </p>

        <h1
          className="text-[clamp(40px,7.4vw,92px)] font-medium leading-[0.96] tracking-[-0.03em]"
          // Sombra larga e sem deslocamento: não lê como sombra, só abre um
          // respiro escuro atrás das letras, onde o campo está mais denso.
          style={{ textShadow: "0 0 34px rgba(0,0,0,0.92), 0 0 12px rgba(0,0,0,0.8)" }}
        >
          <b className="block font-medium text-white">Dethering</b>
          <i className="block not-italic text-[#7c7f86]">dot-matrix field</i>
        </h1>

        <p className="-ml-[0.5em] mt-[26px] max-w-[460px] font-mono text-[13px] leading-[1.72]">
          <span className="box-decoration-clone bg-[#111114] px-[0.5em] py-[0.3em] text-[#f2f2f4]">
            Campo dot-matrix gerado por ruído fractal em WebGL, dissolvendo-se no
            rodapé pela redução do raio do ponto.
          </span>
        </p>
      </Dethering>

      <main className="mx-auto max-w-[1100px] px-8 pb-[120px] pt-2">
        <div className="mb-10 flex items-center gap-4">
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-[#6c6f75]">
            01 · Como a dissolução funciona
          </span>
          <i className="h-px flex-1 bg-[#1c1c1f]" />
        </div>

        <p className="mb-5 max-w-[620px] text-[15px] leading-[1.75] text-[#9a9da3]">
          São <strong className="font-medium text-[#e8e9ec]">duas camadas</strong>, e
          elas fazem coisas diferentes. O shader encolhe o{" "}
          <strong className="font-medium text-[#e8e9ec]">raio</strong> de cada ponto
          até zero, e é isso que desmancha a grade. O CSS cobre a diferença de cor
          entre o fundo da hero e o da página.
        </p>

        <p className="mb-5 max-w-[620px] text-[15px] leading-[1.75] text-[#9a9da3]">
          A ordem importa. Baixar a{" "}
          <strong className="font-medium text-[#e8e9ec]">opacidade</strong> em vez do
          raio manteria cada ponto do mesmo tamanho, só que transparente: a grade
          inteira continuaria legível e o campo viraria um véu cinza uniforme. E
          aplicar só o degradê de cor, sem mexer no shader, corta a grade ainda cheia
          numa borda reta.
        </p>
      </main>
    </div>
  );
}

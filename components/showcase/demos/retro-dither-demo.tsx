"use client";

import { RetroDither } from "@/components/ui/retro-dither";

/**
 * Configuração da doc do Canvas UI, sobre uma imagem e nada mais — sem texto
 * nem botões concorrendo com a lente. Numa foto o efeito fica óbvio: o dither
 * quantiza os tons e os pixels grandes aparecem sem a máscara de texto entrar
 * no meio (ela existe justamente para poupar as letras).
 *
 * O `<img>` é uma tag comum, não o next/image: o componente captura a subárvore
 * com a API html-in-canvas, e quanto mais simples o DOM capturado, melhor.
 */
const RetroDitherDemo = () => {
  return (
    <RetroDither
      radius={0.5}
      softness={1}
      pixelSize={2}
      levels={4}
      colorize={0.1}
      contrast={0.6}
      brightness={0}
      strength={0.75}
      baseStrength={0}
      invert={0}
      scanlines={0}
      pattern="bayer"
      trail={0.4}
      degauss={0.8}
      followSpeed={3}
      darkColor={[0, 0, 0]}
      lightColor={[1, 1, 1]}
      className="aspect-[3/2] w-full overflow-hidden rounded-xl bg-black"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/goro-drums.png"
        alt="Goro, o guerreiro de quatro braços de Mortal Kombat, tocando bateria"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </RetroDither>
  );
};

export { RetroDitherDemo };

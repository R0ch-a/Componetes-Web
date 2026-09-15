"use client";

import { Glass } from "@/components/ui/glass";

/**
 * Configuração da doc do Canvas UI, sobre uma imagem e nada mais. A lente
 * refrata o conteúdo vivo — numa pintura com contraste forte o desvio dos raios
 * e a aberração cromática no aro ficam muito mais legíveis do que sobre texto.
 *
 * Sem `targets`: aquela prop faz a lente ampliar como bola de cristal ao passar
 * sobre títulos, links e botões, e aqui não existe nenhum deles.
 */
const GlassDemo = () => {
  return (
    <Glass
      size={120}
      aspect={1.7}
      corner={32}
      ior={1.5}
      edge={0.7}
      bevel={4}
      depth={250}
      aberration={1}
      blur={0}
      reflection={1}
      shine={0.01}
      zoom={1.5}
      follow={0.2}
      shape="circle"
      className="aspect-[1800/997] w-full overflow-hidden rounded-xl bg-black"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/ship-in-a-storm.jpg"
        alt="Navio pirata em uma tempestade, pintura de Andy Walsh"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </Glass>
  );
};

export { GlassDemo };

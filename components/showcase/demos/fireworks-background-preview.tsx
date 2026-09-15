"use client";

import { FireworksBackground } from "@/components/ui/fireworks-background";

/**
 * Rota isolada (modo quadro): o componente dá ao buffer do canvas o tamanho da
 * JANELA, mas o CSS estica o canvas até o container. Numa caixa menor que a
 * janela os fogos sairiam achatados em elipse. Dentro do iframe a janela é o
 * próprio quadro, e buffer e caixa coincidem.
 *
 * bg-black no wrapper porque o rastro é um fillRect preto a 10% por quadro sobre
 * um canvas transparente: sem fundo, os primeiros segundos mostrariam o tema da
 * página por baixo até o rastro acumular em preto.
 */
export function FireworksBackgroundPreview() {
  return (
    <div className="h-screen w-full">
      <FireworksBackground className="bg-black">
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-5xl font-semibold tracking-tight text-white">Fireworks</h1>
        </div>
      </FireworksBackground>
    </div>
  );
}

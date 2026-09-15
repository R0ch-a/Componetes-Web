"use client";

import { useState } from "react";
import { TextRoll } from "@/components/ui/text-roll";

/**
 * A animação é de montagem: cada letra gira uma vez e para. Numa vitrine
 * isso significaria texto parado, porque o giro acontece no carregamento da
 * página, muito antes de a seção entrar na tela. O botão remonta o componente
 * trocando a `key` — é a forma mais honesta de reexibir, sem tocar no
 * componente nem simular uma API que ele não tem.
 */
const TextRollDemo = () => {
  const [rodada, setRodada] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-8 py-10">
      <TextRoll
        key={rodada}
        className="text-4xl font-medium text-black dark:text-white"
      >
        motion-primitives
      </TextRoll>

      <button
        type="button"
        onClick={() => setRodada((n) => n + 1)}
        className="rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
      >
        Repetir
      </button>
    </div>
  );
};

export { TextRollDemo };

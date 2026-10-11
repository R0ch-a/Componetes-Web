"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

import { FlipText } from "@/components/ui/flip-text";

/**
 * O efeito roda uma vez, na montagem. Como a seção monta junto com a página,
 * quem rola até aqui já perderia a animação — daí o botão de repetir, que
 * remonta o componente trocando a `key`. O botão é da demo, não do componente.
 */
const FlipTextDemo = () => {
  const [instancia, setInstancia] = useState(0);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-16">
      <FlipText
        key={instancia}
        className="text-4xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]"
        word="Flip Text"
      />

      <button
        type="button"
        onClick={() => setInstancia((n) => n + 1)}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/80"
      >
        <RotateCcw className="size-3.5" aria-hidden="true" />
        Repetir
      </button>
    </div>
  );
};

export { FlipTextDemo };

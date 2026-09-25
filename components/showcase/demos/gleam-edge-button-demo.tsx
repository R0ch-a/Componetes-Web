"use client";

import ShinyButton from "@/components/ui/gleam-edge-button";

/**
 * A demo publicada é `min-h-screen` sobre preto; no palco só o invólucro muda.
 * O fundo escuro fica: o botão é preto com borda laranja e não tem variante
 * para tema claro.
 */
const GleamEdgeButtonDemo = () => {
  return (
    <div className="flex w-full items-center justify-center rounded-xl bg-black py-20">
      <ShinyButton label="Get Started" />
    </div>
  );
};

export { GleamEdgeButtonDemo };

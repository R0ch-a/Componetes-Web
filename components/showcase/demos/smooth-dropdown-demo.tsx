"use client";

import TwentyTwelveOne from "@/components/ui/smooth-dropdown";

/**
 * A demo publicada é `min-h-screen`; no palco só o invólucro muda. O menu
 * cresce do canto superior direito para baixo e para a esquerda (220px de
 * largura, ~330px de altura aberto), então o gatilho fica no alto com folga
 * embaixo.
 */
const SmoothDropdownDemo = () => {
  return (
    <div className="flex w-full min-h-[420px] items-start justify-center pt-10 pl-44">
      <TwentyTwelveOne />
    </div>
  );
};

export { SmoothDropdownDemo };

"use client";

import { Starfield } from "@/components/ui/starfield";

/**
 * A demo publicada é de tela cheia (`h-screen`), então roda em rota isolada —
 * o mesmo encaixe do Fireworks Background. Props e rótulo como no original;
 * o fundo escuro é do palco, já que o canvas sai transparente e o âmbar só
 * lê sobre escuro.
 */
const StarfieldPreview = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white">
      <Starfield
        starCount={10000}
        waveFrequency={15}
        starEscapeWidth={400}
        voidWidth={80}
        starColor={{ r: 234, g: 179, b: 8 }}
        maxOpacity={200}
        rotationSpeed={0.0002}
        waveSpeed={0.005}
      />
      <span className="pointer-events-none absolute z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap">
        Starfield
      </span>
    </div>
  );
};

export { StarfieldPreview };

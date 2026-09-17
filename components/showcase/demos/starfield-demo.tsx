"use client";

import { Starfield } from "@/components/ui/starfield";

/**
 * `starColor` entra como constante de módulo: o componente lista o objeto no
 * array de dependências do efeito, então um literal inline reiniciaria o campo
 * a cada render do pai.
 */
const STAR_COLOR = { r: 168, g: 85, b: 247 };

const StarfieldDemo = () => {
  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-xl bg-black">
      <Starfield starColor={STAR_COLOR} />
      <span className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs uppercase tracking-[0.35em] text-white/40">
        Starfield
      </span>
    </div>
  );
};

export { StarfieldDemo };

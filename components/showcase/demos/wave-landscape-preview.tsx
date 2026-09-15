"use client";

import { WaveLandscape } from "@/components/ui/wave-landscape";

/** Mesma hero do Wave Effect.html, para ver o background em contexto. */
export function WaveLandscapePreview() {
  return (
    <WaveLandscape className="h-screen w-full">
      <div className="relative h-full w-full text-[#f6f4ef]">
        <div className="absolute left-8 top-7 text-[11px] font-medium uppercase tracking-[0.14em] text-[#E85D22]">
          12
        </div>

        <div className="absolute left-1/2 top-7 flex -translate-x-1/2 items-center gap-[18px] text-[11px] uppercase tracking-[0.16em] text-[#f6f4ef]/55">
          <span>Wave</span>
          <span className="h-1 w-1 rounded-full bg-[#f6f4ef]/40" />
          <span>Wireframe landscape</span>
        </div>

        <div className="absolute bottom-[14%] left-[8.5%] max-w-[640px]">
          <h1 className="mb-8 text-[clamp(48px,6.4vw,96px)] font-extralight leading-[1.02] tracking-[-0.025em]">
            Engineer your
            <br />
            growth.
            <br />
            With precision<span className="text-[#E85D22]">.</span>
          </h1>
          <p className="mb-10 max-w-[380px] text-sm font-light leading-[1.65] text-[#f6f4ef]/60">
            Predictive targeting. Autonomous optimization.
            <br />
            Scale your reach with mathematical accuracy.
          </p>
        </div>
      </div>
    </WaveLandscape>
  );
}

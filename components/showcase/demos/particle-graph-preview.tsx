"use client";

import { useState } from "react";
import { ParticleGraph } from "@/components/ui/particle-graph";
import type { ParticleGraphStats } from "@/components/ui/particle-graph";

/** Mesma hero do grafo-teste.html, para ver o background em contexto. */
export function ParticleGraphPreview() {
  const [stats, setStats] = useState<ParticleGraphStats | null>(null);

  return (
    <ParticleGraph className="h-screen w-full" onStats={setStats}>
      <div className="flex h-full w-full flex-col justify-between px-8 py-7 text-[#F4F4F5]">
        <header className="flex select-none items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#52525B]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#71717A]">
            Aether Dynamics
          </span>
        </header>

        <main className="mx-auto -mt-[4%] flex max-w-[720px] flex-col items-center text-center">
          <div className="mb-[30px] inline-flex items-center gap-2 rounded-full border border-[#27272A]/70 bg-[#18181B]/40 px-[13px] py-1.5 backdrop-blur-[10px]">
            <i className="relative h-[11px] w-[11px] rounded-full border border-[#52525B] after:absolute after:inset-[3px] after:rounded-full after:bg-[#52525B] after:content-['']" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#71717A]">
              Kinetic Matrix
            </span>
          </div>

          <h1 className="mb-7 text-[clamp(42px,6.6vw,74px)] font-medium leading-[0.98] tracking-[-0.025em]">
            <span className="block text-white">Deterministic</span>
            <span className="block text-[#71717A]">Architecture</span>
          </h1>

          <p className="mb-9 max-w-[460px] font-mono text-[13.5px] leading-[1.68] text-[#71717A]">
            A high-performance particle network. Hover to interact, recalculating
            node geometry and structural links in real-time.
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2.5 rounded-full border border-[#27272A]/90 bg-[#09090B] px-[26px] py-[13px] font-mono text-[11px] uppercase tracking-[0.15em] text-[#D4D4D8] transition-[background,color,transform] duration-200 hover:scale-[1.02] hover:bg-[#18181B]/80 hover:text-white"
          >
            Initialize Field&nbsp; &rarr;
          </button>
        </main>

        <footer className="flex select-none items-end justify-between">
          <div className="flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em]">
            <div className="flex">
              <b className="w-[66px] font-normal text-[#52525B]">Nodes</b>
              <i className="not-italic text-[#E4E4E7]">{stats?.nodes ?? "—"}</i>
            </div>
            <div className="flex">
              <b className="w-[66px] font-normal text-[#52525B]">Links</b>
              <i className="not-italic text-[#E4E4E7]">{stats?.links ?? "—"}</i>
            </div>
            <div className="flex">
              <b className="w-[66px] font-normal text-[#52525B]">Fps</b>
              <i className="not-italic text-[#E4E4E7]">{stats?.fps ?? "—"}</i>
            </div>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#52525B]">
            Move cursor
          </div>
        </footer>
      </div>
    </ParticleGraph>
  );
}

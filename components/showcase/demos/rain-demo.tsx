"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { RainBackground } from "@/components/ui/rain";

/**
 * Mesmas props da demo publicada, com uma diferença: o trovão entra por estado,
 * controlado pelo botão no canto superior direito, e começa DESLIGADO — solto,
 * o componente tentaria tocar áudio a cada relâmpago assim que a página
 * recebesse qualquer clique.
 *
 * O botão fica fora do RainBackground de propósito: os children dele caem num
 * wrapper centralizado pelo flex, então um `absolute` ali ancoraria no meio da
 * caixa, não no canto.
 */
const RainDemo = () => {
  const [soundOn, setSoundOn] = useState(false);

  return (
    <div className="relative h-[650px] w-full">
      <RainBackground
        intensity={500}
        speed={0.5}
        angle={10}
        color={"rgba(174, 194, 224, 0.6)"}
        dropSize={{ min: 1, max: 2 }}
        lightningEnabled={true}
        lightningFrequency={8}
        thunderEnabled={soundOn}
        thunderVolume={1}
        thunderDelay={2}
        className="bg-background relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-950"
      >
        <div className="p-6">
          <p className="z-10 text-white text-center text-3xl font-semibold tracking-tighter whitespace-pre-wrap  md:text-7xl ">
            Rain
          </p>
        </div>
      </RainBackground>

      <button
        type="button"
        onClick={() => setSoundOn((on) => !on)}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Desligar o som do trovão" : "Ligar o som do trovão"}
        className="absolute right-4 top-4 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
      >
        {soundOn ? (
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        ) : (
          <VolumeX className="h-4 w-4" aria-hidden="true" />
        )}
        <span>{soundOn ? "Som ligado" : "Som desligado"}</span>
      </button>
    </div>
  );
};

export { RainDemo };

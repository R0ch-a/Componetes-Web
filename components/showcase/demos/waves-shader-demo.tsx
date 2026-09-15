"use client";

import { ShaderBackground } from "@/components/ui/waves-shader";

/**
 * A demo da fonte usa `h-screen`; no palco da vitrine ele vira uma caixa de
 * altura fixa. O componente não pede mais do que isso: mede o pai e preenche.
 */
const WavesShaderDemo = () => {
  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-xl">
      <ShaderBackground className="h-full w-full" />
    </div>
  );
};

export { WavesShaderDemo };

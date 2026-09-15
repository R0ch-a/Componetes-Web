"use client";

import { DottedGlobe } from "@/components/ui/dotted-globe";

/**
 * O mapa-múndi (specular da Terra) vive em public/textures/, então o componente
 * não depende de CDN em runtime.
 */
const DottedGlobeDemo = () => {
  return (
    <div className="flex w-full items-center justify-center rounded-xl bg-[#f5f5f5] p-6">
      <DottedGlobe className="aspect-square w-full max-w-[560px]" />
    </div>
  );
};

export { DottedGlobeDemo };

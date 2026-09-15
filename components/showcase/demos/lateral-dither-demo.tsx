"use client";

import { useState } from "react";
import { LateralDither } from "@/components/ui/lateral-dither";
import { Switch } from "@/components/ui/switch";

/** #1f1f1f */
const CINZA: [number, number, number] = [31, 31, 31];

/**
 * O `colorFront` que o Neon Dither calcula no tema escuro com a intensity 0.85
 * da demo dele: mix("#614B00", "#A87C00", 0.85 × 0.35) = rgb(118, 90, 0).
 */
const DOURADO: [number, number, number] = [118, 90, 0];

const LateralDitherDemo = () => {
  const [dourado, setDourado] = useState(false);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-end gap-3 text-xs text-muted-foreground">
        <span className={dourado ? "" : "text-foreground"}>Cinza</span>
        <Switch
          id="lateral-dither-cor"
          checked={dourado}
          onCheckedChange={setDourado}
          aria-label="Alternar entre cinza e dourado"
        />
        <span className={dourado ? "text-foreground" : ""}>Dourado</span>
      </div>

      <LateralDither tone={dourado ? DOURADO : CINZA} className="h-[440px] w-full rounded-xl" />
    </div>
  );
};

export { LateralDitherDemo };

"use client";

import { Confetti } from "@/components/ui/confetti";

/**
 * O disparo sai do centro do botão e alcança uns 280px antes da gravidade
 * vencer, então o palco precisa de altura — daí o min-h no stageClassName.
 */
const ConfettiDemo = () => {
  return (
    <div className="flex w-full items-center justify-center py-20">
      <Confetti />
    </div>
  );
};

export { ConfettiDemo };

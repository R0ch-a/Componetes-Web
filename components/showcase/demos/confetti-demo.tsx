"use client";

import { Confetti } from "@/components/ui/confetti";

/**
 * O próprio componente já traz o palco: `.confetti-stage` é uma caixa de
 * 420x300 com `overflow: hidden`, e o confete é recortado por ela de propósito.
 */
const ConfettiDemo = () => {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <Confetti />
    </div>
  );
};

export { ConfettiDemo };

"use client";

import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";

/**
 * O arquivo do componente não traz `"use client"` mas usa `useState`, então a
 * fronteira de cliente vai aqui — o mesmo arranjo do Topology Field.
 */
const AnimatedThemeToggleDemo = () => {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <AnimatedThemeToggle />
    </div>
  );
};

export { AnimatedThemeToggleDemo };

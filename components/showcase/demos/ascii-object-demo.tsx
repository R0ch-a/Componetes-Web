"use client";

import { AsciiObject } from "@/components/ui/ascii-object";

/**
 * Mesma configuração da documentação. O `src` aponta para o modelo baixado em
 * public/assets/models/ — o duck.glb da coleção de exemplos da Khronos.
 */
export function AsciiObjectDemo() {
  return (
    <AsciiObject
      src="/assets/models/duck.glb"
      cellSize={10}
      cellAspect={0.6}
      contrast={1.5}
      edgeContrast={3}
      exposure={1}
      environmentIntensity={1}
      roughness={0.15}
      scale={3}
      xOffset={0}
      yOffset={0}
      floatIntensity={2}
      rotationIntensity={1}
      floatSpeed={2}
      fov={65}
      cameraDistance={4.2}
      ascii
      colored
      invert={false}
      autoRotate={false}
      zoom={false}
      color="#ffffff"
      highlight="#066aff"
      className="mx-auto aspect-square w-full max-w-xl"
    />
  );
}

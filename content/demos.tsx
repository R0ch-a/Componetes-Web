import type { ComponentType } from "react";
import { AnimatedListDemo } from "@/components/showcase/demos/animated-list-demo";
import { TiltedCarouselDemo } from "@/components/showcase/demos/tilted-carousel-demo";
import { DiagonalCarouselDemo } from "@/components/showcase/demos/diagonal-carousel-demo";
import { DraggableCardDemo } from "@/components/showcase/demos/draggable-card-demo";
import { ViewOnMapDemo } from "@/components/showcase/demos/view-on-map-demo";
import { KeyboardDemo } from "@/components/showcase/demos/keyboard-demo";
import { FractionalPickerDemo } from "@/components/showcase/demos/fractional-picker-demo";
import { WeightWidgetDemo } from "@/components/showcase/demos/weight-widget-demo";
import { TooltipCardDemo } from "@/components/showcase/demos/tooltip-card-demo";
import { AsciiObjectDemo } from "@/components/showcase/demos/ascii-object-demo";
import { VideoTextDemo } from "@/components/showcase/demos/video-text-demo";
import { ParticlesDemo } from "@/components/showcase/demos/particles-demo";
import { MeteorsDemo } from "@/components/showcase/demos/meteors-demo";
import { ShinyButtonDemo } from "@/components/showcase/demos/shiny-button-demo";
import { Button03Demo } from "@/components/showcase/demos/button-03-demo";
import { ConfettiDemo } from "@/components/showcase/demos/confetti-demo";
import { AnimatedThemeToggleDemo } from "@/components/showcase/demos/animated-theme-toggle-demo";
import { DropdownMenuDemo } from "@/components/showcase/demos/dropdown-menu-demo";
import { FloatingActionMenuDemo } from "@/components/showcase/demos/floating-action-menu-demo";
import { AnimatedTabsDemo } from "@/components/showcase/demos/animated-tabs-demo";
import { DotPatternDemo } from "@/components/showcase/demos/dot-pattern-demo";
import { DottedGlobeDemo } from "@/components/showcase/demos/dotted-globe-demo";
import { AsciiArtDemo } from "@/components/showcase/demos/ascii-art-demo";
import { TextRollDemo } from "@/components/showcase/demos/text-roll-demo";
import { GlassDemo } from "@/components/showcase/demos/glass-demo";
import { LateralDitherDemo } from "@/components/showcase/demos/lateral-dither-demo";
import { RetroDitherDemo } from "@/components/showcase/demos/retro-dither-demo";
import { WavesShaderDemo } from "@/components/showcase/demos/waves-shader-demo";
import { InkRevealDemo } from "@/components/showcase/demos/ink-reveal-demo";
import { TopologyFieldDemo } from "@/components/showcase/demos/topology-field-demo";
import { LensDemo } from "@/components/showcase/demos/lens-demo";
import { KnobSliderDemo } from "@/components/showcase/demos/knob-slider-demo";
import { LayeredStackDemo } from "@/components/showcase/demos/layered-stack-demo";
import { MacKeyboardDemo } from "@/components/showcase/demos/mac-keyboard-demo";
import { ProgramStackDemo } from "@/components/showcase/demos/program-stack-demo";
import { Skiper48Demo } from "@/components/showcase/demos/skiper-48-demo";
import { Skiper51Demo } from "@/components/showcase/demos/skiper-51-demo";
import { Skiper54Demo } from "@/components/showcase/demos/skiper-54-demo";
import { Skiper52Demo } from "@/components/showcase/demos/skiper-52-demo";
import { StackedCardsInteractionDemo } from "@/components/showcase/demos/stacked-cards-interaction-demo";

/**
 * Demos do modo "palco", ligadas ao id da entrada no registry.
 * Entradas com `preview` (modo quadro) não aparecem aqui — elas rodam
 * na própria rota em app/preview/.
 */
export const demos: Record<string, ComponentType> = {
  "stacked-cards-interaction": StackedCardsInteractionDemo,
  "layered-stack": LayeredStackDemo,
  "mac-keyboard": MacKeyboardDemo,
  "keyboard-aceternity": KeyboardDemo,
  "knob-slider": KnobSliderDemo,
  "fractional-picker": FractionalPickerDemo,
  "weight-widget": WeightWidgetDemo,
  "tooltip-card": TooltipCardDemo,
  "text-roll": TextRollDemo,
  "ascii-art": AsciiArtDemo,
  "ascii-object": AsciiObjectDemo,
  "dotted-globe": DottedGlobeDemo,
  "meteors": MeteorsDemo,
  "video-text": VideoTextDemo,
  "dot-pattern": DotPatternDemo,
  "particles": ParticlesDemo,
  "shiny-button": ShinyButtonDemo,
  "button-03": Button03Demo,
  "confetti": ConfettiDemo,
  "animated-theme-toggle": AnimatedThemeToggleDemo,
  "dropdown-menu": DropdownMenuDemo,
  "floating-action-menu": FloatingActionMenuDemo,
  "animated-tabs": AnimatedTabsDemo,
  "lens": LensDemo,
  "glass": GlassDemo,
  "lateral-dither": LateralDitherDemo,
  "retro-dither": RetroDitherDemo,
  "waves-shader": WavesShaderDemo,
  "ink-reveal": InkRevealDemo,
  "topology-field": TopologyFieldDemo,
  "hover-expand": Skiper52Demo,
  "carousel-002": Skiper48Demo,
  "carousel-005": Skiper51Demo,
  "carousel-006": Skiper54Demo,
  "program-stack": ProgramStackDemo,
  "diagonal-carousel": DiagonalCarouselDemo,
  "animated-list": AnimatedListDemo,
  "tilted-carousel": TiltedCarouselDemo,
  "draggable-card": DraggableCardDemo,
  "view-on-map": ViewOnMapDemo,
};

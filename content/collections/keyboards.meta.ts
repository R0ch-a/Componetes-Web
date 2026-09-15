import type { CollectionMeta } from "@/content/types";

/** Só metadados — veja a nota em cards.meta.ts. */
export const keyboardsMeta: CollectionMeta = {
  slug: "teclados",
  name: "Teclados",
  tagline: "Teclas que respondem ao que você digita",
  description:
    "Componentes de teclado: as teclas reagem ao teclado físico, então basta digitar com esta página aberta para ver a animação.",
  entries: [
    {
      id: "mac-keyboard",
      name: "Mac Keyboard",
      description:
        'Teclado de MacBook completo em CSS: cada tecla acende ao ser pressionada no teclado físico (via event.code, então independe do layout) e toca um clique curto pela Web Audio API. Também dá para montar combinações menores passando MacKey como children. Use soundSrc para trocar o som, ou soundSrc="" para desligá-lo.',
      tags: ["keyboard", "react", "web-audio", "css"],
      source: "components/ui/mac-keyboard.tsx",
      stageClassName: "min-h-0 p-6",
    },
    {
      id: "keyboard-aceternity",
      name: "Keyboard",
      description:
        "Segundo teclado da coleção, com som de verdade: cada tecla toca um trecho próprio de um sprite de áudio único (/sounds/sound.ogg), recortado por offsets em milissegundos — pressionar e soltar disparam trechos diferentes. As teclas respondem tanto ao clique quanto ao teclado físico. Passe enableSound para ligar o áudio; sem ele, o componente fica mudo e não baixa o sprite.",
      tags: ["keyboard", "motion", "web-audio", "sprite"],
      source: "components/ui/keyboard.tsx",
      stageClassName: "min-h-0 p-6",
      credit: { label: "Aceternity UI", href: "https://ui.aceternity.com/components/keyboard" },
    },
  ],
};

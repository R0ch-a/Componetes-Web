import type { CollectionMeta } from "@/content/types";

/** Só metadados — veja a nota em cards.meta.ts. */
export const asciiMeta: CollectionMeta = {
  slug: "ascii-art",
  name: "ASCII Art",
  tagline: "Imagens redesenhadas com caracteres",
  description:
    "Componentes que convertem imagem em texto — amostragem de pixels, mapeamento por luminância e a revelação dos caracteres.",
  entries: [
    {
      id: "ascii-art",
      name: "ASCII Art",
      description:
        "Converte uma imagem em caracteres: desenha o arquivo num canvas reduzido a resolution colunas, lê a luminância de cada pixel e escolhe o caractere correspondente, redesenhando tudo num canvas final. A revelação tem quatro modos — fade, typewriter, matrix e none — e pode esperar o componente entrar na tela (animateOnView). Props: src, resolution, color, animationStyle, animationDuration, animateOnView e className. O arquivo também exporta AsciiArtStatic.",
      tags: ["canvas", "motion", "image", "ascii"],
      source: "components/ui/ascii-art.tsx",
      stageClassName: "min-h-0 p-6",
      credit: { label: "Aceternity UI", href: "https://ui.aceternity.com/components/ascii-art" },
    },
    {
      id: "ascii-object",
      name: "ASCII Object",
      description:
        "Um objeto 3D de verdade redesenhado em ASCII, em tempo real. A cena roda num estúdio iluminado com three.js e o resultado passa por dois shaders: o primeiro divide a tela em células e, para cada uma, compara seis amostras circulares com a forma medida de cada glifo — por isso barras e traços caem nas bordas do objeto, em vez de escolher caractere só por brilho; o segundo desenha o glifo escolhido a partir de um atlas. Aceita GLB/glTF, SVG e imagens (o formato é farejado pelos bytes, não pela extensão), dá para orbitar arrastando, e tem uns 30 props de ajuste — cellSize, edgeContrast, highlight, colored, invert, entre outros.",
      tags: ["webgl", "three.js", "shader", "3d", "ascii"],
      source: "components/ui/ascii-object.tsx",
      stageClassName: "min-h-0 p-6",
      credit: { label: "Canvas UI", href: "https://canvas-ui.com" },
    },
  ],
};

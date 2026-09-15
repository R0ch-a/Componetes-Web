import type { CollectionMeta } from "@/content/types";

/** Só metadados — veja a nota em cards.meta.ts. */
export const cursorMeta: CollectionMeta = {
  slug: "cursor",
  name: "Cursor",
  tagline: "O ponteiro como ferramenta",
  description:
    "Componentes que respondem ao cursor — lupas, rastros, ponteiros customizados e revelações que seguem a mão.",
  entries: [
    {
      id: "lens",
      name: "Lens",
      description:
        "Uma lupa que segue o cursor sobre qualquer conteúdo. Uma segunda cópia do conteúdo é ampliada e recortada por um mask-image radial centrado no ponteiro — como o transform-origin acompanha a mesma coordenada, o trecho sob a lente cresce a partir dali, sem deslizar. Aceita imagem, vídeo ou JSX em children. Props: zoomFactor, lensSize, lensColor, duration, isStatic e position (lente fixa), defaultPosition (parte de um ponto e passa a seguir no hover) e ariaLabel.",
      tags: ["hover", "motion", "mask", "zoom"],
      source: "components/ui/lens.tsx",
      stageClassName: "min-h-0 p-6",
      credit: { label: "Magic UI — @h3rmel", href: "https://magicui.design/docs/components/lens" },
    },
    {
      id: "glass",
      name: "Glass",
      description:
        "Uma lente de vidro que segue o cursor e refrata o conteúdo vivo da página — não uma imagem dele. Um shader WebGL calcula a refração com índice configurável, aberração cromática (o espectro se separa no aro), reflexo de Fresnel e brilho especular; ao passar sobre um alvo (títulos, links, botões, por seletor CSS) a lente amplia como bola de cristal. Depende da API experimental html-in-canvas do Chrome para capturar a página; sem ela, cai num modo degradado que desenha só o aro luminoso. Props: shape, size, aspect, corner, ior, edge, bevel, depth, aberration, blur, reflection, shine, zoom, targets e follow.",
      tags: ["webgl", "shader", "refraction", "cursor"],
      source: "components/ui/glass.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Canvas UI", href: "https://canvasui.dev" },
    },
    {
      id: "lateral-dither",
      name: "Lateral Dither (teste)",
      description:
        "Seção temporária de teste. O mesmo dither do Neon Dither — Bayer 4x4, pixel de 4px, speed 0.5775 e scale 1.1775, os números da demo dele —, só que a massa densa nasce na lateral direita e a frente vai e volta em linha reta, sem a curva em S. A biblioteca do Neon Dither não tem prop para isso: a curva vem do termo `wave`, que depende de x. O shader reproduz a matemática dela fixando x = 0 dentro desse termo, o que deixa só o movimento no tempo — o mesmo da coluna central do original, aplicado à frente inteira. Anima sozinho, sem depender do cursor, e pausa fora da tela. A demo alterna por switch entre cinza #1f1f1f e o dourado do Neon Dither. Props: tone, pixelSize, speed, scale, amplitude e front.",
      tags: ["webgl", "shader", "dither", "teste"],
      source: "components/ui/lateral-dither.tsx",
      stageClassName: "min-h-0 p-4",
    },
  ],
};

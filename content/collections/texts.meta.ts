import type { CollectionMeta } from "@/content/types";

/** Só metadados — veja a nota em cards.meta.ts. */
export const textsMeta: CollectionMeta = {
  slug: "textos",
  name: "Textos",
  tagline: "Tipografia em movimento e leitura com atmosfera",
  description:
    "Componentes que tratam o texto como matéria visual — máscaras, desfoques, revelações e transições de leitura.",
  entries: [
    {
      id: "progressive-blur",
      name: "Progressive Blur (Skiper 41)",
      description:
        "Faixas de desfoque no topo e na base que borram o texto ao entrar e sair da leitura, sem cortar nada com uma linha dura: um backdrop-filter é aplicado sobre um gradiente e depois recortado por mask-image, de modo que a intensidade se dissolve ao longo da faixa. O ProgressiveBlur é exportado à parte e aceita position, backgroundColor, height e blurAmount — dá para usar sozinho sobre qualquer conteúdo rolável.",
      tags: ["scroll", "backdrop-filter", "mask", "css"],
      source: "components/ui/skiper-41.tsx",
      preview: { route: "/preview/progressive-blur" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Skiper UI — @gurvinder-singh02", href: "https://skiper-ui.com" },
    },
    {
      id: "tooltip-card",
      name: "Tooltip Card",
      description:
        "Tooltip que nasce onde o cursor está e cresce de altura zero até o tamanho do conteúdo, medido em tempo real. Acompanha o mouse enquanto ele percorre o termo destacado e se reposiciona sozinho quando esbarraria nas bordas da janela — vira para o lado ou para cima conforme o espaço. O content aceita texto ou JSX, então cabe desde uma definição curta até um cartão com foto e citação. Em telas sem hover, abre no toque e fecha depois de 2s.",
      tags: ["hover", "motion", "tooltip", "auto-position"],
      source: "components/ui/tooltip-card.tsx",
      stageClassName: "min-h-[420px] p-6",
      credit: { label: "Aceternity UI", href: "https://ui.aceternity.com/components/tooltip-card" },
    },
    {
      id: "text-roll",
      name: "Text Roll",
      description:
        "Cada letra gira em 3D como a aba de um relógio de folhinha. O truque é ter duas cópias empilhadas da mesma letra: uma sai girando de 0° a 90° com origem em 50% 25%, a outra entra de 90° a 0° com origem em 50% 100%, e `backface-visibility: hidden` esconde quem está de costas — a troca acontece no instante em que ambas ficam de perfil. Uma terceira cópia invisível segura a largura, já que as animadas são absolutas. O atraso por letra vem de duas funções (`getEnterDelay` e `getExitDelay`), então a cascata é reprogramável, e `variants` permite trocar a rotação inteira por outro par de estados. Recebe uma string em children; o texto real fica num `sr-only` para o leitor de tela.",
      tags: ["motion", "3d", "letters", "stagger"],
      source: "components/ui/text-roll.tsx",
      stageClassName: "min-h-[260px]",
      credit: { label: "motion-primitives", href: "https://motion-primitives.com/docs/text-roll" },
    },
    {
      id: "text-reveal",
      name: "Text Reveal",
      description:
        "O texto acende palavra por palavra conforme a página rola. Cada palavra recebe uma fatia igual do progresso do scroll (a i-ésima de n vai de i/n a (i+1)/n) e interpola a opacidade de 0 a 1 dentro dela — por baixo fica uma cópia fantasma em 30%, que dá o texto apagado esperando a vez. O bloco tem 200vh e prende a frase no topo enquanto passa. Recebe uma string em children.",
      tags: ["scroll", "motion", "sticky", "reveal"],
      source: "components/ui/text-reveal.tsx",
      preview: { route: "/preview/text-reveal" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Magic UI", href: "https://magicui.design/docs/components/text-reveal" },
    },
    {
      id: "flying-text",
      name: "Flying Text",
      description:
        "As letras se soltam do texto e voam com o vento conforme você rola. Cada caractere é medido pela Range API, recriado como span absoluto na posição exata e ganha sua própria trajetória: deslocamento na direção do vento, desvio aleatório, rotação nos três eixos e profundidade em Z. Com gustiness a rota ganha uma senoide lateral, sem tirar as letras do ponto de partida nem de chegada. Um RNG semeado garante que o mesmo seed dê sempre o mesmo voo. Com reverse, o scroll monta o texto em vez de desmanchá-lo. Ordem das letras: random, ltr, rtl ou outward.",
      tags: ["scroll", "gsap", "scrolltrigger", "3d", "text"],
      source: "components/ui/flying-text.tsx",
      preview: { route: "/preview/flying-text" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado de ux_ui_design/flyingtext" },
    },
  ],
};

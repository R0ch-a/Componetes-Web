import type { CollectionMeta } from "@/content/types";

/** Só metadados — veja a nota em cards.meta.ts. */
export const buttonsMeta: CollectionMeta = {
  slug: "buttons",
  name: "Buttons",
  tagline: "Botões com vida própria",
  description:
    "Botões que reagem ao ponteiro, brilham, se transformam ou dão feedback — o clique como pequeno evento visual.",
  entries: [
    {
      id: "shiny-button",
      name: "Shiny Button",
      description:
        "Um facho de luz atravessa o botão em looping. O truque não usa pseudo-elemento: uma variável CSS --x é animada pelo Motion de 100% a -100% e alimenta dois gradientes a -75° — um como mask-image sobre o texto, outro como borda desenhada por mask compositing (content-box exclude), então o brilho corre pela letra e pelo contorno ao mesmo tempo. A cor sai de var(--primary), acompanhando o tema; no clique o botão encolhe com spring.",
      tags: ["motion", "mask", "gradient", "loop"],
      source: "components/ui/shiny-button.tsx",
      stageClassName: "min-h-[220px]",
      credit: { label: "Magic UI — @luis-code", href: "https://magicui.design/docs/components/shiny-button" },
    },
    {
      id: "dropdown-menu",
      name: "Dropdown Menu",
      description:
        "Menu de vidro escuro que abre sob o botão. Não é o Dropdown do Radix: é um estado local e um AnimatePresence, então o painel entra e sai com animação de verdade em vez de sumir de estalo. A entrada combina blur, escala e deslocamento — cada item chega com 0.1s de atraso sobre o anterior, o que dá a cascata —, e a seta gira 180° com spring. Hover e tap são props do Motion (whileHover, whileTap), sem classe de estado. Recebe `options` (label, onClick e um Icon opcional) e o rótulo do botão como children; sem opções, mostra 'No options'.",
      tags: ["framer-motion", "dropdown", "blur", "stagger"],
      source: "components/ui/dropdown-menu.tsx",
      stageClassName: "min-h-[340px] items-start",
      credit: { label: "21st.dev" },
    },
    {
      id: "floating-action-menu",
      name: "Floating Action Menu",
      description:
        "O FAB do Material, em vidro escuro: um botão redondo preso ao canto inferior direito que abre uma pilha de ações para cima. O + gira 45° e vira ×, com spring. A pilha inteira entra por um wrapper (opacidade, deslocamento e blur) e cada ação chega por dentro dele com 0.05s de atraso sobre a anterior — dois níveis de animação, então a cascata acontece enquanto o grupo ainda está entrando. Recebe `options` (label, onClick e um Icon opcional); o `className` sobrescreve o `fixed bottom-8 right-8`, que é como a demo o traz para dentro de uma caixa.",
      tags: ["framer-motion", "fab", "menu", "stagger"],
      source: "components/ui/floating-action-menu.tsx",
      stageClassName: "min-h-[340px] items-end",
      credit: { label: "21st.dev" },
    },
    {
      id: "button-03",
      name: "Button 03 — Pixel-Broke",
      description:
        "Botão cujas bordas se despedaçam no hover. Cada lado tem doze faixas, e o `--index` de cada uma (0 a 4) não é tamanho: é distância de voo. Faixa com índice 0 não desenha nada — por isso são cinco quadrados por lado, não doze — e as outras trazem um quadrado de 13px que em repouso encosta na barra, fechando a silhueta, e no hover se solta e vai para fora tantos quadrados quanto o índice, deixando o vazio branco entre ele e o botão. As colunas ficam fora da barra e são mais altas que ela (doze faixas de meio quadrado, vizinhos sobrepostos pela metade), então os quadrados das pontas passam da borda de cima e de baixo — é daí que vem o degrau nos cantos quando o botão está parado, e o escalonamento quando estoura. O atraso cresce do topo até o meio e decresce até a base, então a quebra corre pela borda em vez de saltar de uma vez. O `opacity: min(1, var(--index))` apaga as faixas zeradas sem precisar de seletor. O rótulo sai em caixa alta e troca de cor no hover pelo clone de `data-text`, que entra sobreposto, sem deslocar nada. Prop: text. Atenção: a fonte colada trouxe só o JSX, e o CSS aqui é reconstrução; a classe `w-inline-block` é do Webflow e não faz nada neste projeto; e o elemento é um `<a href=\"#\">`, então o clique pula para o topo da página.",
      tags: ["css", "pixel", "hover", "stagger"],
      source: "components/ui/pixel-broke-button.tsx",
      stageClassName: "min-h-[220px]",
    },
    {
      id: "confetti",
      name: "Confetti",
      description:
        "Botão que solta confete a cada clique. A física não roda quadro a quadro: no momento do disparo o componente simula os 150 ticks inteiros — velocidade com decaimento de 0.91, gravidade somada ao y, gingado por cosseno — e destila tudo em 41 keyframes de `transform` por partícula, que o Motion depois interpola em linear. Por isso 60 partículas custam 60 animações do WAAPI e nenhum rAF. Cada peça sorteia forma (círculo, retângulo ou fita — a fita é alta e estreita, e o `rotateY` contínuo faz ela piscar de perfil como papel girando), cor entre sete, tamanho e rotação. Os primeiros 8% do tempo são um estalo de escala até 1.15 e volta; a opacidade só começa a cair na metade. Cada rajada é um nó próprio que se remove sozinho meio segundo depois de acabar, então cliques seguidos se acumulam em vez de cortar o anterior. Props: particleCount, startVelocity, spread, decay, gravity, drift, duration, size e buttonSpring. Atenção: o paste importa `./motion-confetti-utils/index.css` mas não trouxe a folha — a que está no repositório é reconstrução.",
      tags: ["motion", "waapi", "particles", "click"],
      source: "components/ui/confetti.tsx",
      stageClassName: "min-h-[560px]",
    },
    {
      id: "animated-tabs",
      name: "Animated Tabs",
      description:
        "Abas em que uma pílula desliza até a aba clicada. O deslize não é calculado à mão: a pílula tem layoutId e só existe dentro da aba ativa, então quando ela some de uma e nasce na outra o Motion anima a transição entre as duas posições, com spring de bounce 0.2. O contraste do texto também não é trocado por classe — a pílula usa bg-primary com mix-blend-difference por cima do rótulo. No tema escuro isso dá pílula clara com letra preta; no claro, o primary escuro subtraído do fundo branco vira um cinza quase branco (≈rgb 231), e a pílula quase some sobre o card. Outro detalhe: rounded-[--radius] é sintaxe do Tailwind v3 e não gera nada no v4 — o botão fica com raio 0, e o anel de foco sai quadrado em volta da pílula arredondada. Atenção: o layoutId é fixo (\"bubble\"), então duas instâncias na mesma página disputam a mesma pílula. Props: tabs (id e label), defaultTab e onChange.",
      tags: ["framer-motion", "layout", "tabs", "blend"],
      source: "components/ui/animated-tabs.tsx",
      stageClassName: "min-h-[220px]",
      credit: { label: "21st.dev" },
    },
  ],
};

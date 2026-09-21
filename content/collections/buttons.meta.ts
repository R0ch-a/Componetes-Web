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
      credit: { label: "21st.dev — chetanverma16", href: "https://21st.dev/@chetanverma16/components/dropdown-menu" },
    },
    {
      id: "floating-action-menu",
      name: "Floating Action Menu",
      description:
        "O FAB do Material, em vidro escuro: um botão redondo preso ao canto inferior direito que abre uma pilha de ações para cima. O + gira 45° e vira ×, com spring. A pilha inteira entra por um wrapper (opacidade, deslocamento e blur) e cada ação chega por dentro dele com 0.05s de atraso sobre a anterior — dois níveis de animação, então a cascata acontece enquanto o grupo ainda está entrando. Recebe `options` (label, onClick e um Icon opcional); o `className` sobrescreve o `fixed bottom-8 right-8`, que é como a demo o traz para dentro de uma caixa.",
      tags: ["framer-motion", "fab", "menu", "stagger"],
      source: "components/ui/floating-action-menu.tsx",
      stageClassName: "min-h-[340px] items-end",
      credit: { label: "21st.dev — chetanverma16", href: "https://21st.dev/@chetanverma16/components/floating-action-menu" },
    },
    {
      id: "button-03",
      name: "Button 03 — Pixel-Broke",
      description:
        "O nome engana: no hover os pixels não aparecem, eles somem. A barra é um bloco preto cheio com uma grade de 3 colunas por 4 linhas de quadrados pretos em cada ponta (o `aspect-ratio: 1` deixa a célula quadrada e, por tabela, dá a largura das pontas: a altura da barra dividida por quatro). Em repouso duas células já estão em `opacity: 0` — a primeira da esquerda e a décima segunda da direita — e são elas o degrau no canto superior esquerdo e no inferior direito. No hover mais cinco por lado apagam, e são os buracos que desenham a quebra. `--index` não posiciona nada: alimenta só o `transition-delay` (40ms por passo), e como o `transition` vem sem duração o quadrado não desvanece — pisca para fora. Quais células apagam está fixo no seletor, e as posições batem uma a uma com os índices não-zero dos vetores do JSX (esquerda 3,4,5,8,12 / direita 1,5,8,9,10). O rótulo é um typewriter: o clone de `data-text` abre de 0 a 100% de largura em `steps(var(--characters))` com `overflow: clip`, enquanto o texto real vai a `opacity: 0`. Fundo e rótulo se empilham em `grid-area: 1/1`, sem `position`. No toque não há hover: uma media query `(hover:none) or (pointer:coarse)` repete o recorte no `:active`. Atenção: `--characters` está cravado em 11, o tamanho de \"Pixel-Broke\", então outro `text` dessincroniza os passos da digitação; as cores são literais (#000 e #f9f4eb) e não acompanham o tema; a classe `w-inline-block` é do Webflow e não tem regra nenhuma; e o elemento é um `<a href=\"#\">`, então o clique pula para o topo. O registry do 21st.dev publica este componente sem CSS (`registryDependencies` vazio) — a folha veio do bundle público da demo.",
      tags: ["css", "grid", "pixel", "typewriter"],
      source: "components/ui/pixel-broke-button.tsx",
      stageClassName: "min-h-[220px]",
      credit: { label: "21st.dev — nextjsshop", href: "https://21st.dev/@nextjsshop/components/pixel-broke-button" },
    },
    {
      id: "confetti",
      name: "Confetti",
      description:
        "Botão que solta confete a cada clique. A física não roda quadro a quadro: no momento do disparo o componente simula os 150 ticks inteiros — velocidade com decaimento de 0.91, gravidade somada ao y, gingado por cosseno — e destila tudo em 41 keyframes de `transform` por partícula, que o Motion depois interpola em linear. Por isso 60 partículas custam 60 animações do WAAPI e nenhum rAF. Cada peça sorteia forma (círculo, retângulo ou fita — a fita é alta e estreita, e o `rotateY` contínuo faz ela piscar de perfil como papel girando), cor entre sete, tamanho e rotação. Os primeiros 8% do tempo são um estalo de escala até 1.15 e volta; a opacidade só começa a cair na metade. Cada rajada é um nó próprio que se remove sozinho meio segundo depois de acabar, então cliques seguidos se acumulam em vez de cortar o anterior. O palco é parte do componente: `.confetti-stage` é uma caixa fixa de 420x300 com `overflow: hidden`, e o confete é recortado por ela de propósito; o burst fica em `z-index: 10000` contra o `z-index: 1` do botão, então passa por cima dele. Props: particleCount, startVelocity, spread, decay, gravity, drift, duration, size e buttonSpring. Atenção: o registry do 21st.dev publica o componente sem a folha que ele importa — a que está no repositório veio do bundle público da demo, e traz paleta própria escura escopada no palco.",
      tags: ["motion", "waapi", "particles", "click"],
      source: "components/ui/confetti.tsx",
      stageClassName: "min-h-[380px]",
      credit: { label: "21st.dev — motiondotdev", href: "https://21st.dev/@motiondotdev/components/motion-confetti" },
    },
    {
      id: "animated-theme-toggle",
      name: "Animated Theme Toggle",
      description:
        "Botão de tema com sol e lua desenhados em SVG, pensado para o ícone se transformar de um no outro: as variants do Framer Motion levam a escala do sol de 1 a 0 e a da lua de 0 a 1 em 0,7s, e um `useTransform` amarra o `pathLength` à escala na faixa de 0,6 a 1, de modo que o traço fosse sendo desenhado no fim da ampliação. O sol são dez paths (o disco e os oito raios), a lua é um só. Duas ressalvas grandes. A primeira: **no estado em que a fonte foi publicada o botão não anima** — cada path recebe `style={{ scale: <motion value> }}`, e um motion value em `style` tem precedência sobre a escala que as variants animam; como nada nunca chama `.set()` nesses valores (o argumento de `useMotionValue` só vale na montagem), sol e lua ficam congelados no estado inicial e o clique não muda pixel nenhum. Medido: antes e depois do clique, a lua segue em `matrix(0,0,0,0,0,0)` e o sol em `none`. A segunda: mesmo funcionando, ele não troca o tema da página — o `useState` é local e o componente não fala com o next-themes; é só o ícone. Prop: className. O arquivo também não traz `\"use client\"` apesar de usar `useState`, então a fronteira de cliente vai na demo.",
      tags: ["framer-motion", "svg", "icon", "toggle"],
      source: "components/ui/animated-theme-toggle.tsx",
      stageClassName: "min-h-[220px]",
      credit: { label: "21st.dev" },
    },
    {
      id: "animated-tabs",
      name: "Animated Tabs",
      description:
        "Abas em que uma pílula desliza até a aba clicada. O deslize não é calculado à mão: a pílula tem layoutId e só existe dentro da aba ativa, então quando ela some de uma e nasce na outra o Motion anima a transição entre as duas posições, com spring de bounce 0.2. O contraste do texto também não é trocado por classe — a pílula usa bg-primary com mix-blend-difference por cima do rótulo. No tema escuro isso dá pílula clara com letra preta; no claro, o primary escuro subtraído do fundo branco vira um cinza quase branco (≈rgb 231), e a pílula quase some sobre o card. Outro detalhe: rounded-[--radius] é sintaxe do Tailwind v3 e não gera nada no v4 — o botão fica com raio 0, e o anel de foco sai quadrado em volta da pílula arredondada. Atenção: o layoutId é fixo (\"bubble\"), então duas instâncias na mesma página disputam a mesma pílula. Props: tabs (id e label), defaultTab e onChange.",
      tags: ["framer-motion", "layout", "tabs", "blend"],
      source: "components/ui/animated-tabs.tsx",
      stageClassName: "min-h-[220px]",
      credit: { label: "21st.dev — builduilabs", href: "https://21st.dev/@builduilabs/components/animated-tabs" },
    },
  ],
};

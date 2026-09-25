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
      id: "smooth-dropdown",
      name: "Smooth Dropdown",
      description:
        "Um botão de 40px que se desdobra no próprio menu, sem popover separado: a mesma caixa anima largura (40 → 220), altura e raio com uma mola (amortecimento 34, rigidez 380), crescendo do canto superior direito. A altura aberta não é chutada — o `react-use-measure` mede o conteúdo e a caixa vai exatamente até ele. Enquanto isso o ícone de reticências encolhe e some em 0,15s, e os itens entram com 20ms de atraso entre um e outro, deslizando 8px da direita. O destaque de hover é um fundo e uma barrinha lateral com `layoutId`, então eles correm de item em item em vez de piscar; sem hover, voltam para o item ativo. Logout tem paleta própria em vermelho e fecha o menu; os outros itens só marcam o ativo. Clique fora fecha, via `mousedown` no documento, registrado só enquanto aberto. Os itens moram numa constante no topo do arquivo (“Change Here”), sem props. Usa a sintaxe de `!` no fim da classe do Tailwind v4 (`m-0!`, `p-0!`) para vencer estilos de prosa. Atenções: o fundo de hover do Logout é `bg-red-50`, fixo — no tema escuro vira um bloco rosa-claro sob texto vermelho, destoando do resto do menu; os dois `layoutId` são fixos, então duas instâncias na mesma página disputam o mesmo destaque; e o componente exporta `TwentyTwelveOne`, não `SmoothDropdown`.",
      tags: ["motion", "dropdown", "layout", "spring"],
      source: "components/ui/smooth-dropdown.tsx",
      stageClassName: "min-h-[440px] items-start",
      credit: { label: "21st.dev — 0xUrvish", href: "https://21st.dev/@0xUrvish/components/smooth-dropdown" },
    },
    {
      id: "button-download",
      name: "Button Download",
      description:
        "Botão de download que conta a própria história em quatro estados. Parado, é ícone e rótulo. Baixando, o fundo cai para metade da opacidade e uma barra da cor cheia cresce da esquerda pela largura inline (`width: progress%`, com transição de 200ms que suaviza os saltos), com um spinner e a porcentagem por cima via `z-index`. Terminado, vira ícone de check e “Downloaded”. O quarto estado, `complete`, é um quadro em branco de propósito: o texto sai em `text-primary` sobre o fundo `bg-primary` — medido, as duas cores são idênticas — e dura os 100ms de folga antes de voltar ao repouso, para a troca de rótulo não saltar. Fora do repouso o botão fica com `pointer-events: none`, então não dá para disparar dois downloads. O componente é controlado: estado e progresso vêm de fora, por `downloadStatus`, `progress` e `onClick`, mais `className`. O download da demo é simulado — 5% a cada 200ms, 4s até 100%, 1,5s mostrando o check e volta ao repouso aos 5,6s — com `setInterval` e dois `setTimeout` que não são limpos se o componente desmontar no meio. Usa o `Button` do shadcn que o projeto já tem.",
      tags: ["button", "progress", "state", "lucide"],
      source: "components/ui/button-download.tsx",
      stageClassName: "min-h-[220px]",
      credit: { label: "21st.dev — voxlet-ui", href: "https://21st.dev/@voxlet-ui/components/button-download" },
    },
    {
      id: "nextjsshop-button",
      name: "Nextjsshop Button",
      description:
        "Irmão do Pixel-Broke, do mesmo autor: um bloco de pixels que vira seta. À direita da barra há duas grades 5x5 empilhadas na mesma célula de grid. A de baixo tem 25 quadrados (o do centro já apagado) e forma um bloco sólido; a de cima tem 11, posicionados um a um por `grid-area`, invisíveis em repouso. No hover o bloco apaga inteiro e os 11 acendem desenhando uma seta para cima e para a direita. Nada se move e nada desvanece: o `transition` vem sem duração, então cada pixel pisca, e o que escalona é o atraso — `--index` × 60ms, sorteado entre 0 e 3 no bloco e entre 4 e 7 na seta, por isso a seta só começa depois que o bloco se foi. O rótulo é o mesmo typewriter do Pixel-Broke: o clone de `data-text` abre em `steps(var(--characters))`. Diferente do irmão, este tem variantes `.dark` e acompanha o tema: preto sobre claro, branco sobre escuro. No toque, o recorte sai no `:active`. Sem props — texto e cores estão no arquivo. Atenções: os índices são sorteados com `Math.random()` durante o render, então servidor e cliente geram valores diferentes a cada carregamento (no teste o React não reclamou, e o efeito visual é nulo, porque o sorteio só embaralha atrasos); no bloco de toque da folha original, a regra `.button-pixel-broke_bg-pixel` tem o nome de classe errado, sobra do Pixel-Broke, e não casa com nada; `--characters` está cravado em 10, o tamanho de \"Nextjsshop\"; e o elemento é um `<a href=\"#\">`. O registry publica o componente sem CSS — a folha veio do bundle público da demo.",
      tags: ["css", "grid", "pixel", "typewriter"],
      source: "components/ui/nextjsshop-button.tsx",
      stageClassName: "min-h-[220px]",
      credit: { label: "21st.dev — nextjsshop", href: "https://21st.dev/@nextjsshop/components/nextjsshop-button" },
    },
    {
      id: "gleam-edge-button",
      name: "Gleam Edge Button",
      description:
        "Botão preto com uma borda de luz que gira. A borda não é desenhada: o fundo é duas camadas — um gradiente liso no `padding-box` e um cônico no `border-box` — e a borda transparente deixa o cônico aparecer só na moldura. O ângulo desse cônico é uma custom property registrada com `@property`, que é o que torna possível animá-la: sem o registro, o navegador trataria a variável como texto e não interpolaria nada. Sobre o botão rodam mais duas camadas: um ::before de pontinhos (`radial-gradient` repetido com `background-repeat: space`) recortado por uma máscara cônica, então só um arco de pontos brilha por vez, e um ::after de reflexo que gira. O conjunto tem duas animações somadas por `animation-composition: add` — uma correndo sempre e outra, mais rápida e invertida, que nasce pausada e só destrava no hover; por isso o giro muda de caráter em vez de só acelerar. No hover também o arco engorda de 5% para 20%, gira 95 graus de offset, troca o branco pelo tom suave do acento, e um brilho interno pulsante aparece atrás do rótulo. Respeita `prefers-reduced-motion` por dois caminhos: uma media query que mata as animações e um `useSyncExternalStore` que expõe o estado em `data-reduced-motion`. Cada instância recebe um escopo próprio via `useId`, incluindo as regras `@property` e os keyframes, então dá para pôr vários na mesma página sem conflito — ao contrário de outros desta coleção. Props: label, onClick, className, fillColor, labelColor, accentColor, accentSoftColor, sweepDuration, easeDuration, arcWidth, cornerRadius, showSpeckle, showSheen e speckleOpacity. Atenção: as cores padrão são fixas (preto com laranja) e não acompanham o tema, por isso o palco é escuro; e o arquivo foi gravado como `gleam-edge-button.tsx` porque `shiny-button.tsx` já pertence ao Shiny Button do Magic UI, a primeira entrada desta coleção — o export continua se chamando ShinyButton.",
      tags: ["css", "conic-gradient", "at-property", "hover"],
      source: "components/ui/gleam-edge-button.tsx",
      stageClassName: "min-h-[260px]",
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

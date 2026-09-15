# Components Library

Biblioteca pessoal de componentes visuais em **Next.js 15 + TypeScript + Tailwind CSS v4**,
seguindo a estrutura do **shadcn/ui**. Os componentes ficam organizados em **coleções**, e cada
coleção é uma página com várias seções — cada seção mostra um componente rodando de verdade,
com o caminho do arquivo para copiar direto em outro projeto.

## Rodando

```bash
npm install
npm run dev
```

Para buildar **sem derrubar o dev server**, use uma pasta de saída separada:

```bash
NEXT_DIST_DIR=.next-build npx next build
```

> Rodar `npm run build` puro com o `npm run dev` ligado faz os dois escreverem na mesma pasta `.next`,
> e a página abre sem CSS (404 em `layout.css`). Se acontecer: pare o dev server, apague `.next` e suba de novo.

## Estrutura de pastas

```
app/
  layout.tsx              # shell + ThemeProvider (next-themes)
  globals.css             # tokens de tema + Tailwind v4
  (site)/
    layout.tsx            # header da vitrine
    page.tsx              # hub: lista as coleções
    [collection]/page.tsx # a página de uma coleção, montada pelo registry
  preview/                # rotas isoladas, sem header, para componentes full-page
components/
  ui/                     # << os componentes da biblioteca (padrão shadcn)
  showcase/
    component-section.tsx # casca padrão de cada seção
    preview-frame.tsx     # iframe para componentes full-page
    demos/                # uma demo por componente
  layout/                 # header, theme provider e theme toggle
content/
  types.ts                # tipos de EntryMeta / CollectionMeta
  registry.ts             # índice das coleções (só metadados)
  collections/*.meta.ts   # uma coleção por arquivo: slug, textos e entradas
  demos.tsx               # liga id da entrada -> componente de demo
lib/utils.ts              # helper cn()
public/audio/             # assets usados por componentes (ex: clique de tecla)
```

### Por que `components/ui`

É o caminho padrão do shadcn/ui, declarado em `components.json` (`aliases.ui = "@/components/ui"`).
Manter os componentes ali garante que:

- o comando `npx shadcn@latest add <componente>` instale no lugar certo, sem conflito;
- todo snippet copiado da internet (que importa de `@/components/ui/...`) funcione sem reescrever imports;
- exista uma fronteira clara entre **componente reutilizável** (`ui/`) e **exemplo de uso** (`showcase/demos/`).

### Por que metadados e demos ficam separados

`content/registry.ts` e os `*.meta.ts` não importam nenhum componente — só texto. O header e o hub
leem apenas esses arquivos, então não arrastam GSAP, Framer Motion e Lenis para o bundle de páginas
que não renderizam demo nenhuma. O amarração id → componente mora em `content/demos.tsx`, importado
só pela página de coleção.

## Dois modos de exibição

| Modo | Quando usar | Como registrar |
| --- | --- | --- |
| **Palco** | componente autocontido que cabe numa caixa (hover, click, teclado, loop) | entrada sem `preview` + par `id: Demo` em `content/demos.tsx` |
| **Quadro** | componente que toma a página inteira (scroll-driven, sticky, 100vh) | `preview: { route: "/preview/<id>" }` |

O modo quadro existe porque um componente scroll-driven sequestra a rolagem da vitrine: ele roda numa
rota isolada (`app/preview/<id>/page.tsx`, sem o header) exibida dentro de um iframe, que lhe dá um
contexto de scroll próprio. A seção também traz um link "Abrir em tela cheia".

## Adicionando um componente

1. Cole o arquivo em `components/ui/<nome>.tsx`.
2. Crie a demo em `components/showcase/demos/<nome>-demo.tsx` — ou, se for full-page,
   a rota em `app/preview/<nome>/page.tsx`.
3. Adicione a entrada no `*.meta.ts` da coleção:

```ts
{
  id: "meu-componente",
  name: "Meu Componente",
  description: "O que ele faz e quais props valem a pena calibrar.",
  tags: ["hover", "framer-motion"],
  source: "components/ui/meu-componente.tsx",
}
```

4. Se for modo palco, registre a demo em `content/demos.tsx` com a mesma `id`.

## Adicionando uma coleção

1. Crie `content/collections/<nome>.meta.ts` exportando um `CollectionMeta` (`slug`, `name`,
   `tagline`, `description`, `entries`).
2. Importe e adicione ao array `collections` em `content/registry.ts`.

A rota `/<slug>`, o link no header e o card no hub aparecem sozinhos.

## Coleções

### Cards — `/cards`

| Componente | Arquivo |
| --- | --- |
| Stacked Cards Interaction | `components/ui/stacked-cards-interaction.tsx` |
| Case Study Flip Stack | `components/ui/case-study-flip-stack.tsx` |
| Sticky Scroll Cards | `components/ui/sticky-scroll-cards.tsx` |
| Layered Stack | `components/ui/layered-stack.tsx` |
| Hover Expand (Skiper 52) | `components/ui/skiper-52.tsx` |
| Sticky Card 002 (Skiper 17) | `components/ui/skiper-17.tsx` |
| Carousel 002 (Skiper 48) | `components/ui/skiper-48.tsx` |
| Carousel 005 (Skiper 51) | `components/ui/skiper-51.tsx` |
| Carousel 006 (Skiper 54) | `components/ui/skiper-54.tsx` |
| Draggable Card | `components/ui/draggable-card.tsx` |
| View on Map | `components/ui/view-on-map.tsx` |
| Sticky Card 001 (Skiper 16) | `components/ui/skiper-16.tsx` |
| Program Stack | `components/ui/program-stack.tsx` |
| Scroll Stages | `components/ui/scroll-stages.tsx` |
| Diagonal Carousel | `components/ui/diagonal-carousel.tsx` |
| Animated List | `components/ui/animated-list.tsx` |
| Tilted Carousel | `components/ui/tilted-carousel.tsx` |

### Teclados — `/teclados`

| Componente | Arquivo |
| --- | --- |
| Mac Keyboard | `components/ui/mac-keyboard.tsx` |
| Keyboard | `components/ui/keyboard.tsx` |

### Sliders — `/sliders`

| Componente | Arquivo |
| --- | --- |
| Knob Slider | `components/ui/knob-slider.tsx` |
| Fractional Picker | `components/ui/fractional-picker.tsx` |
| Weight Widget | `components/ui/weight-widget.tsx` |

Instalado via registry de terceiros:

```bash
npx shadcn@latest add https://registry.watermelon.sh/r/knob-slider.json
```

O CLI grava em `components/`; movi o arquivo para `components/ui/` para seguir a convenção do repo.

### Textos — `/textos`

| Componente | Arquivo |
| --- | --- |
| Progressive Blur (Skiper 41) | `components/ui/skiper-41.tsx` |
| Tooltip Card | `components/ui/tooltip-card.tsx` |
| Text Roll | `components/ui/text-roll.tsx` |
| Text Reveal | `components/ui/text-reveal.tsx` |
| Flying Text | `components/ui/flying-text.tsx` |

### ASCII Art — `/ascii-art`

| Componente | Arquivo |
| --- | --- |
| ASCII Art | `components/ui/ascii-art.tsx` |
| ASCII Object | `components/ui/ascii-object.tsx` |

### Backgrounds — `/backgrounds`

| Componente | Arquivo |
| --- | --- |
| Wave Landscape | `components/ui/wave-landscape.tsx` |
| Waves Shader | `components/ui/waves-shader.tsx` |
| Fireworks Background | `components/ui/fireworks-background.tsx` |
| Sliding Ease Vertical Bars | `components/ui/sliding-ease-vertical-bars.tsx` |
| Topology Field | `components/ui/topology-field.tsx` |
| Ink Reveal | `components/ui/ink-reveal.tsx` |
| Retro Dither | `components/ui/retro-dither.tsx` |
| Neon Dither | `components/ui/neon-dither.tsx` |
| Dethering | `components/ui/dethering.tsx` |
| Particle Graph | `components/ui/particle-graph.tsx` |
| Dotted Globe | `components/ui/dotted-globe.tsx` |
| Meteors | `components/ui/meteors.tsx` |
| Video Text | `components/ui/video-text.tsx` |
| Dot Pattern | `components/ui/dot-pattern.tsx` |
| Particles | `components/ui/particles.tsx` |
| Supply Chain Globe | `components/ui/supply-chain-globe.tsx` |

### Buttons — `/buttons`

| Componente | Arquivo |
| --- | --- |
| Shiny Button | `components/ui/shiny-button.tsx` |
| Dropdown Menu | `components/ui/dropdown-menu.tsx` |
| Floating Action Menu | `components/ui/floating-action-menu.tsx` |
| Animated Tabs | `components/ui/animated-tabs.tsx` |

### Cursor — `/cursor`

| Componente | Arquivo |
| --- | --- |
| Lens | `components/ui/lens.tsx` |
| Glass | `components/ui/glass.tsx` |
| Lateral Dither (teste) | `components/ui/lateral-dither.tsx` |

## Dependências por componente

A base é Tailwind + o helper `cn()`. Além disso:

- **Framer Motion** — Stacked Cards Interaction, Case Study Flip Stack, Sticky Scroll Cards.
- **Lateral Dither** não tem dependência, mas a demo usa `components/ui/switch.tsx`, instalado com
  `npx shadcn@latest add switch`. O CLI gerou `import { cn } from "cn"` de novo — e dessa vez o erro
  é silencioso, porque existe um pacote npm chamado `cn` instalado: o import resolve, só que para outra
  biblioteca, sem `tailwind-merge`. Corrigido para `@/lib/utils`.
- **Retro Dither** é do mesmo Canvas UI que o Glass: importa o mesmo `components/rect-cache.ts` e
  depende da mesma API experimental html-in-canvas — veja a nota do **Glass** abaixo. A diferença no
  modo degradado é que ele não desenha nada: o conteúdo aparece normal, sem a lente.
- **Topology Field** (ThreeUI) roda dentro de um iframe `sandbox="allow-scripts"` com a página HTML
  original inteira, e um script injetado isola só o canvas. Duas coisas a saber: o arquivo não declara
  `"use client"` apesar de usar `useMemo` — a fronteira de cliente fica na demo —, e o iframe carrega
  Three.js r128, Tailwind CDN, Iconify e Google Fonts pela rede em tempo de execução.
- **Neon Dither** usa [`@paper-design/shaders-react`](https://shaders.paper.design/) — é o único
  componente aqui com uma biblioteca de shader pronta. Ele é `fixed inset-0` e escreve a classe
  `dark` no `<html>` conforme o `themeMode`, então roda em rota de preview: no palco cobriria a
  vitrine inteira e brigaria com o next-themes.
- **Sticky Scroll Cards** usa [`lenis`](https://lenis.darkroom.engineering/) para a inércia do scroll.
  O CSS do Lenis (`lenis/dist/lenis.css`) é importado na rota de preview, não no componente —
  ao copiar o componente para outro projeto, lembre de importar esse CSS uma vez no app.
- **Layered Stack** usa [`gsap`](https://gsap.com/) no lugar do Framer Motion.
- **Hover Expand (Skiper 52)** importa quatro folhas de CSS do `swiper` (`swiper/css`, `effect-creative`,
  `pagination`, `autoplay`) sem usar o Swiper em lugar nenhum. Se for copiar o componente para um
  projeto sem Swiper, dá para apagar esses quatro imports.
  A licença pede **atribuição ao Skiper UI**: o crédito aparece no cabeçalho da seção (campo `credit`
  na entrada do registry) e o bloco de licença está no fim do arquivo do componente.
- **Knob Slider** usa [`motion`](https://motion.dev/) (o pacote sucessor do `framer-motion`, mesma
  biblioteca com outro nome) e `react-use-measure`. Por isso o projeto tem os dois pacotes instalados.
- **Sticky Card 001 (Skiper 16)** usa `framer-motion` e `lenis` (nada novo). O `Skiper16` traz a
  lista de imagens fixa em `/images/lummi/` e não aceita props, então a rota de preview remonta a
  orquestração usando o `StickyCard_001`, que é exportado para isso. Exige atribuição ao Skiper UI.
- **Sticky Card 002 (Skiper 17)** usa `gsap` + `@gsap/react` (`useGSAP`) + `ScrollTrigger`, e `lenis`.
  Atenção ao montá-lo: o `ScrollTrigger.refresh()` que o componente dispara no próprio ResizeObserver
  roda antes de a página ter altura rolável, e nesse instante o `end: "+=innerHeight*n"` é achatado
  para 0 — o pin-spacer nasce sem padding e o scroll nunca ganha curso. A rota de preview corrige
  chamando `ScrollTrigger.refresh()` de novo depois da montagem (veja
  `components/showcase/demos/sticky-card-002-preview.tsx`). Também exige atribuição ao Skiper UI.
- **Carousel 002 (Skiper 48)** e **Carousel 005 (Skiper 51)** usam [`swiper`](https://swiperjs.com/)
  de verdade — o primeiro com `EffectCards`, o segundo com `EffectCreative`. O Swiper 14 ainda publica
  os componentes React em `swiper/react`. Ambos exigem atribuição ao Skiper UI.
- **Carousel 006 (Skiper 54)** é o primeiro a usar primitivos do shadcn: `components/ui/carousel.tsx`
  (Embla) e `components/ui/button.tsx`, instalados com `npx shadcn@latest add carousel`, mais
  `embla-carousel-autoplay`. Duas notas:
  - o CLI gerou `import { cn } from "cn"` nos dois arquivos, um alias que não existe aqui; corrigido
    para `@/lib/utils`. Vale conferir isso a cada `shadcn add`.
  - o arquivo original exportava só `Skiper54`, deixando `Carousel_006` inacessível; acrescentei
    `Carousel_006` à lista de exports para dar como passar outras imagens sem editar o componente.

  Também exige atribuição ao Skiper UI.
- **Draggable Card** vem do [Aceternity UI](https://ui.aceternity.com/components/draggable-card)
  e usa `motion` (mesmo pacote do Knob Slider). Sem dependências novas. O arquivo foi gravado
  direto do manifesto do registry (`https://ui.aceternity.com/registry/draggable-card.json`)
  em vez de pelo CLI, para não repetir o problema do `import { cn } from "cn"`.
- **View on Map** usa `motion`, `lucide-react` e `react-icons`. Instalado com
  `npx shadcn@latest add https://registry.watermelon.sh/r/view-on-map.json` (o CLI grava em
  `components/`; movi para `components/ui/`). Três coisas a saber:
  - o arquivo **não traz `"use client"`** apesar de usar `useState`; quem o importa precisa declarar
    a diretiva, como faz `components/showcase/demos/view-on-map-demo.tsx`;
  - aberto, ele carrega um **iframe do Google Maps** (`maps.google.com/...&output=embed`) montado a
    partir do prop `address`. É requisição a terceiro, sem chave de API;
  - o prop `locationName` existe na interface mas o componente não o usa.
- **Keyboard** vem do [Aceternity UI](https://ui.aceternity.com/components/keyboard) e usa `motion`
  mais `@tabler/icons-react`. O som é um **sprite**: as 77 teclas leem trechos
  (`[inicioMs, duracaoMs]`) de um único `public/sounds/sound.ogg` de 54s, baixado de
  `https://ui.aceternity.com/sounds/sound.ogg` — sem esse arquivo o `enableSound` fica mudo.
  Os listeners do teclado físico só são registrados quando o componente está visível na tela
  (IntersectionObserver), o que evita os dois teclados da página responderem juntos.
- **Fractional Picker** usa `framer-motion` (nada novo). O `shadcn add` do registry trava num prompt
  pedindo para sobrescrever `lib/utils.ts` (o manifesto declara `registryDependencies: ["utils"]`),
  então o arquivo foi gravado direto do manifesto. Duas ressalvas do código original, mantidas como
  vieram: há um `console.log` a cada fim de arraste (linha 72), e o componente **não aceita `value`** —
  é não-controlado, com `defaultValue` definindo o início e `onChange` reportando as mudanças.
- **Weight Widget** usa `motion` e **`next-themes`**. Ele chama `useTheme()` para escolher a cor dos
  números, então precisa de um `ThemeProvider` no topo da app — por isso o tema do projeto passou a
  ser gerenciado pelo next-themes (`components/layout/theme-provider.tsx`), no lugar do toggle
  caseiro com script inline. Sem provider, `resolvedTheme` fica indefinido e os números saem com cor
  de tema claro sobre o card escuro.
  O componente também retorna `null` até o primeiro `requestAnimationFrame`, então em aba oculta
  (que não renderiza frames) ele fica invisível até a aba voltar ao foco.
- **Progressive Blur (Skiper 41)** não usa nenhuma biblioteca — é só CSS (`backdrop-filter` recortado
  por `mask-image`). O `ProgressiveBlur` é exportado à parte e serve sobre qualquer conteúdo rolável.
  Exige atribuição ao Skiper UI.
- **Tooltip Card** vem do [Aceternity UI](https://ui.aceternity.com/components/tooltip-card) e usa
  `motion` — sem dependências novas. Gravado direto do manifesto do registry, como o Draggable Card.
  A demo original envolve os tooltips em `<p>`, mas o componente renderiza um `<div>` (e o conteúdo
  pode ter `<p>`): HTML inválido, que o React acusa como erro de hidratação. A demo daqui usa `<div>`
  nos parágrafos por isso.
- **ASCII Art** vem do [Aceternity UI](https://ui.aceternity.com/components/ascii-art) e usa `motion`
  — sem dependências novas. Ele resolve `var(--...)` no prop `color` sozinho (via elemento temporário
  + `getComputedStyle`), então dá para passar variáveis do tema do Tailwind. A imagem é lida com
  `crossOrigin="anonymous"`, ou seja, a origem precisa mandar cabeçalhos de CORS.
- **ASCII Object** (Canvas UI) usa `three` + `@types/three` e roda em WebGL2 com dois shaders
  próprios. Notas:
  - a doc instala em `components/canvasui/AsciiObject.tsx`; aqui o arquivo está em
    `components/ui/ascii-object.tsx`, seguindo a convenção do repo;
  - o `src` da doc (`/assets/models/duck.glb`) não vinha junto: baixei o Duck da coleção de exemplos
    da Khronos para `public/assets/models/duck.glb`. Aceita também SVG e imagens;
  - modelos comprimidos com Draco baixam o decodificador de `www.gstatic.com` sob demanda
    (o `duck.glb` não é Draco, então isso não acontece nesta demo). Dá para apontar `dracoDecoderPath`
    para uma cópia local.
- **Program Stack** não usa nenhuma biblioteca — só CSS transitions e estado do React. É um port da
  hero de `mentecinzaSITE/backup/programs.html` (lá era HTML + JS solto), preservando os valores
  originais: deslocamento de 24/48/72px, escalas 1/0.98/0.96/0.94, opacidades 1/0.6/0.3/0 e a
  transição `0.5s cubic-bezier(0.4, 0, 0.2, 1)`. Como no original, a roda do mouse sobre a pilha
  chama `preventDefault`: a página não rola enquanto o ponteiro está ali.
- **Scroll Stages** também não usa biblioteca — só transforms calculados no evento de scroll,
  com `requestAnimationFrame` como throttle. Port da seção *Software Stages* de
  `mentecinzaSITE/backup/projects.html`, preservando a matemática original (TOP_Y -60, BOTTOM_Y 220,
  margem de 5%, smoothstep na saída e os quatro níveis de profundidade). No original o conteúdo de
  cada card é um SVG desenhado à mão; aqui `content` aceita qualquer JSX.
- **Wave Landscape** não usa biblioteca nenhuma: canvas 2D puro, sem WebGL. Port de
  `ux_ui_design/Wave Effect.html`, com a matemática preservada (grade 55x38, espaçamento 56,
  amplitude 60, câmera fov 1000 / pitch 0.785 / altura 420, as quatro senoides do relevo e as três
  passadas de linha com suas opacidades). **Uma mudança deliberada:** o original media
  `window.innerWidth/innerHeight`; aqui o canvas acompanha o próprio container via `ResizeObserver`,
  para o componente servir tanto em tela cheia quanto dentro de uma caixa.
- **Dotted Globe** também é canvas 2D puro. Port de `vOOairline/Dotted Globe.html`, com a mesma
  matemática (grade de lat/lon com corte em 78°, limiar do canal vermelho em 80 para separar terra de
  água, verso a cada quarto meridiano, arrasto com inércia e zoom entre 0.6x e 2.2x). Duas mudanças:
  o canvas acompanha o container em vez da janela, e o mapa-múndi foi baixado para
  `public/textures/earth-specular.jpg` — o original puxava de CDN a cada carregamento. Como no
  original, a roda do mouse sobre o globo chama `preventDefault`; passe `zoom={false}` para liberar
  a rolagem da página.
- **Diagonal Carousel** usa `motion` e `lucide-react` (nada novo). Port de
  `ux_ui_design/diagonalcarousel`, com os mesmos valores: 30° de rotação e 50% de deslocamento por
  slide de distância, escala 0.6 nos inativos e springs de bounce 0.1/0.2 em 0.8s. **Mudança:** no
  original os controles eram `fixed` na janela; aqui ficam abaixo do carrossel, para o componente
  poder ser usado embutido.
- **Animated List** vem do [Magic UI](https://magicui.design/docs/components/animated-list) e usa
  `motion` — sem dependências novas. A doc referencia um `animated-list-demo` que não vem junto;
  a demo daqui é o uso canônico (fila de notificações). O componente roda a sequência **uma vez** e
  para no último item: o `% childrenArray.length` do código sugere loop, mas a guarda
  `index < length - 1` impede que ele volte ao começo.
- **Meteors** vem do [Magic UI](https://magicui.design/docs/components/meteors) e é CSS puro — sem
  dependências. Exige o keyframe `meteor` no `@theme inline` de `app/globals.css`, já adicionado.
  Detalhe do código original: a posição horizontal de cada meteoro é sorteada sobre
  `window.innerWidth`, não sobre a largura do container — num box mais estreito que a janela, parte
  dos meteoros cai fora e é cortada pelo `overflow-hidden`.
- **Video Text** vem do [Magic UI](https://magicui.design/docs/components/video-text) e não tem
  dependências — o recorte é um SVG com o texto virado data URL e aplicado como `mask-image` sobre o
  vídeo. O `ocean-small.webm` da doc foi baixado para `public/videos/`, para não depender da CDN em
  runtime. Note que `fontSize` é em **vw**: o tamanho do recorte segue a largura da janela, não a do
  container — dentro de um box estreito pode ser preciso ajustar (aceita string, ex: `"96px"`).
- **Dot Pattern** vem do [Magic UI](https://magicui.design/docs/components/dot-pattern) e usa
  `motion` — sem dependências novas. Dois pontos práticos: com `glow` cada ponto vira um
  `motion.circle` com animação infinita, e o número de pontos cresce com a área (num box de
  1068x398 com espaçamento 16 são ~1675 elementos animados) — em containers grandes vale aumentar
  `width`/`height` ou deixar `glow` desligado. E o componente mede o container só na montagem e no
  `resize` da janela: se a caixa mudar de tamanho sem a janela mudar, a malha não se refaz.
- **Shiny Button** vem do [Magic UI](https://magicui.design/docs/components/shiny-button) e usa
  `motion` — sem dependências novas. **Precisou de duas correções de CSS inválido**, sem as quais o
  brilho da borda simplesmente não aparece (o navegador descarta a declaração inteira, em silêncio):
  - `var(--primary)/10%` é sintaxe de opacidade do Tailwind, não CSS. Dentro de gradientes crus virou
    `color-mix(in oklab, var(--primary) 10%, transparent)`;
  - `calc(var(--x)+20%)` sem espaços ao redor do `+` é inválido — a especificação do `calc()` exige
    whitespace. A máscara do texto no mesmo arquivo já vinha com os espaços; o gradiente da borda, não.
- **Text Reveal** vem do [Magic UI](https://magicui.design/docs/components/text-reveal) e usa
  `motion` — sem dependências novas. Aceita **apenas string** em `children` (lança erro com JSX), e
  o bloco tem 200vh fixos: quem controla quanto scroll a revelação consome é a altura do container.
- **Flying Text** usa `gsap` + `ScrollTrigger` (nada novo). Port de `ux_ui_design/flyingtext`,
  preservando a matemática: RNG semeado (sfc32 + splitmix32, com aquecimento de 12 chamadas),
  medição por Range API, a senoide de rajada com a tendência removida para valer 0 nas duas pontas,
  e os mesmos start/end do ScrollTrigger. **Mudança:** os `data-*` do original viraram props
  tipadas — o próprio código marcava aquele parsing como "potentially unsafe as types aren't
  coerced", já que `data-reverse="false"` chegava como a string `"false"`, que é truthy.
  Aceita apenas string em `children`.
- **Tilted Carousel** usa `motion` e `lucide-react` (nada novo). Port de
  `ux_ui_design/tiltedcarousel`, irmão do Diagonal Carousel: mesmos valores do original (60° de
  rotateY por slide, escala 0.85 e blur de 2px nos inativos) e a mesma mudança — os controles, que
  eram `fixed` na janela, passaram a acompanhar o componente.
- **Particles** vem do [Magic UI](https://magicui.design/docs/components/particles) e é canvas 2D
  puro — sem dependências. As partículas nascem com `alpha: 0` e só ganham opacidade dentro do laço
  de `requestAnimationFrame` (0.02 por quadro): o primeiro desenho é deliberadamente invisível.
- **Supply Chain Globe** usa **`@amcharts/amcharts5`** e **`@amcharts/amcharts5-geodata`**. Port de
  `ux_ui_design/mapglobe`, trocando as tags `<script>` da CDN por imports ESM (só o `worldLow` entra
  no bundle) e os `var` globais por um componente com ciclo de vida — o `root.dispose()` e os
  `clearTimeout` no cleanup evitam vazamento ao desmontar.

  **Atenção à licença:** a versão gratuita do amCharts é *linkware*. O texto exige que você "não
  desabilite, esconda ou altere o link de marca exibido em todo conteúdo gerado pelo software" —
  ou seja, o selo do amCharts aparece no gráfico e não pode ser removido sem uma licença comercial.
  É o único componente da biblioteca com essa exigência.
- **Lens** vem do [Magic UI](https://magicui.design/docs/components/lens) e usa `motion` — sem
  dependências novas. Ele renderiza os `children` **duas vezes** (a cópia de baixo normal, a de cima
  ampliada e recortada), então evite conteúdo pesado ou com estado próprio dentro dele.
- **Glass** (Canvas UI) é WebGL2 puro, sem pacotes novos. Duas ressalvas importantes:
  - o arquivo publicado importa `createRectCache` de `"../rect-cache"`, e esse helper **não existe
    no registry deles** (varri os 420 itens). Escrevi `components/rect-cache.ts` a partir do uso —
    cache do `getBoundingClientRect` invalidado por scroll e resize. Fica em `components/` (não em
    `components/ui/`) para o import relativo do arquivo original resolver sem edição;
  - o efeito depende da API experimental **html-in-canvas** do Chrome (`drawElementImage` +
    `requestPaint`) para capturar a página. Sem ela — o caso de qualquer navegador estável hoje — o
    próprio shader cai num caminho degradado (`uHasContent < 0.5`) que desenha só o aro luminoso,
    sem refração. Para ver o efeito completo é preciso habilitar a flag no Chrome.
- **Mac Keyboard** não usa biblioteca de animação (só CSS + Web Audio) e toca
  `public/audio/key-press.wav` a cada tecla. Troque o arquivo, passe outro caminho em `soundSrc`,
  ou use `soundSrc=""` para deixá-lo mudo.

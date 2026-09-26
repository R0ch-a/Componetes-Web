import type { CollectionMeta } from "@/content/types";

/**
 * Só metadados — nenhum import de componente. É o que o header e o hub leem,
 * então manter este arquivo leve evita arrastar GSAP/Framer/Lenis para o bundle
 * de páginas que não renderizam nenhuma demo.
 */
export const cardsMeta: CollectionMeta = {
  slug: "cards",
  name: "Cards",
  tagline: "Pilhas, leques e cards que reagem ao mouse e ao scroll",
  description:
    "Cada seção mostra um componente rodando de verdade. Passe o mouse ou role dentro do quadro para ver a animação, e copie o arquivo indicado direto para o seu projeto.",
  entries: [
    {
      id: "stacked-cards-interaction",
      name: "Stacked Cards Interaction",
      description:
        "Três cards empilhados que se abrem em leque no hover, com deslocamento lateral e rotação em spring. Aceita spreadDistance, rotationAngle e animationDelay para calibrar a abertura.",
      tags: ["hover", "framer-motion", "stack"],
      source: "components/ui/stacked-cards-interaction.tsx",
    },
    {
      id: "case-study-flip-stack",
      name: "Case Study Flip Stack",
      description:
        "Baralho de cases que vira página a página conforme você rola: cada card sobe, gira no eixo X e revela o próximo, com a pilha respirando por baixo. O progresso vem de useScroll suavizado por useSpring e respeita prefers-reduced-motion. Passe items para trocar o conteúdo; hint, heading e endLabel para os textos do hero e do fim.",
      tags: ["scroll", "framer-motion", "sticky", "3d"],
      source: "components/ui/case-study-flip-stack.tsx",
      preview: { route: "/preview/case-study-flip-stack" },
      stageClassName: "min-h-0 p-4",
    },
    {
      id: "sticky-scroll-cards",
      name: "Sticky Scroll Cards",
      description:
        "Polaroids que grudam no topo e vão encolhendo em profundidade conforme você rola, cada uma com uma inclinação própria — o resultado é uma pilha vista de cima. Usa Lenis para dar inércia ao scroll do documento e useScroll/useTransform para a escala de cada card. Passe cards para trocar as imagens e hint para o texto do topo.",
      tags: ["scroll", "framer-motion", "lenis", "sticky"],
      source: "components/ui/sticky-scroll-cards.tsx",
      preview: { route: "/preview/sticky-scroll-cards" },
      stageClassName: "min-h-0 p-4",
    },
    {
      id: "layered-stack",
      name: "Layered Stack",
      description:
        "Wrapper: os filhos ficam empilhados no centro, cada um com uma inclinação aleatória, e se espalham para as posições reais do grid quando o mouse entra. O GSAP mede offsetLeft/offsetTop de cada card, então o arranjo aberto é o layout que você definir no className — grid, flex, o que for. Um ResizeObserver reposiciona a pilha quando o container muda de tamanho.",
      tags: ["hover", "gsap", "stack", "wrapper"],
      source: "components/ui/layered-stack.tsx",
    },
    {
      id: "hover-expand",
      name: "Hover Expand (Skiper 52)",
      description:
        "Fita de imagens em que a ativa se abre para 24rem e as demais recuam para 5rem — o hover troca a ativa, o clique fixa. A que está aberta ganha um degradê escuro e o código no canto, com entrada e saída via AnimatePresence. O arquivo exporta Skiper52 (demo com imagens locais) e HoverExpand_001, que recebe as imagens por prop.",
      tags: ["hover", "framer-motion", "gallery", "expand"],
      source: "components/ui/skiper-52.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Skiper UI — @gurvinder-singh02", href: "https://skiper-ui.com" },
    },
    {
      id: "sticky-card-002",
      name: "Sticky Card 002 (Skiper 17)",
      description:
        "Baralho de imagens preso na tela: o ScrollTrigger fixa o palco e, a cada tela de rolagem, a imagem de cima encolhe para 70% e tomba 5 graus enquanto a próxima sobe de baixo e ocupa o lugar. Recebe as imagens em cards e aceita className, containerClassName e imageClassName. O arquivo exporta Skiper17 (exemplo com imagens locais) e StickyCard002.",
      tags: ["scroll", "gsap", "scrolltrigger", "lenis", "pin"],
      source: "components/ui/skiper-17.tsx",
      preview: { route: "/preview/sticky-card-002" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Skiper UI — @gurvinder-singh02", href: "https://skiper-ui.com" },
    },
    {
      id: "carousel-002",
      name: "Carousel 002 (Skiper 48)",
      description:
        "Baralho de cartas do Swiper: arraste a carta de cima para o lado e ela sai revelando a próxima, com as de trás escalonadas em perspectiva. Props: showPagination, showNavigation (com as setas prontas), autoplay, loop e spaceBetween. O arquivo exporta Skiper48 (exemplo com imagens locais) e Carousel_002.",
      tags: ["drag", "swiper", "carousel", "cards"],
      source: "components/ui/skiper-48.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Skiper UI — @gurvinder-singh02", href: "https://skiper-ui.com" },
    },
    {
      id: "carousel-005",
      name: "Carousel 005 (Skiper 48/51)",
      description:
        "Carrossel largo com o efeito creative do Swiper: o slide que sai afunda 400px no eixo Z com sombra enquanto o próximo entra deslizando 100% da largura por cima. Roda em autoplay de 1,5s que para no primeiro arraste, com paginação clicável. Props: showPagination, showNavigation, autoplay, loop e spaceBetween. O arquivo exporta Skiper51 (exemplo com imagens locais) e Carousel_005.",
      tags: ["drag", "swiper", "carousel", "autoplay", "3d"],
      source: "components/ui/skiper-51.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Skiper UI — @gurvinder-singh02", href: "https://skiper-ui.com" },
    },
    {
      id: "carousel-006",
      name: "Carousel 006 (Skiper 54)",
      description:
        "Fita de retratos em que só o slide central fica inteiro: os demais são recortados por clipPath em 15% no topo e na base, virando faixas estreitas. O título aparece sob o ativo com um fade de blur. Construído sobre o carousel do shadcn/ui (Embla), com setas, bullets clicáveis e autoplay opcional que pausa no hover. O arquivo exporta Skiper54 (exemplo com imagens locais) e Carousel_006.",
      tags: ["drag", "embla", "shadcn", "framer-motion", "clip-path"],
      source: "components/ui/skiper-54.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Skiper UI — @gurvinder-singh02", href: "https://skiper-ui.com" },
    },
    {
      id: "draggable-card",
      name: "Draggable Card",
      description:
        "Fotos espalhadas na mesa que você arrasta pelo palco. Cada card inclina em 3D conforme o mouse cruza sua superfície (rotateX/rotateY em spring, com um brilho que acompanha), e ao soltar continua no embalo: a velocidade do arraste vira um arremesso com bounce proporcional. As posições e rotações iniciais vêm do className de cada card.",
      tags: ["drag", "motion", "3d", "physics"],
      source: "components/ui/draggable-card.tsx",
      stageClassName: "min-h-0 p-0 overflow-hidden",
      credit: { label: "Aceternity UI", href: "https://ui.aceternity.com/components/draggable-card" },
    },
    {
      id: "view-on-map",
      name: "View on Map",
      description:
        "Pílula de 180x52 que, ao ser clicada, se transforma no próprio mapa: o layoutId do Motion faz a cápsula crescer até um quadrado de 380px, com um spinner enquanto o Google Maps carrega dentro de um iframe e um botão de fechar que a devolve ao formato original. Props: address (o que vai na busca do mapa), mapImageUrl (a textura de fundo da pílula) e className. O prop locationName está na interface mas o componente não o usa.",
      tags: ["click", "motion", "layout-animation", "iframe"],
      source: "components/ui/view-on-map.tsx",
      stageClassName: "min-h-[560px] p-8",
      credit: { label: "watermelon.sh", href: "https://registry.watermelon.sh" },
    },
    {
      id: "sticky-card-001",
      name: "Sticky Card 001 (Skiper 16)",
      description:
        "Cards que grudam no topo um sobre o outro conforme você rola: cada um começa em escala 1 e vai encolhendo até o alvo (0,9, 0,8, 0,7...) à medida que os seguintes sobem, formando uma pilha em degraus vista de frente. O progresso vem de um único useScroll no container, repartido em faixas por card. Exporta Skiper16 (exemplo com imagens locais) e StickyCard_001, que recebe i, src, progress, range e targetScale.",
      tags: ["scroll", "framer-motion", "lenis", "sticky", "stack"],
      source: "components/ui/skiper-16.tsx",
      preview: { route: "/preview/sticky-card-001" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Skiper UI — @gurvinder-singh02", href: "https://skiper-ui.com" },
    },
    {
      id: "program-stack",
      name: "Program Stack",
      description:
        "Pilha em diagonal que se recicla sozinha: o card da frente sai e os de trás avançam uma posição, cada um deslocado 24px e reduzido um pouco mais que o anterior, até sumir. Avança sozinho a cada 5s, pausa quando o ponteiro entra, responde à roda do mouse (com acumulador, para não pular vários de uma vez) e traz dots clicáveis. Só CSS transitions — sem biblioteca de animação. Props: programs, autoPlayInterval, wheelThreshold e className.",
      tags: ["auto-play", "wheel", "stack", "css"],
      source: "components/ui/program-stack.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado da hero de mentecinzaSITE/programs.html" },
    },
    {
      id: "scroll-stages",
      name: "Scroll Stages",
      description:
        "Baralho guiado pela rolagem: o card da vez fica parado no centro enquanto os próximos esperam empilhados atrás, cada um 10px mais abaixo, menor, girado e mais desfocado. Ao avançar, o da frente desliza para baixo com smoothstep e vai desbotando na pilha inferior — as duas filas coexistem, uma acima e outra abaixo do ponto de leitura. Um HUD mostra o estágio atual e uma barra marca o progresso. Props: stages (nome, título, etiqueta e content livre) e scrollHeightVh.",
      tags: ["scroll", "sticky", "stack", "css"],
      source: "components/ui/scroll-stages.tsx",
      preview: { route: "/preview/scroll-stages" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado da seção Software Stages de mentecinzaSITE/projects.html" },
    },
    {
      id: "diagonal-carousel",
      name: "Diagonal Carousel",
      description:
        "Esteira de imagens que sobe na diagonal: cada slide gira 30 graus a mais que o vizinho e se desloca meia altura, então a fila inteira vira uma escada inclinada com o ativo em pé no centro, em escala cheia, enquanto os outros encolhem para 0,6. O título só aparece no slide da vez. Navega por clique na imagem, nos dots ou nas setas, tudo com springs. Props: items, initialIndex, rotationStep, offsetStep e inactiveScale.",
      tags: ["carousel", "motion", "diagonal", "spring"],
      source: "components/ui/diagonal-carousel.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado de ux_ui_design/diagonalcarousel" },
    },
    {
      id: "animated-list",
      name: "Animated List",
      description:
        "Lista que se monta sozinha: um item entra a cada intervalo, brotando de escala zero no topo e empurrando os anteriores para baixo com animação de layout. Serve para simular um fluxo de notificações numa landing. Recebe os filhos como children e um delay (1000ms por padrão). Vale saber: a sequência roda uma vez até o último item e para — não fica em loop.",
      tags: ["motion", "list", "notifications", "sequence"],
      source: "components/ui/animated-list.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Magic UI", href: "https://magicui.design/docs/components/animated-list" },
    },
    {
      id: "tilted-carousel",
      name: "Tilted Carousel",
      description:
        "Fita de fotos girando em perspectiva: cada slide roda 60 graus a mais em Y que o vizinho, então a fila vira um leque de cartas de pé, com o ativo de frente e os outros virando de perfil à medida que se afastam. Os inativos encolhem para 0,85 e têm o título desfocado e invisível — só o da vez aparece nítido. A perspectiva mora no elemento pai de cada slide, sem a qual a rotação achataria. Props: items, initialIndex, rotationStep, inactiveScale e inactiveBlur.",
      tags: ["carousel", "motion", "3d", "perspective"],
      source: "components/ui/tilted-carousel.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado de ux_ui_design/tiltedcarousel" },
    },
    {
      id: "cookie-banner",
      name: "Cookie Panel",
      description:
        "Aviso de cookies como toast preso no canto inferior direito, com as preferências abrindo dentro dele em vez de num modal. Só aparece se não houver consentimento salvo: na montagem ele lê `cookie-consent` no localStorage e, se estiver vazio, monta e liga a entrada no quadro seguinte. A sanfona não usa altura automática — um efeito mede o `scrollHeight` do conteúdo e escreve o valor em pixels, que é o que torna a transição de altura possível; medido aqui, 274px com as quatro categorias abertas. São quatro: a estritamente necessária vem marcada e travada, as outras três alternam. “Save preferences” grava o objeto inteiro e o consentimento; “Accept all” grava só o consentimento; o X fecha sem gravar nada, então o aviso volta no próximo carregamento. Props: title, message, acceptText, customizeText, icon (cookie, shield ou info), className, privacyHref e termsHref. Roda em rota isolada porque é `fixed` com `z-50` — solto na vitrine, flutuaria sobre a página inteira em vez de ficar na seção. A demo limpa as duas chaves antes de montar e traz um botão para repetir, senão a seção ficaria vazia para sempre depois do primeiro aceite. Atenções: as classes de entrada e saída (`animate-in`, `slide-in-from-bottom-8` e companhia) vêm do plugin tailwindcss-animate, que **não está neste projeto** — o painel aparece e some de estalo, sem a animação que o autor previu; os links padrão apontam para /privacy e /terms, que não existem aqui; o `PrefRow` é declarado dentro do componente, então as quatro linhas são recriadas a cada render em vez de atualizadas; e a fonte trazia `necessary` duas vezes no mesmo literal, o que o TypeScript recusa — removida a repetição, sem mudança de resultado.",
      tags: ["consent", "localstorage", "accordion", "lucide"],
      source: "components/ui/cookie-banner-1.tsx",
      preview: { route: "/preview/cookie-banner" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "21st.dev" },
    },
    {
      id: "vertical-image-stack",
      name: "Vertical Image Stack",
      description:
        "Uma pilha vertical de cinco cards que gira como roda: o da vez fica de frente, os dois vizinhos de cada lado recuam em escada (160 e 280px, escala 0,82 e 0,7, opacidade 0,6 e 0,3) e inclinam em X para longe do centro, e o resto some. A distância de cada card ao atual é calculada com volta (`diff` corrigido por metade do total), então o último e o primeiro são vizinhos e a roda não tem fim. Tudo é uma mola do Framer Motion (rigidez 300, amortecimento 30) animando y, escala, opacidade e rotateX sob `perspective: 1200px`. Três entradas: arrastar o card da frente na vertical (limiar de 50px, só ele é arrastável), a roda do mouse (delta acima de 30) e os pontos à direita; as duas primeiras passam por um cooldown de 400ms, para uma rolagem de trackpad não atravessar a pilha inteira. Contador em `tabular-nums` à esquerda. Roda em rota isolada: é `h-screen` e escuta `wheel` no `window`, então solto na vitrine sequestraria a rolagem da página. Atenção: a sombra do card usa `hsl(var(--foreground) / 0.15)`, escrito para os tokens HSL do shadcn antigo — com os tokens `oklch` deste projeto a declaração é inválida e o card sai sem sombra nenhuma. As imagens são fixas no arquivo e vêm do CDN do 21st pelo `next/image`.",
      tags: ["framer-motion", "stack", "3d", "wheel"],
      source: "components/ui/vertical-image-stack.tsx",
      preview: { route: "/preview/vertical-image-stack" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "21st.dev — jatin-yadav05", href: "https://21st.dev/@jatin-yadav05/components/vertical-image-stack" },
    },
  ],
};

import type { CollectionMeta } from "@/content/types";

/** Só metadados — veja a nota em cards.meta.ts. */
export const backgroundsMeta: CollectionMeta = {
  slug: "backgrounds",
  name: "Backgrounds",
  tagline: "Fundos que se movem sozinhos",
  description:
    "Planos de fundo animados para heroes e seções inteiras — malhas, campos e texturas que rodam atrás do conteúdo.",
  entries: [
    {
      id: "wave-landscape",
      name: "Wave Landscape",
      description:
        "Uma malha de arame ondulando em perspectiva, desenhada em canvas 2D puro — sem WebGL. Uma grade de 55x38 pontos ganha altura pela soma de quatro senoides em direções diferentes (por isso o campo não fica alinhado à grade), é projetada por uma câmera inclinada 45° para baixo e sai em três passadas de linha: diagonais, horizontais e de profundidade, cada uma com sua opacidade. O ponteiro desloca a câmera de leve. Props para grade, amplitude, velocidade, cores, brilho, vinheta e parallax; o conteúdo da hero entra como children.",
      tags: ["canvas", "wireframe", "perspective", "parallax"],
      source: "components/ui/wave-landscape.tsx",
      preview: { route: "/preview/wave-landscape" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado de ux_ui_design/Wave Effect.html" },
    },
    {
      id: "fireworks-background",
      name: "Fireworks Background",
      description:
        "Fogos de artifício em canvas 2D atrás do conteúdo. Cada foguete sobe da base com ângulo de até 45° e gravidade de 0.1 por quadro, e explode ao atingir a altura-alvo (entre 10% e 50% da tela) ou ao começar a cair — o que vier primeiro. A explosão solta 60 a 100 partículas da cor do foguete, com gravidade mais leve e vida de 30 a 60 quadros. O rastro não guarda histórico: cada quadro pinta um retângulo preto a 10% sobre a tela inteira, e o que já foi desenhado desbota sozinho. Novos foguetes saem a cada 1 a 3 segundos. O conteúdo entra como children, acima do canvas. O buffer do canvas usa o tamanho da janela, não do container, e ignora o devicePixelRatio — por isso roda em rota de preview, e em telas HiDPI sai levemente borrado.",
      tags: ["canvas", "particles", "gravity", "loop"],
      source: "components/ui/fireworks-background.tsx",
      preview: { route: "/preview/fireworks-background" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "21st.dev" },
    },
    {
      id: "sliding-ease-vertical-bars",
      name: "Sliding Ease Vertical Bars",
      description:
        "Linhas verticais finas a cada 15px, cada uma com uma coluna de barrinhas que desliza entre dois padrões. Os dois padrões saem do mesmo ruído senoidal com sementes diferentes (0 e 5): onde o ruído passa de 0.5 nasce uma barra, com comprimento e espessura proporcionais a ele. Um ciclo de 2π alterna repouso, transição, repouso e volta, com easing cúbico in-out — por isso as barras param, escorregam e param de novo em vez de flutuar sem pausa. No meio da transição entra uma oscilação extra que some nos extremos (o fator e(1−e)·4). O mouse a menos de 180px engrossa linhas e barras, e o clique solta uma frente circular que cresce até 300px em 2,5s perturbando as barras na passagem. Mede a janela, não o container, então roda em rota de preview. Props: backgroundColor, lineColor, barColor, lineWidth, animationSpeed e removeWaveLine.",
      tags: ["canvas", "easing", "noise", "mouse"],
      source: "components/ui/sliding-ease-vertical-bars.tsx",
      preview: { route: "/preview/sliding-ease-vertical-bars" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "21st.dev" },
    },
    {
      id: "topology-field",
      name: "Topology Field",
      description:
        "Uma esfera de 120 nós em espiral de Fibonacci, ligados por arestas sempre que dois ficam a menos de 0.45 um do outro, girando em Three.js com névoa e blending aditivo nas linhas; cada nó pulsa em tamanho e opacidade num ritmo próprio. O componente é o invólucro do ThreeUI: a página HTML original inteira — hero, cards flutuantes, cabeçalho — vai num iframe com sandbox allow-scripts, e um script injetado isola só o #animationCanvas, escondendo e desativando o resto. Por isso o efeito não vaza estilo nem briga com o tema da vitrine. Em troca, o iframe busca em tempo de execução o Three.js r128, o Tailwind CDN, o Iconify e a Inter do Google Fonts: offline, não desenha. Props: mode (dark/light), hue, saturation e brightness — os três últimos viram filtro CSS sobre o iframe.",
      tags: ["threejs", "iframe", "graph", "sphere"],
      source: "components/ui/topology-field.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "ThreeUI", href: "https://threeui.com" },
    },
    {
      id: "ink-reveal",
      name: "Ink Reveal",
      description:
        "Uma folha de papel cobre a imagem e o cursor a dissolve em manchas de tinta. Cada passagem do ponteiro carimba uma sequência de marcas — interpoladas ao longo do traço, para o movimento rápido não deixar buracos — e cada marca é um polígono de 36 lados cujo raio oscila por três senoides somadas, o que tira a borda perfeitamente circular. O recorte sai de `globalCompositeOperation = 'destination-out'`: a tinta apaga a máscara em vez de pintar por cima, e o degradê radial dá a borda molhada. As marcas crescem com easing cúbico e somem em 600ms, então o papel se refaz atrás da mão. O laço para sozinho quando a última marca morre. Props: maskColor, brushSize, lifetime, rStart, rVary, stampStep, maxStamps, segments, wobble, gradientInnerRadius e gradientStops.",
      tags: ["canvas", "mask", "cursor", "ink"],
      source: "components/ui/ink-reveal.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "21st.dev" },
    },
    {
      id: "waves-shader",
      name: "Waves Shader",
      description:
        "Ondas em degradê saídas do Shader Builder do 21st.dev: um único triângulo cobrindo a tela e todo o desenho no fragment shader — sem dependência nenhuma, nem three, nem biblioteca de shader. A cor vem de uma paleta de até oito paradas percorridas por uma coordenada que soma senoide e fbm, e o campo passa por um domain warp antes de ser colorido, que é o que dá a dobra orgânica em vez de listra. O ajuste está todo no objeto UNIFORMS no topo do arquivo (escala, intensidade, warp, contraste, grão, semente, velocidade e os quatro modos de cursor); a versão colada vem em cinza, com o cursor desligado. Três detalhes de ofício valem a leitura: os uniforms vêm empacotados em sete vec4 para caber no mínimo garantido do WebGL1, o laço da paleta é constante porque WebGL1 proíbe indexar uniform dinamicamente, e a resolução é limitada a 2 megapixels antes do DPR.",
      tags: ["webgl", "shader", "gradient", "waves"],
      source: "components/ui/waves-shader.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "21st.dev — Shader Builder", href: "https://21st.dev" },
    },
    {
      id: "retro-dither",
      name: "Retro Dither",
      description:
        "Uma lente que segue o cursor e tritura o conteúdo vivo embaixo dela em pixels grandes, quantizados em poucos níveis de brilho por matriz de bayer (ou halftone, hatch, dash). O texto tem tratamento próprio: uma máscara varre os nós de texto e marca onde há letra, e ali o pixel fica quatro vezes menor — sem isso a palavra vira borrão. O rastro do cursor deixa um fantasma que apaga sozinho, como fósforo queimado, e o clique dispara uma onda de degauss que revela o dither e entorta as coordenadas na passagem. Como o Glass, depende da API experimental html-in-canvas do Chrome para capturar a página; sem ela o conteúdo aparece normal e a lente não desenha. Props: radius, softness, pixelSize, levels, darkColor, lightColor, colorize, contrast, brightness, strength, baseStrength, invert, scanlines, pattern, trail, degauss e followSpeed.",
      tags: ["webgl", "shader", "dither", "cursor"],
      source: "components/ui/retro-dither.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Canvas UI", href: "https://canvasui.dev" },
    },
    {
      id: "neon-dither",
      name: "Neon Dither",
      description:
        "Onda dithering em shader, do @paper-design/shaders-react, embrulhada em quatro camadas de acabamento: brilho radial, vinheta, grão de filme e um sweep de luz no topo — todas trocando de blend (screen no escuro, multiply no claro). O componente escolhe a paleta pelo tema: dourado quente sobre preto, ou azul frio sobre quase-branco. `intensity` (0..1) move junto cor, velocidade, tamanho do pixel e escala, então um controle só muda o caráter inteiro. `parallax` desloca o campo até 8px seguindo o ponteiro. Ocupa a viewport (`fixed inset-0`, `pointer-events-none`) e escreve a classe `dark` no <html> conforme o `themeMode`.",
      tags: ["shader", "dither", "parallax", "theme"],
      source: "components/ui/neon-dither.tsx",
      preview: { route: "/preview/neon-dither" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "21st.dev — @paper-design/shaders-react" },
    },
    {
      id: "dethering",
      name: "Dethering",
      description:
        "Hero com um campo dot-matrix procedural: um shader WebGL desenha uma grade de pontos cujo brilho vem de ruído fractal (fbm) amostrado no centro de cada célula — por isso cada ponto tem um brilho só, em vez de um degradê interno. O `warp` é o botão nuvem ↔ fumaça: quanto mais o ruído desloca a si mesmo, mais o campo vira filamento. A dissolução no rodapé são duas camadas com papéis distintos: o shader encolhe o raio do ponto até zero, desmanchando a grade, e uma faixa de cor mascarada fecha a diferença entre o fundo da hero e o da página — só a segunda cortaria a grade numa borda reta. O ponteiro desloca o ruído com inércia, o laço pausa fora da tela e, sem WebGL, entra uma grade estática com a mesma dissolução. Props para célula, preenchimento, quantização, ganho, ruído, warp, oitavas, contraste, vinheta, altura da dissolução e cores.",
      tags: ["webgl", "shader", "noise", "dot-matrix"],
      source: "components/ui/dethering.tsx",
      preview: { route: "/preview/dethering" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado de mentecinzaSITE/dethering" },
    },
    {
      id: "particle-graph",
      name: "Particle Graph",
      description:
        "Uma nuvem de nós ligados por linhas, girando em perspectiva e desenhada em canvas 2D — a geometria é 3D (rotação por matriz e projeção feitas à mão), só o desenho é 2D, porque o WebGL trava a espessura da linha em 1px. Cada nó carrega dois campos de velocidade: uma deriva constante, que nunca é amortecida e mantém o grafo vivo, e um amasso que o cursor empurra e uma mola devolve ao lugar — por isso o ponteiro abre um buraco que se fecha sozinho, em vez de cavar um túnel permanente. A repulsão parte do raio do cursor, não de um ponto, o que dá a sensação de a mão atravessar a nuvem. Props para nós, escala, raio da nuvem, distância de ligação e câmera, linhas, vértices (tamanho, halo e pulso), rotação, deriva e os cinco controles do cursor; `onStats` devolve nós, ligações e fps.",
      tags: ["canvas", "graph", "3d", "mouse"],
      source: "components/ui/particle-graph.tsx",
      preview: { route: "/preview/particle-graph" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado de mentecinzaSITE/grafo-teste" },
    },
    {
      id: "dotted-globe",
      name: "Dotted Globe",
      description:
        "Um globo terrestre feito só de pontos, em canvas 2D. Os continentes vêm de um mapa specular equirretangular lido pixel a pixel: água clara vira vazio, terra escura vira ponto. Os pontos nascem numa grade de latitude/longitude — daí as fileiras verticais características — e são projetados numa esfera que gira sozinha, aceita arrasto com inércia e zoom pela roda. O hemisfério de trás aparece em traços esparsos (um a cada quatro meridianos) para dar profundidade sem virar nuvem. Props: density, dotSize, spinSpeed, tilt, color, showFarSide, farOpacity, zoom e mapUrls.",
      tags: ["canvas", "globe", "drag", "map"],
      source: "components/ui/dotted-globe.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado de vOOairline/Dotted Globe.html" },
    },
    {
      id: "meteors",
      name: "Meteors",
      description:
        "Chuva de meteoros em CSS puro: cada meteoro é um ponto de meio pixel com uma cauda em degradê, girado no ângulo da trajetória e empurrado 500px por um keyframe linear em loop. O atraso e a duração de cada um são sorteados, então o campo nunca cai em cadência. Props: number, minDelay, maxDelay, minDuration, maxDuration, angle e className. Precisa de um container com position relative e overflow hidden.",
      tags: ["css", "keyframes", "particles", "loop"],
      source: "components/ui/meteors.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Magic UI", href: "https://magicui.design/docs/components/meteors" },
    },
    {
      id: "video-text",
      name: "Video Text",
      description:
        "Texto recortado sobre vídeo: as letras viram uma máscara e o filme só aparece dentro delas. O truque é montar um SVG com o texto, convertê-lo em data URL e usá-lo como mask-image sobre o vídeo — nada de canvas ou blend mode. Como o tamanho da fonte é dado em vw, o recorte acompanha a largura da janela. Props: src, children (o texto), fontSize, fontWeight, fontFamily, textAnchor, dominantBaseline, as, e os controles do vídeo (autoPlay, muted, loop, preload).",
      tags: ["mask", "svg", "video", "text"],
      source: "components/ui/video-text.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Magic UI", href: "https://magicui.design/docs/components/video-text" },
    },
    {
      id: "dot-pattern",
      name: "Dot Pattern",
      description:
        "Malha de pontos em SVG que se ajusta ao tamanho do container. Com glow, cada ponto vira um degradê radial que pulsa entre 0,4 e 1 de opacidade e cresce 50%, com atraso e duração sorteados — o campo cintila sem cadência. A cor sai do currentColor, então basta uma classe de texto para trocá-la, e uma mask-image recorta a região visível. Props: width, height, x, y, cx, cy, cr, glow e className.",
      tags: ["svg", "pattern", "motion", "glow"],
      source: "components/ui/dot-pattern.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Magic UI", href: "https://magicui.design/docs/components/dot-pattern" },
    },
    {
      id: "particles",
      name: "Particles",
      description:
        "Campo de partículas em canvas 2D que reage ao ponteiro. Cada ponto tem seu magnetismo próprio e é puxado na direção do mouse com suavização — staticity controla a resistência, ease a inércia. Elas derivam devagar com velocidade própria (mais o empurrão constante de vx/vy), desbotam ao chegar perto das bordas e renascem em posição aleatória ao sair do quadro. Props: quantity, staticity, ease, size, color, vx, vy e refresh.",
      tags: ["canvas", "particles", "mouse", "parallax"],
      source: "components/ui/particles.tsx",
      stageClassName: "min-h-0 p-4",
      credit: { label: "Magic UI", href: "https://magicui.design/docs/components/particles" },
    },
    {
      id: "starfield",
      name: "Starfield",
      description:
        "Um disco de estrelas girando em torno do centro, desenhado pixel a pixel: em vez de traçar formas, o componente escreve direto num Uint32Array sobre o ImageData — cada estrela é um pixel só, e é por isso que dez mil cabem no mesmo quadro sem derrubar a taxa. O raio de cada uma sai da média de dois sorteios de faixas diferentes, o que adensa o anel em vez de espalhar por igual; a opacidade cai com o raio e a velocidade angular sobe com ela, então as de dentro giram mais rápido e o disco se enrola sozinho. Duas senoides de fase independente somam um tremor em x e y, tirando a órbita do círculo perfeito. Cada quadro apaga só o pixel anterior de cada estrela antes de escrever o novo — a tela nunca é limpa inteira, e como as estrelas apagam o pixel umas das outras o campo fica bem mais esparso que a contagem sugere (medido: cerca de cem a quinhentos pixels acesos por quadro, o mesmo da demo publicada). O fundo fica transparente, porque o putImageData substitui os pixels inclusive no alfa, então a cor vem do container. Mede o container (não a janela) e ignora o devicePixelRatio. Props: starCount, waveFrequency, starEscapeWidth, starColor, maxOpacity, rotationSpeed e waveSpeed — voidWidth está na assinatura mas não é usado. starColor entra no array de dependências do efeito, então um literal inline reinicia o campo a cada render do pai; a demo publicada passa inline mesmo assim. Roda em rota isolada porque a demo original ocupa a viewport inteira.",
      tags: ["canvas", "imagedata", "orbit", "pixels"],
      source: "components/ui/starfield.tsx",
      preview: { route: "/preview/starfield" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "21st.dev — designali-in", href: "https://21st.dev/@designali-in/components/starfield" },
    },
    {
      id: "hyperdrive-hero",
      name: "Hyperdrive Hero",
      description:
        "Hero de viagem em dobra: 800 estrelas correndo em direção ao observador, em canvas 2D. A profundidade é feita à mão — cada estrela guarda x, y e z, e a projeção divide x e y por z, então quanto mais perto, mais rápido ela se abre para fora da tela. O rastro não é borrão nem histórico: cada estrela guarda o z do quadro anterior (`pz`) e o desenho é uma linha entre a projeção velha e a nova, com espessura e opacidade crescendo conforme se aproxima. A tela nunca é limpa — cada quadro pinta um preto a 20% por cima, e o que ficou desbota sozinho, que é o que dá a cauda. Ao cruzar z = 1 a estrela renasce lá no fundo com posição nova. O ponteiro controla a velocidade pela distância horizontal até o centro: `2 + (1 - dist/maxDist) * 20`, ou seja 22 no meio da tela e 2 nas bordas. Por cima vem a hero em si, com selo, título em degradê, parágrafo e botão entrando em cascata pelo Framer Motion (0,2s de atraso entre eles), e um gradiente preto no topo e no rodapé que afunda as estrelas no fundo. Sem props: textos e contagem de estrelas estão no arquivo. Roda em rota isolada porque é `h-screen` e mede `window.innerWidth/innerHeight` para dimensionar o canvas, além de escutar `resize` e `mousemove` no `window`. A fonte veio em JS puro; o arquivo traz só as anotações de tipo que o `strict` exige, sem mudança de lógica. Tem um `cn()` declarado e nunca usado, como no original.",
      tags: ["canvas", "starfield", "3d", "framer-motion"],
      source: "components/ui/hyperdrive-hero.tsx",
      preview: { route: "/preview/hyperdrive-hero" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "21st.dev — dhileepkumargm", href: "https://21st.dev/@dhileepkumargm/components/hyperdrive-hero" },
    },
    {
      id: "supply-chain-globe",
      name: "Supply Chain Globe",
      description:
        "Globo interativo com as rotas de uma cadeia de suprimentos desenhadas por cima. As ligações são uma série Sankey projetada na esfera — a espessura de cada fita é o volume —, e grãos correm por elas em looping, cada um com atraso e velocidade próprios. Os países ganham cor conforme o papel (produtor, entreposto, consumidor), há um alternador entre globo e mapa plano com fade na troca de projeção, e o globo gira sozinho até a primeira interação. Props: flows, countryNames, producerIds, hubIds, consumerIds, title, subtitle, unit e autoRotate.",
      tags: ["amcharts", "globe", "sankey", "map"],
      source: "components/ui/supply-chain-globe.tsx",
      preview: { route: "/preview/supply-chain-globe" },
      stageClassName: "min-h-0 p-4",
      credit: { label: "Portado de ux_ui_design/mapglobe" },
    },
  ],
};

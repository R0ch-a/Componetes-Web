import type { CollectionMeta } from "@/content/types";

/** Só metadados — veja a nota em cards.meta.ts. */
export const slidersMeta: CollectionMeta = {
  slug: "sliders",
  name: "Sliders",
  tagline: "Controles de valor: knobs, ranges e trilhos",
  description:
    "Componentes de entrada contínua — arraste, gire ou role para mudar o valor. Cada seção mostra o controle rodando de verdade, com o caminho do arquivo para copiar.",
  entries: [
    {
      id: "knob-slider",
      name: "Knob Slider",
      description:
        "Dial radial: arraste em volta do knob para girar o ponteiro, que trava de tick em tick (72 no total). O número no centro rola como um contador mecânico — cada dígito tem sua própria spring — e ganha desfoque proporcional ao tamanho do salto, então movimentos rápidos borram e paradas finas ficam nítidas. Props: value, onChange, min, max e size.",
      tags: ["drag", "motion", "radial", "svg"],
      source: "components/ui/knob-slider.tsx",
      stageClassName: "min-h-[460px]",
    },
    {
      id: "fractional-picker",
      name: "Fractional Picker",
      description:
        "Régua horizontal que você arrasta: os números deslizam sob um ponteiro fixo no topo, ganhando opacidade e escala conforme se aproximam do centro, e ao soltar a régua encaixa no valor mais próximo com uma spring. Props: min, max, defaultValue, itemWidth (a distância entre marcas, padrão 80px), onChange e className.",
      tags: ["drag", "framer-motion", "ruler", "snap"],
      source: "components/ui/fractional-picker.tsx",
      stageClassName: "min-h-[280px]",
      credit: { label: "watermelon.sh", href: "https://registry.watermelon.sh" },
    },
    {
      id: "weight-widget",
      name: "Weight Widget",
      description:
        "Balança de bolso: os números correm num arco côncavo — cada um sobe, gira e desbota conforme se afasta do ponteiro, desenhando um mostrador circular em vez de uma régua reta. O arraste anda um número por gesto (com direção decidida por deslocamento ou velocidade) e a mola de bounce 0.45 dá o encaixe. Props: initialValue, min, max e onChange. Lê o tema via next-themes para escolher a cor dos números.",
      tags: ["drag", "motion", "dial", "next-themes"],
      source: "components/ui/weight-widget.tsx",
      stageClassName: "min-h-[380px]",
      credit: { label: "watermelon.sh", href: "https://registry.watermelon.sh" },
    },
  ],
};

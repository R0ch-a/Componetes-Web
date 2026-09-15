import { HoverExpand_001 } from "@/components/ui/skiper-52";

/**
 * O componente exporta duas coisas: `Skiper52`, que é a demo original apontando
 * para imagens locais em /images/x.com/, e `HoverExpand_001`, que recebe as
 * imagens por prop. Aqui usamos o segundo, com fotos remotas.
 */
const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80",
    alt: "Lago entre montanhas ao entardecer",
    code: "# 01",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80",
    alt: "Floresta na neblina",
    code: "# 02",
  },
  {
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=900&q=80",
    alt: "Copas de árvores vistas de baixo",
    code: "# 03",
  },
  {
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=900&q=80",
    alt: "Cachoeira sob uma ponte de pedra",
    code: "# 04",
  },
  {
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=900&q=80",
    alt: "Ondas quebrando na praia",
    code: "# 05",
  },
  {
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=900&q=80",
    alt: "Vale verde ao amanhecer",
    code: "# 06",
  },
  {
    src: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=900&q=80",
    alt: "Cume de montanha acima das nuvens",
    code: "# 07",
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900&q=80",
    alt: "Campo dourado ao pôr do sol",
    code: "# 08",
  },
];

const Skiper52Demo = () => {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#f5f4f3] py-10">
      <HoverExpand_001 images={IMAGES} />
    </div>
  );
};

export { Skiper52Demo };

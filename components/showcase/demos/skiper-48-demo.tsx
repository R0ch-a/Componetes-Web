import { Carousel_002 } from "@/components/ui/skiper-48";

/**
 * Mesma montagem do `Skiper48` do arquivo original (só `loop`), com imagens
 * remotas — /images/x.com/ não existe neste repo.
 */
const IMAGES = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80", alt: "Montanhas ao entardecer" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80", alt: "Floresta iluminada pelo sol" },
  { src: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=700&q=80", alt: "Estrada entre árvores" },
  { src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=700&q=80", alt: "Luz atravessando as folhas" },
  { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=700&q=80", alt: "Campo dourado ao pôr do sol" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=700&q=80", alt: "Floresta na neblina" },
  { src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=700&q=80", alt: "Cachoeira sob ponte de pedra" },
  { src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=700&q=80", alt: "Ondas quebrando na praia" },
  { src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=700&q=80", alt: "Vale verde ao amanhecer" },
  { src: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=700&q=80", alt: "Cume acima das nuvens" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700&q=80", alt: "Lago entre montanhas" },
];

const Skiper48Demo = () => {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#f5f4f3] py-10">
      <Carousel_002 images={IMAGES} loop />
    </div>
  );
};

export { Skiper48Demo };

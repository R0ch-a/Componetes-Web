import { Carousel_006 } from "@/components/ui/skiper-54";

/**
 * Mesma montagem do `Skiper54` do arquivo original (loop, navegação e paginação),
 * com imagens remotas — /images/x.com/ não existe neste repo.
 */
const IMAGES = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80", alt: "Montanhas ao entardecer", title: "Silent Peaks" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80", alt: "Floresta iluminada pelo sol", title: "Emerald Woods" },
  { src: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=700&q=80", alt: "Estrada entre árvores", title: "Long Road" },
  { src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=700&q=80", alt: "Luz atravessando as folhas", title: "Golden Dusk" },
  { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=700&q=80", alt: "Campo dourado ao pôr do sol", title: "Wheat Field" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=700&q=80", alt: "Floresta na neblina", title: "Falling Mist" },
  { src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=700&q=80", alt: "Cachoeira sob ponte de pedra", title: "Stone Bridge" },
  { src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=700&q=80", alt: "Ondas quebrando na praia", title: "Azure Shore" },
  { src: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=700&q=80", alt: "Cume acima das nuvens", title: "Cloud Summit" },
];

const Skiper54Demo = () => {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#f5f4f3] px-4 py-10">
      <Carousel_006 images={IMAGES} loop showNavigation showPagination />
    </div>
  );
};

export { Skiper54Demo };

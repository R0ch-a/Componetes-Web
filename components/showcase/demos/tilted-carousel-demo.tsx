import { TiltedCarousel } from "@/components/ui/tilted-carousel";

/** As mesmas dez imagens do carousel.js. */
const ITEMS = [
  { src: "https://images.unsplash.com/photo-1769921546096-7a648d953a3e?q=80&w=500&auto=format&fit=crop", title: "urban exploration" },
  { src: "https://images.unsplash.com/photo-1777726515600-65be20641e1b?q=80&w=500&auto=format&fit=crop", title: "night scene" },
  { src: "https://images.unsplash.com/photo-1776582929657-9710d9cfa46a?q=80&w=500&auto=format&fit=crop", title: "yellow wildflowers" },
  { src: "https://images.unsplash.com/photo-1776582929656-78ad8b515d75?q=80&w=500&auto=format&fit=crop", title: "street with mount fuji" },
  { src: "https://images.unsplash.com/photo-1775990630948-3c1f696f4ab1?q=80&w=500&auto=format&fit=crop", title: "bridgestone bicycle shop" },
  { src: "https://images.unsplash.com/photo-1775380744191-8fbff371c40b?q=80&w=500&auto=format&fit=crop", title: "train window view" },
  { src: "https://images.unsplash.com/photo-1774775479879-082fd47d41e1?q=80&w=500&auto=format&fit=crop", title: "train tracks" },
  { src: "https://images.unsplash.com/photo-1773544517453-95c148cb42b7?q=80&w=500&auto=format&fit=crop", title: "lawson convenience store" },
  { src: "https://images.unsplash.com/photo-1771385809377-9b0348e1f8dc?q=80&w=500&auto=format&fit=crop", title: "street scene" },
  { src: "https://images.unsplash.com/photo-1775990631076-f6f208079475?q=80&w=500&auto=format&fit=crop", title: "japanese culture" },
];

const TiltedCarouselDemo = () => {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#ececec] py-12">
      <TiltedCarousel items={ITEMS} initialIndex={3} />
    </div>
  );
};

export { TiltedCarouselDemo };

import { DiagonalCarousel } from "@/components/ui/diagonal-carousel";

/** As mesmas dez imagens do diagonalcarousel.js. */
const ITEMS = [
  { src: "https://images.unsplash.com/photo-1774565784366-72db806a40f9?q=80&w=600&auto=format&fit=crop", title: "cable car station" },
  { src: "https://images.unsplash.com/photo-1776031312164-f22c0edbdfb9?q=80&w=600&auto=format&fit=crop", title: "light-colored house" },
  { src: "https://images.unsplash.com/photo-1777763517503-05d74f2e0008?q=80&w=600&auto=format&fit=crop", title: "cherry blossoms" },
  { src: "https://images.unsplash.com/photo-1774651458632-17df84bad45e?q=80&w=600&auto=format&fit=crop", title: "bottles of drinks" },
  { src: "https://images.unsplash.com/photo-1778360508753-dcb2afbeadc2?q=80&w=600&auto=format&fit=crop", title: "tree-lined road" },
  { src: "https://images.unsplash.com/photo-1777221895589-2f81579e0dca?q=80&w=600&auto=format&fit=crop", title: "train window view" },
  { src: "https://images.unsplash.com/photo-1777763517666-b9fd2c9b6a0c?q=80&w=600&auto=format&fit=crop", title: "sunlight streams" },
  { src: "https://images.unsplash.com/photo-1777221895551-844a3c1243b3?q=80&w=600&auto=format&fit=crop", title: "seagulls" },
  { src: "https://images.unsplash.com/photo-1777221895297-9878eb5e53f5?q=80&w=600&auto=format&fit=crop", title: "pink flowers" },
  { src: "https://images.unsplash.com/photo-1777908724790-2ec0d06d8ff7?q=80&w=600&auto=format&fit=crop", title: "paddleboarding" },
];

const DiagonalCarouselDemo = () => {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#ececec] py-12">
      <DiagonalCarousel items={ITEMS} initialIndex={3} />
    </div>
  );
};

export { DiagonalCarouselDemo };

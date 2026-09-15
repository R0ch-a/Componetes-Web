import { LayeredStack } from "@/components/ui/layered-stack";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80", label: "Fog" },
  { src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80", label: "Canopy" },
  { src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80", label: "Shore" },
  { src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80", label: "Falls" },
  { src: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=600&q=80", label: "Ridge" },
  { src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&q=80", label: "Valley" },
];

const LayeredStackDemo = () => {
  return (
    <LayeredStack className="grid h-[400px] w-full max-w-[680px] grid-cols-3 gap-5">
      {PHOTOS.map((photo) => (
        <figure
          key={photo.src}
          className="m-0 overflow-hidden rounded-xl border border-black/5 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
        >
          <img
            src={photo.src}
            alt={photo.label}
            className="h-[128px] w-full rounded-lg object-cover"
            draggable={false}
          />
          <figcaption className="px-1 pb-0.5 pt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-500">
            {photo.label}
          </figcaption>
        </figure>
      ))}
    </LayeredStack>
  );
};

export { LayeredStackDemo };

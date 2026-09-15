import { Lens } from "@/components/ui/lens";

/**
 * A doc mostra três variações (hover, estática e com posição inicial). Aqui vão
 * as duas primeiras, lado a lado.
 */
const IMAGE =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85";

const LensDemo = () => {
  return (
    <div className="grid w-full gap-8 p-4 md:grid-cols-2">
      <figure className="space-y-3">
        <Lens zoomFactor={1.6} lensSize={160}>
          <img
            src={IMAGE}
            alt="Floresta iluminada pelo sol"
            className="h-[260px] w-full rounded-xl object-cover"
          />
        </Lens>
        <figcaption className="text-center text-xs uppercase tracking-widest text-muted-foreground">
          Segue o cursor
        </figcaption>
      </figure>

      <figure className="space-y-3">
        <Lens isStatic position={{ x: 180, y: 130 }} zoomFactor={1.8}>
          <img
            src={IMAGE}
            alt="Floresta iluminada pelo sol"
            className="h-[260px] w-full rounded-xl object-cover"
          />
        </Lens>
        <figcaption className="text-center text-xs uppercase tracking-widest text-muted-foreground">
          Estática
        </figcaption>
      </figure>
    </div>
  );
};

export { LensDemo };

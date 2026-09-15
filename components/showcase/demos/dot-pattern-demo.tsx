import { DotPattern } from "@/components/ui/dot-pattern";

/**
 * A doc mostra três variações; esta é a do exemplo "with glow effect", com a
 * máscara radial que concentra os pontos no centro.
 */
const DotPatternDemo = () => {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-background p-20">
      <p className="z-10 text-center text-5xl font-medium tracking-tighter">
        Dot Pattern
      </p>
      <DotPattern
        glow
        className="[mask-image:radial-gradient(320px_circle_at_center,white,transparent)]"
      />
    </div>
  );
};

export { DotPatternDemo };

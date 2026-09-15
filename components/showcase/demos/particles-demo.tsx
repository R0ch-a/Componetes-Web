import { Particles } from "@/components/ui/particles";

/** Uso da própria doc: caixa relativa com overflow escondido. */
const ParticlesDemo = () => {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-950">
      <span className="pointer-events-none z-10 bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent">
        Particles
      </span>
      <Particles
        className="absolute inset-0 z-0"
        quantity={140}
        ease={80}
        color="#ffffff"
        refresh
      />
    </div>
  );
};

export { ParticlesDemo };

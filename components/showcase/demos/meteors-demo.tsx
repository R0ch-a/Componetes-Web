import { Meteors } from "@/components/ui/meteors";

/**
 * A doc do Magic UI referencia um `meteors-demo` que não vem junto. Este é o uso
 * da própria doc: uma caixa relativa com overflow escondido.
 */
const MeteorsDemo = () => {
  return (
    <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-950">
      <Meteors number={30} />
      <span className="pointer-events-none z-10 bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent">
        Meteors
      </span>
    </div>
  );
};

export { MeteorsDemo };

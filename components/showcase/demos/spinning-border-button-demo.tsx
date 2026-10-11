import SpinningBorderButton from "@/components/ui/spinning-border-button";

/**
 * A demo publicada é `h-screen` sobre preto; no palco só o invólucro muda. O
 * fundo escuro fica: o botão é cravado em tons de zinc e não tem variante para
 * tema claro.
 */
const SpinningBorderButtonDemo = () => {
  return (
    <div className="flex w-full items-center justify-center rounded-xl bg-black py-20">
      <SpinningBorderButton />
    </div>
  );
};

export { SpinningBorderButtonDemo };

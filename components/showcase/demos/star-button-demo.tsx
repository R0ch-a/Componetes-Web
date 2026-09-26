import Component from "@/components/ui/star-button";

/** As estrelas saem bem além da caixa do botão no hover, então o palco tem folga. */
const StarButtonDemo = () => {
  return (
    <div className="flex w-full items-center justify-center py-20">
      <Component />
    </div>
  );
};

export { StarButtonDemo };

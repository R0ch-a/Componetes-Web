"use client";

import InkReveal from "@/components/ui/ink-reveal";

/**
 * Mesma montagem da fonte: a imagem embaixo, a máscara por cima. A imagem
 * original vinha do CDN do 21st.dev — baixei para `public/images/`, porque uma
 * vitrine que depende de host de terceiros quebra no dia em que a URL rotaciona.
 */
const InkRevealDemo = () => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/ink-reveal-landscape.jpg"
        alt="Vale com montanhas e rio ao amanhecer"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <InkReveal />
    </div>
  );
};

export { InkRevealDemo };

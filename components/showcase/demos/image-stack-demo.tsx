"use client";

import ImgStack from "@/components/ui/image-stack";

/**
 * As imagens da demo publicada vivem no Cloudinary do autor e hoje respondem
 * 401 — a conta bloqueou a entrega pública, então o baralho saía com cinco
 * cards brancos. Estas são as do próprio repositório. O componente recebe a
 * lista por prop, então nada nele precisou mudar.
 *
 * Originais, caso voltem a responder:
 *   https://res.cloudinary.com/dctgknnt7/image/upload/v1758731403/1_d8uozd.jpg
 *   https://res.cloudinary.com/dctgknnt7/image/upload/v1758731402/5_ionpyy.jpg
 *   https://res.cloudinary.com/dctgknnt7/image/upload/v1758731402/4_zeoqje.jpg
 *   https://res.cloudinary.com/dctgknnt7/image/upload/v1758731402/3_nfdtim.jpg
 *   https://res.cloudinary.com/dctgknnt7/image/upload/v1758731402/2_hme6yu.jpg
 */
const imageUrls: string[] = [
  "/images/ship-in-a-storm.jpg",
  "/images/ink-reveal-landscape.jpg",
  "/images/goro-drums.png",
];

const ImageStackDemo = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <ImgStack images={imageUrls} />
    </div>
  );
};

export { ImageStackDemo };

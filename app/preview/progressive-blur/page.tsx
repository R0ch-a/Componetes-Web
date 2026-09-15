import { Skiper41 } from "@/components/ui/skiper-41";

export const metadata = {
  title: "Progressive Blur — preview",
};

export default function Page() {
  // O componente é `h-full w-full`: precisa de um pai com altura para o fundo
  // e as faixas de desfoque cobrirem a tela.
  return (
    <div className="h-screen w-full">
      <Skiper41 />
    </div>
  );
}

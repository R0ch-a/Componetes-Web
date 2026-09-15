"use client";

import { useEffect, useState } from "react";
import { PaperDesignBackground } from "@/components/ui/neon-dither";

/**
 * Mesma demo da fonte. Roda em rota isolada (modo quadro) por dois motivos: o
 * componente é `fixed inset-0` e cobriria a vitrine inteira, e ele escreve a
 * classe `dark` no <html> — dentro do iframe isso não alcança o tema do site.
 *
 * A montagem só depois da hidratação não é preciosismo. Com themeMode="system"
 * o estado inicial do componente sai de `matchMedia`, que no servidor não
 * existe e volta sempre "claro". Num cliente em modo escuro as duas árvores
 * divergem, e o React avisa que NÃO conserta atributos de um nó já hidratado:
 * o resultado era o dither dourado do tema escuro sobre o fundo quase branco do
 * tema claro. Renderizando só no cliente não existe HTML de servidor para
 * divergir. O componente fica intocado — quem copiar o arquivo leva o original.
 */
export function NeonDitherPreview() {
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  return (
    <div className="min-h-screen">
      {montado && <PaperDesignBackground themeMode="system" intensity={0.85} />}
    </div>
  );
}

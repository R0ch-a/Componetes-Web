"use client";

import TopologyField from "@/components/ui/topology-field";

/*
 * "use client" aqui, e não no componente: o arquivo colado usa useMemo mas não
 * declara a diretiva. Tudo que um módulo cliente importa roda no cliente, então
 * a fronteira fica na demo e o componente segue igual à fonte. Quem importar
 * TopologyField direto de um Server Component precisa fazer o mesmo.
 */
const TopologyFieldDemo = () => {
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-border bg-background">
      <TopologyField mode="dark" className="h-full w-full" />
    </div>
  );
};

export { TopologyFieldDemo };

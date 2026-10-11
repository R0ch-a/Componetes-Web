import { Kanban } from "@/components/ui/kanban";

/**
 * Roda em rota isolada por dois motivos: o quadro é `h-screen` com rolagem
 * própria, e o cálculo do ponto de soltura usa `document.querySelectorAll`,
 * que é global — duas instâncias na mesma página disputariam os mesmos
 * indicadores.
 */
export function KanbanPreview() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Kanban />
    </div>
  );
}

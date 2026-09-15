"use client";

import { ScrollStages } from "@/components/ui/scroll-stages";

/**
 * Os seis estágios da seção "Software Stages" de projects.html. O conteúdo de
 * cada card lá é um SVG desenhado à mão; aqui vai um placeholder, já que o que
 * o componente oferece é a máquina de estágios — o `content` é livre.
 */
const STAGES = [
  {
    name: "Discovery",
    title: "Discovery & Notes",
    badge: "sketch",
    body: "Por que, para quem e o quê. Post-its, perguntas em aberto e critérios de sucesso.",
  },
  {
    name: "Diagrams",
    title: "UML Diagrams",
    badge: "model",
    body: "Casos de uso, sequência e classes. O sistema no papel antes do primeiro commit.",
  },
  {
    name: "Architecture",
    title: "System Architecture",
    badge: "design",
    body: "Camadas, fronteiras e contratos. Onde cada responsabilidade mora.",
  },
  {
    name: "Frontend",
    title: "Frontend Build",
    badge: "ui",
    body: "Componentes, estados e a interface ganhando comportamento.",
  },
  {
    name: "API",
    title: "API & Data",
    badge: "server",
    body: "Rotas, modelos e persistência. O contrato entre o cliente e o servidor.",
  },
  {
    name: "Deploy",
    title: "Deploy & Pipeline",
    badge: "ship",
    body: "Build, testes e entrega contínua até a produção.",
  },
];

export function ScrollStagesPreview() {
  return (
    <div className="bg-[#181a1d]">
      <ScrollStages
        stages={STAGES.map((stage, index) => ({
          name: stage.name,
          title: stage.title,
          badge: stage.badge,
          content: (
            <div className="grid w-full place-items-center px-10 text-center">
              <span className="font-mono text-[64px] font-semibold leading-none text-[#E2B714]/15">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[#D1D0C5]/70">
                {stage.body}
              </p>
              <span className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[#646669]">
                conteúdo livre — passe qualquer JSX em content
              </span>
            </div>
          ),
        }))}
      />
    </div>
  );
}

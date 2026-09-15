import { ArrowUpRight, MousePointer2 } from "lucide-react";

export interface PreviewFrameProps {
  /** Rota isolada que renderiza o componente sozinho, ex: /preview/case-study-flip-stack */
  route: string;
  title: string;
  /** Altura do quadro. Componentes de scroll pedem mais espaço. */
  height?: string;
}

/**
 * Quadro para componentes que tomam a página inteira (scroll-driven, sticky, 100vh).
 * O iframe dá a eles um contexto de rolagem próprio, sem sequestrar o scroll da vitrine.
 */
export function PreviewFrame({ route, title, height }: PreviewFrameProps) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MousePointer2 className="h-3.5 w-3.5" />
          Role dentro do quadro para ver a animação
        </span>
        <a
          href={route}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Abrir em tela cheia
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div
        className="w-full overflow-hidden rounded-xl border border-border bg-background"
        style={{ height: height ?? "min(78vh, 720px)" }}
      >
        <iframe
          src={route}
          title={title}
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}

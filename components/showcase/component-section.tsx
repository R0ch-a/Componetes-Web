import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ComponentSectionProps {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  /** Caminho do arquivo dentro do repositório, exibido como referência de import. */
  source?: string;
  /** Altura do palco de demonstração. */
  stageClassName?: string;
  /** Crédito da fonte, exibido sob o cabeçalho. */
  credit?: { label: string; href?: string };
  children: ReactNode;
}

/**
 * Casca padrão de cada seção da vitrine: cabeçalho + palco onde a demo roda.
 * Todo componente novo entra na página através dela, para manter o mesmo ritmo visual.
 */
export function ComponentSection({
  id,
  name,
  description,
  tags,
  source,
  stageClassName,
  credit,
  children,
}: ComponentSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="mb-8 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">{name}</h2>
            {tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {source && (
              <code className="w-fit rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                {source}
              </code>
            )}

            {credit &&
              (credit.href ? (
                <a
                  href={credit.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  {credit.label}
                </a>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {credit.label}
                </span>
              ))}
          </div>
        </header>

        <div
          className={cn(
            "demo-grid flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-8",
            stageClassName ?? "min-h-[520px]"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

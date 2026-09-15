import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections, countComponents } from "@/content/registry";

export default function Home() {
  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Coleção pessoal · {countComponents()} componentes
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Componentes visuais prontos para reuso
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Cada coleção é uma página com várias seções, e cada seção mostra um
          componente rodando de verdade. Copie o arquivo indicado direto para o
          seu projeto — a base é sempre Tailwind e o helper{" "}
          <code className="font-mono text-sm">cn()</code>.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/${collection.slug}`}
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/25"
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {collection.name}
                  </h2>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {collection.entries.length}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {collection.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                {collection.entries.map((entry, index) => (
                  <span key={entry.id} className="whitespace-nowrap">
                    {entry.name}
                    {index < collection.entries.length - 1 && (
                      <span className="ml-2 opacity-40">·</span>
                    )}
                  </span>
                ))}
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

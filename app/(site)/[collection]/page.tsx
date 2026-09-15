import { notFound } from "next/navigation";
import { ComponentSection } from "@/components/showcase/component-section";
import { PreviewFrame } from "@/components/showcase/preview-frame";
import { collections, getCollection } from "@/content/registry";
import { demos } from "@/content/demos";

export function generateStaticParams() {
  return collections.map((collection) => ({ collection: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: `${collection.name} — Components Library`,
    description: collection.tagline,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {collection.entries.length} componente
          {collection.entries.length === 1 ? "" : "s"}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {collection.tagline}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {collection.description}
        </p>

        {collection.entries.length > 1 && (
          <nav className="mt-8 flex flex-wrap gap-2">
            {collection.entries.map((entry) => (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                {entry.name}
              </a>
            ))}
          </nav>
        )}
      </section>

      {collection.entries.length === 0 && (
        <section className="mx-auto w-full max-w-6xl px-6">
          <div className="demo-grid flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8">
            <p className="max-w-sm text-center text-sm text-muted-foreground">
              Coleção ainda vazia. Cole o componente em{" "}
              <code className="font-mono text-xs">components/ui/</code> e
              registre a entrada em{" "}
              <code className="font-mono text-xs">
                content/collections/{collection.slug}.meta.ts
              </code>
              .
            </p>
          </div>
        </section>
      )}

      {collection.entries.map((entry) => {
        const Demo = demos[entry.id];
        return (
          <ComponentSection
            key={entry.id}
            id={entry.id}
            name={entry.name}
            description={entry.description}
            tags={entry.tags}
            source={entry.source}
            stageClassName={entry.stageClassName}
            credit={entry.credit}
          >
            {entry.preview ? (
              <PreviewFrame
                route={entry.preview.route}
                height={entry.preview.height}
                title={entry.name}
              />
            ) : Demo ? (
              <Demo />
            ) : null}
          </ComponentSection>
        );
      })}
    </main>
  );
}

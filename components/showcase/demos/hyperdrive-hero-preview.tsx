import HyperdriveHero from "@/components/ui/hyperdrive-hero";

/**
 * Demo do snippet, sem alteração. Roda em rota isolada: o componente é
 * `h-screen`, mede `window.innerWidth/innerHeight` para dimensionar o canvas e
 * escuta `resize` e `mousemove` no `window` — dentro do iframe essas medidas
 * são as do próprio quadro.
 */
export function HyperdriveHeroPreview() {
  return (
    <main className="App bg-black">
      <HyperdriveHero />
    </main>
  );
}

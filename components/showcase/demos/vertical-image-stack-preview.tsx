import { VerticalImageStack } from "@/components/ui/vertical-image-stack"

/**
 * Demo do snippet, sem alteração. Roda em rota isolada por dois motivos: o
 * componente é `h-screen` e escuta `wheel` no `window` — solto na vitrine,
 * cada rolagem da página trocaria o card. Dentro do iframe o listener só
 * ouve o próprio quadro.
 */
export function VerticalImageStackPreview() {
  return (
    <main className="min-h-screen w-full select-none">
      <VerticalImageStack />
    </main>
  )
}

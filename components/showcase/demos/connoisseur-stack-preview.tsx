"use client";

import { Component } from "@/components/ui/connoisseur-stack-interactor";

/**
 * Roda em rota isolada: o componente é `min-h-screen`. A fronteira de cliente
 * fica aqui porque o arquivo do autor usa hooks mas não traz `"use client"` —
 * o mesmo arranjo do Animated Theme Toggle.
 */
export function ConnoisseurStackPreview() {
  return <Component />;
}

"use client";

import { useEffect, useState } from "react";

import { CookiePanel } from "@/components/ui/cookie-banner-1";

/**
 * Roda em rota isolada: o painel é `fixed` com `z-50`, então solto na vitrine
 * flutuaria sobre a página inteira em vez de ficar na seção dele.
 *
 * O componente só aparece quando não há consentimento salvo. Numa vitrine isso
 * significaria seção vazia para sempre depois do primeiro "Accept all", então a
 * demo limpa as duas chaves que ele mesmo grava (`cookie-consent` e
 * `cookie-preferences`) antes de montar, e oferece um botão para repetir.
 */
export function CookieBannerPreview() {
  const [instancia, setInstancia] = useState(0);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    localStorage.removeItem("cookie-consent");
    localStorage.removeItem("cookie-preferences");
    setPronto(true);
  }, [instancia]);

  return (
    <main className="min-h-screen grid place-items-center bg-background text-foreground p-8">
      <div className="m-auto max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-2">Cookie Panel — Toast with Preferences</h1>

        <p className="text-muted-foreground mb-8">
          This demo shows the compact, bottom-right floating cookie banner.
          Click <strong>Customize</strong> to expand and adjust your cookie preferences inline — no modal needed.
        </p>

        <button
          type="button"
          onClick={() => {
            setPronto(false);
            setInstancia((n) => n + 1);
          }}
          className="rounded-md border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/80"
        >
          Mostrar o painel de novo
        </button>
      </div>

      {pronto && <CookiePanel key={instancia} />}
    </main>
  );
}

"use client";

import { SupplyChainGlobe } from "@/components/ui/supply-chain-globe";

/** Os mesmos dados do mapglobe.js: cadeia global do café. */
const FLOWS = [
  // Produtores > entrepostos
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "BR", targetId: "US", value: 450 },
  { sourceId: "BR", targetId: "IT", value: 200 },
  { sourceId: "VN", targetId: "DE", value: 200 },
  { sourceId: "VN", targetId: "BE", value: 150 },
  { sourceId: "CO", targetId: "US", value: 250 },
  { sourceId: "CO", targetId: "DE", value: 80 },
  { sourceId: "ET", targetId: "DE", value: 60 },
  { sourceId: "ET", targetId: "BE", value: 40 },
  { sourceId: "ID", targetId: "US", value: 80 },
  { sourceId: "HN", targetId: "DE", value: 60 },
  { sourceId: "HN", targetId: "BE", value: 40 },
  // Entrepostos > mercados
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 },
  { sourceId: "DE", targetId: "SE", value: 80 },
  { sourceId: "DE", targetId: "RU", value: 120 },
  { sourceId: "BE", targetId: "GB", value: 100 },
  { sourceId: "BE", targetId: "NL", value: 80 },
  { sourceId: "IT", targetId: "GR", value: 50 },
  { sourceId: "IT", targetId: "AT", value: 40 },
  { sourceId: "US", targetId: "CA", value: 120 },
  { sourceId: "US", targetId: "JP", value: 80 },
];

const COUNTRY_NAMES: Record<string, string> = {
  BR: "Brazil", VN: "Vietnam", CO: "Colombia", ET: "Ethiopia",
  ID: "Indonesia", HN: "Honduras", DE: "Germany", BE: "Belgium",
  IT: "Italy", US: "United States", FR: "France", PL: "Poland",
  SE: "Sweden", RU: "Russia", GB: "United Kingdom", NL: "Netherlands",
  GR: "Greece", AT: "Austria", CA: "Canada", JP: "Japan",
};

const PRODUCERS = ["BR", "VN", "CO", "ET", "ID", "HN"];
const HUBS = ["DE", "BE", "IT", "US"];
const CONSUMERS = ["FR", "PL", "SE", "RU", "GB", "NL", "GR", "AT", "CA", "JP"];

export function SupplyChainGlobePreview() {
  return (
    <div className="h-screen w-full">
      <SupplyChainGlobe
        flows={FLOWS}
        countryNames={COUNTRY_NAMES}
        producerIds={PRODUCERS}
        hubIds={HUBS}
        consumerIds={CONSUMERS}
        title="Global Coffee Supply Chain"
        subtitle="(Thousands of tonnes)"
      />
    </div>
  );
}

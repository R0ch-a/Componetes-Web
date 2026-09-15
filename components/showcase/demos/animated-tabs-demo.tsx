"use client";

import { useState } from "react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

const TABS = [
  { id: "world", label: "World" },
  { id: "ny", label: "N.Y." },
  { id: "business", label: "Business" },
  { id: "arts", label: "Arts" },
  { id: "science", label: "Science" },
];

/** A legenda existe para mostrar o `onChange` em ação — o componente não exige nada disso. */
const AnimatedTabsDemo = () => {
  const [ativa, setAtiva] = useState(TABS[0].id);

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatedTabs tabs={TABS} onChange={setAtiva} />
      <p className="text-xs text-muted-foreground">
        onChange: <code className="font-mono text-foreground">{ativa}</code>
      </p>
    </div>
  );
};

export { AnimatedTabsDemo };

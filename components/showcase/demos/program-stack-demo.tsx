import { Gauge, Globe, Shield, Target, Terminal } from "lucide-react";
import { ProgramStack } from "@/components/ui/program-stack";

/** Os mesmos cinco programas da hero de programs.html. */
const PROGRAMS = [
  {
    name: "Codex",
    tag: "v.0.8.2",
    description:
      "Systematic decoding of complex datasets using neural-linked architectures. Minimalistic yet powerful.",
    icon: <Terminal className="h-5 w-5" />,
    href: "https://codex.io",
  },
  {
    name: "Warp",
    tag: "v.1.4.0",
    description:
      "High-velocity data transmission protocols for distributed nodes. Near-zero latency execution.",
    icon: <Gauge className="h-5 w-5" />,
    href: "https://warp.dev",
  },
  {
    name: "Obsidian",
    tag: "v.2.1.0",
    description:
      "Encrypted knowledge vaults with local-first storage. Your notes, your machine, your rules.",
    icon: <Shield className="h-5 w-5" />,
    href: "https://obsidian.md",
  },
  {
    name: "Zen Browser",
    tag: "Browser",
    description:
      "A minimalist, privacy-focused browser built on Firefox. Clean interface, vertical tabs and zero distractions.",
    icon: <Globe className="h-5 w-5" />,
    href: "https://zen-browser.app/",
  },
  {
    name: "Linear",
    tag: "Project Management",
    description:
      "The system for modern product development. Fast, keyboard-driven issue tracker built for engineering teams that value speed and clarity over feature bloat.",
    icon: <Target className="h-5 w-5" />,
    href: "https://linear.app/",
  },
];

const ProgramStackDemo = () => {
  return (
    <div className="w-full rounded-xl bg-[#2C2E31] p-8">
      <div className="mx-auto max-w-3xl">
        <ProgramStack programs={PROGRAMS} />
      </div>
    </div>
  );
};

export { ProgramStackDemo };

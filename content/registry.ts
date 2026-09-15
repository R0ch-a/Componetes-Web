import { cardsMeta } from "@/content/collections/cards.meta";
import { keyboardsMeta } from "@/content/collections/keyboards.meta";
import { slidersMeta } from "@/content/collections/sliders.meta";
import { textsMeta } from "@/content/collections/texts.meta";
import { asciiMeta } from "@/content/collections/ascii.meta";
import { backgroundsMeta } from "@/content/collections/backgrounds.meta";
import { buttonsMeta } from "@/content/collections/buttons.meta";
import { cursorMeta } from "@/content/collections/cursor.meta";
import type { CollectionMeta } from "@/content/types";

export type { CollectionMeta, EntryMeta } from "@/content/types";

/**
 * Índice único da biblioteca — só metadados, sem imports de componente.
 * Cada coleção vira uma página em /<slug>. As demos ficam em content/demos.tsx,
 * ligadas pelo id da entrada.
 */
export const collections: CollectionMeta[] = [
  cardsMeta,
  keyboardsMeta,
  slidersMeta,
  textsMeta,
  asciiMeta,
  backgroundsMeta,
  buttonsMeta,
  cursorMeta,
];

export function getCollection(slug: string): CollectionMeta | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function countComponents(): number {
  return collections.reduce((total, c) => total + c.entries.length, 0);
}

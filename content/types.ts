export interface EntryMeta {
  /** Slug usado como âncora da seção (#id) e chave do mapa de demos. */
  id: string;
  name: string;
  description: string;
  tags: string[];
  /** Onde o componente vive no repositório. */
  source: string;
  /**
   * Modo "quadro": componentes que tomam a página inteira (scroll-driven,
   * sticky, 100vh) rodam numa rota isolada exibida dentro de um iframe,
   * para não sequestrar a rolagem da vitrine. Sem isso, a entrada usa o
   * modo "palco" e busca a demo em content/demos.tsx pelo id.
   */
  preview?: { route: string; height?: string };
  /** Sobrescreve a altura/padding do palco quando a demo pede outra medida. */
  stageClassName?: string;
  /** Crédito da fonte — obrigatório quando a licença do componente exige atribuição. */
  credit?: { label: string; href?: string };
}

export interface CollectionMeta {
  /** Slug da rota: /<slug> */
  slug: string;
  name: string;
  /** Frase curta usada no hub e como título da coleção. */
  tagline: string;
  description: string;
  entries: EntryMeta[];
}

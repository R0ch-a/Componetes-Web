import { SiteHeader } from "@/components/layout/site-header";

/** Layout da vitrine: header fixo + conteúdo. As rotas /preview ficam de fora dele. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}

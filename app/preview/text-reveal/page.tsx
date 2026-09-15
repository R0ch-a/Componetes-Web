import { TextReveal } from "@/components/ui/text-reveal";

export const metadata = {
  title: "Text Reveal — preview",
};

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-background">
      <TextReveal>
        Cada palavra acende conforme a página rola — o texto se revela no ritmo
        da leitura.
      </TextReveal>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

export const metadata: Metadata = {
  title: "Components Library",
  description:
    "Biblioteca pessoal de componentes visuais em React, Tailwind e Framer Motion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        {/*
          next-themes cuida do tema: alterna a classe .dark no <html> e injeta o
          script que evita o flash de tela clara. Componentes que leem useTheme()
          — como o Weight Widget — dependem deste provider para saber o tema.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="components-library-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

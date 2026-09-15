"use client";

import FloatingActionMenu from "@/components/ui/floating-action-menu";
import { Settings, User, LogOut } from "lucide-react";

/* "use client" aqui, e não só no componente: a demo passa funções em `options`,
   e a página da coleção é um Server Component.

   `className="relative"` desfaz o `fixed bottom-8 right-8` do componente — no
   palco da vitrine ele tem de ficar dentro da caixa, e não grudado no canto da
   janela. É o mesmo ajuste da demo original. */
export const FloatingActionMenuDemo = () => {
  return (
    <FloatingActionMenu
      className="relative"
      options={[
        {
          label: "Account",
          Icon: <User className="w-4 h-4" />,
          onClick: () => console.log("Account clicked"),
        },
        {
          label: "Settings",
          Icon: <Settings className="w-4 h-4" />,
          onClick: () => console.log("Settings clicked"),
        },
        {
          label: "Logout",
          Icon: <LogOut className="w-4 h-4" />,
          onClick: () => console.log("Logout clicked"),
        },
      ]}
    />
  );
};

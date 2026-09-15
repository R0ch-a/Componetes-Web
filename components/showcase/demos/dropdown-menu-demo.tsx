"use client";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Pencil, Trash, Copy } from "lucide-react";

/* "use client" aqui, e não só no componente: a demo passa funções em `options`,
   e a página da coleção é um Server Component — funções não atravessam essa
   fronteira. */
const DropdownMenuDemo = () => {
  return (
    <div className="flex w-full items-start justify-center py-10">
      <DropdownMenu
        options={[
          {
            label: "Edit",
            onClick: () => console.log("Edit"),
            Icon: <Pencil className="h-4 w-4" />,
          },
          {
            label: "Duplicate",
            onClick: () => console.log("Duplicate"),
            Icon: <Copy className="h-4 w-4" />,
          },
          {
            label: "Delete",
            onClick: () => console.log("Delete"),
            Icon: <Trash className="h-4 w-4" />,
          },
        ]}
      >
        Options
      </DropdownMenu>
    </div>
  );
};

export { DropdownMenuDemo };

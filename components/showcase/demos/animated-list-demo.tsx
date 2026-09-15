"use client";

import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/utils";

/**
 * A doc do Magic UI referencia um `animated-list-demo` que não vem junto — este
 * é o uso canônico: uma pilha de notificações entrando uma a uma.
 */
interface Notification {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    name: "Pagamento recebido",
    description: "Magic UI",
    time: "agora",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "Novo usuário",
    description: "Magic UI",
    time: "10s",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Nova mensagem",
    description: "Magic UI",
    time: "5m",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "Deploy concluído",
    description: "Vercel",
    time: "12m",
    icon: "🚀",
    color: "#1E86FF",
  },
  {
    name: "Build quebrou",
    description: "GitHub Actions",
    time: "20m",
    icon: "🔧",
    color: "#8B5CF6",
  },
  {
    name: "Backup finalizado",
    description: "Storage",
    time: "1h",
    icon: "🗄️",
    color: "#0EA5E9",
  },
];

function NotificationCard({ name, description, icon, color, time }: Notification) {
  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "bg-white shadow-[0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-neutral-900">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-neutral-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-neutral-500">{description}</p>
        </div>
      </div>
    </figure>
  );
}

const AnimatedListDemo = () => {
  return (
    <div className="flex w-full justify-center rounded-xl bg-neutral-50 p-6">
      <div className="relative flex h-[420px] w-full max-w-[420px] flex-col overflow-hidden p-2">
        <AnimatedList>
          {NOTIFICATIONS.map((item) => (
            <NotificationCard key={item.name} {...item} />
          ))}
        </AnimatedList>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-neutral-50" />
      </div>
    </div>
  );
};

export { AnimatedListDemo };

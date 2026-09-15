import { MacKeyboard } from "@/components/ui/mac-keyboard";

const MacKeyboardDemo = () => {
  return (
    // O teclado tem largura mínima de 800px: em telas estreitas, rola na horizontal.
    <div className="w-full overflow-x-auto pb-2">
      <MacKeyboard />
    </div>
  );
};

export { MacKeyboardDemo };

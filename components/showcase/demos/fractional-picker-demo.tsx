"use client";

import { useState } from "react";
import { FractionalPicker } from "@/components/ui/fractional-picker";

export function FractionalPickerDemo() {
  const [value, setValue] = useState(24);

  return (
    <FractionalPicker
      value={value}
      onChange={setValue}
      min={0}
      max={30}
      defaultValue={10}
    />
  );
}

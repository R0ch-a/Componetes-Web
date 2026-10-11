"use client";

import MotionButton from "@/components/ui/motion-button";

/** A demo publicada é `min-h-screen`; no palco só o invólucro muda. */
const MotionButtonDemo = () => {
  return (
    <div className="flex w-full items-center justify-center bg-background py-20">
      <MotionButton label="Get Started" />
    </div>
  );
};

export { MotionButtonDemo };

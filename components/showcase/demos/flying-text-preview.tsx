"use client";

import { FlyingText } from "@/components/ui/flying-text";

/** As mesmas seções do Untitled-1.html original, com os mesmos parâmetros. */
export function FlyingTextPreview() {
  return (
    <div className="min-h-screen bg-[#f0efe9] font-sans text-[#1a1917]">
      <section className="flex min-h-screen items-center justify-center border-b border-[#d8d5cc]">
        <div className="text-center">
          <p className="mb-7 text-[0.68rem] text-[#706e69]">Flying text</p>
          <FlyingText
            startY={0.55}
            className="text-[clamp(1.4rem,3vw,1.875rem)] font-medium text-[#706e69]"
          >
            Scroll to scatter
          </FlyingText>
        </div>
      </section>

      <section className="mx-auto flex min-h-screen max-w-[900px] flex-col justify-center border-b border-[#d8d5cc] px-8 py-24">
        <p className="mb-7 text-[0.68rem] text-[#706e69]">Scatter random</p>
        <FlyingText
          as="h1"
          windAngle={18}
          windStrength={550}
          scatter={100}
          maxRotation={480}
          stagger={0.7}
          depth={160}
          animationDuration={0.6}
          startY={0.5}
          className="text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.95]"
        >
          Type flies away, blown by a breeze
        </FlyingText>
      </section>

      <section className="mx-auto flex min-h-screen max-w-[720px] flex-col justify-center border-b border-[#d8d5cc] px-8 py-24">
        <p className="mb-7 text-[0.68rem] text-[#706e69]">Scatter</p>
        <FlyingText
          windAngle={120}
          windStrength={50}
          scatter={50}
          maxRotation={570}
          stagger={1.5}
          order="outward"
          randomness={0.2}
          gustiness={200}
          gustFrequency={0.4}
          gustPhaseSpread={0.4}
          depth={290}
          startY={0.5}
          animationDuration={0.7}
          className="text-[clamp(1.2rem,2.25vw,1.625rem)] leading-[1.55]"
        >
          The letters scatter and drift apart, each finding its own path through
          the open air, like leaves caught in the wind, spiraling and fading
          away.
        </FlyingText>
      </section>

      <section className="mx-auto flex min-h-screen max-w-[900px] flex-col justify-center border-b border-[#d8d5cc] px-8 py-24">
        <p className="mb-7 text-[0.68rem] text-[#706e69]">
          Reveal left-to-right
        </p>
        <FlyingText
          as="h2"
          reverse
          order="ltr"
          windAngle={150}
          windStrength={500}
          scatter={90}
          maxRotation={450}
          gustiness={120}
          stagger={0.9}
          depth={140}
          startY={0.9}
          animationDuration={0.7}
          easing="elastic.out(1,0.7)"
          className="text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.95]"
        >
          Reveal with reverse
        </FlyingText>
      </section>

      <section className="mx-auto flex min-h-screen max-w-[900px] flex-col justify-center px-8 py-24">
        <p className="mb-7 text-[0.68rem] text-[#706e69]">
          Scatter diagonal blast
        </p>
        <FlyingText
          as="h2"
          windAngle={42}
          windStrength={700}
          scatter={350}
          maxRotation={720}
          stagger={0.3}
          depth={220}
          className="text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.95]"
        >
          The endless possibilities of flying text
        </FlyingText>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const FOAM_TIMELINE_SECONDS = 5.35;

const bubbles = Array.from({ length: 64 }, (_, index) => {
  const band = Math.floor(index / 16);
  const lane = index % 16;
  const size = 48 + ((index * 67) % 190);

  const drift = -82 + ((index * 53) % 164);

  return {
    left: ((lane * 6.9 + band * 2.8) % 108) - 4,
    size,
    delay: ((index * 17) % 13) * 0.055 + band * 0.035,
    duration: 3.55 + ((index * 29) % 12) * 0.085,
    drift,
    driftMid: drift * 0.55,
    hue: -14 + ((index * 23) % 29),
  };
});

export default function ScrollFoam() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const foamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const foam = foamRef.current;

    if (!trigger || !foam) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) return;

    let frame = 0;
    let start = 0;
    let end = 1;

    const render = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));

      foam.style.setProperty("--foam-playhead", `${progress * FOAM_TIMELINE_SECONDS}s`);
      foam.classList.toggle("is-visible", progress > 0 && progress < 1);
    };

    const scheduleRender = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    const measure = () => {
      const triggerTop = trigger.getBoundingClientRect().top + window.scrollY;

      start = Math.max(0, triggerTop - window.innerHeight * 0.18);
      end = triggerTop + trigger.offsetHeight - window.innerHeight * 1.05;
      scheduleRender();
    };

    measure();
    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="scroll-foam-trigger" ref={triggerRef} aria-hidden="true" />
      <div className="scroll-foam" ref={foamRef} aria-hidden="true">
        <div className="scroll-foam__curtain" />
        <div className="scroll-foam__bubbles">
          {bubbles.map((bubble, index) => (
            <span
              className="scroll-foam__bubble"
              key={index}
              style={{
                "--bubble-left": `${bubble.left}%`,
                "--bubble-size": `${bubble.size}px`,
                "--bubble-bottom": `${-bubble.size}px`,
                "--bubble-delay": `${bubble.delay}s`,
                "--bubble-duration": `${bubble.duration}s`,
                "--bubble-drift": `${bubble.drift}px`,
                "--bubble-drift-mid": `${bubble.driftMid}px`,
                "--bubble-hue": `${bubble.hue}deg`,
              } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </>
  );
}

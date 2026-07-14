"use client";

import { useEffect, useRef, type CSSProperties } from "react";

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

    let hideTimer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        foam.classList.add("is-visible");
        observer.unobserve(trigger);
        hideTimer = window.setTimeout(() => foam.classList.remove("is-visible"), 5900);
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      if (hideTimer) window.clearTimeout(hideTimer);
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
              } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const FOAM_TIMELINE_MS = 5350;

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

    const curtain = foam.querySelector<HTMLElement>(".scroll-foam__curtain");
    const copy = foam.querySelector<HTMLElement>(".scroll-foam__copy");
    const bubbleElements = Array.from(foam.querySelectorAll<HTMLElement>(".scroll-foam__bubble"));

    if (!curtain || !copy || bubbleElements.length !== bubbles.length) return;

    const activeBubbleElements = bubbleElements.slice(0, window.innerWidth <= 760 ? 36 : bubbles.length);

    const animations = [
      curtain.animate(
        [
          { opacity: 0, transform: "translate3d(0, 0, 0)", offset: 0 },
          { opacity: 0.98, offset: 0.12 },
          { opacity: 0.99, transform: "translate3d(0, -112vh, 0)", offset: 0.58 },
          { opacity: 0, transform: "translate3d(0, -238vh, 0)", offset: 1 },
        ],
        { duration: 4750, delay: 280, easing: "linear", fill: "both" },
      ),
      copy.animate(
        [
          { opacity: 0, transform: "translate3d(-50%, calc(-50% + 34px), 0)", offset: 0 },
          { opacity: 1, transform: "translate3d(-50%, -50%, 0)", offset: 0.24 },
          { opacity: 1, transform: "translate3d(-50%, calc(-50% - 8px), 0)", offset: 0.58 },
          { opacity: 0, transform: "translate3d(-50%, calc(-50% - 54px), 0)", offset: 0.82 },
          { opacity: 0, transform: "translate3d(-50%, calc(-50% - 70px), 0)", offset: 1 },
        ],
        { duration: FOAM_TIMELINE_MS, easing: "linear", fill: "both" },
      ),
      ...activeBubbleElements.map((element, index) => {
        const bubble = bubbles[index];

        return element.animate(
          [
            { opacity: 0, transform: "translate3d(0, 0, 0) scale(0.22)", offset: 0 },
            { opacity: 0.96, offset: 0.08 },
            {
              opacity: 0.98,
              transform: `translate3d(${bubble.driftMid}px, -78vh, 0) scale(1)`,
              offset: 0.58,
            },
            { opacity: 0.9, offset: 0.82 },
            {
              opacity: 0,
              transform: `translate3d(${bubble.drift}px, -152vh, 0) scale(1.1)`,
              offset: 1,
            },
          ],
          {
            duration: bubble.duration * 1000,
            delay: bubble.delay * 1000,
            easing: "linear",
            fill: "both",
          },
        );
      }),
    ];

    animations.forEach((animation) => animation.pause());

    let frame = 0;
    let start = 0;
    let end = 1;

    const render = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      const playhead = progress * FOAM_TIMELINE_MS;

      animations.forEach((animation) => {
        animation.currentTime = playhead;
      });
      foam.classList.toggle("is-visible", progress > 0 && progress < 1);
    };

    const scheduleRender = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    const measure = () => {
      const triggerTop = trigger.getBoundingClientRect().top + window.scrollY;
      const message = document.querySelector<HTMLElement>(".message");

      start = Math.max(0, triggerTop - window.innerHeight * 0.06);

      if (message) {
        const messageTop = message.getBoundingClientRect().top + window.scrollY;
        const messagePaddingTop = Number.parseFloat(window.getComputedStyle(message).paddingTop) || 0;

        end = messageTop + messagePaddingTop - window.innerHeight * 0.98;
      } else {
        end = triggerTop + trigger.offsetHeight - window.innerHeight;
      }

      end = Math.max(start + window.innerHeight * 0.72, end);
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
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <>
      <div className="scroll-foam-trigger" ref={triggerRef} aria-hidden="true" />
      <div className="scroll-foam" ref={foamRef} aria-hidden="true">
        <div className="scroll-foam__curtain" />
        <div className="scroll-foam__copy">
          <span>SCROLL CLEANING</span>
          <strong>泡が流れて、<br />景色が変わる。</strong>
        </div>
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

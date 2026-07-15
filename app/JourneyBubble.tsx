"use client";

import { useEffect, useRef } from "react";

export default function JourneyBubble() {
  const bubbleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bubble = bubbleRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!bubble || !finePointer.matches || reducedMotion.matches) return;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;
    let running = false;

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      bubble.style.transform = `translate3d(${(currentX - 20).toFixed(2)}px, ${(currentY - 20).toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        frame = window.requestAnimationFrame(animate);
      } else {
        running = false;
      }
    };

    const startAnimation = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      bubble.dataset.visible = "true";

      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest("a, button, summary, .wipe-comparison, .service-stage__visual");
      bubble.dataset.interactive = interactive ? "true" : "false";
      startAnimation();
    };

    const hide = () => {
      bubble.dataset.visible = "false";
      bubble.dataset.interactive = "false";
      bubble.dataset.pressed = "false";
    };

    const press = () => { bubble.dataset.pressed = "true"; };
    const release = () => { bubble.dataset.pressed = "false"; };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("mouseleave", hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <span className="journey-bubble" data-visible="false" data-interactive="false" ref={bubbleRef} aria-hidden="true"><i /></span>;
}

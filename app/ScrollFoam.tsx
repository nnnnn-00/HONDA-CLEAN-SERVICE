"use client";

import { useEffect, useRef } from "react";

const bubbles = Array.from({ length: 18 });

export default function ScrollFoam() {
  const foamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foam = foamRef.current;

    if (!foam) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      foam.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        foam.classList.add("is-visible");
        observer.unobserve(foam);
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(foam);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-foam" ref={foamRef} aria-hidden="true">
      <div className="scroll-foam__bank">
        {bubbles.map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";

const clamp = (value: number) => Math.min(96, Math.max(4, value));

export default function WipeComparison() {
  const position = useRef(52);

  const setPosition = (element: HTMLDivElement, nextPosition: number) => {
    position.current = clamp(nextPosition);
    element.style.setProperty("--wipe-position", `${position.current}%`);
  };

  return (
    <div
      className="wipe-comparison"
      tabIndex={0}
      aria-label="写真の上でカーソルを左右に動かすと、清掃前後の仕上がりを比較できます"
      onPointerMove={(event) => {
        if (event.pointerType === "touch" && event.buttons === 0) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setPosition(event.currentTarget, ((event.clientX - bounds.left) / bounds.width) * 100);
      }}
      onPointerLeave={(event) => setPosition(event.currentTarget, 52)}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 6 : -6;
        setPosition(event.currentTarget, position.current + direction);
      }}
    >
      <figure className="wipe-comparison__before">
        <img
          src="https://images.pexels.com/photos/3616735/pexels-photo-3616735.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="清掃前の掲載位置イメージ"
          loading="lazy"
        />
        <figcaption>BEFORE</figcaption>
      </figure>
      <figure className="wipe-comparison__after">
        <img
          src="https://images.pexels.com/photos/3616735/pexels-photo-3616735.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="清掃後の掲載位置イメージ"
          loading="lazy"
        />
        <figcaption>AFTER</figcaption>
      </figure>
      <span className="wipe-comparison__handle" aria-hidden="true" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

export default function JourneyBubble() {
  const bubbleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bubble = bubbleRef.current;
    const service = document.querySelector<HTMLElement>("#service");
    const serviceVisual = document.querySelector<HTMLElement>(".service-stage__visual");
    const area = document.querySelector<HTMLElement>("#area");
    const mapPin = document.querySelector<HTMLElement>(".map-base i");
    const flow = document.querySelector<HTMLElement>(".flow");
    const flowList = document.querySelector<HTMLElement>(".flow__list");
    const contact = document.querySelector<HTMLElement>("#contact");
    const contactWave = document.querySelector<HTMLElement>(".contact-wave");
    const disableMotion = window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)");

    if (!bubble || !service || !serviceVisual || !area || !mapPin || !flow || !flowList || !contact || !contactWave) return;

    let frame = 0;
    let currentZone = "hidden";

    const render = () => {
      frame = 0;

      if (disableMotion.matches) {
        bubble.style.opacity = "0";
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const serviceBounds = service.getBoundingClientRect();
      const visualBounds = serviceVisual.getBoundingClientRect();
      const areaBounds = area.getBoundingClientRect();
      const mapBounds = mapPin.getBoundingClientRect();
      const flowBounds = flow.getBoundingClientRect();
      const listBounds = flowList.getBoundingClientRect();
      const contactBounds = contact.getBoundingClientRect();
      const waveBounds = contactWave.getBoundingClientRect();

      let zone = "hidden";
      let x = viewportWidth - 76;
      let y = viewportHeight * 0.28;
      let scale = 1;
      let opacity = 0;

      if (serviceBounds.top < viewportHeight * 0.82 && contactBounds.bottom > viewportHeight * 0.1) {
        zone = "rest";
        opacity = 0.78;
        y = viewportHeight * 0.62;

        if (serviceBounds.bottom > viewportHeight * 0.22 && areaBounds.top > viewportHeight * 0.52) {
          zone = "service";
          x = clamp(visualBounds.right - 56, 24, viewportWidth - 68);
          y = clamp(visualBounds.top + 88, 92, viewportHeight - 92);
          scale = 1.08;
          opacity = 0.88;
        }

        if (areaBounds.top < viewportHeight * 0.62 && areaBounds.bottom > viewportHeight * 0.2) {
          zone = "map";
          x = mapBounds.left + mapBounds.width * 0.5 - 21;
          y = mapBounds.top + mapBounds.height * 0.5 - 21;
          scale = 0.52;
          opacity = 0.72;
        }

        if (flowBounds.top < viewportHeight * 0.62 && flowBounds.bottom > viewportHeight * 0.24) {
          zone = "flow";
          const progress = clamp((viewportHeight * 0.56 - flowBounds.top) / Math.max(flowBounds.height * 0.78, 1));
          x = listBounds.left - 21;
          y = clamp(listBounds.top + progress * listBounds.height - 21, 84, viewportHeight - 84);
          scale = 0.66;
          opacity = 0.74;
        }

        if (contactBounds.top < viewportHeight * 0.82) {
          zone = "contact";
          const arrival = clamp((viewportHeight * 0.82 - contactBounds.top) / (viewportHeight * 0.48));
          x = viewportWidth * 0.5 - 21;
          y = clamp(waveBounds.bottom - 28, 86, viewportHeight - 64);
          scale = 0.68 - arrival * 0.48;
          opacity = 0.76 * (1 - arrival);
        }
      }

      if (zone !== currentZone) {
        bubble.dataset.zone = zone;
        currentZone = zone;
      }

      bubble.style.opacity = opacity.toFixed(3);
      bubble.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    disableMotion.addEventListener("change", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      disableMotion.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <span className="journey-bubble" data-zone="hidden" ref={bubbleRef} aria-hidden="true" />;
}

"use client";

import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function JourneyMotion() {
  useEffect(() => {
    const map = document.querySelector<HTMLElement>(".local-map");
    const flow = document.querySelector<HTMLElement>(".flow");
    const flowList = flow?.querySelector<HTMLElement>(".flow__list") ?? null;
    const flowItems = flowList ? Array.from(flowList.querySelectorAll<HTMLElement>("li")) : [];
    const profile = document.querySelector<HTMLElement>(".profile");
    const profilePhoto = profile?.querySelector<HTMLElement>(".profile__photo") ?? null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      map?.style.setProperty("--map-ring-a-scale", "1.75");
      map?.style.setProperty("--map-ring-a-opacity", "0.28");
      map?.style.setProperty("--map-ring-b-opacity", "0");
      flowList?.style.setProperty("--flow-progress", "1");
      flowList?.style.setProperty("--flow-endpoint-opacity", "1");
      flowItems.forEach((item) => item.classList.add("is-complete"));
      profilePhoto?.style.setProperty("--profile-unify", "1");
      profilePhoto?.style.setProperty("--profile-shift", "24px");
      profilePhoto?.style.setProperty("--profile-shift-negative", "-24px");
      profilePhoto?.style.setProperty("--profile-seam-scale", "0.62");
      return;
    }

    let frame = 0;

    const setMapRing = (name: "a" | "b", progress: number) => {
      if (!map) return;
      const finalOpacity = name === "a" ? 0.06 : 0.16;
      const targetScale = name === "a" ? 3.35 : 3.8;
      const opacity = Math.sin(Math.PI * progress) * 0.78 + progress * finalOpacity;
      const scale = 0.14 + progress * (targetScale - 0.14);
      map.style.setProperty(`--map-ring-${name}-opacity`, opacity.toFixed(3));
      map.style.setProperty(`--map-ring-${name}-scale`, scale.toFixed(3));
    };

    const render = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;

      if (map) {
        const rect = map.getBoundingClientRect();
        const mapProgress = clamp((viewportHeight * 0.78 - rect.top) / (viewportHeight * 0.62));
        setMapRing("a", clamp(mapProgress / 0.74));
        setMapRing("b", clamp((mapProgress - 0.24) / 0.76));
      }

      if (flow && flowList) {
        const rect = flow.getBoundingClientRect();
        const flowProgress = clamp((viewportHeight * 0.72 - rect.top) / (rect.height + viewportHeight * 0.34));
        flowList.style.setProperty("--flow-progress", flowProgress.toFixed(3));
        flowList.style.setProperty("--flow-endpoint-opacity", clamp((flowProgress - 0.9) / 0.1).toFixed(3));

        const currentIndex = flowProgress < 0.035 ? -1 : flowProgress >= 0.985 ? flowItems.length : Math.min(flowItems.length - 1, Math.floor(flowProgress * flowItems.length));
        flowItems.forEach((item, index) => {
          item.classList.toggle("is-current", index === currentIndex);
          item.classList.toggle("is-complete", index < currentIndex || currentIndex === flowItems.length);
        });
      }

      if (profile && profilePhoto) {
        const rect = profile.getBoundingClientRect();
        const unifyProgress = clamp((viewportHeight * 0.74 - rect.top) / (viewportHeight * 0.56));
        profilePhoto.style.setProperty("--profile-unify", unifyProgress.toFixed(3));
        profilePhoto.style.setProperty("--profile-shift", `${(unifyProgress * 24).toFixed(2)}px`);
        profilePhoto.style.setProperty("--profile-shift-negative", `${(unifyProgress * -24).toFixed(2)}px`);
        profilePhoto.style.setProperty("--profile-seam-scale", (1 - unifyProgress * 0.38).toFixed(3));
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

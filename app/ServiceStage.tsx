"use client";

import { useEffect, useRef, useState } from "react";

export type ServiceStageItem = {
  number: string;
  title: string;
  lead: string;
  body: string;
  image: string;
  alt: string;
};

type ServiceStageProps = {
  services: ServiceStageItem[];
};

export default function ServiceStage({ services }: ServiceStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const steps = Array.from(root.querySelectorAll<HTMLElement>(".service-stage__step"));
    let frame = 0;

    const render = () => {
      frame = 0;
      const rootBounds = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rootBounds.bottom < 0 || rootBounds.top > viewportHeight) return;

      const focusLine = viewportHeight * 0.48;
      let nextIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      steps.forEach((step, index) => {
        const bounds = step.getBoundingClientRect();
        const center = bounds.top + bounds.height * 0.5;
        const distance = Math.abs(center - focusLine);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex((current) => current === nextIndex ? current : nextIndex);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="service-stage" ref={rootRef}>
      <div className="service-stage__visual-shell">
        <div className="service-stage__visual" aria-live="polite">
          {services.map((service, index) => (
            <figure
              className={`service-stage__photo${index === activeIndex ? " is-active" : ""}`}
              aria-hidden={index !== activeIndex}
              key={service.number}
            >
              <img src={service.image} alt={index === activeIndex ? service.alt : ""} loading={index === 0 ? "eager" : "lazy"} />
            </figure>
          ))}
          <span className="service-stage__wash" key={activeIndex} aria-hidden="true" />
          <div className="service-stage__visual-meta" aria-hidden="true">
            <div>
              <span>0{activeIndex + 1} / 03</span>
              <p>{services[activeIndex]?.title}</p>
            </div>
            <div className="service-stage__progress">
              {services.map((service, index) => (
                <i className={index <= activeIndex ? "is-passed" : ""} key={service.number} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="service-stage__steps">
        {services.map((service, index) => (
          <article
            className={`service-stage__step${index === activeIndex ? " is-active" : ""}`}
            id={index === 0 ? "move-cleaning" : index === 1 ? "regular-cleaning" : "aircon-cleaning"}
            key={service.number}
          >
            <figure className="service-stage__mobile-photo">
              <img src={service.image} alt={service.alt} loading="lazy" />
            </figure>
            <div className="service-stage__copy" data-number={service.number}>
              <p className="service-stage__number"><span>SERVICE</span><b>{service.number}</b><i /></p>
              <h3>{service.title}</h3>
              <p className="service-stage__lead">{service.lead}</p>
              <p className="service-stage__body">{service.body}</p>
              <a className="text-link" href="#contact">このサービスを相談する <span>→</span></a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

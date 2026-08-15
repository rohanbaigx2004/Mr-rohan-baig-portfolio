import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Fade/rise reveal for every [data-reveal] element inside a root node. */
export function createReveal(root: HTMLElement) {
  const { gsap, ScrollTrigger } = getGsap();
  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (!targets.length) return () => {};

  const triggers = targets.map((el) =>
    gsap.from(el, {
      y: 28,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    }),
  );

  return () => {
    triggers.forEach((t) => t.scrollTrigger?.kill());
    ScrollTrigger.refresh();
  };
}

export type HeadingAnim = "lines" | "words" | "chars" | "mask";

/**
 * Splits a heading element's text into animatable pieces and plays a
 * scroll-triggered entrance. Restores the original markup on cleanup.
 */
export function animateHeading(el: HTMLElement, mode: HeadingAnim = "words") {
  const { gsap } = getGsap();
  const original = el.innerHTML;
  const text = (el.textContent ?? "").trim();
  if (!text) return () => {};

  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1 });
    return () => {};
  }

  const wrap = (content: string) =>
    `<span class="split-line"><span class="split-inner" style="display:inline-block">${content}</span></span>`;

  if (mode === "lines" || mode === "mask") {
    el.innerHTML = text
      .split(/\n/)
      .map((line) => wrap(line))
      .join("");
  } else if (mode === "chars") {
    el.innerHTML = wrap(
      text
        .split("")
        .map((c) =>
          c === " "
            ? " "
            : `<span class="split-char" style="display:inline-block">${c}</span>`,
        )
        .join(""),
    );
  } else {
    el.innerHTML = text
      .split(/\s+/)
      .map(
        (w) =>
          `<span class="split-line" style="display:inline-block;margin-right:0.26em"><span class="split-inner" style="display:inline-block">${w}</span></span>`,
      )
      .join("");
  }

  const inner = el.querySelectorAll<HTMLElement>(
    mode === "chars" ? ".split-char" : ".split-inner",
  );

  const vars: gsap.TweenVars = {
    scrollTrigger: { trigger: el, start: "top 88%", once: true },
    ease: "power4.out",
  };

  let tween: gsap.core.Tween;
  if (mode === "mask") {
    tween = gsap.from(inner, {
      ...vars,
      yPercent: 110,
      duration: 1.25,
      stagger: 0.1,
    });
  } else if (mode === "chars") {
    tween = gsap.from(inner, {
      ...vars,
      yPercent: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.024,
    });
  } else if (mode === "lines") {
    tween = gsap.from(inner, {
      ...vars,
      yPercent: 105,
      duration: 1.15,
      stagger: 0.12,
    });
  } else {
    tween = gsap.from(inner, {
      ...vars,
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.07,
    });
  }

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    el.innerHTML = original;
  };
}

/** Subtle vertical parallax for decorative/image layers (desktop only). */
export function createParallax(root: HTMLElement, selector = "[data-parallax]") {
  const { gsap } = getGsap();
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
    const tweens = gsap.utils.toArray<HTMLElement>(selector, root).map((el) =>
      gsap.to(el, {
        yPercent: Number(el.dataset["parallax"] ?? -6),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }),
    );
    return () => tweens.forEach((t) => t.scrollTrigger?.kill());
  });

  return () => mm.revert();
}

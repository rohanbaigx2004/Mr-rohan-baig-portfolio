import { useEffect, useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { getGsap } from "@/lib/gsap-client";

import img1 from "@/assets/1.png";
import img2 from "@/assets/2.png";
import img3 from "@/assets/3.png";

const SHOTS = [
  {
    img: img1,
    alt: "Gallery Image 1",
    caption: "Creative Branding Kit",
    index: "01",
  },
  {
    img: img2,
    alt: "Gallery Image 2",
    caption: "Posts & brandings ",
    index: "02",
  },
  {
    img: img3,
    alt: "Gallery Image 3",
    caption: "Logo and proper branding",
    index: "03",
  },
];

export function Gallery() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Masked reveal on every frame (all breakpoints, reduced-motion aware).
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-frame] img").forEach((img) => {
          gsap.fromTo(
            img,
            { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.4,
              ease: "power4.inOut",
              scrollTrigger: { trigger: img, start: "top 88%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-caption]").forEach((cap) => {
          gsap.from(cap, {
            y: 18,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: cap, start: "top 92%", once: true },
          });
        });
      });

      // Depth parallax only where there is room for it — never on small screens.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((frame) => {
          const depth = Number(frame.dataset["depth"] ?? 0);
          gsap.to(frame, {
            yPercent: depth * 100,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    }, el);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("orientationchange", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="gallery" className="section-shell overflow-hidden">
      <SectionHeader label="Design in Motion" title=" Selected Visuals." num="03" anim="chars" />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-12 sm:gap-6 lg:gap-8">
        <figure
          data-frame
          data-depth="-0.035"
          className="group relative col-span-1 sm:col-span-7"
        >
          <div className="frame-20 aspect-[4/5] group-hover:border-border-strong sm:aspect-[3/4] lg:aspect-[4/5]">
            <img
              src={SHOTS[0]!.img}
              alt={SHOTS[0]!.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          </div>
          <figcaption
            data-caption
            className="mt-4 flex items-baseline justify-between border-t border-border pt-3"
          >
            <span className="label">{SHOTS[0]!.caption}</span>
            <span className="label text-foreground/45">{SHOTS[0]!.index}</span>
          </figcaption>
        </figure>

        <div className="col-span-1 flex flex-col gap-10 sm:col-span-5 sm:gap-6 lg:mt-[12vh] lg:gap-8">
          {[SHOTS[1]!, SHOTS[2]!].map((shot, i) => (
            <figure
              key={shot.index}
              data-frame
              data-depth={i === 0 ? "0.05" : "0.02"}
              className="group relative"
            >
              <div
                className={`frame-20 group-hover:border-border-strong ${
                  i === 0 ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[16/11] sm:aspect-[4/3]"
                }`}
              >
                <img
                  src={shot.img}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </div>
              <figcaption
                data-caption
                className="mt-4 flex items-baseline justify-between border-t border-border pt-3"
              >
                <span className="label">{shot.caption}</span>
                <span className="label text-foreground/45">{shot.index}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <p
        data-reveal
        className="mt-16 max-w-lg text-sm font-light leading-relaxed text-foreground/70 md:mt-20 md:text-base"
      >
      More projects - Coming Soon 
      </p>
    </section>
  );
}

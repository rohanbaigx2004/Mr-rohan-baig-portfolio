import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { ArrowGlyph, EASE } from "./motion-primitives";
import { getGsap } from "@/lib/gsap-client";

import leharImg from "@/assets/lehar resort.png";
import dailyEasyImg from "@/assets/daily easy.png";
import jkmImg from "@/assets/JKM global group.png";

const PROJECTS = [
  {
    id: "01",
    name: "Lehar Resort",
    meta: "React / Vite / TypeScript — 2026",
    copy: "A premium hospitality website crafted with React, Vite, and TypeScript. Designed for seamless booking, responsive storytelling, and strong brand presence.",
    img: leharImg,
    alt: "Lehar Resort Website",
    link: "https://leharresorts.com/",
  },
  {
    id: "02",
    name: "JKM Global Group",
    meta: "React / Vite / TypeScript — 2026",
    copy: "A corporate web platform built with React, Vite, and TypeScript to showcase services, case studies, and scalable business workflows.",
    img: jkmImg,
    alt: "JKM Global Group Website",
    link: "https://www.jkmglobalgroup.com/",
  },
  {
    id: "03",
    name: "Daily Easy News",
    meta: "WordPress / PHP / SEO — 2025",
    copy: "A dynamic WordPress news portal with custom theme, editorial layout, and mobile-first performance optimizations.",
    img: dailyEasyImg,
    alt: "Daily Easy News Website",
    link: "https://dailyeasynews.pk/",
  },
];

export function Projects() {
  const root = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = root.current;
    const wrap = track.current;
    if (!section || !wrap) return;
    const { gsap, ScrollTrigger } = getGsap();

    const mm = gsap.matchMedia();

    // Desktop / large tablet: pinned horizontal reel.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(wrap.scrollWidth - window.innerWidth, 0);
      const tween = gsap.to(wrap, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const reveals = gsap.utils.toArray<HTMLElement>("[data-project-frame]", wrap).map((frame) =>
        gsap.fromTo(
          frame.querySelector("img"),
          { scale: 1.16, yPercent: 3 },
          {
            scale: 1,
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              containerAnimation: tween,
              start: "left right",
              end: "center center",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        ),
      );

      return () => {
        reveals.forEach((t) => t.scrollTrigger?.kill());
        tween.scrollTrigger?.kill();
      };
    });

    // Below that: cards reveal in a vertical stack with a mobile-safe refresh cycle.
    mm.add("(max-width: 1023px)", () => {
      const tweens = gsap.utils.toArray<HTMLElement>("[data-project-card]").map((card) =>
        gsap.from(card, {
          y: 44,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
        }),
      );
      const frames = gsap.utils.toArray<HTMLElement>("[data-project-frame] img").map((img) =>
        gsap.fromTo(
          img,
          { clipPath: "inset(0% 0% 12% 0%)", scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: img, start: "top 88%", once: true },
          },
        ),
      );

      ScrollTrigger.refresh();
      return () => [...tweens, ...frames].forEach((t) => t.scrollTrigger?.kill());
    });

    const onOrientation = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onOrientation);
    window.addEventListener("orientationchange", onOrientation);

    return () => {
      window.removeEventListener("resize", onOrientation);
      window.removeEventListener("orientationchange", onOrientation);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="projects"
      className="relative overflow-x-clip overflow-y-visible border-t border-border water-veil"
    >
      <div className="gutter pt-20 md:pt-24 lg:pt-24">
        <SectionHeader label="Selected Works" title="Selected Projects." num="02" anim="mask" />
      </div>

      <div
        ref={track}
        className="flex flex-col gap-12 pb-16 will-change-transform sm:gap-16 sm:pb-20 lg:flex-row lg:gap-0 lg:pb-12"
      >
        {PROJECTS.map((p) => (
          <motion.article
            key={p.id}
            data-project-card
            initial="rest"
            animate="rest"
            whileHover="hover"
            className="group grid items-center gap-8 gutter lg:w-screen lg:shrink-0 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20"
          >
            <motion.div
              data-project-frame
              variants={{ rest: { y: 0 }, hover: { y: -6 } }}
              transition={{ duration: 0.7, ease: EASE }}
              className="frame-20 aspect-[16/11] w-full group-hover:border-border-strong lg:aspect-[16/10]"
            >
              <img
                src={p.img}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />

              {/* Detail reveal overlay */}
              <motion.div
                variants={{ rest: { opacity: 0, y: 14 }, hover: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, ease: EASE }}
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/70 to-transparent p-5 md:p-6"
              >
                <span className="label text-ink-foreground">{p.name}</span>
                <span className="label text-ink-foreground/70">{p.id}</span>
              </motion.div>
            </motion.div>

            <div className="min-w-0">
              <span className="label block text-foreground/55">{p.meta}</span>
              <h3 className="mt-4 text-[clamp(1.9rem,6vw,3rem)] leading-none text-primary">
                {p.name}
              </h3>
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-16 origin-left bg-primary/35 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[1.75]"
              />
              <p className="mt-6 max-w-md text-sm font-light leading-relaxed md:text-base">
                {p.copy}
              </p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep mt-4 inline-flex items-center gap-2 text-primary"
              >
                View Project
                <ArrowGlyph size={14} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

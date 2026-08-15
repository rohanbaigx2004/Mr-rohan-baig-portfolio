import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animateHeading, getGsap } from "@/lib/gsap-client";
import { EASE } from "./motion-primitives";

const SKILLS = [
  { name: "React", value: 95 },
  { name: "Node.js", value: 85 },
  { name: "MongoDB", value: 80 },
  { name: "Tailwind", value: 98 },
];

const DISCIPLINES = ["Available for Freelance & Full-Time Opportunities", "Full-Stack Development + Creative Design", "1.5+ Years Building Digital Experiences", "Web / UI / Branding / Graphic Design"];

export function CoreToolset() {
  const root = useRef<HTMLElement | null>(null);
  const heading = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();

    const cleanupHeading = heading.current ? animateHeading(heading.current, "lines") : undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Number(bar.dataset["bar"]) / 100,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 92%", once: true },
          },
        );
      });

      gsap.from("[data-tile]", {
        opacity: 0,
        y: 26,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-tiles]", start: "top 85%", once: true },
      });
    }, el);

    return () => {
      cleanupHeading?.();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="about" className="section-shell bg-card">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <span className="label flex items-center gap-3" data-reveal>
            <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
            Philosophy
          </span>
          <h2
            ref={heading}
            className="mt-5 text-[clamp(2.1rem,7vw,4rem)] leading-[0.95] tracking-tight text-primary"
          >
            {"Where Code Meets Creativity."}
          </h2>
         <p
  data-reveal
  className="mt-8 max-w-2xl text-base font-light leading-relaxed md:text-lg"
>
           I’m a Full-Stack MERN Developer and Graphic & Visual Designer focused on building digital experiences that are as functional as they are visually distinctive. I develop responsive websites, web applications, dashboards, and modern interfaces with React, TypeScript, Node.js, Express, and MongoDB, while also creating professional logos, vector artwork, brand identities, and social media designs.
I approach every project with both a developer’s mindset and a designer’s eye — focusing on clean code, responsive performance, intuitive UI/UX, strong visual identity, accessibility, and SEO-friendly structure. Whether I’m developing a complete MERN application, designing a business website, or creating a brand from the ground up, my goal is to turn ideas into polished digital experiences that help businesses grow online.
          </p>

          <div className="mt-12 space-y-10 md:mt-16">
            {SKILLS.map((s) => (
              <div key={s.name}>
                <div className="mb-3 flex items-baseline justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.18em]">{s.name}</span>
                  <span className="label shrink-0 text-foreground/50">{s.value}%</span>
                </div>
                <div className="h-px w-full overflow-hidden bg-border">
                  <div
                    data-bar={s.value}
                    className="h-full origin-left bg-primary"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          data-tiles
          className="grid grid-cols-1 overflow-hidden rounded-[1.25rem] border border-blue-500/80 bg-blue-500/5 shadow-[var(--shadow-soft)] sm:grid-cols-2"
        >
          {DISCIPLINES.map((d, i) => (
            <motion.div
              key={d}
              data-tile
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="group relative flex min-h-[170px] flex-col justify-between overflow-hidden border border-blue-500/80 bg-white p-4 text-blue-600 transition-all duration-500 ease-out hover:bg-blue-600 hover:text-white sm:min-h-[200px] sm:p-5 md:min-h-[220px] md:p-6 lg:min-h-[240px]"
            >
              <motion.span
                aria-hidden="true"
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_50%)] transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="label relative z-10 text-[10px] tracking-[0.2em] text-blue-600 transition-colors duration-500 group-hover:text-white sm:text-[11px]">
                0{i + 1}
              </span>
              <motion.h3
                variants={{ rest: { y: 0 }, hover: { y: -2 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative z-10 max-w-[17ch] text-base font-medium leading-[1.18] tracking-[-0.02em] text-blue-600 transition-colors duration-500 group-hover:text-white sm:text-lg md:text-[1.1rem] lg:text-[1.35rem]"
              >
                {d}
              </motion.h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { animateHeading, type HeadingAnim } from "@/lib/gsap-client";

type Props = {
  label: string;
  title: string;
  num: string;
  tone?: "default" | "inverse";
  anim?: HeadingAnim;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  num,
  tone = "default",
  anim = "words",
  className = "",
}: Props) {
  const inverse = tone === "inverse";
  const heading = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = heading.current;
    if (!el) return;
    return animateHeading(el, anim);
  }, [anim, title]);

  return (
    <header
      className={`mb-14 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 md:mb-20 lg:mb-24 ${className}`}
    >
      <div className="min-w-0">
        <span
          data-reveal
          className={`label flex items-center gap-3 ${inverse ? "text-ink-foreground/60" : ""}`}
        >
          <span
            aria-hidden="true"
            className={`h-px w-8 ${inverse ? "bg-ink-foreground/40" : "bg-primary/40"}`}
          />
          {label}
        </span>
        <h2
          ref={heading}
          className={`mt-5 text-[clamp(2rem,5.6vw,3.8rem)] leading-[1.05] tracking-tight ${
            inverse ? "text-ink-foreground" : "text-primary"
          }`}
        >
          {title}
        </h2>
      </div>
      <span
        data-reveal
        className={`label shrink-0 ${inverse ? "text-ink-foreground/55" : "text-foreground/50"}`}
      >
        {num}
      </span>
    </header>
  );
}

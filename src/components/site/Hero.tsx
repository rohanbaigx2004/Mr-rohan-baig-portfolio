import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";
import heroBg from "@/assets/hero background.png";

/* ──────────────────────────────────────────────
   Role icon SVGs (inline, no extra dependency)
────────────────────────────────────────────── */
function IconCode() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconBrush() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M3 12h1M20 12h1M12 3v1M12 20v1" />
      <path d="M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7" />
    </svg>
  );
}

const ROLES = [
  { label: "Full-Stack Developer", Icon: IconCode },
  { label: "UI/UX & Graphics Designer", Icon: IconPencil },
  { label: "Logo • Vector Art • Branding", Icon: IconBrush },
];

export function Hero() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        /* Nav pill fades in */
        .from(".hero-nav", { y: -24, opacity: 0, duration: 0.9 }, 0.05)
        /* Eyebrow label */
        .from("[data-hero-label]", { y: 16, opacity: 0, duration: 0.8 }, 0.3)
        /* ROHAN — mask-slide from below */
        .from("[data-hero-line='rohan']", { yPercent: 110, duration: 1.2 }, 0.42)
        /* BAIG */
        .from("[data-hero-line='baig']", { yPercent: 110, duration: 1.2 }, 0.54)
        /* Decorative rule */
        .from("[data-hero-rule]", { scaleX: 0, duration: 1 }, 0.72)
        /* Role tags */
        .from("[data-hero-roles]", { y: 20, opacity: 0, duration: 0.8 }, 0.78)
        /* Description */
        .from("[data-hero-desc]", { y: 18, opacity: 0, duration: 0.9 }, 0.9)
        /* CTAs */
        .from("[data-hero-cta]", { y: 16, opacity: 0, duration: 0.7, stagger: 0.09 }, 1.0)
        /* Info card + scroll indicator */
        .from("[data-hero-card]", { y: 24, opacity: 0, duration: 0.9 }, 1.1)
        .from("[data-hero-scroll]", { opacity: 0, duration: 1 }, 1.2)
        /* Side numbering */
        .from("[data-hero-side]", { opacity: 0, duration: 1 }, 1.1);
    }, document.documentElement);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="hero-section relative flex min-h-[78svh] w-full flex-col overflow-hidden sm:min-h-[82svh] lg:min-h-[88svh]"
      aria-label="Hero"
    >
      {/* ── Background image — positioned right ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Gradient overlay: dark on left, transparent on right ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(100deg, rgba(4,8,20,0.97) 0%, rgba(4,8,20,0.92) 28%, rgba(4,8,20,0.72) 50%, rgba(4,8,20,0.22) 72%, rgba(4,8,20,0.04) 100%)",
        }}
      />

      {/* ── Bottom fade for section transition ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(4,8,20,0.8) 100%)",
        }}
      />

      {/* ── Side number markers ── */}
      <div
        data-hero-side
        aria-hidden
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          01
        </span>
        <span
          style={{
            display: "block",
            width: "1px",
            height: "80px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          06
        </span>
      </div>

      {/* ── Main content wrapper (below navbar) ── */}
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-10 pt-[96px] sm:px-8 sm:pt-[108px] md:px-10 lg:px-14 xl:px-20 2xl:px-28">

        {/* Content grid: left text / right artwork on desktop */}
        <div className="flex flex-1 flex-col lg:flex-row lg:items-center lg:gap-0">

          {/* ── LEFT: Text column ── */}
          <div className="flex flex-1 flex-col justify-center lg:max-w-[52%] xl:max-w-[48%]">

            {/* Eyebrow */}
            <div data-hero-label className="mb-6 flex items-center gap-3 sm:mb-8">
              <span
                aria-hidden
                style={{
                  display: "block",
                  width: "32px",
                  height: "1px",
                  background: "#2563eb",
                  opacity: 0.7,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#3b82f6",
                }}
              >
               CREATIVE DIGITAL EXPERIENCES
              </span>
            </div>

            {/* ── ROHAN BAIG heading ── */}
            <h1
              aria-label="Rohan Baig"
              className="mb-0 leading-none"
              style={{ lineHeight: 0.88 }}
            >
              {/* ROHAN */}
              <span
                className="split-line"
                style={{ display: "block", overflow: "hidden" }}
              >
                <span
                  data-hero-line="rohan"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.9,
                    whiteSpace: "nowrap",
                  }}
                >
                  ROHAN
                </span>
              </span>

              {/* BAIG */}
              <span
                className="split-line"
                style={{ display: "block", overflow: "hidden" }}
              >
                <span
                  data-hero-line="baig"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
                    color: "#2563eb",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.9,
                    whiteSpace: "nowrap",
                  }}
                >
                  BAIG
                </span>
              </span>
            </h1>

            {/* Decorative rule below name */}
            <span
              data-hero-rule
              aria-hidden
              style={{
                display: "block",
                marginTop: "clamp(1rem, 2.5vw, 1.75rem)",
                height: "2px",
                width: "52px",
                background: "#2563eb",
                borderRadius: "2px",
                transformOrigin: "left center",
              }}
            />

            {/* Role tags */}
            <div
              data-hero-roles
              className="mt-5 flex flex-wrap items-center gap-x-0 gap-y-2 sm:mt-6"
              role="list"
            >
              {ROLES.map((role, i) => (
                <div
                  key={role.label}
                  role="listitem"
                  className="flex items-center"
                >
                  <span
                    className="flex items-center gap-2 whitespace-nowrap"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "clamp(10px, 1.6vw, 13px)",
                      fontFamily: "var(--font-body)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    <span style={{ color: "#3b82f6", flexShrink: 0 }}>
                      <role.Icon />
                    </span>
                    {role.label}
                  </span>
                  {i < ROLES.length - 1 && (
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: "1px",
                        height: "14px",
                        background: "rgba(255,255,255,0.2)",
                        margin: "0 clamp(8px, 1.5vw, 16px)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Description */}
            <p
              data-hero-desc
              style={{
                marginTop: "clamp(1.25rem, 2.5vw, 1.75rem)",
                maxWidth: "600px",
                fontSize: "clamp(13px, 1.5vw, 15px)",
                lineHeight: 1.72,
                color: "rgba(200,210,230,0.78)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
              }}
            >
             I build modern, responsive websites and full-stack MERN applications while creating distinctive visual identities, professional logos, vector artwork, and social media designs. I combine clean development with strong visual design to help businesses build a digital presence that looks professional, performs smoothly, and stands out.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {/* Primary CTA */}
              <a
                data-hero-cta
                href="#projects"
                className="hero-btn-primary group flex w-full items-center justify-center gap-2.5 sm:w-auto"
              >
                <span>Explore Projects</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              {/* Secondary CTA */}
              <a
                data-hero-cta
                href="/resume.pdf"
                download="Rohan-Baig-Resume.pdf"
                className="hero-btn-secondary group flex w-full items-center justify-center gap-2.5 sm:w-auto"
              >
                <span>Download Resume</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── RIGHT: spacer (artwork shows through bg) — desktop only ── */}
          <div className="hidden flex-1 lg:block" aria-hidden />
        </div>

        {/* ── Bottom row: Scroll indicator + Info card ── */}
        <div className="relative mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between lg:mt-10">

          {/* Scroll indicator */}
          <div data-hero-scroll className="flex flex-col items-start gap-3">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Scroll Down
            </span>
            {/* Mouse icon */}
            <div
              style={{
                width: "20px",
                height: "32px",
                borderRadius: "10px",
                border: "1.5px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: "5px",
              }}
              aria-hidden
            >
              <span
                style={{
                  width: "2px",
                  height: "6px",
                  borderRadius: "2px",
                  background: "rgba(255,255,255,0.6)",
                  animation: "scrollDot 1.8s ease-in-out infinite",
                }}
              />
            </div>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              aria-hidden
              style={{ marginTop: "-4px" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Premium info card — desktop bottom-right */}
          <div
            data-hero-card
            className="hidden max-w-[220px] rounded-2xl p-5 lg:block"
            style={{
              background: "rgba(10,16,36,0.82)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            {/* Blue bolt icon */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.92)",
                fontWeight: 400,
                marginBottom: "10px",
              }}
            >
              Building digital experiences that{" "}
              <span style={{ color: "#3b82f6", fontWeight: 500 }}>
                make an impact.
              </span>
            </p>
            <span
              style={{
                display: "block",
                width: "28px",
                height: "1.5px",
                background: "#2563eb",
                marginBottom: "8px",
                borderRadius: "2px",
              }}
              aria-hidden
            />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.6,
              }}
            >
              Clean Code. Creative Design.{" "}
              <br />
              Real Results.
            </p>
          </div>
        </div>
      </div>

      {/* ── @keyframes for the scroll dot ── */}
      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          60%  { transform: translateY(10px); opacity: 0.2; }
          61%  { transform: translateY(0); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

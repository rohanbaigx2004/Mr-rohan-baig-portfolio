import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./motion-primitives";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Close on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ── Fixed top bar ── */}
      <header
        ref={navRef}
        className="hero-nav fixed inset-x-0 top-0 z-50 flex items-center justify-center px-4 py-4 sm:px-6 sm:py-5 md:py-6"
      >
        {/* Pill container */}
        <nav
          aria-label="Main navigation"
          className="hero-nav-pill relative flex w-full max-w-[900px] items-center rounded-full p-[2px] shadow-[0_4px_40px_-8px_rgba(0,0,0,0.28),0_1px_0_0_rgba(255,255,255,0.6)_inset] backdrop-blur-xl"
        >
          <motion.div
            aria-hidden
            style={{
              backgroundImage: `conic-gradient(from 180deg, transparent 0%, rgba(56,189,248,0.18) 14%, rgba(96,165,250,0.9) 30%, rgba(192,132,252,0.9) 46%, rgba(59,130,246,0.85) 62%, rgba(125,211,252,0.18) 78%, transparent 100%)`,
            }}
            className="absolute inset-0 rounded-full"
          />

          <motion.div
            aria-hidden
            style={{
              backgroundImage: `conic-gradient(from 180deg, transparent 0%, rgba(56,189,248,0.25) 16%, rgba(96,165,250,0.3) 28%, rgba(192,132,252,0.28) 50%, rgba(59,130,246,0.2) 68%, transparent 80%)`,
            }}
            className="ai-glow-spill-mask pointer-events-none absolute inset-[-18%] rounded-full blur-3xl"
          />

          <div className="relative z-10 flex w-full items-center rounded-full bg-white/95 px-4 py-2.5 sm:px-6 sm:py-3">
            {/* Logo */}
            <a
              href="#top"
              aria-label="Rohan Baig — home"
              className="relative z-10 flex shrink-0 items-center"
            >
              <img
                src="/favicon.png"
                alt="Rohan Baig logo"
                className="h-7 w-auto sm:h-8"
                style={{ filter: "brightness(0)" }}
              />
            </a>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="pointer-events-auto hidden items-center gap-8 lg:flex xl:gap-10">
                {LINKS.map((l) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    className="relative text-[11px] font-medium uppercase tracking-[0.14em] text-[#1a2560] transition-colors"
                  >
                    <motion.span
                      variants={{ rest: { opacity: 1 }, hover: { opacity: 0.7 } }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="block"
                    >
                      {l.label}
                    </motion.span>
                    <motion.span
                      aria-hidden
                      variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute -bottom-1 left-0 block h-px w-full origin-left bg-[#2563eb]"
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* "Available for hire" badge — desktop */}
            <div className="relative z-10 ml-auto hidden items-center gap-6 lg:flex">
              <div className="flex items-center gap-1.5 pl-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]"
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#22c55e]">
                  Available for hire
                </span>
              </div>
            </div>

            {/* Hamburger — mobile / tablet */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100 lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 block h-[1.5px] w-5 rounded-full bg-[#1a2560] transition-all duration-300 ${
                    open ? "top-[7px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-[1.5px] w-5 rounded-full bg-[#1a2560] transition-all duration-300 ${
                    open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-5 rounded-full bg-[#1a2560] transition-all duration-300 ${
                    open ? "top-[7px] -rotate-45" : "top-3.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto lg:hidden"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.1 0.04 240) 0%, oklch(0.07 0.03 240) 100%)",
            }}
          >
            {/* Top padding so content starts below the pill navbar */}
            <div className="h-24 shrink-0" aria-hidden />

            {/* Links */}
            <div className="flex flex-1 flex-col justify-center px-6 sm:px-10">
              <div className="flex flex-col divide-y divide-white/10">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.05 + i * 0.07 }}
                    className="flex items-center justify-between py-6"
                  >
                    <span
                      className="font-display text-4xl font-normal uppercase tracking-tight text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {l.label}
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2563eb]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="mt-12 space-y-1.5 pb-10"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[#2563eb]"
                  />
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2563eb]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Available for hire
                  </span>
                </div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  rohanbaig2004@gmail.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

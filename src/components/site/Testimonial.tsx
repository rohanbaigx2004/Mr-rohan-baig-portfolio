import { SectionHeader } from "./SectionHeader";

const EXPERTISE = [
  {
    num: "01",
    title: "Logo Design, Branding & Vector Art",
    desc: "Professional logo design, custom vector artwork, brand identities, and scalable visual assets created to give businesses a distinctive and consistent visual presence.",
  },
  {
    num: "02",
    title: "Full-Stack MERN Websites & Web Applications",
    desc: "Modern, responsive websites, MERN stack applications, dashboards, and custom web solutions built with React, TypeScript, Node.js, Express, and MongoDB.",
  },
  {
    num: "03",
    title: "UI/UX, Social Media & WordPress Design",
    desc: "User-focused interfaces, responsive UI/UX designs, social media creatives, Figma/Framer layouts, and professional WordPress websites designed for modern brands.",
  },
];

export function Testimonial() {
  return (
    <section className="section-shell relative overflow-hidden bg-ink text-ink-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-full opacity-[0.14]"
      >
        <svg width="620" height="620" viewBox="0 0 100 100" className="h-full w-auto">
          <path d="M0 0 L100 50 L0 100" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <path d="M20 10 L90 50 L20 90" fill="none" stroke="currentColor" strokeWidth="0.3" />
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-56 bg-gradient-to-b from-aqua/25 to-transparent blur-2xl"
      />

      <div className="relative z-10 w-full">
        <SectionHeader label="Expertise" title="My Services." num="05" anim="mask" tone="inverse" />

        <p className="mt-8 max-w-2xl text-[clamp(1.15rem,3vw,1.5rem)] font-light leading-relaxed text-ink-foreground/90">
        Full-stack web development, UI/UX design, branding, vector artwork, and WordPress solutions built to help businesses grow online.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {EXPERTISE.map((item) => (
            <div key={item.num} className="border-t border-ink-foreground/20 pt-6">
              <span className="text-xl font-bold text-ink-foreground/50">{item.num}</span>
              <h3 className="mt-4 text-2xl leading-tight text-ink-foreground">{item.title}</h3>
              <p className="mt-4 text-ink-foreground/70">{item.desc}</p>
              <a href="#contact" className="mt-6 inline-block text-sm uppercase tracking-widest text-ink-foreground hover:opacity-70">
                Discuss Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

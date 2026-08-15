import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { ArrowGlyph, EASE, MotionLink } from "./motion-primitives";

const CHANNELS = [
  { label: "Email", value: "rohanbaig2004@gmail.com", href: "mailto:rohanbaig2004@gmail.com" },
  { label: "WhatsApp", value: "+923498636573", href: "https://wa.me/923498636573" },
];

export function Contact() {
  return (
    <section id="contact" className="section-shell water-veil">
      <SectionHeader label="Get in touch" title="Let's Build Something Great." num="06" anim="mask" />

      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div>
          <p
            data-reveal
          className="max-w-xl text-[clamp(1.15rem,3.2vw,1.75rem)] font-light leading-[1.45] text-primary"
          >
           I’m available for freelance and full-time opportunities. Whether you need a high-performing website, a full-stack MERN application, a custom dashboard, or a distinctive brand identity, let’s turn your idea into something professional, functional, and visually memorable.
          </p>

         

          <div data-reveal className="mt-8 flex items-center gap-4">
            <a
              href="https://github.com/rohanbaigx2004"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.51.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.912.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.104-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.026 2.747-1.026.547 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.36.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/m-rohan-baig"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/923498636573"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.68 4.61 1.857 6.5L4 29l7.75-1.836A11.946 11.946 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Zm6.406 16.281c-.27.756-1.576 1.445-2.156 1.504-.553.056-1.074.26-3.617-.754-3.039-1.213-4.992-4.32-5.143-4.518-.152-.2-1.234-1.641-1.234-3.133 0-1.494.783-2.23 1.063-2.531.281-.301.611-.377.816-.377.203 0 .406.002.584.01.188.01.438-.07.686.523.256.609.867 2.102.943 2.254.076.152.127.328.027.527-.1.2-.152.324-.301.5-.152.178-.318.396-.453.531-.152.152-.309.317-.133.623.176.305.783 1.289 1.68 2.088 1.153 1.027 2.125 1.344 2.43 1.494.306.152.48.127.658-.076.177-.203.756-.881 1.058-1.184.203-.203.38-.152.641-.051.261.1 1.645.775 1.926.916.281.14.469.211.539.328.068.116.068.674-.203 1.326Z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-border">
          {CHANNELS.map((c) => (
            <motion.a
              key={c.label}
              href={c.href}
              data-reveal
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="group relative grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-border py-6"
            >
              <motion.span
                aria-hidden="true"
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-x-[-1rem] inset-y-0 -z-10 rounded-2xl bg-accent/45"
              />
              <div className="min-w-0">
                <span className="label block">{c.label}</span>
                <motion.span
                  variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-2 block truncate font-display text-sm uppercase text-primary sm:text-base md:text-2xl"
                >
                  {c.value}
                </motion.span>
              </div>
              <span className="shrink-0 self-center text-primary">
                <ArrowGlyph size={20} />
              </span>
            </motion.a>
          ))}

          <div data-reveal className="mt-8 space-y-1">
            <p className="label">Let's Talk</p>
           <p className="text-base font-light text-foreground/70">
  Available for project inquiries, freelance collaborations, and full-time opportunities.
</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { EASE } from "./motion-primitives";
import { Github, Linkedin } from "lucide-react";

const SOCIALS = [
  { name: "Github", href: "https://github.com/rohanbaigx2004", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/m-rohan-baig", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border gutter py-14 water-veil md:py-20">
      <div className="flex flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex min-w-0 items-center justify-center md:justify-start">
          <img src="/favicon.png" alt="Rohan Baig" className="h-8 w-auto" />
        </div>

       

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
          {SOCIALS.map((s) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="link-sweep-static flex items-center gap-2 text-sm text-foreground"
            >
              <s.icon size={16} />
              {s.name}
            </motion.a>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
      <p className="label text-center font-bold text-black md:text-center">
  © 2026 Rohan Baig — All rights reserved.
</p>
        <a href="#top" className="label text-primary hover:underline">Back to top</a>
      </div>
    </footer>
  );
}

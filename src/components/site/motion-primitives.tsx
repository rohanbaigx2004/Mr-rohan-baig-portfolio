import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Small diagonal arrow used across links; moves on hover via the parent group. */
export function ArrowGlyph({ size = 20 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      className="shrink-0"
      variants={{
        rest: { x: 0, y: 0 },
        hover: { x: 3, y: -3 },
      }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </motion.svg>
  );
}

type MotionLinkProps = HTMLMotionProps<"a"> & {
  children: ReactNode;
  /** Show the diagonal arrow glyph. */
  arrow?: boolean;
};

/** Water-pill CTA with a Framer Motion hover/tap micro-interaction. */
export function MotionLink({ children, arrow = true, className = "", ...rest }: MotionLinkProps) {
  return (
    <motion.a
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.975 }}
      variants={{ rest: { y: 0 }, hover: { y: -2 } }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`btn-water group ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {arrow ? <ArrowGlyph size={16} /> : null}
    </motion.a>
  );
}

/** Row/card wrapper that lifts subtly on hover and exposes `rest`/`hover` variants. */
export function MotionRow({
  children,
  className = "",
  lift = -3,
  ...rest
}: HTMLMotionProps<"div"> & { children: ReactNode; lift?: number }) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: lift } }}
      transition={{ duration: 0.5, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { EASE };

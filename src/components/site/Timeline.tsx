import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const METRICS = [
  { number: "01", label: "Core Disciplines", detail: "Development + Design" },
  { number: "08", label: "Tech Stacks", detail: "Frontend · Backend · UI" },
  { number: "04", label: "Design Suites", detail: "Figma · PS · AI" },
  { number: "99", label: "% Responsive", detail: "Built for every screen" },
];

export function Timeline() {
  return (
    <section id="services" className="section-shell">
      <SectionHeader label="Trajectory" title="Experience." num="04" anim="words" />

      <div className="mt-10 md:mt-12">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="metric-card"
            >
              <div className="metric-number">{item.number}</div>
              <div className="metric-label">{item.label}</div>
              <div className="metric-detail">{item.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

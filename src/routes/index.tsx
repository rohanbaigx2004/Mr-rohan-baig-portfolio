import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { Gallery } from "@/components/site/Gallery";
import { CoreToolset } from "@/components/site/CoreToolset";
import { Timeline } from "@/components/site/Timeline";
import { Testimonial } from "@/components/site/Testimonial";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { createReveal } from "@/lib/gsap-client";

const TITLE = "Rohan Baig — Full-Stack MERN Developer & Graphic Designer";
const DESCRIPTION =
  "Full-Stack MERN Developer and Graphic Designer specializing in responsive web development, web applications, UI/UX design, logo design, vector art, branding, and social media design.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const main = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = main.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return createReveal(el);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navbar />
      <main ref={main}>
        <Hero />
        <Projects />
        <Gallery />
        <CoreToolset />
        <Timeline />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

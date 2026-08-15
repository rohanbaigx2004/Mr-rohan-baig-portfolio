import { useEffect, useRef } from "react";

/**
 * Lightweight 2D-canvas wireframe icosahedron — the reference's slowly rotating
 * WebGL armature without pulling a 3D library into the bundle.
 */
export function HeroCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Icosahedron vertices
    const t = (1 + Math.sqrt(5)) / 2;
    const raw: [number, number, number][] = [];
    for (const s1 of [-1, 1])
      for (const s2 of [-1, 1]) {
        raw.push([0, s1 * 1, s2 * t], [s1 * 1, s2 * t, 0], [s1 * t, 0, s2 * 1]);
      }
    const verts = raw.map(([x, y, z]) => {
      const l = Math.hypot(x, y, z);
      return [x / l, y / l, z / l] as [number, number, number];
    });

    const edges: [number, number][] = [];
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        const a = verts[i]!;
        const b = verts[j]!;
        const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        if (d < 1.12) edges.push([i, j]);
      }
    }


    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let raf = 0;
    let ry = 0;
    let rx = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const r = Math.min(w, h) * 0.38;
      const cx = w / 2;
      const cy = h / 2;

      const p = verts.map(([x, y, z]) => {
        // rotate Y then X
        let x1 = x * Math.cos(ry) + z * Math.sin(ry);
        let z1 = -x * Math.sin(ry) + z * Math.cos(ry);
        const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
        z1 = y * Math.sin(rx) + z1 * Math.cos(rx);
        const persp = 2.6 / (2.6 + z1);
        return [cx + x1 * r * persp, cy + y1 * r * persp, persp, z1] as [number, number, number, number];
      });

      // Sort edges back-to-front for painter's algorithm
      const sortedEdges = [...edges].sort(([ai, bi], [ci, di]) => {
        const depthA = (p[ai]![3] + p[bi]![3]) / 2;
        const depthB = (p[ci]![3] + p[di]![3]) / 2;
        return depthA - depthB;
      });

      for (const [ai, bi] of sortedEdges) {
        const a = p[ai]!;
        const b = p[bi]!;
        const depth = (a[2] + b[2]) / 2;
        const alpha = Math.max(0, (depth - 0.72) * 1.6);
        ctx.lineWidth = 1.1 + alpha * 0.8;
        ctx.strokeStyle = `oklch(0.12 0.02 240 / ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      }

      for (const [x, y, d] of p) {
        const alpha = Math.max(0, (d - 0.78) * 1.8);
        // Outer glow dot
        ctx.fillStyle = `oklch(0.42 0.06 238 / ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        // Core dot
        ctx.fillStyle = `oklch(0.1 0.02 240 / ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      ry += 0.0022;
      rx += 0.0011;
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}

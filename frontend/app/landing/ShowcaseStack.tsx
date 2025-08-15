import React from "react";

export type ShowcaseStackProps = {
  images?: string[]; // up to 3 images
  activeIndex?: number; // externally controlled index (0-2). If omitted, internal timer runs.
  intervalMs?: number; // default 3000
  className?: string;
};

// Simple placeholder images
const PLACEHOLDERS = [
  "/images/model.jpg",
  "/images/pants.jpg",
  "/images/model-bg.png",
];

export default function ShowcaseStack(props: ShowcaseStackProps) {
  const {
    images = PLACEHOLDERS,
    activeIndex,
    intervalMs = 3000,
    className = "",
  } = props;
  const [localIndex, setLocalIndex] = React.useState(0);
  const controlled = typeof activeIndex === "number";
  const index = controlled ? Math.max(0, Math.min(2, activeIndex!)) : localIndex;

  React.useEffect(() => {
    if (controlled) return;
    const id = window.setInterval(() => {
      setLocalIndex((i) => (i + 1) % 3);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [controlled, intervalMs]);

  // Compute position classes for a horizontal stack: left, center (active), right
  // Indices wrap modulo 3: left = (index + 2) % 3, center = index, right = (index + 1) % 3
  const leftIdx = (index + 2) % 3;
  const centerIdx = index;
  const rightIdx = (index + 1) % 3;

  const cardFor = (i: number) => {
    // active + two future previews on right
    if (i === centerIdx) {
      return { slot: 'active' as const, z: 50, scale: 1, opacity: 1, xPercent: 0 };
    }
    if (i === rightIdx) {
      return { slot: 'next1' as const, z: 40, scale: 0.96, opacity: 0.9, xPercent: 68 }; // 68% of active width -> ~32% visible, then clipped so ~15%
    }
    return { slot: 'next2' as const, z: 30, scale: 0.92, opacity: 0.75, xPercent: 78 }; // further right a bit more
  };

  return (
    <div className={["relative", className].join(" ")}> 
      <div className="relative w-full h-full max-w-3xl ml-auto overflow-visible pr-8">
        {[0, 1, 2].map((i) => {
          const { z, scale, opacity, xPercent, slot } = cardFor(i);
          const active = slot === 'active';
          return (
            <div
              key={i}
              className="absolute top-0 left-0 h-full flex items-center justify-start"
              style={{ zIndex: z, transform: `translateX(${xPercent}%)`, pointerEvents: active ? 'auto' : 'none', transition: 'transform 900ms cubic-bezier(.16,.84,.44,1)' }}
              aria-hidden={!active}
            >
              <div
                className="h-full w-[82%] md:w-[80%] lg:w-[78%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm will-change-transform relative"
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  transition: 'transform 900ms cubic-bezier(.16,.84,.44,1), opacity 900ms ease',
                }}
              >
                <img
                  src={images[i] || PLACEHOLDERS[i]}
                  alt={`Showcase ${i + 1}`}
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                  style={active ? undefined : { filter: 'brightness(0.55) contrast(1.05) saturate(0.85)' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

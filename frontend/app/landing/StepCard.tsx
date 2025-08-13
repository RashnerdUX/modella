import React from "react";

export type StepCardProps = {
  step: string;
  title: string;
  active?: boolean;
  animating?: boolean;
  children: React.ReactNode;
};

export function StepCards() {
    const [active, setActive] = React.useState(0);
    React.useEffect(() => {
        const id = window.setInterval(() => setActive((a) => (a + 1) % 3), 3000);
        return () => window.clearInterval(id);
    }, []);
  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 z-10">
            <StepCard step="01" title="Capture wardrobe" active={active === 0} animating={active === 0}>
                Upload your items or import receipts. We auto-tag colors, type, and season.
            </StepCard>
            <StepCard step="02" title="Plan outfits" active={active === 1} animating={active === 1}>
                Build outfits for your week. Drag-and-drop pieces and save your favorites.
            </StepCard>
            <StepCard step="03" title="Shop smart" active={active === 2} animating={active === 2}>
                Get recommendations that fill gaps, match your style, and fit your budget.
            </StepCard>
        </div>
  );
}

export function StepCard({ step, title, active = false, animating = false, children }: StepCardProps) {
  return (
    <div
      className={[
        "rounded-xl p-5 bg-white",
        active
          ? "shadow-xl border-2 border-transparent card-border-active"
          : "shadow-md border border-gray-200",
        animating && active ? "card-border-animate" : ""
      ].join(" ")}
      aria-current={active ? "step" : undefined}
    >
      <div className="flex items-start gap-3">
        <div className="text-xl font-bold text-gray-900">{step}</div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{children}</p>
        </div>
      </div>
    </div>
  );
}

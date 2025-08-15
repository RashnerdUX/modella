import React, { useEffect, useState } from "react";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number; // 1-5
  avatar?: string;
};

export function ReviewsSection() {
  const [items, setItems] = useState<Testimonial[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/data/testimonials.json")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load testimonials: ${r.status}`);
        return r.json();
      })
      .then((data: Testimonial[]) => {
        if (!active) return;
        setItems(data);
      })
      .catch((e: Error) => {
        if (!active) return;
        setError(e.message);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="reviews" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">What users are saying</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Real stories from people who simplified their style with Modella.
          </p>
        </div>

        {error && (
          <div role="alert" className="text-red-600 text-center">{error}</div>
        )}
        {!items && !error && (
          <div className="text-center text-gray-500">Loading reviews…</div>
        )}

        {items && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((t, idx) => (
              <ReviewCard key={idx} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

type ReviewCardProps = { t: Testimonial };

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={(i < rating ? "fill-yellow-400" : "fill-gray-300") + " h-5 w-5"}
        >
          <path d="M10 15.27l-5.18 3.05 1.4-5.88L1 7.97l6-.52L10 2l3 5.45 6 .52-5.22 4.47 1.4 5.88z" />
        </svg>
      ))}
    </div>
  );
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
      {initials}
    </div>
  );
}

function ReviewCard({ t }: ReviewCardProps) {
  return (
    <article
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
      aria-label={`Testimonial from ${t.name}`}
    >
      <ReviewStars rating={t.rating} />
      <blockquote className="mt-4 text-gray-800">“{t.quote}”</blockquote>
      <footer className="mt-6 flex items-center gap-3">
        {t.avatar ? (
          <img
            src={t.avatar}
            alt={`${t.name} avatar`}
            className="h-10 w-10 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <Initials name={t.name} />
        )}
        <div>
          <div className="font-semibold text-gray-900">{t.name}</div>
          <div className="text-sm text-gray-600">{t.role}</div>
        </div>
      </footer>
    </article>
  );
}

export default ReviewCard;

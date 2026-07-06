import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="What Our Customers Say"
        description="We're proud of the relationships we build. Here's what homeowners have to say about working with us."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="flex flex-col rounded-2xl border border-brand-100 bg-white p-7 shadow-sm"
          >
            <Stars rating={t.rating} />
            <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-brand-800">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 font-display font-bold text-brand-700">
                {t.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-brand-900">{t.name}</p>
                <p className="text-sm text-brand-500">{t.location}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          className="text-accent-500"
          aria-hidden="true"
        >
          <path
            d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2z"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

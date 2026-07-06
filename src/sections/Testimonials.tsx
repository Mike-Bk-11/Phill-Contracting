import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GoogleLogo } from "@/components/ui/GoogleLogo";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/data/siteConfig";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Reviews"
        title="We'd Love Your Feedback"
        description="Your experience matters to us. If we've worked together, please take a moment to share a review on Google — it helps other homeowners find us."
      />

      {/* Leave-a-review call to action */}
      <div className="mx-auto mt-12 max-w-2xl">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="flex items-center gap-3">
            <GoogleLogo className="h-9 w-9" />
            <span className="font-display text-xl font-bold text-brand-900">
              Reviews
            </span>
          </div>

          <Stars rating={5} className="justify-center" />

          <p className="text-brand-700">
            Enjoyed working with {siteConfig.name}? A quick Google review means the
            world to a local business like ours.
          </p>

          <Button
            as="link"
            href={siteConfig.google.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            <GoogleLogo className="h-5 w-5" />
            Leave us a Google Review
          </Button>

          <a
            href={siteConfig.google.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent-600 hover:text-accent-700"
          >
            Read our reviews on Google →
          </a>
        </div>
      </div>

      {/*
        Featured Google reviews.
        Once you have real reviews, set `showReviews: true` in
        src/data/siteConfig.ts and replace the entries in
        src/data/testimonials.ts with your actual Google review text/names.
      */}
      {siteConfig.showReviews && (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col rounded-2xl border border-brand-100 bg-white p-7 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Stars rating={t.rating} />
                <GoogleLogo className="h-5 w-5" />
              </div>
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
      )}
    </Section>
  );
}

function Stars({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={`flex gap-1 ${className}`} aria-label={`${rating} out of 5 stars`}>
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

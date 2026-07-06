import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

const values = [
  {
    title: "Licensed & Insured",
    text: "Fully licensed and insured for your complete peace of mind on every job.",
  },
  {
    title: "Quality Craftsmanship",
    text: "Skilled tradespeople and premium materials that stand the test of time.",
  },
  {
    title: "On-Time, On-Budget",
    text: "Clear estimates and honest timelines — no surprises, no hidden fees.",
  },
  {
    title: "Local & Trusted",
    text: `Proudly serving ${siteConfig.serviceArea} with hundreds of happy residential and commercial clients.`,
  },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative order-last aspect-[4/3] overflow-hidden rounded-2xl shadow-xl lg:order-first">
          {/* TODO: replace with a real team / job-site photo in /public. */}
          <Image
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
            alt="Phill Contracting team member on a job site"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
            <p className="font-display text-2xl font-bold text-brand-900">
              {siteConfig.yearsInBusiness}+ years
            </p>
            <p className="text-sm text-brand-600">of building trust</p>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-600">
            About Us
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Your Trusted Partner for Residential & Commercial Construction
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-700">
            {/* TODO: Replace with the real company story. */}
            {siteConfig.name} is a family-owned remodeling and general
            construction company. For over {siteConfig.yearsInBusiness} years,
            we&apos;ve helped homeowners and businesses bring their projects to
            life — one quality build at a time.
          </p>
          <p className="mt-4 leading-relaxed text-brand-700">
            We treat every job like our own, combining time-tested craftsmanship with clear
            communication from the first estimate to the final walkthrough.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500 text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-brand-900">{v.title}</h3>
                  <p className="mt-1 text-sm text-brand-600">{v.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button as="link" href="#contact" variant="secondary" size="lg">
              Start Your Project
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

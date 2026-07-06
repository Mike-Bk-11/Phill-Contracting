import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export function CallToAction() {
  return (
    <section className="bg-brand-900">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-400">
            Free Estimates · Residential & Commercial
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
            For a free estimate on your next residential or commercial project in
            Norwood and surrounding areas, call {siteConfig.name} and speak directly with someone who
            will be there throughout the entire process.
          </h2>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as="link" href={siteConfig.phoneHref} size="lg">
              <PhoneIcon />
              Call {siteConfig.phone}
            </Button>
            <Button as="link" href="#contact" variant="outline" size="lg">
              Request a Free Estimate
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

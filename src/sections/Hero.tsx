import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      {/* Background image. TODO: replace with a real hero photo in /public. */}
      <Image
        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
        alt="Newly remodeled home interior"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-900/80 to-brand-900/50" />

      <Container className="flex min-h-[92vh] flex-col justify-center py-32 sm:min-h-[90vh]">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-accent-200 ring-1 ring-white/20">
            Licensed & Insured · {siteConfig.yearsInBusiness}+ Years Experience
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building & Remodeling Homes You&apos;ll Love
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">
            {siteConfig.name} delivers expert home remodeling and construction —
            from dream kitchens and baths to additions and full renovations.
            Quality craftsmanship, honest pricing, and on-time results.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button as="link" href="#contact" size="lg">
              Get a Free Quote
            </Button>
            <Button as="link" href={siteConfig.phoneHref} variant="outline" size="lg">
              Call {siteConfig.phone}
            </Button>
          </div>

          {/* Trust badges */}
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">
            <div>
              <dt className="text-3xl font-bold text-white">
                {siteConfig.yearsInBusiness}+
              </dt>
              <dd className="mt-1 text-sm text-brand-200">Years in business</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-white">
                {siteConfig.projectsCompleted}+
              </dt>
              <dd className="mt-1 text-sm text-brand-200">Projects completed</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-white">5.0</dt>
              <dd className="mt-1 text-sm text-brand-200">Average rating</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}

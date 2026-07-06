import { Section, SectionHeading } from "@/components/ui/Section";
import { services, type ServiceIcon } from "@/data/services";

export function Services() {
  return (
    <Section id="services" muted>
      <SectionHeading
        eyebrow="What We Do"
        title="Our Services"
        description="From single-room updates to whole-home transformations and commercial build-outs, we bring skill and care to every residential and commercial project."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.slug}
            className="group flex flex-col rounded-2xl border border-brand-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg"
          >
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-brand-50 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-white">
              <Icon name={service.icon} />
            </div>
            <h3 className="font-display text-xl font-bold text-brand-900">
              {service.title}
            </h3>
            <p className="mt-3 flex-1 text-brand-700">{service.description}</p>
            <ul className="mt-5 space-y-2">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-brand-600">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-accent-500"
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Simple inline icon set keyed by service type. */
function Icon({ name }: { name: ServiceIcon }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "kitchen":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v6M7 13v4M11 13v4" />
        </svg>
      );
    case "bath":
      return (
        <svg {...common}>
          <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
          <path d="M6 12V6a2 2 0 0 1 2-2h1M8 4v3M5 19l-1 2M20 19l1 2" />
        </svg>
      );
    case "addition":
      return (
        <svg {...common}>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10M12 14v4M10 16h4" />
        </svg>
      );
    case "roofing":
      return (
        <svg {...common}>
          <path d="M2 12L12 4l10 8" />
          <path d="M5 10v9h14v-9M9 19v-5h6v5" />
        </svg>
      );
    case "flooring":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="1" />
          <path d="M3 9h18M3 14h18M8 4v5M14 9v5M8 14v6" />
        </svg>
      );
    case "exterior":
      return (
        <svg {...common}>
          <path d="M3 21V8l9-5 9 5v13" />
          <path d="M9 21v-6h6v6M3 12h18" />
        </svg>
      );
    case "commercial":
      return (
        <svg {...common}>
          <path d="M3 21h18M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M13 21V9h5a1 1 0 0 1 1 1v11" />
          <path d="M8 8h2M8 12h2M8 16h2M16 13h0M16 17h0" />
        </svg>
      );
    default:
      return null;
  }
}

import { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** When true, uses a warm cream background to alternate sections. */
  muted?: boolean;
};

/** A full-width page section with consistent vertical rhythm and a container. */
export function Section({ id, children, className = "", muted = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-24 ${
        muted ? "bg-cream" : "bg-white"
      } ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

/** Standardized heading block for section intros. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-600">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-brand-700">{description}</p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";
import { contactSchema } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<string, string>>;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validate on the client first for instant feedback.
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something went wrong.");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setServerMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <Section id="contact" muted>
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Info */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-600">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Request Your Free Quote
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-700">
            Tell us about your project and we&apos;ll get back to you within one
            business day. No obligation, no pressure.
          </p>

          <div className="mt-8 space-y-5">
            <ContactRow label="Call us" value={siteConfig.phone} href={siteConfig.phoneHref}>
              <PhoneIcon />
            </ContactRow>
            <ContactRow label="Email us" value={siteConfig.email} href={siteConfig.emailHref}>
              <MailIcon />
            </ContactRow>
            <ContactRow
              label="Visit us"
              value={`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`}
            >
              <PinIcon />
            </ContactRow>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-brand-900">Business Hours</h3>
            <ul className="mt-3 space-y-1 text-sm text-brand-600">
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex justify-between">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-100 text-accent-600">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-brand-900">
                Thank you!
              </h3>
              <p className="mt-2 max-w-sm text-brand-600">
                Your request has been sent. We&apos;ll be in touch within one
                business day.
              </p>
              <Button
                className="mt-6"
                variant="secondary"
                onClick={() => setStatus("idle")}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot — visually hidden, must stay empty. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <Field label="Full name" name="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={inputClass(errors.name)}
                  placeholder="Jane Doe"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email" name="email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass(errors.email)}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone" name="phone" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass(errors.phone)}
                    placeholder="(555) 123-4567"
                  />
                </Field>
              </div>

              <Field label="Service needed" name="service" error={errors.service} optional>
                <select id="service" name="service" className={inputClass(errors.service)}>
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Other">Other / Not sure</option>
                </select>
              </Field>

              <Field label="Project details" name="message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={inputClass(errors.message)}
                  placeholder="Tell us about your project, timeline, and any details…"
                />
              </Field>

              {status === "error" && serverMessage && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverMessage}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send My Request"}
              </Button>
              <p className="text-center text-xs text-brand-500">
                By submitting, you agree to be contacted about your project.
              </p>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-lg border px-4 py-2.5 text-brand-900 shadow-sm outline-none transition-colors placeholder:text-brand-300 focus:ring-2 focus:ring-accent-500 ${
    error ? "border-red-400 bg-red-50" : "border-brand-200 bg-white focus:border-accent-500"
  }`;
}

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-brand-800">
        {label}
        {optional && <span className="ml-1 text-brand-400">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
  children,
}: {
  label: string;
  value: string;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-accent-600">
        {children}
      </span>
      <span>
        <span className="block text-sm text-brand-500">{label}</span>
        <span className="font-medium text-brand-900">{value}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center gap-4 hover:opacity-80">
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-4">{content}</div>
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

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

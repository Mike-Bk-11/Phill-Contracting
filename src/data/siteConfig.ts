/**
 * Central site configuration.
 * TODO: Replace all placeholder values below with the real company details.
 */
export const siteConfig = {
  name: "Phill Contracting",
  legalName: "Phill Contracting LLC",
  tagline: "Quality Home Remodeling & Construction",
  description:
    "Phill Contracting is a licensed and insured home remodeling and general construction company serving homeowners with kitchens, bathrooms, additions, roofing, and more.",

  // TODO: Replace with your real contact details.
  phone: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
  email: "info@phillcontracting.com",
  emailHref: "mailto:info@phillcontracting.com",

  // TODO: Replace with your real address / service area.
  address: {
    street: "123 Main Street",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
  serviceArea: "Springfield and surrounding areas within 50 miles",

  // Business hours (shown in footer / contact).
  hours: [
    { day: "Mon – Fri", time: "7:00 AM – 6:00 PM" },
    { day: "Saturday", time: "8:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],

  // Trust / credentials. TODO: Replace with real license numbers etc.
  license: "License #ABC123456",
  yearsInBusiness: 15,
  projectsCompleted: 500,

  // TODO: Replace with your real social links (leave empty string to hide).
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    google: "https://google.com",
  },

  // Used for SEO / canonical URLs. TODO: set to your real domain once deployed.
  url: "https://phill-contracting.vercel.app",
} as const;

export type SiteConfig = typeof siteConfig;

/** Navigation links used by the header and footer (anchor sections). */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

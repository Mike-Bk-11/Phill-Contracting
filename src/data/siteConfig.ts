/**
 * Central site configuration.
 * TODO: Replace all placeholder values below with the real company details.
 */
export const siteConfig = {
  name: "PHILL CONTRACTING",
  legalName: "PHILL CONTRACTING LLC",
  tagline: "Quality Home Remodeling & Construction",

  // Logo image. A placeholder SVG lives at `public/logo.svg`.
  // Save your real logo as a transparent PNG in `public/` and point this at it.
  // Tip: if you replace the file, use a NEW filename (e.g. logo-v2.png) so
  // browsers/CDNs don't serve a stale cached copy.
  logo: "/phill-logo.png",
  // Natural aspect ratio of the logo (width / height) used for sizing.
  logoWidth: 300,
  logoHeight: 115,
  description:
    "PHILL CONTRACTING is a licensed and insured remodeling and general construction company serving both residential and commercial clients — kitchens, bathrooms, additions, build-outs, renovations, and more.",

  // TODO: Replace with your real contact details.
  phone: "(781) 929-3539",
  phoneHref: "tel:+17819293539",
  email: "info@phillcontracting.com",
  emailHref: "mailto:info@phillcontracting.com",

  // TODO: Replace with your real address / service area.
  address: {
    street: "Norwood",
    city: "Boston",
    state: "MA",
    zip: "02062",
  },
  serviceArea: "Boston and surrounding areas within 50 miles",

  // Business hours (shown in footer / contact).
  hours: [
    { day: "Mon – Fri", time: "8:00 AM – 5:00 PM" },
    { day: "Saturday", time: "8:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],

  // Trust / credentials. TODO: Replace with real license numbers etc.
  license: "License #ABC123456",
  yearsInBusiness: 15,
  projectsCompleted: 500,

  // Social links (leave empty string "" to hide that icon).
  social: {
    facebook: "https://www.facebook.com/share/1EbeuYsa9W/?mibextid=wwXIfr",
    instagram: "",
    google: "",
  },

  // Google reviews.
  // - reviewUrl: the "write a review" link customers click to leave a review.
  //   Get it from your Google Business Profile → Ask for reviews → copy the
  //   short link (looks like https://g.page/r/XXXXXXXX/review).
  // - profileUrl: link to your Google listing where all reviews are shown.
  // Until you have these, the placeholders point to a Google search.
  google: {
    reviewUrl: "https://www.google.com/search?q=PHILL+CONTRACTING+reviews",
    profileUrl: "https://www.google.com/search?q=PHILL+CONTRACTING",
  },

  // Set to true once you have real Google reviews to feature. When false, the
  // Reviews section only shows the "leave us a review" call-to-action.
  showReviews: false,

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

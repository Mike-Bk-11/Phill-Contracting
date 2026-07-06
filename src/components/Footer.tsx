import Image from "next/image";
import { Container } from "./ui/Container";
import { navLinks, siteConfig } from "@/data/siteConfig";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-100">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + blurb */}
          <div>
            {/* Logo rendered white via a filter so it reads on the dark footer. */}
            <Image
              src={siteConfig.logo}
              alt={`${siteConfig.name} logo`}
              width={siteConfig.logoWidth}
              height={siteConfig.logoHeight}
              className="h-12 w-auto [filter:brightness(0)_invert(1)]"
            />
            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              {siteConfig.tagline}. Licensed & insured.
            </p>
            <SocialLinks />
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-brand-200 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-200">
              <li>
                <a href={siteConfig.phoneHref} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={siteConfig.emailHref} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Hours
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-200">
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-brand-300">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-brand-300 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>Serving {siteConfig.serviceArea}.</p>
        </div>
      </Container>
    </footer>
  );
}

/** Renders a row of social icons, showing only the platforms with a URL set. */
function SocialLinks() {
  const links = [
    { key: "facebook", href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { key: "instagram", href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  ].filter((l) => l.href);

  if (links.length === 0) return null;

  return (
    <div className="mt-5 flex items-center gap-3">
      {links.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-500"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

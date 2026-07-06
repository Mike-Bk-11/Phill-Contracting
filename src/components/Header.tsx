"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { navLinks, siteConfig } from "@/data/siteConfig";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${
        scrolled
          ? "border-brand-100 bg-cream/95 shadow-md backdrop-blur"
          : "border-transparent bg-cream"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo — save your file at public/logo.png (see src/data/siteConfig.ts). */}
          <a href="#home" className="flex items-center" aria-label={siteConfig.name}>
            <Image
              src={siteConfig.logo}
              alt={`${siteConfig.name} logo`}
              width={siteConfig.logoWidth}
              height={siteConfig.logoHeight}
              priority
              className="h-11 w-auto sm:h-14"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-700 transition-colors hover:text-accent-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={siteConfig.phoneHref}
              className="text-sm font-semibold text-brand-800 hover:text-accent-600"
            >
              {siteConfig.phone}
            </a>
            <Button as="link" href="#contact" size="sm">
              Get a Quote
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-brand-800 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <nav
            className="space-y-1 border-t border-brand-100 bg-cream px-4 pb-6 pt-2"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-brand-700 hover:bg-brand-100 hover:text-brand-900"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={siteConfig.phoneHref}
                className="rounded-md px-3 py-2 text-center text-base font-semibold text-brand-800"
              >
                Call {siteConfig.phone}
              </a>
              <Button as="link" href="#contact" onClick={() => setOpen(false)}>
                Get a Free Quote
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

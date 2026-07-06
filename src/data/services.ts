/**
 * Services offered. Icons use lucide-style names rendered via inline SVG in the
 * Services section. TODO: Adjust services, descriptions, and features to match
 * the actual work the company performs.
 */
export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  features: string[];
};

export type ServiceIcon =
  | "kitchen"
  | "bath"
  | "addition"
  | "roofing"
  | "flooring"
  | "exterior";

export const services: Service[] = [
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    description:
      "Transform the heart of your home with custom cabinetry, countertops, and modern layouts built to last.",
    icon: "kitchen",
    features: ["Custom cabinets", "Countertops & backsplash", "Lighting & islands"],
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    description:
      "From spa-like showers to full renovations, we create beautiful, functional bathrooms on time and on budget.",
    icon: "bath",
    features: ["Walk-in showers", "Vanities & tile", "Plumbing updates"],
  },
  {
    slug: "home-additions",
    title: "Home Additions",
    description:
      "Add space and value with room additions, second stories, and in-law suites designed around your needs.",
    icon: "addition",
    features: ["Room additions", "Second stories", "Sunrooms & garages"],
  },
  {
    slug: "roofing",
    title: "Roofing",
    description:
      "Protect your investment with durable roof installation, repair, and replacement using quality materials.",
    icon: "roofing",
    features: ["Repairs & replacement", "Shingle & metal", "Storm damage"],
  },
  {
    slug: "flooring",
    title: "Flooring",
    description:
      "Upgrade any room with hardwood, tile, laminate, or luxury vinyl installed by experienced craftsmen.",
    icon: "flooring",
    features: ["Hardwood & LVP", "Tile & stone", "Subfloor repair"],
  },
  {
    slug: "exterior-siding",
    title: "Exterior & Siding",
    description:
      "Boost curb appeal and efficiency with new siding, decks, windows, and complete exterior renovations.",
    icon: "exterior",
    features: ["Siding & decks", "Windows & doors", "Painting"],
  },
];

/**
 * Customer testimonials.
 * TODO: Replace with real, permission-granted customer reviews.
 */
export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number; // 1-5
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    location: "Boston, MA",
    rating: 5,
    quote:
      "Phill and his team completely transformed our kitchen. They were on time, on budget, and the craftsmanship is outstanding. We couldn't be happier!",
  },
  {
    id: "t2",
    name: "James T.",
    location: "Cambridge, MA",
    rating: 5,
    quote:
      "Professional from start to finish. Our bathroom remodel looks like something out of a magazine. Highly recommend PHILL CONTRACTING.",
  },
  {
    id: "t3",
    name: "Linda & Robert K.",
    location: "Newton, MA",
    rating: 5,
    quote:
      "They handled our home addition with real care and clear communication. The quality of work exceeded our expectations.",
  },
  {
    id: "t4",
    name: "Michael D.",
    location: "Somerville, MA",
    rating: 5,
    quote:
      "Honest, reliable, and skilled. The new siding and deck look incredible. This is the contractor you've been looking for.",
  },
];

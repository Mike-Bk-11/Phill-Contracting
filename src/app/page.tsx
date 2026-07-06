import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { CallToAction } from "@/sections/CallToAction";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Projects />
      <CallToAction />
      <Testimonials />
      <Contact />
    </>
  );
}

import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { CallToAction } from "@/sections/CallToAction";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <Services />
      <About />
      <Projects projects={projects} />
      <CallToAction />
      <Testimonials />
      <Contact />
    </>
  );
}

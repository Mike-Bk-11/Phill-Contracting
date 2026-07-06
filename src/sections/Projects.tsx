"use client";

import { useState } from "react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

type Filter = "All" | ProjectCategory;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const filters: Filter[] = ["All", ...projectCategories];

  return (
    <Section id="projects" muted>
      <SectionHeading
        eyebrow="Our Work"
        title="Recent Projects"
        description="A look at some of the homes we've transformed. Every project reflects our commitment to quality."
      />

      {/* Filter buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-accent-500 text-white"
                : "bg-white text-brand-700 hover:bg-brand-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setActive(project)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="inline-block rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
                {project.category}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-white">
                {project.title}
              </h3>
              <p className="text-sm text-brand-200">{project.location}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-white">
              <div>
                <h3 className="font-display text-xl font-bold">{active.title}</h3>
                <p className="text-brand-200">
                  {active.category} · {active.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

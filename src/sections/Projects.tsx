"use client";

import { useState } from "react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

type Filter = "All" | ProjectCategory;

// Blob-hosted photos are served straight from the CDN; skipping the Next image
// optimizer avoids timeouts on large uploads (and works the same in prod).
const isRemote = (src: string) => /^https?:\/\//.test(src);

export function Projects({ projects }: { projects: Project[] }) {
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

      {/* All: square category tiles side by side */}
      {filter === "All" ? (
        <div className="mt-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {projectCategories
              .map((cat) => ({
                cat,
                items: projects.filter((p) => p.category === cat),
              }))
              .filter((g) => g.items.length > 0)
              .map(({ cat, items }) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  aria-label={`View all ${cat} projects`}
                  className="group relative aspect-square overflow-hidden rounded-2xl text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                >
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 bg-brand-100">
                    {items.slice(0, 4).map((project) => (
                      <div
                        key={project.id}
                        className="relative overflow-hidden"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          unoptimized={isRemote(project.image)}
                          sizes="(min-width: 1024px) 12vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                      {cat}
                    </h3>
                    <p className="text-sm text-brand-200">
                      {items.length} photo{items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </button>
              ))}
          </div>

          {projects.length === 0 && (
            <p className="mt-6 text-center text-brand-500">
              No projects to show yet. Check back soon.
            </p>
          )}
        </div>
      ) : (
        /* Single category: full grid */
        <>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="text-sm font-medium text-brand-500 hover:text-brand-900"
            >
              &larr; All categories
            </button>
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  unoptimized={isRemote(project.image)}
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

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-brand-500">
              No projects to show yet. Check back soon.
            </p>
          )}
        </>
      )}

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
                unoptimized={isRemote(active.image)}
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

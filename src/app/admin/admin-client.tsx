"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { projectCategories, type ProjectCategory } from "@/data/projects";

type AdminProject = {
  id: number;
  title: string;
  category: ProjectCategory;
  location: string;
  imageUrl: string;
};

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed.");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <h1 className="font-display text-2xl font-bold text-brand-900">
        Admin sign in
      </h1>
      <p className="mt-1 text-sm text-brand-500">
        Enter the admin password to manage projects.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-brand-200 px-4 py-2.5 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent-500 px-4 py-2.5 font-semibold text-white hover:bg-accent-600 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export function AdminDashboard({
  initialProjects,
}: {
  initialProjects: AdminProject[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProjectCategory>(
    projectCategories[0]
  );
  const [location, setLocation] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (files.length === 0) {
      setError("Please choose at least one image.");
      return;
    }

    const body = new FormData();
    body.set("title", title);
    body.set("category", category);
    body.set("location", location);
    for (const f of files) body.append("image", f);

    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        return;
      }
      const count = data.count ?? 1;
      setMessage(`Added ${count} photo${count === 1 ? "" : "s"}.`);
      setTitle("");
      setLocation("");
      setCategory(projectCategories[0]);
      setFiles([]);
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  async function onLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-900">
          Manage projects
        </h1>
        <button
          type="button"
          onClick={onLogout}
          className="text-sm font-medium text-brand-500 hover:text-brand-900"
        >
          Sign out
        </button>
      </div>

      {/* Upload form */}
      <form
        onSubmit={onUpload}
        className="mt-8 grid gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-brand-700">
            Photos <span className="text-brand-400">(you can select several)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            className="mt-1 block w-full text-sm text-brand-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-100 file:px-4 file:py-2 file:font-medium file:text-brand-700 hover:file:bg-brand-200"
          />
          {files.length > 0 && (
            <p className="mt-1 text-xs text-brand-500">
              {files.length} file{files.length === 1 ? "" : "s"} selected
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Custom White Kitchen"
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProjectCategory)}
            className="mt-1 w-full rounded-lg border border-brand-200 bg-white px-3 py-2 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30"
          >
            {projectCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-brand-700">
            Location <span className="text-brand-400">(optional)</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Norwood, MA"
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30"
          />
        </div>

        <div className="sm:col-span-2 flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-accent-500 px-5 py-2.5 font-semibold text-white hover:bg-accent-600 disabled:opacity-60"
          >
            {loading
              ? "Uploading…"
              : files.length > 1
                ? `Add ${files.length} photos`
                : "Add photo"}
          </button>
          {message && <p className="text-sm text-green-600">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>

      {/* Existing projects */}
      <h2 className="mt-12 font-display text-lg font-bold text-brand-900">
        Current projects ({initialProjects.length})
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {initialProjects.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={p.imageUrl}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <span className="inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                {p.category}
              </span>
              <h3 className="mt-1.5 font-semibold text-brand-900">{p.title}</h3>
              {p.location && (
                <p className="text-sm text-brand-500">{p.location}</p>
              )}
              <button
                type="button"
                onClick={() => onDelete(p.id)}
                disabled={deletingId === p.id}
                className="mt-3 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-60"
              >
                {deletingId === p.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {initialProjects.length === 0 && (
        <p className="mt-4 text-sm text-brand-500">
          No projects yet. Add your first one above.
        </p>
      )}
    </div>
  );
}

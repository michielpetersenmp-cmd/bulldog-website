"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { generateSlug, type Post } from "@/lib/supabase";
import { Upload, X, Eye, Save, ArrowLeft, ImageIcon } from "lucide-react";

type PostFormProps = {
  initial?: Partial<Post>;
  isEdit?: boolean;
};

export default function PostForm({ initial, isEdit }: PostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    image_url: initial?.image_url ?? "",
    category: initial?.category ?? "blog",
    tags: (initial?.tags ?? []).join(", "),
    published: initial?.published ?? false,
    featured: initial?.featured ?? false,
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Auto-slug bij nieuwe post
      if (field === "title" && !isEdit) {
        next.slug = generateSlug(value as string);
      }
      return next;
    });
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      update("image_url", data.url);
    } catch (e: any) {
      setError(`Upload mislukt: ${e.message}`);
    }
    setUploading(false);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) uploadImage(file);
  }

  async function handleSave(publish?: boolean) {
    setSaving(true);
    setError("");
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        content: form.content,
        image_url: form.image_url || null,
        category: form.category,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        published: publish !== undefined ? publish : form.published,
        featured: form.featured,
      };

      const url = isEdit ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      router.push("/admin/posts");
    } catch (e: any) {
      setError(e.message);
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Admin header */}
      <header className="bg-primary text-white px-4 py-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/posts")}
              className="flex items-center gap-1 text-white/70 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft size={16} /> Terug
            </button>
            <span className="text-white/30">|</span>
            <span className="font-semibold text-white text-sm">
              {isEdit ? "Post bewerken" : "Nieuwe post"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-1 text-white/70 hover:text-white text-sm transition-colors"
            >
              <Eye size={14} /> {preview ? "Editor" : "Preview"}
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              Concept opslaan
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving || !form.title || !form.content}
              className="btn-primary text-sm disabled:opacity-50"
            >
              <Save size={14} /> {saving ? "Opslaan..." : "Publiceren"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Hoofdinhoud */}
          <div className="lg:col-span-2 space-y-4">
            {/* Titel */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Titel van de post..."
                className="w-full text-2xl font-display font-bold text-primary placeholder-gray-300 border-none outline-none resize-none"
              />
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-400">Slug:</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => update("slug", e.target.value)}
                  className="text-xs text-gray-500 border-b border-dashed border-gray-300 outline-none flex-1 bg-transparent"
                />
              </div>
            </div>

            {/* Samenvatting */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Samenvatting <span className="text-gray-400 font-normal">(optioneel, wordt getoond in de kaarten)</span>
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                rows={2}
                placeholder="Korte samenvatting..."
                className="w-full text-sm text-gray-600 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Inhoud <span className="text-gray-400 font-normal">(Markdown ondersteund)</span>
              </label>
              {preview ? (
                <div
                  className="min-h-64 prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{
                    __html: form.content
                      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
                      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
                      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                      .replace(/^- (.+)$/gm, "<li>$1</li>")
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/^(?!<)(.+)$/gm, "<p>$1</p>"),
                  }}
                />
              ) : (
                <textarea
                  value={form.content}
                  onChange={(e) => update("content", e.target.value)}
                  rows={20}
                  placeholder={`# Titel\n\nSchrijf hier de inhoud van uw blog of update...\n\n## Subtitel\n\nGebruik **vet** voor dikgedrukte tekst.\n\n- Punt één\n- Punt twee`}
                  className="w-full text-sm text-gray-700 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono leading-relaxed"
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Instellingen */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-primary mb-4">Instellingen</h3>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["blog", "update"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => update("category", cat)}
                      className={`py-2 rounded-xl text-sm font-semibold transition-colors ${
                        form.category === cat
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat === "blog" ? "📝 Blog" : "📢 Update"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => update("tags", e.target.value)}
                  placeholder="gezondheid, evenement, actie"
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-xs text-gray-400 mt-1">Komma-gescheiden</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => update("published", e.target.checked)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Gepubliceerd</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => update("featured", e.target.checked)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">⭐ Uitgelicht</span>
                </label>
              </div>
            </div>

            {/* Afbeelding */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-primary mb-4">Afbeelding</h3>

              {form.image_url ? (
                <div className="relative">
                  <div className="relative h-40 rounded-xl overflow-hidden">
                    <Image src={form.image_url} alt="Preview" fill className="object-cover" />
                  </div>
                  <button
                    onClick={() => update("image_url", "")}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div
                  onDrop={onDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary/40 transition-colors"
                >
                  <ImageIcon size={28} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-400 mb-3">
                    Sleep een afbeelding hier of kies een bestand
                  </p>
                  <label className="btn-secondary text-xs cursor-pointer">
                    <Upload size={12} />
                    {uploading ? "Uploaden..." : "Kies bestand"}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
                      disabled={uploading}
                    />
                  </label>
                </div>
              )}

              <div className="mt-3">
                <label className="block text-xs text-gray-500 mb-1">Of plak een URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => update("image_url", e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

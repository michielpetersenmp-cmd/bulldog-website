"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, BookOpen, Megaphone } from "lucide-react";
import type { Post } from "@/lib/supabase";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "blog" | "update">("all");
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch("/api/admin/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
    setLoading(false);
  }

  async function togglePublished(post: Post) {
    await fetch(`/api/admin/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts();
  }

  async function deletePost(post: Post) {
    if (!confirm(`Weet u zeker dat u "${post.title}" wilt verwijderen?`)) return;
    await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    fetchPosts();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const blogCount = posts.filter((p) => p.category === "blog").length;
  const updateCount = posts.filter((p) => p.category === "update").length;
  const publishedCount = posts.filter((p) => p.published).length;

  return (
    <div className="min-h-screen bg-bg">
      {/* Admin header */}
      <header className="bg-primary text-white px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐾</span>
            <div>
              <p className="font-display font-bold text-white">Admin Panel</p>
              <p className="text-white/60 text-xs">Bulldog Steunfonds</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              <Eye size={14} /> Website
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut size={14} /> Uitloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Totaal", value: posts.length, icon: "📝" },
            { label: "Gepubliceerd", value: publishedCount, icon: "✅" },
            { label: "Concept", value: posts.length - publishedCount, icon: "📋" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-card p-5 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            {([
              { key: "all", label: `Alle (${posts.length})` },
              { key: "blog", label: `Blog (${blogCount})`, icon: BookOpen },
              { key: "update", label: `Updates (${updateCount})`, icon: Megaphone },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  filter === tab.key
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-card"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Link
            href="/admin/posts/nieuw"
            className="btn-primary text-sm"
          >
            <Plus size={16} /> Nieuwe post
          </Link>
        </div>

        {/* Posts lijst */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Laden...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-card">
            <div className="text-5xl mb-3">📝</div>
            <p className="text-gray-500">Nog geen posts. Maak de eerste aan!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Titel
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
                    Type
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden md:table-cell">
                    Datum
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-primary text-sm leading-tight">
                        {post.title}
                      </div>
                      {post.excerpt && (
                        <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                          {post.excerpt}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          post.category === "blog"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/15 text-primary"
                        }`}
                      >
                        {post.category === "blog" ? "Blog" : "Update"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-400 hidden md:table-cell">
                      {new Date(post.created_at).toLocaleDateString("nl-NL")}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => togglePublished(post)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                          post.published
                            ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600"
                            : "bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700"
                        }`}
                        title={post.published ? "Klik om te verbergen" : "Klik om te publiceren"}
                      >
                        {post.published ? "Gepubliceerd" : "Concept"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/8 rounded-lg transition-colors"
                          title="Bewerken"
                        >
                          <Edit size={15} />
                        </Link>
                        <a
                          href={`/${post.category === "blog" ? "blog" : "updates"}/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                          title="Bekijk op website"
                        >
                          <Eye size={15} />
                        </a>
                        <button
                          onClick={() => deletePost(post)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Verwijderen"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

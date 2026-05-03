import type { Metadata } from "next";
import { getPosts } from "@/lib/supabase";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Lees onze nieuwste verhalen, tips en informatie over bulldogs, gezondheid en de stichting.",
};

export const revalidate = 60; // elke minuut opnieuw ophalen

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getPosts("blog");
  } catch {
    // Supabase nog niet geconfigureerd
  }

  return (
    <>
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
              Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Verhalen, tips & nieuws
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Alles over bulldogs, gezondheid, evenementen en het werk van onze stichting.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🐾</div>
              <h2 className="font-display text-2xl font-bold text-primary mb-2">
                Binnenkort meer blogs
              </h2>
              <p className="text-gray-500">
                De eerste blogs verschijnen hier zodra ze gepubliceerd worden.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

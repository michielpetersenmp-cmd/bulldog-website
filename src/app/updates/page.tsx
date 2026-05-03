import type { Metadata } from "next";
import { getPosts } from "@/lib/supabase";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Updates",
  description: "Nieuws en updates van Stichting Bulldog Steunfonds Nederland.",
};

export const revalidate = 60;

export default async function UpdatesPage() {
  let posts: any[] = [];
  try {
    posts = await getPosts("update");
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
              Updates
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Nieuws & updates
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Blijf op de hoogte van evenementen, acties en nieuws van de stichting.
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
              <div className="text-6xl mb-4">📢</div>
              <h2 className="font-display text-2xl font-bold text-primary mb-2">
                Binnenkort meer updates
              </h2>
              <p className="text-gray-500">
                Updates over evenementen en acties verschijnen hier zodra ze gepubliceerd worden.
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

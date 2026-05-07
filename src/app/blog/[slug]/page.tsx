import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getPosts, formatDate } from "@/lib/supabase";
import { Calendar, Tag, ChevronLeft, Heart } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getPosts("blog");
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Blog niet gevonden" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

// Simpele markdown → HTML renderer (zonder extra dependencies)
function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="font-display font-bold text-primary text-xl mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-display font-bold text-primary text-2xl mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-display font-bold text-primary text-3xl mt-6 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 mb-1"><span class="text-accent mt-1">•</span><span>$1</span></li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-1 my-4">$&</ul>')
    .replace(/^(?!<[h|u|l])(.+)$/gm, (match) => {
      if (match.trim() === "") return "";
      return `<p class="text-gray-600 leading-relaxed mb-4">${match}</p>`;
    });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);

  return (
    <>
      {/* Hero met afbeelding */}
      <section className="pt-20 bg-primary relative overflow-hidden">
        {post.image_url && (
          <div className="absolute inset-0">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft size={16} /> Terug naar blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
              Blog
            </span>
            {post.tags?.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-white/60 text-xs">
                <Tag size={11} /> {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Calendar size={14} />
            {formatDate(post.created_at)}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 20C1200 40 960 0 720 10C480 20 240 40 0 20L0 40Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Uitgelichte afbeelding */}
          {post.image_url && (
            <className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-hover mb-10 max-w-2xl mx-auto">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Artikel content */}
          <article className="bg-white rounded-3xl shadow-card p-8 md:p-10">
            {post.excerpt && (
              <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8 pb-8 border-b border-gray-100">
                {post.excerpt}
              </p>
            )}
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>

          {/* CTA */}
          <div className="mt-8 bg-primary rounded-2xl p-6 text-center text-white">
            <p className="font-semibold mb-3">Steun ons werk voor bulldogs in nood</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/doneren" className="btn-primary text-sm">
                <Heart size={14} /> Doneer nu
              </Link>
              <Link href="/aanvragen" className="btn-outline-white text-sm">
                Hulp aanvragen
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-primary hover:text-primary-light font-semibold text-sm transition-colors"
            >
              <ChevronLeft size={16} /> Alle blogs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

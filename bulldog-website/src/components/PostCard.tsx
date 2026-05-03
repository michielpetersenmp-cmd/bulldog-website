import Link from "next/link";
import Image from "next/image";
import { formatDate, type Post } from "@/lib/supabase";
import { Calendar, Tag } from "lucide-react";

export default function PostCard({ post }: { post: Post }) {
  const href = `/${post.category === "blog" ? "blog" : "updates"}/${post.slug}`;

  return (
    <Link href={href} className="group block">
      <article className="bg-white rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
        {/* Afbeelding */}
        <div className="relative h-48 bg-primary/8 overflow-hidden">
          {post.image_url ? (
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl">
              🐾
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                post.category === "blog"
                  ? "bg-primary text-white"
                  : "bg-accent text-primary"
              }`}
            >
              {post.category === "blog" ? "Blog" : "Update"}
            </span>
          </div>
          {post.featured && (
            <div className="absolute top-3 right-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-primary shadow">
                ⭐ Uitgelicht
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(post.created_at)}
            </span>
            {post.tags?.length > 0 && (
              <span className="flex items-center gap-1">
                <Tag size={12} />
                {post.tags[0]}
              </span>
            )}
          </div>

          <h3 className="font-display font-bold text-primary text-lg leading-tight mb-2 group-hover:text-primary-light transition-colors">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}

          <div className="mt-4 text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Lees meer →
          </div>
        </div>
      </article>
    </Link>
  );
}

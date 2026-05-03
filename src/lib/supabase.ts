import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSupabaseAdmin = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceKey);
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  category: "blog" | "update";
  tags: string[];
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export async function getPosts(category?: "blog" | "update", limit = 100) {
  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data as Post[];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) return null;
  return data as Post;
}

export async function getFeaturedPosts(limit = 3) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as Post[];
}

export async function getAllPostsAdmin() {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Post[];
}

export async function getPostByIdAdmin(id: string) {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Post;
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

import { getPostByIdAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PostForm from "@/components/PostForm";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  let post = null;
  try {
    post = await getPostByIdAdmin(params.id);
  } catch {}

  if (!post) notFound();

  return <PostForm initial={post} isEdit />;
}

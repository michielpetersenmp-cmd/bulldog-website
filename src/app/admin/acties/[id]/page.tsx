import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import ActieForm from "@/components/ActieForm";

export default async function EditActiePage({ params }: { params: { id: string } }) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data } = await supabase.from("acties").select("*").eq("id", params.id).single();
  if (!data) notFound();
  return <ActieForm initial={data} isEdit />;
}

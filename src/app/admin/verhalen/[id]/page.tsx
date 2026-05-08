import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import VerhaalForm from "@/components/VerhaalForm";

export default async function EditVerhaalPage({ params }: { params: { id: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase.from("verhalen").select("*").eq("id", params.id).single();
  if (!data) notFound();
  return <VerhaalForm initial={data} isEdit />;
}

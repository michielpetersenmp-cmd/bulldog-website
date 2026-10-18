import { getSupabaseAdmin } from "@/lib/supabase";

export type VeilingTestLot = {
  id: number;
  lot_number: number;
  title: string;
  sponsor: string | null;
  description: string | null;
  start_bid: number;
  current_bid: number;
  bid_count: number;
  active: boolean;
  closes_at: string;
  image_url: string | null;
  sponsor_website: string | null;
  sponsor_facebook: string | null;
  image_url: string | null;
  sponsor_website: string | null;
  sponsor_facebook: string | null;
  image_preview_url?: string | null;
};

export async function getVeilingTestLots(): Promise<VeilingTestLot[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("veiling_test_lots")
    .select("id,lot_number,title,sponsor,description,start_bid,current_bid,bid_count,active,closes_at,image_url,sponsor_website,sponsor_facebook,image_url,sponsor_website,sponsor_facebook")
    .order("lot_number", { ascending: true });
  if (error) throw error;
  const lots = (data || []) as VeilingTestLot[];
  return Promise.all(lots.map(async lot => {
    if (!lot.image_url) return lot;
    const { data: url } = await getSupabaseAdmin().storage.from("veiling-test-fotos").createSignedUrl(lot.image_url, 3600);
    return { ...lot, image_preview_url: url?.signedUrl || null };
  }));
}

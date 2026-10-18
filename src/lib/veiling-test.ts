import { getSupabaseAdmin } from "@/lib/supabase";

export type VeilingTestLot = {
  id: number;
  lot_number: number;
  title: string;
  sponsor: string | null;
  sponsor_website: string | null;
  sponsor_facebook: string | null;
  sponsor_instagram: string | null;
  description: string | null;
  start_bid: number;
  current_bid: number;
  bid_count: number;
  active: boolean;
  closes_at: string;
  image_url: string | null;
  image_urls: string[];
  photos: { path: string; url: string }[];
};

export async function getVeilingTestLots(): Promise<VeilingTestLot[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("veiling_test_lots")
    .select("id,lot_number,title,sponsor,sponsor_website,sponsor_facebook,sponsor_instagram,description,start_bid,current_bid,bid_count,active,closes_at,image_url,image_urls")
    .order("lot_number", { ascending: true });
  if (error) throw error;

  return Promise.all((data || []).map(async lot => {
    const paths = Array.from(new Set([...(lot.image_urls || []), ...(lot.image_url ? [lot.image_url] : [])]));
    const ordered = lot.image_url ? [lot.image_url, ...(lot.image_urls || []).filter(path => path !== lot.image_url)] : (lot.image_urls || []);
    const { data: signed } = paths.length
      ? await admin.storage.from("veiling-test-fotos").createSignedUrls(paths, 3600)
      : { data: [] };
    const urls = new Map((signed || []).filter(item => typeof item.signedUrl === "string").map(item => [item.path, item.signedUrl]));
    return { ...lot, image_urls: ordered, photos: ordered.map(path => ({ path, url: urls.get(path) || "" })).filter(photo => photo.url) };
  })) as VeilingTestLot[];
}

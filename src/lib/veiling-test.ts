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
};

export async function getVeilingTestLots(): Promise<VeilingTestLot[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("veiling_test_lots")
    .select("id,lot_number,title,sponsor,description,start_bid,current_bid,bid_count,active,closes_at")
    .order("lot_number", { ascending: true });
  if (error) throw error;
  return (data || []) as VeilingTestLot[];
}

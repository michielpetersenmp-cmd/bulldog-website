import { createClient } from "@supabase/supabase-js";

export const HISTORISCHE_ACTIES = 7;
export const HISTORISCHE_OPBRENGST = 2074.45;
export const MIN_BULLDOGS_GEHolPEN = 6;
export const MIN_DONATIES = 2295;

export type SiteStats = {
  bulldogsGeholpen: number;
  donatiesTotaal: number;
  actiesTotaal: number;
  actiesAfgerond: number;
  actiesLopend: number;
  opbrengstActies: number;
  beheerdeActies: number;
};

export async function getSiteStats(): Promise<SiteStats> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [statsRes, actiesRes, verhalenRes] = await Promise.all([
    supabase.from("stats").select("*"),
    supabase.from("acties").select("id,status,opbrengst"),
    supabase.from("verhalen").select("id,status"),
  ]);

  const stats = statsRes.data || [];
  const acties = actiesRes.data || [];
  const verhalen = verhalenRes.data || [];

  const geregistreerdeBulldogs = Number(
    stats.find((s: any) => s.id === "bulldogs_geholpen")?.waarde || 0
  );
  const geregistreerdeDonaties = Number(
    stats.find((s: any) => s.id === "donaties_dit_jaar")?.waarde || 0
  );
  const geholpenUitVerhalen = verhalen.filter((v: any) => v.status === "geholpen").length;

  const opbrengstBeheerdeActies = acties.reduce(
    (sum: number, a: any) => sum + Number(a.opbrengst || 0),
    0
  );
  const afgerondeBeheerdeActies = acties.filter((a: any) => a.status === "afgerond").length;
  const lopendeBeheerdeActies = acties.filter((a: any) => a.status === "lopend").length;

  return {
    bulldogsGeholpen: Math.max(MIN_BULLDOGS_GEHolPEN, geregistreerdeBulldogs, geholpenUitVerhalen),
    donatiesTotaal: Math.max(MIN_DONATIES, geregistreerdeDonaties),
    actiesTotaal: HISTORISCHE_ACTIES + acties.length,
    actiesAfgerond: HISTORISCHE_ACTIES + afgerondeBeheerdeActies,
    actiesLopend: lopendeBeheerdeActies,
    opbrengstActies: HISTORISCHE_OPBRENGST + opbrengstBeheerdeActies,
    beheerdeActies: acties.length,
  };
}

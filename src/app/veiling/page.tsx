import { getSupabaseAdmin } from "@/lib/supabase";
import { getCurrentVeilingParticipant } from "@/lib/veiling-participant-session";
import { getVeilingTestLots } from "@/lib/veiling-test";
import VeilingPubliek from "./VeilingPubliek";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Bulldogveiling",
  description: "Bekijk de kavels van de Bulldogveiling en meld je aan zodat je de start niet mist.",
  robots: { index: true, follow: true },
};

export default async function VeilingPage({ searchParams }: { searchParams?: { kavel?: string } }) {
  const admin = getSupabaseAdmin();
  const testMode = process.env.VERCEL_ENV !== "production";
  const settingsTable = testMode ? "veiling_participant_test_settings" : "veiling_settings";
  const [lots, participant, settingsResult] = await Promise.all([
    getVeilingTestLots(testMode ? "test" : "live"),
    getCurrentVeilingParticipant(),
    admin.from(settingsTable).select("bidding_enabled,closed_at").eq("id", true).maybeSingle(),
  ]);
  return <VeilingPubliek
    lots={lots}
    loggedIn={Boolean(participant)}
    biddingEnabled={Boolean(settingsResult.data?.bidding_enabled)}
    auctionClosed={Boolean(settingsResult.data?.closed_at)}
    testMode={testMode}
    initialLotId={Number(searchParams?.kavel) || undefined}
  />;
}

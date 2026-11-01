import { getSupabaseAdmin } from "@/lib/supabase";
import { getCurrentVeilingParticipant } from "@/lib/veiling-participant-session";
import { getVeilingTestLots } from "@/lib/veiling-test";
import VeilingPubliek from "./VeilingPubliek";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Bulldogveiling",
  description: "Bekijk de kavels van de Bulldogveiling en meld je aan zodat je de start niet mist.",
  robots: { index: false, follow: false },
};

export default async function VeilingPage() {
  const admin = getSupabaseAdmin();
  const [lots, participant, settingsResult] = await Promise.all([
    getVeilingTestLots(),
    getCurrentVeilingParticipant(),
    admin.from("veiling_participant_test_settings").select("bidding_enabled").eq("id", true).maybeSingle(),
  ]);
  return <VeilingPubliek lots={lots} loggedIn={Boolean(participant)} biddingEnabled={Boolean(settingsResult.data?.bidding_enabled)} />;
}

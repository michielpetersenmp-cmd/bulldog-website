import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/AdminNav";
import Lotbeheer from "./Lotbeheer";
import VeilingOverzicht from "./VeilingOverzicht";
import Testbiedingen from "./Testbiedingen";
import Emailtest from "./Emailtest";
import Vooraanmeldingen from "./Vooraanmeldingen";
import Deelnemersbiedingen from "./Deelnemersbiedingen";
import VeilingTestStatus from "./VeilingTestStatus";

export const dynamic = "force-dynamic";
export const metadata = { title: "Veilingbeheer | Websitebeheer", robots: { index: false, follow: false } };

export default async function VeilingAdminPage() {
  const admin = getSupabaseAdmin();
  const isProduction = process.env.VERCEL_ENV === "production";
  const [{ data: rows, error }, { data: bidders }, { data: bids }, { data: outbox }, { data: registrations }, { data: accountBids }, { data: accountStates }, { data: accountOutbox }, { data: testSettings }, { data: testWinners }, { data: categories }] = await Promise.all([
    admin.from("veiling_test_lots").select("id,lot_number,title,category,description,sponsor,sponsor_website,sponsor_facebook,sponsor_instagram,start_bid,retail_value,current_bid,current_bidder_id,bid_count,active,closes_at,image_url,image_urls").order("lot_number"),
    admin.from("veiling_test_bidders").select("id,name,email,created_at").order("created_at", { ascending: false }).limit(100),
    admin.from("veiling_test_bids").select("id,lot_id,bidder_id,amount,created_at").order("created_at", { ascending: false }).limit(50),
    admin.from("veiling_test_outbox").select("id,event_type,bidder_id,lot_id,delivered,created_at").order("created_at", { ascending: false }).limit(50),
    admin.from("veiling_preregistrations").select("id,name,email,status,created_at,confirmed_at").order("created_at", { ascending: false }).limit(500),
    admin.from("veiling_participant_test_bids").select("id,lot_id,participant_id,amount,created_at").order("created_at", { ascending: false }).limit(200),
    admin.from("veiling_participant_test_lot_state").select("lot_id,current_bidder_id,current_bid"),
    admin.from("veiling_participant_test_outbox").select("id,participant_id,lot_id,created_at").order("created_at", { ascending: false }).limit(100),
    admin.from("veiling_participant_test_settings").select("bidding_enabled,closed_at").eq("id", true).maybeSingle(),
    admin.from("veiling_participant_test_winners").select("lot_id,participant_id,amount,notified").order("lot_id"),
    admin.from("veiling_test_categories").select("id,name").order("name"),
  ]);

  const lots = await Promise.all((rows || []).map(async lot => {
    const imageUrls: string[] = Array.isArray(lot.image_urls) ? lot.image_urls.filter((path: unknown): path is string => typeof path === "string") : [];
    const paths = Array.from(new Set([...imageUrls, ...(lot.image_url ? [lot.image_url] : [])]));
    const signed = new Map<string, string>();
    if (paths.length) {
      const { data } = await admin.storage.from("veiling-test-fotos").createSignedUrls(paths, 3600);
      for (const item of data || []) if (typeof item.path === "string" && typeof item.signedUrl === "string") signed.set(item.path, item.signedUrl);
    }
    const ordered = lot.image_url ? [lot.image_url, ...imageUrls.filter((path: string) => path !== lot.image_url)] : imageUrls;
    return { ...lot, image_urls: ordered, photos: ordered.map(path => ({ path, url: signed.get(path) || "" })).filter(photo => photo.url) };
  }));

  return <div className="min-h-screen bg-bg">
    <AdminNav />
    <main className="mx-auto max-w-7xl px-4 py-8">
      {!isProduction && <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900"><strong>Veiling in testmodus.</strong> Proefbiedingen vanuit deelnemersaccounts staan aan. Ze blijven apart en er worden geen echte overbodenmails verzonden.</div>}
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-sm font-bold uppercase tracking-widest text-amber-700">Stichting Bulldog Steunfonds Nederland</p><h1 className="mt-2 text-3xl font-extrabold text-primary">Veilingbeheer</h1><p className="mt-2 text-gray-600">{isProduction ? "Beheer kavels, foto’s, sponsorinformatie en aanmeldingen." : "Beheer kavels, foto’s, sponsorinformatie, vooraanmeldingen en proefbiedingen."}</p></div>
        <div className="flex flex-wrap gap-3"><Link href="/veiling" target="_blank" className="rounded-xl border border-primary bg-white px-5 py-3 font-bold text-primary">Bezoekerspagina ↗</Link>{!isProduction && <Link href="/admin/veiling/voorbeeld" className="rounded-xl bg-primary px-5 py-3 font-bold text-white">Oude testbiedingen →</Link>}</div>
      </div>
      {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-800">Kon de kavels niet ophalen. Controleer de databaseverbinding.</p>}
      {!isProduction && <>
      <VeilingTestStatus
        initialEnabled={Boolean(testSettings?.bidding_enabled)}
        initialClosedAt={testSettings?.closed_at || null}
        initialWinners={(testWinners || []).map(winner => {
          const participant = (registrations || []).find(item => item.id === winner.participant_id);
          const lot = (rows || []).find(item => Number(item.id) === Number(winner.lot_id));
          return {
            lot_id: Number(winner.lot_id), lot_number: Number(lot?.lot_number || 0),
            title: lot?.title || "Kavel", participant_name: participant?.name || "Onbekend",
            participant_email: participant?.email || "", amount: Number(winner.amount), notified: Boolean(winner.notified),
          };
        })}
      />
      </>}
      <Lotbeheer initialLots={lots} initialCategories={(categories || []) as { id: number; name: string }[]} />
      <Vooraanmeldingen registrations={(registrations || []) as never[]} />
      {!isProduction && <>
      <Deelnemersbiedingen
        initialRegistrations={(registrations || []).filter(item => item.status === "confirmed") as never[]}
        initialLots={(rows || []).map(item => ({ id: item.id, lot_number: item.lot_number, title: item.title }))}
        initialBids={(accountBids || []) as never[]}
        initialStates={(accountStates || []) as never[]}
        initialOutbox={(accountOutbox || []) as never[]}
      />
      <VeilingOverzicht bidders={bidders || []} bids={bids || []} lots={rows || []} outbox={outbox || []} />
      <Testbiedingen initialBidders={bidders || []} lots={(rows || []).map(lot => ({ id: lot.id, lot_number: lot.lot_number, title: lot.title, current_bid: lot.current_bid, active: lot.active, closes_at: lot.closes_at }))} />
      <Emailtest />
      </>}
    </main>
  </div>;
}

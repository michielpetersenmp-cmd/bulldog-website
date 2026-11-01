import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/AdminNav";
import Lotbeheer from "./Lotbeheer";
import VeilingOverzicht from "./VeilingOverzicht";
import Testbiedingen from "./Testbiedingen";
import Emailtest from "./Emailtest";

export const dynamic = "force-dynamic";
export const metadata = { title: "Veiling testen | Websitebeheer", robots: { index: false, follow: false } };

export default async function VeilingAdminPage() {
  const admin = getSupabaseAdmin();
  const [{ data: rows, error }, { data: bidders }, { data: bids }, { data: outbox }] = await Promise.all([
    admin.from("veiling_test_lots")
      .select("id,lot_number,title,description,sponsor,sponsor_website,sponsor_facebook,sponsor_instagram,start_bid,current_bid,current_bidder_id,bid_count,active,closes_at,image_url,image_urls")
      .order("lot_number"),
    admin.from("veiling_test_bidders").select("id,name,email,created_at").order("created_at", { ascending: false }).limit(100),
    admin.from("veiling_test_bids").select("id,lot_id,bidder_id,amount,created_at").order("created_at", { ascending: false }).limit(50),
    admin.from("veiling_test_outbox").select("id,event_type,bidder_id,lot_id,delivered,created_at").order("created_at", { ascending: false }).limit(50),
  ]);

  const lots = await Promise.all((rows || []).map(async lot => {
    const imageUrls: string[] = Array.isArray(lot.image_urls)
      ? lot.image_urls.filter((path: unknown): path is string => typeof path === "string")
      : [];
    const paths = Array.from(new Set([...imageUrls, ...(lot.image_url ? [lot.image_url] : [])]));
    let signed = new Map<string, string>();
    if (paths.length) {
      const { data } = await admin.storage.from("veiling-test-fotos").createSignedUrls(paths, 3600);
      for (const item of data || []) {
        if (typeof item.path === "string" && typeof item.signedUrl === "string") {
          signed.set(item.path, item.signedUrl);
        }
      }
    }
    const ordered = lot.image_url ? [lot.image_url, ...imageUrls.filter((path: string) => path !== lot.image_url)] : imageUrls;
    return { ...lot, image_urls: ordered, photos: ordered.map(path => ({ path, url: signed.get(path) || "" })).filter(photo => photo.url) };
  }));

  return <div className="min-h-screen bg-bg">
    <AdminNav />
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900">
        <strong>Veiling in testmodus.</strong> Alleen beschikbaar achter het bestaande websitebeheer. Er worden geen echte meldingen verstuurd en publiceren staat uit.
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-sm font-bold uppercase tracking-widest text-amber-700">Stichting Bulldog Steunfonds Nederland</p><h1 className="mt-2 text-3xl font-extrabold text-primary">Veilingbeheer</h1><p className="mt-2 text-gray-600">Beheer kavels, foto’s en sponsorinformatie voor het afgeschermde voorbeeld.</p></div>
        <Link href="/admin/veiling/voorbeeld" className="rounded-xl bg-primary px-5 py-3 font-bold text-white">Bekijk bezoekersvoorbeeld →</Link>
      </div>
      {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-800">Kon de testkavels niet ophalen. Controleer de databaseverbinding.</p>}
      <Lotbeheer initialLots={lots} />
      <VeilingOverzicht bidders={bidders || []} bids={bids || []} lots={rows || []} outbox={outbox || []} />
      <Testbiedingen initialBidders={bidders || []} lots={(rows || []).map(lot => ({ id: lot.id, lot_number: lot.lot_number, title: lot.title, current_bid: lot.current_bid, active: lot.active, closes_at: lot.closes_at }))} />
      <Emailtest />
    </main>
  </div>;
}

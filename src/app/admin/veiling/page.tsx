import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/AdminNav";
import Lotbeheer from "./Lotbeheer";

export const dynamic = "force-dynamic";
export const metadata = { title: "Veiling testen | Websitebeheer", robots: { index: false, follow: false } };

export default async function VeilingAdminPage() {
  const admin = getSupabaseAdmin();
  const [{ data: rows, error }, { count: bidderCount }, { count: bidCount }] = await Promise.all([
    admin.from("veiling_test_lots")
      .select("id,lot_number,title,description,sponsor,sponsor_website,sponsor_facebook,sponsor_instagram,start_bid,current_bid,bid_count,active,image_url,image_urls")
      .order("lot_number"),
    admin.from("veiling_test_bidders").select("*", { count: "exact", head: true }),
    admin.from("veiling_test_bids").select("*", { count: "exact", head: true }),
  ]);

  const lots = await Promise.all((rows || []).map(async lot => {
    const paths = Array.from(new Set([...(lot.image_urls || []), ...(lot.image_url ? [lot.image_url] : [])]));
    let signed = new Map<string, string>();
    if (paths.length) {
      const { data } = await admin.storage.from("veiling-test-fotos").createSignedUrls(paths, 3600);
      signed = new Map((data || []).filter(item => typeof item.signedUrl === "string").map(item => [item.path, item.signedUrl]));
    }
    const ordered = lot.image_url ? [lot.image_url, ...(lot.image_urls || []).filter(path => path !== lot.image_url)] : (lot.image_urls || []);
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
      <div className="mt-7 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-white p-4"><p className="text-sm text-gray-500">Testkavels</p><p className="text-2xl font-bold">{lots.length}</p></div>
        <div className="rounded-xl bg-white p-4"><p className="text-sm text-gray-500">Testbieders</p><p className="text-2xl font-bold">{bidderCount || 0}</p></div>
        <div className="rounded-xl bg-white p-4"><p className="text-sm text-gray-500">Testbiedingen</p><p className="text-2xl font-bold">{bidCount || 0}</p></div>
      </div>
      {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-800">Kon de testkavels niet ophalen. Controleer de databaseverbinding.</p>}
      <Lotbeheer initialLots={lots} />
    </main>
  </div>;
}

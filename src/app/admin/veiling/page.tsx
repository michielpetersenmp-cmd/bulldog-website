import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/AdminNav";
import VeilingKavelsBewerken from "@/components/VeilingKavelsBewerken";

export const dynamic = "force-dynamic";
export const metadata = { title: "Veiling testen | Websitebeheer", robots: { index: false, follow: false } };

export default async function VeilingAdminPage() {
  const admin = getSupabaseAdmin();
  const [{ data: lots, error }, { count: bidderCount }, { count: bidCount }] = await Promise.all([
    admin.from("veiling_test_lots").select("id,lot_number,title,sponsor,start_bid,current_bid,bid_count,active,description").order("lot_number"),
    admin.from("veiling_test_bidders").select("*", { count: "exact", head: true }),
    admin.from("veiling_test_bids").select("*", { count: "exact", head: true }),
  ]);
  return <div className="min-h-screen bg-bg">
    <AdminNav />
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900">
        <strong>Veiling in testmodus.</strong> Alleen beschikbaar achter het bestaande websitebeheer. Geen echte biedingen, registratie of e-mails. Publiceren staat uit.
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-sm font-bold uppercase tracking-widest text-amber-700">Stichting Bulldog Steunfonds Nederland</p><h1 className="mt-2 text-3xl font-extrabold text-primary">Veilingbeheer</h1><p className="mt-2 text-gray-600">Bekijk de kavels en test hoe de veiling er voor bezoekers uitziet.</p></div>
        <Link href="/admin/veiling/voorbeeld" className="rounded-xl bg-primary px-5 py-3 font-bold text-white">Bekijk bezoekersvoorbeeld →</Link>
      </div>
      <div className="mt-7 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-white p-4"><p className="text-sm text-gray-500">Testkavels</p><p className="text-2xl font-bold">{lots?.length || 0}</p></div>
        <div className="rounded-xl bg-white p-4"><p className="text-sm text-gray-500">Testbieders</p><p className="text-2xl font-bold">{bidderCount || 0}</p></div>
        <div className="rounded-xl bg-white p-4"><p className="text-sm text-gray-500">Testbiedingen</p><p className="text-2xl font-bold">{bidCount || 0}</p></div>
      </div>
      <VeilingKavelsBewerken lots={lots || []} />
      <h2 className="mt-9 text-2xl font-bold text-primary">Huidige testbiedingen</h2>
      {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-800">Kon de testkavels niet ophalen. Controleer de Preview-databaseinstellingen.</p>}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(lots || []).map(lot => <article key={lot.id} className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-amber-700">KAVEL {String(lot.lot_number).padStart(3,"0")}</p>
          <h3 className="mt-2 text-xl font-bold text-primary">{lot.title}</h3>
          <p className="text-sm text-gray-500">{lot.sponsor || "Testsponsor"}</p>
          <p className="mt-4 text-2xl font-extrabold text-primary">€ {Number(lot.current_bid).toFixed(2).replace(".",",")}</p>
          <p className="mt-1 text-sm text-gray-500">{lot.bid_count} testbiedingen</p>
        </article>)}
      </div>
    </main>
  </div>;
}

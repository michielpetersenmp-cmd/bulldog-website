import Link from "next/link";
import { getVeilingTestLots } from "@/lib/veiling-test";
import VeilingVoorbeeld from "@/app/veiling/beheer/voorbeeld/voorbeeld";
export const dynamic = "force-dynamic";
export const metadata = { title: "Bezoekersvoorbeeld veiling | Test", robots: { index: false, follow: false } };
export default async function AdminVeilingVoorbeeld() {
 const lots = await getVeilingTestLots();
 return <main className="min-h-screen bg-[#f6f4ef]">
  <div className="bg-amber-100 px-5 py-3 text-center text-sm font-bold text-amber-950">AFGESCHERMD VOORBEELD · ALLEEN TEST · GEEN ECHTE BIEDINGEN</div>
  <div className="mx-auto max-w-6xl px-5 pt-5"><Link href="/admin/veiling" className="inline-block rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#183651]">← Terug naar veilingbeheer</Link></div>
  <VeilingVoorbeeld lots={lots}/>
 </main>;
}

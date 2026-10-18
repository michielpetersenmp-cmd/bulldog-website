import Link from "next/link";
import { redirect } from "next/navigation";
import { getVeilingAdmin } from "@/lib/veiling-auth";
import { getVeilingTestLots } from "@/lib/veiling-test";
import VeilingVoorbeeld from "./voorbeeld";

export const dynamic = "force-dynamic";
export const metadata = { title: "Veiling voorbeeld | Testomgeving", robots: { index: false, follow: false } };

export default async function VeilingVoorbeeldPage() {
  if (!(await getVeilingAdmin())) redirect("/veiling/beheer/login");
  const lots = await getVeilingTestLots();
  return (
    <main className="min-h-screen bg-[#f6f4ef]">
      <div className="bg-amber-100 px-5 py-3 text-center text-sm font-bold text-amber-950">
        ALLEEN VOORBEELD • AFGESCHERMDE TEST • GEEN ECHTE BIEDINGEN
      </div>
      <div className="mx-auto max-w-6xl px-5 pt-5">
        <Link href="/veiling/beheer" className="inline-block rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#183651]">
          ← Terug naar veilingbeheer
        </Link>
      </div>
      <VeilingVoorbeeld lots={lots} />
    </main>
  );
}

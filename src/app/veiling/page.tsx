import { getVeilingTestLots } from "@/lib/veiling-test";
import VeilingPubliek from "./VeilingPubliek";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Bulldogveiling",
  description: "Bekijk de kavels van de Bulldogveiling en meld je aan zodat je de start niet mist.",
  robots: { index: false, follow: false },
};

export default async function VeilingPage() {
  const lots = await getVeilingTestLots();
  return <VeilingPubliek lots={lots} />;
}

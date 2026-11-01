"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type TestBidder = { id: string; name: string; email: string };
type TestLot = { id: number; lot_number: number; title: string; current_bid: number; active: boolean; closes_at: string };
type FormFeedback = { text: string; tone: "success" | "error" } | null;

export default function Testbiedingen({ initialBidders, lots: initialLots }: { initialBidders: TestBidder[]; lots: TestLot[] }) {
  const router = useRouter();
  const [bidders, setBidders] = useState(initialBidders);
  const [lots, setLots] = useState(initialLots);
  const availableLots = lots.filter(lot => lot.active && new Date(lot.closes_at).getTime() > Date.now());

  useEffect(() => {
    function handleOverviewUpdated(event: Event) {
      const detail = (event as CustomEvent<{ bidders?: TestBidder[]; lots?: TestLot[] }>).detail;
      if (Array.isArray(detail?.bidders)) setBidders(detail.bidders);
      if (Array.isArray(detail?.lots)) setLots(detail.lots);
    }
    window.addEventListener("veiling-test-overview-updated", handleOverviewUpdated);
    return () => window.removeEventListener("veiling-test-overview-updated", handleOverviewUpdated);
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bidderId, setBidderId] = useState(initialBidders[0]?.id || "");
  const [lotId, setLotId] = useState(String(availableLots[0]?.id || ""));
  const selectedLot = availableLots.find(lot => String(lot.id) === lotId);
  const [amount, setAmount] = useState(String((selectedLot?.current_bid || 0) + 1));
  const [busy, setBusy] = useState(false);
  const [participantFeedback, setParticipantFeedback] = useState<FormFeedback>(null);
  const [bidFeedback, setBidFeedback] = useState<FormFeedback>(null);

  useEffect(() => {
    if (selectedLot && Number(amount) <= selectedLot.current_bid) {
      setAmount(String(selectedLot.current_bid + 1));
    }
  }, [amount, selectedLot?.current_bid]);

  async function createBidder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setParticipantFeedback(null);
    try {
      const response = await fetch("/api/admin/veiling-test/bidders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Testdeelnemer aanmaken is niet gelukt.");
      const created = result.bidder as TestBidder;
      setBidders(current => [...current, created]);
      setBidderId(created.id);
      setName("");
      setEmail("");
      setParticipantFeedback({ text: "Testdeelnemer toegevoegd. Er is geen e-mail verstuurd.", tone: "success" });
      window.dispatchEvent(new Event("veiling-test-updated"));
      router.refresh();
    } catch (error) {
      setParticipantFeedback({ text: error instanceof Error ? error.message : "Testdeelnemer aanmaken is niet gelukt.", tone: "error" });
    } finally {
      setBusy(false);
    }
  }

  async function placeBid(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!bidderId || !lotId) return;
    setBusy(true);
    setBidFeedback(null);
    try {
      const response = await fetch("/api/admin/veiling-test/bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bidderId, lotId: Number(lotId), amount: Number(amount) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Testbod plaatsen is niet gelukt.");
      setBidFeedback({ text: "Testbod opgeslagen. Een eventuele melding staat alleen in de testwachtrij.", tone: "success" });
      window.dispatchEvent(new Event("veiling-test-updated"));
      router.refresh();
    } catch (error) {
      setBidFeedback({ text: error instanceof Error ? error.message : "Testbod plaatsen is niet gelukt.", tone: "error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-10 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-extrabold text-primary">Bieden testen</h2>
      <p className="mt-1 text-sm text-slate-600">Deze beheertools maken alleen testdeelnemers en testbiedingen aan. Er worden geen e-mails verzonden.</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <form onSubmit={createBidder} className="space-y-3 rounded-xl bg-slate-50 p-4">
          <h3 className="font-bold text-primary">Testdeelnemer toevoegen</h3>
          <label className="block text-sm font-semibold">Naam<input required maxLength={180} value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-lg border bg-white px-3 py-2" /></label>
          <label className="block text-sm font-semibold">Test-e-mailadres<input required type="email" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border bg-white px-3 py-2" /></label>
          {participantFeedback && <p role={participantFeedback.tone === "error" ? "alert" : "status"} aria-live={participantFeedback.tone === "error" ? "assertive" : "polite"} className={`rounded-lg border px-4 py-3 text-sm font-semibold ${participantFeedback.tone === "error" ? "border-red-300 bg-red-50 text-red-900" : "border-green-300 bg-green-50 text-green-900"}`}>{participantFeedback.text}</p>}
          <button type="submit" disabled={busy} className="rounded-lg bg-primary px-4 py-2 font-bold text-white disabled:opacity-50">{busy ? "Bezig…" : "Testdeelnemer toevoegen"}</button>
          <p className="text-xs text-slate-500">Gebruik testadressen zoals test1@example.com. Deze testregistratie controleert geen e-mailadres.</p>
        </form>
        <form onSubmit={placeBid} className="space-y-3 rounded-xl bg-slate-50 p-4">
          <h3 className="font-bold text-primary">Testbod plaatsen</h3>
          <label className="block text-sm font-semibold">Deelnemer<select required value={bidderId} onChange={e => setBidderId(e.target.value)} className="mt-1 w-full rounded-lg border bg-white px-3 py-2"><option value="">Kies een testdeelnemer</option>{bidders.map(bidder => <option key={bidder.id} value={bidder.id}>{bidder.name} · {bidder.email}</option>)}</select></label>
          <label className="block text-sm font-semibold">Kavel<select required value={lotId} onChange={e => { setLotId(e.target.value); const lot = availableLots.find(item => String(item.id) === e.target.value); if (lot) setAmount(String(lot.current_bid + 1)); }} className="mt-1 w-full rounded-lg border bg-white px-3 py-2"><option value="">Kies een open testkavel</option>{availableLots.map(lot => <option key={lot.id} value={lot.id}>Kavel {String(lot.lot_number).padStart(3, "0")} · {lot.title} · huidig bod {lot.current_bid}</option>)}</select></label>
          <label className="block text-sm font-semibold">Testbod (€)<input required type="number" min={(selectedLot?.current_bid || 0) + 1} step="1" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1 w-full rounded-lg border bg-white px-3 py-2" /></label>
          {bidFeedback && <p role={bidFeedback.tone === "error" ? "alert" : "status"} aria-live={bidFeedback.tone === "error" ? "assertive" : "polite"} className={`rounded-lg border-2 px-4 py-3 text-base font-bold shadow-sm ${bidFeedback.tone === "error" ? "border-red-400 bg-red-50 text-red-950" : "border-green-400 bg-green-50 text-green-950"}`}>{bidFeedback.text}</p>}
          <button type="submit" disabled={busy || !bidderId || !lotId} className="rounded-lg bg-amber-400 px-4 py-2 font-extrabold text-primary disabled:opacity-50">{busy ? "Bezig…" : "Testbod opslaan"}</button>
        </form>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

type MailStatus = {
  configured: boolean;
  sender: string;
  testRecipient: string;
  liveDeliveryEnabled: boolean;
};

export default function Emailtest() {
  const [status, setStatus] = useState<MailStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; error: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/admin/veiling-test/mail", { cache: "no-store" })
      .then(response => response.json())
      .then(result => setStatus(result))
      .catch(() => setFeedback({ text: "De e-mailstatus kon niet worden opgehaald.", error: true }));
  }, []);

  async function sendTest() {
    setBusy(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/admin/veiling-test/mail", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "De testmail kon niet worden verzonden.");
      setFeedback({ text: `Testmail verzonden naar ${result.recipient}. Controleer ook de map Ongewenst.`, error: false });
    } catch (error) {
      setFeedback({ text: error instanceof Error ? error.message : "De testmail kon niet worden verzonden.", error: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-10 rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-extrabold text-primary">E-mailverbinding testen</h2>
      <p className="mt-1 text-sm text-slate-600">Test uitsluitend de beveiligde verbinding met MijnDomein. De meldingenwachtrij en deelnemers worden hierbij niet gebruikt.</p>
      <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
        <p><strong>Afzender:</strong> {status?.sender || "Wordt geladen…"}</p>
        <p className="mt-1"><strong>Testontvanger:</strong> {status?.testRecipient || "Wordt geladen…"}</p>
        <p className="mt-1"><strong>Koppeling:</strong> {status ? (status.configured ? "Mailboxgegevens ingesteld" : "Wachtwoord nog niet ingesteld") : "Wordt gecontroleerd…"}</p>
        <p className="mt-1"><strong>Echte deelnemersmails:</strong> {status?.liveDeliveryEnabled ? "Ingeschakeld" : "Uitgeschakeld"}</p>
      </div>
      {feedback && <p role={feedback.error ? "alert" : "status"} className={`mt-4 rounded-lg border-2 px-4 py-3 font-bold ${feedback.error ? "border-red-400 bg-red-50 text-red-950" : "border-green-400 bg-green-50 text-green-950"}`}>{feedback.text}</p>}
      <button type="button" onClick={sendTest} disabled={busy || !status?.configured} className="mt-4 rounded-lg bg-primary px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">
        {busy ? "Testmail wordt verzonden…" : "Stuur testmail naar mijzelf"}
      </button>
      {!status?.configured && <p className="mt-2 text-xs text-slate-500">De knop wordt beschikbaar nadat het mailboxwachtwoord als afgeschermde Vercel-instelling is toegevoegd.</p>}
    </section>
  );
}

"use client";

import { useState } from "react";

export default function VeilingBeheerLogin() {
  const [email, setEmail] = useState("michielpetersen.mp@gmail.com");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function sendLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/veiling-beheer/magic-link", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Het versturen is mislukt.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er is iets misgegaan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#173450] px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Stichting Bulldog Steunfonds Nederland</p>
        <h1 className="mt-3 text-3xl font-extrabold text-[#173450]">Veilingbeheer</h1>
        <p className="mt-3 text-slate-600">Afgeschermde testomgeving. Ontvang een eenmalige inloglink per e-mail, zonder wachtwoord. Je gewone websitebeheer blijft ongewijzigd.</p>
        {sent ? (
          <div className="mt-7 rounded-xl bg-green-50 p-5 text-green-900">
            <p className="font-bold">Controleer je e-mail</p>
            <p className="mt-2 text-sm">Als de verzending goed is verwerkt, ontvang je op {email} een inloglink. Open de link op dit apparaat. Kijk ook in je spammap.</p>
            <button onClick={() => setSent(false)} className="mt-4 font-bold underline">Nog een link aanvragen</button>
          </div>
        ) : (
          <form onSubmit={sendLink} className="mt-8 space-y-5">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700">E-mailadres
              <input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"/>
            </label>
            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#173450] px-4 py-3 font-bold text-white disabled:opacity-50">
              {loading ? "Link aanvragen..." : "Stuur mij een inloglink"}
            </button>
          </form>
        )}
        <p className="mt-6 text-xs text-slate-500">Alleen het aangewezen veilingbeheeraccount heeft toegang. Er worden geen wachtwoorden gewijzigd.</p>
      </div>
    </main>
  );
}

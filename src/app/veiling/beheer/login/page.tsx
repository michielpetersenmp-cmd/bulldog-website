"use client";

import { useState } from "react";

export default function VeilingBeheerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/veiling-beheer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Inloggen mislukt.");
      window.location.assign("/veiling/beheer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Inloggen mislukt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#173450] px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Stichting Bulldog Steunfonds Nederland</p>
        <h1 className="mt-3 text-3xl font-extrabold text-[#173450]">Veilingbeheer</h1>
        <p className="mt-3 text-slate-600">Afgeschermde testomgeving. Log in met je eigen Supabase-account. Dit is een aparte login en verandert niets aan het gewone websitebeheer.</p>
        <form onSubmit={login} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">E-mailadres</label>
            <input id="email" type="email" autoComplete="username" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900" />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Wachtwoord</label>
            <input id="password" type="password" autoComplete="current-password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900" />
          </div>
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#173450] px-4 py-3 font-bold text-white disabled:opacity-50">
            {loading ? "Even controleren..." : "Inloggen bij veiling"}
          </button>
        </form>
        <p className="mt-6 text-xs text-slate-500">Deze login werkt uitsluitend voor de aangewezen veilingbeheerder. Inloggen met het oude beheerwachtwoord is niet automatisch mogelijk.</p>
      </div>
    </main>
  );
}

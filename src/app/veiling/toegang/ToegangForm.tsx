"use client";

import { FormEvent, useState } from "react";

export default function ToegangForm({ token }: { token: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const validToken = /^[a-f0-9]{64}$/.test(token);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validToken) { setError("Deze inloglink is ongeldig. Vraag een nieuwe link aan."); return; }
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/veiling/toegang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email: form.get("email") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Inloggen is niet gelukt.");
      window.location.replace("/veiling/mijn-account");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Inloggen is niet gelukt.");
      setBusy(false);
    }
  }

  return <form onSubmit={login} className="mt-6">
    <label className="block text-sm font-bold text-[#183651]">E-mailadres waarmee je bent aangemeld
      <input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-900" />
    </label>
    <button type="submit" disabled={busy || !validToken} className="mt-5 w-full rounded-xl bg-amber-400 px-5 py-4 font-extrabold text-[#183651] disabled:opacity-50">{busy ? "Veilig inloggen…" : "Ga door naar Mijn veiling"}</button>
    {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-800">{error}</p>}
    {!validToken && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-800">Deze inloglink is ongeldig. Vraag hieronder een nieuwe link aan.</p>}
    <a href="/veiling/inloggen" className="mt-5 block text-center text-sm font-bold text-[#183651] underline">Nieuwe inloglink aanvragen</a>
  </form>;
}

"use client";

import { FormEvent, useState } from "react";

export default function InlogForm() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setMessage("");
    try {
      const data = new FormData(form);
      const response = await fetch("/api/veiling/inloggen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Inloggen is niet gelukt.");
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Inloggen is niet gelukt.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6">
      <label className="block text-sm font-bold text-[#183651]">E-mailadres
        <input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-900" />
      </label>
      <button disabled={sending} className="mt-5 w-full rounded-xl bg-amber-400 px-5 py-3 font-extrabold text-[#183651] disabled:opacity-60">
        {sending ? "Link versturen..." : "Stuur mij een inloglink"}
      </button>
      {message && <p role="status" className="mt-4 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-900">{message}</p>}
    </form>
  );
}

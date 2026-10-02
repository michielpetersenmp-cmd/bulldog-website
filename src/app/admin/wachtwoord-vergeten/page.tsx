"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function sendReset() {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/admin/forgot-password", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Resetmail kon niet worden verstuurd.");
      setDone(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="absolute inset-0 paw-bg opacity-10" />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Wachtwoord vergeten</h1>
          <p className="text-white/60 text-sm mt-1">Beheer Stichting Bulldog Steunfonds</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {done ? (
            <>
              <h2 className="font-display text-xl font-bold text-primary mb-3">Controleer uw e-mail</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                We hebben een herstelmail gestuurd naar <strong>michielpetersen.mp@gmail.com</strong>.
                Open de link in die e-mail om een nieuw beheerwachtwoord te kiezen.
              </p>
              <Link href="/admin/login" className="btn-primary w-full justify-center">
                Terug naar inloggen
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                De herstelmail wordt verstuurd naar het vaste beheerdersadres:
                <br /><strong>michielpetersen.mp@gmail.com</strong>
              </p>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}
              <button onClick={sendReset} disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
                {sending ? "Versturen..." : "Stuur herstelmail"}
              </button>
              <Link href="/admin/login" className="mt-4 text-sm text-gray-500 hover:text-primary flex items-center justify-center gap-1">
                <ArrowLeft size={14} /> Terug naar inloggen
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

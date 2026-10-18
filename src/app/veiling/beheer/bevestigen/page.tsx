"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function BevestigVeilingLogin() {
  const [message, setMessage] = useState("Je beveiligde inloglink wordt gecontroleerd...");
  useEffect(() => {
    let active = true;
    async function verify() {
      try {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const token = fragment.get("access_token");
        const type = fragment.get("type");
        // Remove sensitive hash before contacting any other service.
        window.history.replaceState(null, "", window.location.pathname);
        let accessToken = token;
        if (!accessToken) {
          const tokenHash = new URLSearchParams(window.location.search).get("token_hash");
          if (!tokenHash) throw new Error("Deze inloglink bevat geen geldige aanmeldcode.");
          const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
          const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
          if (!url || !key) throw new Error("Supabase is niet geconfigureerd.");
          const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
          const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "magiclink" });
          if (error || !data.session) throw new Error("De link is verlopen of al gebruikt.");
          accessToken = data.session.access_token;
        }
        if (!accessToken || (type && type !== "magiclink" && type !== "signup")) {
          throw new Error("Ongeldige inloglink.");
        }
        const response = await fetch("/api/veiling-beheer/session", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        });
        if (!response.ok) throw new Error("Je account heeft geen toegang tot het veilingbeheer.");
        window.location.replace("/veiling/beheer");
      } catch (error) {
        if (active) setMessage(error instanceof Error ? error.message : "Inloggen mislukt.");
      }
    }
    verify();
    return () => { active = false; };
  }, []);
  return (
    <main className="min-h-screen bg-[#173450] px-4 py-20">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8">
        <h1 className="text-2xl font-bold text-[#173450]">Veilingbeheer</h1>
        <p className="mt-4 text-slate-700" role="status">{message}</p>
        <a href="/veiling/beheer/login" className="mt-6 inline-block font-bold underline">Terug naar inloggen</a>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function prepare() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          setReady(true);
          return;
        }
      }

      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!error) {
          setReady(true);
          return;
        }
      }

      const { data } = await supabase.auth.getSession();
      setReady(Boolean(data.session));
    }

    prepare();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Gebruik minimaal 8 tekens.");
      return;
    }
    if (password !== confirm) {
      setMessage("De wachtwoorden zijn niet hetzelfde.");
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }

    await supabase.auth.signOut();
    router.push("/admin/login?reset=1");
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="absolute inset-0 paw-bg opacity-10" />
      <div className="relative w-full max-w-sm">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h1 className="font-display text-2xl font-bold text-primary mb-2">Nieuw wachtwoord</h1>
          <p className="text-sm text-gray-500 mb-6">Kies een nieuw wachtwoord voor het beheer.</p>

          {!ready ? (
            <div className="text-sm text-gray-600">
              Deze herstel-link is niet geldig of is verlopen. Vraag opnieuw een herstelmail aan.
            </div>
          ) : (
            <form onSubmit={save}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nieuw wachtwoord</label>
              <div className="relative mb-4">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">Nogmaals</label>
              <input
                type={showPw ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 mb-4"
                required
              />

              {message && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
                  {message}
                </div>
              )}

              <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-60">
                {saving ? "Opslaan..." : "Nieuw wachtwoord opslaan"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

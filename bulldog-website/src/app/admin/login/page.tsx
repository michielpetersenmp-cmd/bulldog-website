"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/posts");
    } else {
      setError("Ongeldig wachtwoord. Probeer het opnieuw.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="absolute inset-0 paw-bg opacity-10" />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🐾</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Admin</h1>
          <p className="text-white/60 text-sm mt-1">Stichting Bulldog Steunfonds</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Wachtwoord
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                placeholder="Admin wachtwoord"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? "Inloggen..." : "Inloggen"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

export default function VeilingLogoutButton() {
  async function logout() {
    await fetch("/api/veiling-beheer/logout", { method: "POST" });
    window.location.assign("/veiling/beheer/login");
  }
  return <button type="button" onClick={logout} className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold">Uitloggen</button>;
}

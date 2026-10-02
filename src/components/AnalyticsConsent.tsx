"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ID = "G-C19SQVFZBN";
const KEY = "bsn-analytics-consent";
type Choice = "accepted" | "declined" | null;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  "ga-disable-G-C19SQVFZBN"?: boolean;
};

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice>(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const lastPage = useRef<string | null>(null);
  const admin = pathname.startsWith("/admin");

  useEffect(() => {
    try {
      const value = localStorage.getItem(KEY);
      if (value === "accepted" || value === "declined") setChoice(value);
      else setOpen(true);
    } catch { setOpen(true); }
  }, []);

  useEffect(() => {
    const w = window as AnalyticsWindow;
    w[`ga-disable-${ID}`] = choice !== "accepted" || admin;
    if (choice !== "accepted" || admin) { lastPage.current = null; return; }
    if (loaded || document.getElementById("bsn-google-tag")) return;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer!.push(arguments); };
    w.gtag("js", new Date());
    w.gtag("config", ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement("script");
    script.id = "bsn-google-tag";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
    script.onload = () => setLoaded(true);
    script.onerror = () => script.remove();
    document.head.appendChild(script);
  }, [choice, admin, loaded]);

  useEffect(() => {
    if (!loaded || choice !== "accepted" || admin || lastPage.current === pathname) return;
    lastPage.current = pathname;
    (window as AnalyticsWindow).gtag?.("event", "page_view", {
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
    });
  }, [pathname, loaded, choice, admin]);

  function choose(value: Exclude<Choice, null>) {
    const w = window as AnalyticsWindow;
    w[`ga-disable-${ID}`] = value !== "accepted";
    try { localStorage.setItem(KEY, value); } catch { /* Choice still applies for this visit. */ }
    setChoice(value);
    setOpen(false);
    if (value === "declined") {
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_")) {
          const suffix = "; Max-Age=0; path=/; SameSite=Lax";
          document.cookie = name + "=" + suffix;
          const parts = window.location.hostname.split(".");
          for (let i = 0; i < parts.length - 1; i++) {
            document.cookie = name + "=" + suffix + "; domain=." + parts.slice(i).join(".");
          }
        }
      }
      // Unload the already loaded Google script when permission is withdrawn.
      if (loaded) window.location.reload();
    }
  }

  if (admin) return null;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-3 left-3 z-40 rounded-lg bg-white px-3 py-2 text-xs text-primary shadow-card border border-gray-200">
        Cookievoorkeuren
      </button>
      {open && (
        <section aria-label="Cookievoorkeuren" className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
              <h2 className="font-semibold text-primary mb-1">Mogen wij het websitegebruik meten?</h2>
              <p className="text-sm text-gray-600">Met uw toestemming gebruiken we Google Analytics om onze website te verbeteren. Zonder toestemming blijft de website gewoon werken. <Link href="/privacyverklaring" className="underline">Privacyverklaring</Link></p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-secondary" onClick={() => choose("declined")}>Weigeren</button>
              <button type="button" className="btn-primary" onClick={() => choose("accepted")}>Toestaan</button>
              {choice && <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>Sluiten</button>}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

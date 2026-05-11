"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    xProductBrowser: (...args: string[]) => void;
    ecwid_script_defer: boolean;
    ecwid_dynamic_widgets: boolean;
  }
}

export default function EcwidShop() {
  useEffect(() => {
    // Voorkom dubbele initialisatie
    if (document.getElementById("ecwid-script")) return;

    window.ecwid_script_defer = true;
    window.ecwid_dynamic_widgets = true;

    const script = document.createElement("script");
    script.id = "ecwid-script";
    script.src = "https://app.ecwid.com/script.js?127419850&data_platform=code&data_date=2025-12-07";
    script.charset = "utf-8";
    script.async = true;
    script.onload = () => {
      if (typeof window.xProductBrowser === "function") {
        window.xProductBrowser(
          "categoriesPerRow=3",
          "views=grid(20,3) list(60) table(60)",
          "categoryView=grid",
          "searchView=list",
          "id=my-store-127419850"
        );
      }
    };
    document.body.appendChild(script);

    return () => {
      const el = document.getElementById("ecwid-script");
      if (el) el.remove();
    };
  }, []);

  return (
    <div id="my-store-127419850" className="min-h-96" />
  );
}

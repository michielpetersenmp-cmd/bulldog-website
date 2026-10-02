"use client";

import Script from "next/script";

declare global {
  interface Window {
    xProductBrowser: (...args: string[]) => void;
    ecwid_script_defer: boolean;
    ecwid_dynamic_widgets: boolean;
  }
}

export default function EcwidShop() {
  return (
    <>
      <div id="my-store-127419850" className="min-h-96" />
      <Script id="ecwid-settings" strategy="afterInteractive">
        {`window.ecwid_script_defer = true; window.ecwid_dynamic_widgets = true;`}
      </Script>
      <Script
        id="ecwid-script"
        src="https://app.ecwid.com/script.js?127419850&data_platform=code&data_date=2025-12-07"
        strategy="afterInteractive"
        onReady={() => {
          if (typeof window.xProductBrowser === "function") {
            window.xProductBrowser("categoriesPerRow=3", "views=grid(20,3) list(60) table(60)", "categoryView=grid", "searchView=list", "id=my-store-127419850");
          }
        }}
      />
    </>
  );
}

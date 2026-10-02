"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-secondary inline-flex items-center gap-2 print:hidden"
    >
      <Printer size={16} />
      Print / opslaan als PDF
    </button>
  );
}

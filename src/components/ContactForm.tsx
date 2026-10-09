"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ContactForm() {
  const [opened, setOpened] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("onderwerp") || "Vraag via de website");
    const body = `Naam: ${data.get("naam")}
E-mailadres: ${data.get("email")}

${data.get("bericht")}`;
    const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void };
    analyticsWindow.gtag?.("event", "contact_form_open_email", {
      subject_category: subject,
    });
    window.location.href = `mailto:info@stichtingbulldogsteunfondsnederland.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }
  const field = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20";
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label htmlFor="naam" className="block text-sm font-semibold mb-1.5">Naam</label><input id="naam" name="naam" autoComplete="name" required maxLength={120} className={field} /></div>
        <div><label htmlFor="email" className="block text-sm font-semibold mb-1.5">E-mailadres</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} className={field} /></div>
      </div>
      <div><label htmlFor="onderwerp" className="block text-sm font-semibold mb-1.5">Onderwerp</label>
        <select id="onderwerp" name="onderwerp" required className={field}>
          <option value="">Selecteer een onderwerp</option>
          <option>Vraag over aanvraag</option><option>Donatie of sponsoring</option><option>Bestelling in de shop</option><option>Samenwerking</option><option>Algemene vraag</option>
        </select>
      </div>
      <div><label htmlFor="bericht" className="block text-sm font-semibold mb-1.5">Bericht</label><textarea id="bericht" name="bericht" rows={5} required maxLength={2000} className={field} /></div>
      <p className="text-xs text-gray-600">Uw gegevens komen in een e-mailbericht. Zie onze <Link href="/privacyverklaring" className="underline">privacyverklaring</Link>. Stuur documenten over uw inkomen en lasten via het aanvraagportaal.</p>
      <button type="submit" className="btn-primary w-full justify-center"><Mail size={16} /> Open e-mailbericht</button>
      <p aria-live="polite" className="text-sm text-gray-600">{opened ? "Verstuur het bericht zelf vanuit uw e-mailprogramma. Opent er niets? Mail rechtstreeks naar info@stichtingbulldogsteunfondsnederland.nl." : "Uw e-mailprogramma opent met de ingevulde tekst. U verstuurt het bericht daarna zelf."}</p>
    </form>
  );
}

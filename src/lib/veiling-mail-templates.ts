export const veilingMailTemplateTypes = ["connection", "registration", "started", "outbid", "winner"] as const;
export type VeilingMailTemplateType = typeof veilingMailTemplateTypes[number];

const siteUrl = "https://stichtingbulldogsteunfondsnederland.nl/veiling";

function layout(title: string, intro: string, content: string, button?: { label: string; url: string }) {
  const buttonHtml = button
    ? `<p style="margin:28px 0"><a href="${button.url}" style="display:inline-block;background:#123d63;color:#fff;text-decoration:none;padding:14px 22px;border-radius:9px;font-weight:700">${button.label}</a></p>`
    : "";
  return `<!doctype html><html lang="nl"><body style="margin:0;background:#f4f2ed;font-family:Arial,sans-serif;color:#17324a"><div style="display:none;max-height:0;overflow:hidden">${intro}</div><div style="max-width:620px;margin:0 auto;padding:24px 14px"><div style="background:#123d63;color:#fff;padding:22px;border-radius:16px 16px 0 0"><p style="margin:0;color:#f7c84b;font-weight:700">STICHTING BULLDOG STEUNFONDS NEDERLAND</p><h1 style="margin:8px 0 0;font-size:28px">${title}</h1></div><div style="background:#fff;padding:26px;border-radius:0 0 16px 16px"><div style="border:2px solid #f7c84b;background:#fff9df;padding:12px;border-radius:9px;font-weight:700">TESTMAIL — alleen verzonden naar de eigen mailbox van de stichting.</div><p style="font-size:17px;line-height:1.6">Beste testdeelnemer,</p>${content}${buttonHtml}<p style="font-size:16px;line-height:1.6;margin-top:30px">Met vriendelijke groet,<br><strong>Stichting Bulldog Steunfonds Nederland</strong></p><p style="font-size:12px;color:#64748b;margin-top:28px">Deze test verwerkt geen echte deelnemer en wijzigt niets in de meldingenwachtrij.</p></div></div></body></html>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character] || character));
}

export function getVeilingRegistrationTemplate(name: string, confirmUrl: string, testMode: boolean) {
  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(confirmUrl);
  const testNotice = testMode
    ? '<div style="border:2px solid #f7c84b;background:#fff9df;padding:12px;border-radius:9px;font-weight:700">TESTMODUS — deze mail is alleen naar de eigen mailbox van de stichting gestuurd.</div>'
    : "";
  return {
    subject: testMode ? "[TEST] Bevestig je aanmelding voor de veiling" : "Bevestig je aanmelding voor de Bulldogveiling",
    html: `<!doctype html><html lang="nl"><body style="margin:0;background:#f4f2ed;font-family:Arial,sans-serif;color:#17324a"><div style="max-width:620px;margin:0 auto;padding:24px 14px"><div style="background:#123d63;color:#fff;padding:22px;border-radius:16px 16px 0 0"><p style="margin:0;color:#f7c84b;font-weight:700">STICHTING BULLDOG STEUNFONDS NEDERLAND</p><h1 style="margin:8px 0 0;font-size:28px">Bevestig je aanmelding</h1></div><div style="background:#fff;padding:26px;border-radius:0 0 16px 16px">${testNotice}<p style="font-size:17px;line-height:1.6">Beste ${safeName},</p><p style="font-size:16px;line-height:1.6">Bedankt voor je aanmelding voor onze veiling. Bevestig je e-mailadres zodat we je kunnen laten weten wanneer de veiling begint en je straks veilig kunt bieden.</p><p style="margin:28px 0"><a href="${safeUrl}" style="display:inline-block;background:#123d63;color:#fff;text-decoration:none;padding:14px 22px;border-radius:9px;font-weight:700">Bevestig mijn e-mailadres</a></p><p style="font-size:14px;line-height:1.6;color:#64748b">Deze bevestigingslink is 48 uur geldig.</p><p style="font-size:16px;line-height:1.6;margin-top:30px">Met vriendelijke groet,<br><strong>Stichting Bulldog Steunfonds Nederland</strong></p></div></div></body></html>`,
  };
}

export function getVeilingTestTemplate(type: VeilingMailTemplateType) {
  if (type === "registration") {
    return {
      subject: "[TEST] Bevestig je aanmelding voor de veiling",
      html: layout("Bevestig je aanmelding", "Bevestig je e-mailadres voor de veiling.", '<p style="font-size:16px;line-height:1.6">Bedankt voor je aanmelding voor onze veiling. Bevestig je e-mailadres zodat we je kunnen laten weten wanneer de veiling begint en je straks veilig kunt bieden.</p>', { label: "Bevestig mijn e-mailadres", url: siteUrl }),
    };
  }
  if (type === "started") {
    return {
      subject: "[TEST] De Bulldogveiling is begonnen",
      html: layout("De veiling is begonnen!", "Bekijk de kavels en breng je bod uit.", '<p style="font-size:16px;line-height:1.6">De veiling is nu begonnen. Je kunt vanaf nu de kavels bekijken en je bod uitbrengen. Bekijk alle bijzondere producten en lees de verhalen van onze sponsors. Met ieder bod help je bulldogs die noodzakelijke medische zorg nodig hebben.</p>', { label: "Bekijk de veiling", url: siteUrl }),
    };
  }
  if (type === "outbid") {
    return {
      subject: "[TEST] Je bent overboden op kavel 001",
      html: layout("Je bent overboden", "Iemand heeft een hoger bod geplaatst.", '<p style="font-size:16px;line-height:1.6">Op <strong>kavel 001 · Luxe hondensnackpakket</strong> is een hoger bod geplaatst. Het hoogste bod is nu <strong>€ 24</strong>. Wil je nog kans maken? Je kunt direct terug naar het kavel.</p>', { label: "Bied opnieuw", url: siteUrl }),
    };
  }
  if (type === "winner") {
    return {
      subject: "[TEST] Gefeliciteerd, je hebt kavel 001 gewonnen",
      html: layout("Gefeliciteerd!", "Je hebt een kavel gewonnen.", '<p style="font-size:16px;line-height:1.6">Je bent de winnaar van <strong>kavel 001 · Luxe hondensnackpakket</strong> met een eindbod van <strong>€ 24</strong>. Binnenkort ontvang je informatie over betaling en het ontvangen van je kavel.</p>', { label: "Bekijk mijn gewonnen kavel", url: siteUrl }),
    };
  }
  return {
    subject: "Testmail veilingsysteem",
    html: layout("Testmail veiling", "De beveiligde e-mailverbinding werkt.", '<p style="font-size:16px;line-height:1.6">De beveiligde e-mailverbinding tussen het veilingbeheer en MijnDomein werkt.</p>'),
  };
}

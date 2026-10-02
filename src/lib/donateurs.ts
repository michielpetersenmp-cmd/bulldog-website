export type Donateur = {
  slug: string;
  naam: string;
  korteOmschrijving: string;
  verhaal: string[];
  logo?: string;
  afbeelding?: string;
  website?: string;
  facebook?: string;
  plaats?: string;
  bijdrage?: string;
};

export const standaardDonateurs: Donateur[] = [
  {
    slug: "boeketten-nl",
    naam: "Boeketten.nl",
    korteOmschrijving:
      "Boeketten.nl is een echte bloemenwinkel in Nieuwegein en bezorgt handgebonden boeketten, rouwbloemen en zakelijke bloemoplossingen. Ze werken met veilingverse bloemen en bezorgen in de regio zelf en daarbuiten via lokale bloemisten.",
    verhaal: [
      "Boeketten.nl is al meer dan 35 jaar actief als bloemist in Nieuwegein. Dagelijks worden boeketten met zorg samengesteld met veilingverse bloemen die persoonlijk worden geselecteerd. In de eigen regio worden bestellingen zelf bezorgd; buiten de regio werkt Boeketten.nl samen met lokale bloemisten.",
      "Naast boeketten voor allerlei momenten verzorgt Boeketten.nl ook rouwbloemen en zakelijke bestellingen. Voor zakelijke klanten zijn onder andere bloemenabonnementen, maatwerk, meerdere gebruikers en een verzamelfactuur mogelijk. Daarmee bedienen ze zowel particuliere als zakelijke klanten op een persoonlijke en praktische manier.",
      "Boeketten.nl is daarnaast een waardevolle bedrijfsvriend van Stichting Bulldog Steunfonds Nederland. We zijn Dennis Smit en zijn team dankbaar voor de betrokkenheid, het vertrouwen en de samenwerking. Met zulke bedrijfsvrienden kunnen we onze stichting zichtbaarder maken en meer betekenen voor bulldogs en hun baasjes."
    ],
    website: "https://boeketten.nl/",
    plaats: "Nieuwegein",
    bijdrage:
      "Boeketten.nl ondersteunt Stichting Bulldog Steunfonds Nederland als bedrijfsvriend en draagt met betrokkenheid en samenwerking bij aan het werk van de stichting."
  },
  {
    slug: "canabioday",
    naam: "CannaBioDay",
    korteOmschrijving:
      "CannaBioDay richt zich op hennep- en CBD-producten voor honden en katten en combineert een gespecialiseerde webshop met persoonlijk advies, voorlichting en hondenevenementen. Oprichtster Kitty Schaap is medisch cannabis- en CBD-specialist en heeft meer dan tien jaar ervaring in de cannabisbranche.",
    verhaal: [
      "CannaBioDay is opgericht door Kitty Schaap, medisch cannabis- en CBD-specialist. Vanuit haar ervaring helpt zij huisdiereigenaren bij het maken van een verantwoorde keuze rond hennep- en CBD-producten voor honden en katten. In de webshop staan onder andere THC-vrije hennepolie, snacks, verzorgingsproducten en verschillende voordeelpakketten. Daarnaast biedt CannaBioDay persoonlijk advies en voorlichting over het gebruik van CBD en cannabinoïden bij huisdieren.",
      "Naast de webshop organiseert CannaBioDay ook hondenevenementen. Een prachtig voorbeeld daarvan is De Bullendag. Tijdens de editie van 26 september 2026 in het Develpark in Zwijndrecht kwamen bulldogs, baasjes, liefhebbers, standhouders en stichtingen samen voor een dag vol ontmoeting en gezelligheid. Bezoekers konden onder andere terecht bij de bullenbraderie, een hondenfotograaf en Rally-O Fun, terwijl er ook activiteiten voor kinderen waren.",
      "Voor Stichting Bulldog Steunfonds Nederland was De Bullendag een bijzondere en succesvolle dag. We hebben ontzettend veel mensen en bulldogs ontmoet, mooie gesprekken gevoerd en onze stichting goed onder de aandacht kunnen brengen. Dankzij de drukte en betrokkenheid konden we bovendien een mooie opbrengst voor de stichting realiseren.",
      "We zijn Kitty en CannaBioDay enorm dankbaar voor de organisatie van De Bullendag en voor de plek die onze stichting daar kreeg. Hun liefde voor dieren, inzet voor huisdiereigenaren en enthousiasme voor evenementen sluiten prachtig aan bij waar wij als stichting voor staan."
    ],
    website: "https://www.cannabioday.nl/",
    bijdrage:
      "CannaBioDay ondersteunt onze stichting door ons zichtbaar een plek te geven tijdens De Bullendag en andere ontmoetingsmomenten voor hondenliefhebbers mogelijk te maken."
  },
  {
    slug: "stacaravan-service",
    naam: "Stacaravan Service",
    korteOmschrijving:
      "Specialist in renovatie, onderhoud en montage voor stacaravans en chalets, vanuit Montfoort actief door heel Nederland en deels in België.",
    verhaal: [
      "Stacaravan Service helpt eigenaren van stacaravans en chalets met renovatie, onderhoud en montage. Vanuit Montfoort worden projecten uitgevoerd door heel Nederland en, waar mogelijk, ook in België.",
      "Tot de werkzaamheden behoren onder andere aluminium veranda's, kunststof kozijnen, gevelbekleding, prefab dakopbouw, onderhoud en herstel en het wrappen van bestaande kozijnen. Daarbij ligt de nadruk op duidelijke afspraken, een nette afwerking en persoonlijk contact.",
      "Stacaravan Service draagt Stichting Bulldog Steunfonds Nederland een warm hart toe en ondersteunt ons werk als bedrijfsvriend. Met die betrokkenheid helpt het bedrijf mee om ons werk voor bulldogs en hun baasjes mogelijk te maken."
    ],
    logo: "/donateurs/stacaravan-service-logo.jpg",
    afbeelding: "/donateurs/stacaravan-service-project.jpg",
    website: "https://www.stacaravanservice.nl/",
    facebook: "https://www.facebook.com/share/1E27EuBR8p/?mibextid=wwXIfr",
    plaats: "Montfoort",
    bijdrage:
      "Stacaravan Service ondersteunt Stichting Bulldog Steunfonds Nederland als bedrijfsvriend en draagt daarmee bij aan het werk van de stichting."
  },
];

export async function getDonateurs(): Promise<Donateur[]> {
  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase");
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.storage
      .from("post-images")
      .download("config/donateurs.json");
    if (error || !data) return standaardDonateurs;
    const parsed = JSON.parse(await data.text());
    if (!Array.isArray(parsed)) return standaardDonateurs;

    const standaardCannaBioDay = standaardDonateurs.find((d) => d.slug === "canabioday");
    return parsed.map((donateur: Donateur) => {
      if (
        donateur.slug === "canabioday" &&
        standaardCannaBioDay &&
        donateur.verhaal?.[0]?.startsWith("Canabioday heeft een bijzondere plek binnen onze stichting")
      ) {
        return {
          ...standaardCannaBioDay,
          logo: donateur.logo || standaardCannaBioDay.logo,
          afbeelding: donateur.afbeelding || standaardCannaBioDay.afbeelding,
          facebook: donateur.facebook || standaardCannaBioDay.facebook,
        };
      }
      return donateur;
    });
  } catch {
    return standaardDonateurs;
  }
}

export async function getDonateur(slug: string) {
  const donateurs = await getDonateurs();
  return donateurs.find((donateur) => donateur.slug === slug);
}

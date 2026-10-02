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

export const donateurs: Donateur[] = [
  {
    slug: "canabioday",
    naam: "Canabioday",
    korteOmschrijving:
      "Canabioday draagt Stichting Bulldog Steunfonds Nederland een warm hart toe en heeft met de organisatie van de Bullendag een prachtige ontmoetingsdag voor bulldogs, baasjes en liefhebbers mogelijk gemaakt.",
    verhaal: [
      "Canabioday heeft een bijzondere plek binnen onze stichting. Dankzij hun inzet en organisatie konden we deelnemen aan de Bullendag: een drukke, gezellige dag waarop we heel veel mensen en bulldogs hebben ontmoet.",
      "Voor ons was het niet alleen een mooi evenement, maar ook een belangrijke dag om onze stichting onder de aandacht te brengen, gesprekken te voeren en geld op te halen voor ons werk. De sfeer, betrokkenheid en liefde voor honden maakten de dag extra bijzonder.",
      "We zijn Canabioday enorm dankbaar voor het organiseren van deze dag en voor de ruimte die onze stichting kreeg om aanwezig te zijn. Zulke samenwerkingen helpen ons om meer mensen te bereiken en uiteindelijk meer bulldogs en hun baasjes te kunnen ondersteunen."
    ],
    bijdrage:
      "Canabioday ondersteunt onze stichting door evenementen en ontmoetingsmomenten mogelijk te maken en onze stichting zichtbaar onder de aandacht te brengen."
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

export function getDonateur(slug: string) {
  return donateurs.find((donateur) => donateur.slug === slug);
}

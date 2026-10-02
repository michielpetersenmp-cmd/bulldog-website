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

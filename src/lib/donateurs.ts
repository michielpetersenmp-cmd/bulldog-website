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
  // Voeg bedrijven hier toe. Iedere donateur krijgt automatisch
  // een kaart op /donateurs en een eigen pagina op /donateurs/[slug].
];

export function getDonateur(slug: string) {
  return donateurs.find((donateur) => donateur.slug === slug);
}

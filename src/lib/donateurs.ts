export type Donateur = {
  slug: string;
  naam: string;
  korteOmschrijving: string;
  verhaal: string[];
  logo?: string;
  afbeelding?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
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
    slug: "bonos-dogcenter",
    naam: "Bono's Dogcenter",
    korteOmschrijving:
      "Bono's Dogcenter is een webshop voor honden met een groot assortiment natuurlijke snacks, trainings- en beloningssnacks, kauwproducten, speelgoed, verzorging en trainingsmaterialen. De producten worden zorgvuldig geselecteerd en volgens Bono's Dogcenter eerst door de eigen honden getest.",
    verhaal: [
      "Bono's Dogcenter is een webshop voor hondenliefhebbers die veel aandacht besteedt aan kwaliteit, plezier en persoonlijke service. Het assortiment is breed en loopt van natuurlijke hondensnacks en kauwproducten tot speelgoed, verzorging, enrichment en trainingsmaterialen.",
      "Een belangrijk onderdeel van het aanbod zijn de natuurlijke snacks. Bono's Dogcenter verkoopt onder andere snacks van rund, lam, paard, konijn, gevogelte, wild en vis, maar ook trainers, beloningssnacks en opties voor honden met een gevoelige voeding. Veel van de samengestelde snackpakketten bestaan hoofdzakelijk uit natuurlijke producten zonder toegevoegde geur-, kleur- en smaakstoffen of extra zout en suiker.",
      "Wat we mooi vinden aan Bono's Dogcenter is de persoonlijke aanpak. Volgens de webshop worden producten eerst door de eigen honden getest en worden alleen artikelen aangeboden waar ze zelf volledig achter staan. Kun je iets niet vinden, dan denken ze bovendien graag mee of het gewenste product kan worden ingekocht.",
      "Als bedrijfsvriend van Stichting Bulldog Steunfonds Nederland helpt Bono's Dogcenter mee om onze stichting zichtbaar te maken en ons werk voor bulldogs en hun baasjes te ondersteunen. We waarderen die betrokkenheid enorm."
    ],
    website: "https://bonosdogcenter.com/",
    bijdrage:
      "Bono's Dogcenter ondersteunt Stichting Bulldog Steunfonds Nederland als bedrijfsvriend en helpt daarmee ons werk voor bulldogs en hun baasjes onder de aandacht te brengen."
  },
  {
    slug: "style-bedruk-service",
    naam: "Style Bedruk Service",
    korteOmschrijving:
      "Style Bedruk Service uit Montfoort helpt bedrijven, verenigingen en particulieren met bedrukking, belettering en visuele presentatie. Van voertuigbelettering en stickers tot kledingbedrukking, reclame-uitingen en maatwerk: ideeën worden vertaald naar een opvallende en professionele uitstraling.",
    verhaal: [
      "Style Bedruk Service is een creatief bedrijf uit Montfoort dat zich bezighoudt met bedrukking, belettering en verschillende vormen van visuele communicatie. Zowel bedrijven als particulieren kunnen er terecht voor maatwerk dat helpt om een naam, merk of boodschap duidelijk zichtbaar te maken.",
      "Tot de mogelijkheden behoren onder andere voertuigbelettering, stickers, kledingbedrukking, reclame-uitingen, gepersonaliseerde producten en andere creatieve toepassingen. Daarbij wordt meegedacht over ontwerp, uitstraling en uitvoering, zodat een idee praktisch én herkenbaar wordt uitgewerkt.",
      "Style Bedruk Service is nauw verbonden met Stichting Bulldog Steunfonds Nederland. Vanuit het bedrijf worden regelmatig ontwerpen, drukwerk, stickers en andere creatieve middelen ingezet voor acties, evenementen en promotie van de stichting.",
      "Zo draagt Style Bedruk Service niet alleen bij met creativiteit en vakwerk, maar ook met zichtbaarheid. Die ondersteuning helpt ons om meer mensen te bereiken en daarmee meer aandacht en middelen te krijgen voor bulldogs die onze hulp nodig hebben."
    ],
    website: "https://stylebedrukservice.nl/",
    plaats: "Montfoort",
    bijdrage:
      "Style Bedruk Service ondersteunt Stichting Bulldog Steunfonds Nederland met ontwerp, bedrukking, belettering en promotiemateriaal voor acties, evenementen en zichtbaarheid van de stichting."
  },
  {
    slug: "style-3d-studio",
    naam: "Style 3D Studio",
    korteOmschrijving:
      "Style 3D Studio is de 3D-printtak van Style Bedruk Service en maakt allerlei 3D-geprinte producten en maatwerk. Van decoratie, lampen, potten en cadeaus tot gepersonaliseerde ontwerpen, dierenfiguren en andere creatieve prints: veel ideeën kunnen in kleur, formaat en uitvoering worden aangepast.",
    verhaal: [
      "Style 3D Studio is de 3D-printtak van Style Bedruk Service in Montfoort. Vanuit de studio worden allerlei soorten 3D-prints gemaakt: niet alleen honden of bulldogs, maar juist een brede mix van decoratie, gebruiksartikelen, cadeaus, dierenfiguren, lampen, potten en maatwerk.",
      "Veel producten kunnen persoonlijk worden gemaakt. Denk aan aanpassingen in kleur, formaat, naam, uitvoering of ontwerp. Ook wanneer iemand zelf een idee heeft, kan worden gekeken of dat als 3D-print kan worden uitgewerkt.",
      "Voor Stichting Bulldog Steunfonds Nederland krijgt Style 3D Studio een extra bijzondere rol. Speciaal voor de stichting worden regelmatig bulldog-gerelateerde producten en acties gemaakt, zodat creativiteit en 3D-printen direct kunnen bijdragen aan het helpen van bulldogs en hun baasjes.",
      "Daarmee is Style 3D Studio niet alleen een creatieve onderneming, maar ook een betrokken bedrijfsvriend die zijn mogelijkheden inzet om de stichting zichtbaar te maken en extra inkomsten voor het goede doel te genereren."
    ],
    website: "https://3d.stylebedrukservice.nl/",
    plaats: "Montfoort",
    bijdrage:
      "Style 3D Studio ondersteunt Stichting Bulldog Steunfonds Nederland met speciaal voor de stichting gemaakte bulldog-producten, creatieve acties en bijdragen uit 3D-printwerk."
  },
  {
    slug: "durks-dogsnacks",
    naam: "Durk's Dogsnacks",
    korteOmschrijving:
      "Durk's Dogsnacks is een gespecialiseerde webshop voor pure en eerlijke hondensnacks. De nadruk ligt op natuurlijke snacks zonder graan of gluten, zonder toegevoegde suiker en zonder chemische behandelingen of onnodige toevoegingen, met ook veel keuze voor honden met een intolerantie of allergie.",
    verhaal: [
      "Durk's Dogsnacks is ontstaan uit liefde voor hond Durk, een Friese Wetterhoun. Oprichtster Claudia Visser-Evers ging op zoek naar gezonde alternatieven voor sterk bewerkte hondensnacks en begon aanvankelijk zelf snacks te drogen. Vanuit die zoektocht groeide uiteindelijk een gespecialiseerde webshop.",
      "De missie van Durk's is helder: natuurlijke, gezonde en betaalbare hondensnacks aanbieden waarvan je weet wat je geeft. Het assortiment richt zich op pure producten zonder graan of gluten, zonder toegevoegde suiker, zonder conserveringsmiddelen en zonder chemische behandelingen of onnatuurlijke toevoegingen.",
      "Ook voor honden met een voedselintolerantie of allergie is er veel aandacht. Durk's heeft een ruim hypoallergeen en mono-proteïne assortiment en denkt graag mee over welke snack bij een hond past. De webshop bedient een brede groep honden, van huishond en werkhond tot therapiehond, junior en senior.",
      "Wat ons aanspreekt is de persoonlijke benadering en de duidelijke focus op kwaliteit en transparantie. Als bedrijfsvriend van Stichting Bulldog Steunfonds Nederland helpt Durk's Dogsnacks mee om ons werk voor bulldogs en hun baasjes onder de aandacht te brengen."
    ],
    website: "https://durksdogsnacks.nl/",
    plaats: "Gendt",
    bijdrage:
      "Durk's Dogsnacks ondersteunt Stichting Bulldog Steunfonds Nederland als bedrijfsvriend en draagt met betrokkenheid en zichtbaarheid bij aan ons werk voor bulldogs en hun baasjes."
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
    const bijgewerkt = parsed.map((donateur: Donateur) => {
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

    const bestaandeSlugs = new Set(bijgewerkt.map((d: Donateur) => d.slug));
    const ontbrekendeStandaardDonateurs = standaardDonateurs.filter(
      (d) => !bestaandeSlugs.has(d.slug)
    );

    return [...bijgewerkt, ...ontbrekendeStandaardDonateurs];
  } catch {
    return standaardDonateurs;
  }
}

export async function getDonateur(slug: string) {
  const donateurs = await getDonateurs();
  return donateurs.find((donateur) => donateur.slug === slug);
}

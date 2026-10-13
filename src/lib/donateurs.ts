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
  whatsapp?: string;
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
    slug: "bellobox",
    naam: "Bellobox",
    korteOmschrijving:
      "Bellobox maakt verwenboxen en verkoopt 100% natuurlijke hondensnacks voor honden van verschillende leeftijden, formaten en behoeften. Naast snackboxen is er keuze uit kauwsnacks, beloningssnacks, tussendoortjes en hypoallergene opties.",
    verhaal: [
      "Bellobox draait om het verwennen van honden met natuurlijke snacks die zorgvuldig worden geselecteerd. De boxen worden samengesteld voor verschillende soorten honden, van pups en kleine honden tot grote en fanatieke kauwers.",
      "Het assortiment bestaat uit 100% natuurlijke snacks en verschillende snackboxen, waaronder ook hypoallergene varianten. Bij speciale dieetwensen kan de inhoud van een box worden aangepast, zodat er voor veel honden een passende keuze mogelijk is.",
      "Bellobox is ontstaan vanuit liefde voor honden en noemt de eigen honden Kaya en Dave hun kwaliteitskeurders. Dat persoonlijke karakter en de aandacht voor natuurlijk hondengeluk passen mooi bij de betrokkenheid die wij graag bij onze bedrijfsvrienden zien.",
      "We zijn Bellobox dankbaar dat zij Stichting Bulldog Steunfonds Nederland een warm hart toedragen. Met zulke bedrijfsvrienden kunnen we onze stichting beter zichtbaar maken en meer betekenen voor bulldogs en hun baasjes."
    ],
    afbeelding: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAFAAPADASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EADoQAAEEAQMDAwIDBQcEAwAAAAEAAgMRIQQSMQVBURMiYTJxFIGRBkKhsdEVIyQzweHxJVJiclOy8P/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAeEQEBAQEAAwADAQAAAAAAAAAAARESAiExQUJRYf/aAAwDAQACEQMRAD8A8BU0ZSAVgWuTqZukDITIsKQKQUMFN3CSocKDILUe8AdwoIopsNG0BXN8oC0cLyPCgDygdeEUmAnygKRWEzwgDKA+6aDyqBUVP2QAmRRFJgWqG0Kox78JAZWkVXwiLpU0ZR2VBptAiLSa3KoobaCT3tSBi1o4Ke6qAhQW5WlYU0gVIo5VcDhGUHkgKuEAJ0ihvlM8pjhIqB0m0IHyqCCJBRSAtaij9RA+6DEQMZQQ2wPshwrI4TGLQD2QIJ1aot214PBSpFMDwgiuVbeEEKCK8Kgq7I5KBUqHKKFJgZQACuKrykriAJtBpgK24CQFpgWFUL7oH2QQqAoIJOUmtTchvCBHCkZKohDB3QFIAymM2hVHkItDQSnXwimAaTqwgBaBuKUGbfkquEwKcq5CKkjc2konOj+w7K6UEe7Kg0cWyC+CpMJAsnHkKaWjXnaQgI20NruDwmWlpKA6j8eFsC17Kdx58KjJrcFKlRaWOIKNtnlQKsIpWW0EkARhACabRaBUriFFTtWsbbygsC1YbwkBhWAqIdhyAmQmWUERBFlVQAoptb8o+6DMi7RRCq8pu4QZ91VYQBlN3CDyG8KgLSAKsDHygVKmn80AKhhAq7p/dOrCBZCKQNGjlKQZVNbZtU4YUGVKgFQAKYCCdqoEjjlBaqa3CDRjg9m0/T/9T/RQWFjiCqaNhsfouljY9VGWAgTNFsP/AHDx91fqfHLSAPhOq5SonhRQ4FDQqVNbfdBIbhbRYUBbRNs54VDolVVKsdkVYtBACZyEz2RfNoiQpddqjfASdaCQM5QmAlaBAZyqAA5QB3pFIPJAWgFKRyqohAwnyhUgALSApypqTqu0VQCbm45Sv4VchQZNrhUBlLuU+6BkJgYVVi0kUDPZAw4190xkqwADSIYt4NjPYqNpGFbTWP4rSSIiISVbSav5VGNKmDsBymByFQFKCSCCrZwlVhaRtxlBYpInsm0Ug1dBAhzkfmkQTyVVYScURIFBI3dqwLykeSqJBx8pEZVccpCyUDDfblIhU6xylyg8oKhnlQ3AGVQbnlFVZXNqdeNPL6boi6xYIPK6QP1XJ1WIiJkzR7o3fwSfUvxbNfG+J8jQ72fU3uF0RuGoibJGTR8rzPXjl6ix0QNSt2yAjzhdfSCWiXTvPuY5WxJVDqOmBLXPLSMG2ldcU0LtOZmyDYOSV5coh0/VT67WmKQXkXS7HnTv6bONNt2AH6fKWErYSRykmJ7XDvSl0sTH7HSNDvBK8zprzBqYg76Jm/xtSNPG7qM0OqJa51ljrrPZOTp7Yojn7JtGV4+pgnj6YBqBmN42m7wt9H03eyGds7wcO29kxdr0tuU67LDqQcNDI5ji1zc2Fytnl/sUTNkcJAa3d+VJNLXqBpNkcBaNc5jZIeWvo/n5XANRIzo/4gm3EHJ7m1h0zqM2p1ZjlIosxilcpsemeeFQB8WvJ1XUptLrXRUwtBHIzS65dc5nUItO1rSyQA7u+Uymx1gEFasGLK8mXqzmaiSJsG7YawV2dP6hHrNzAC2RovafCmU2OxBFZXJoeoR6yR7GRvaWCza01mpj0jGumJDXGhQtMGx+n5U8nK5P7X0ZAuU/m0rraQ6iOCLCYLIoDGFnweVobpLaoJcMcpNAtWW+EFmLVCPynhIDsmRQQeNeExZCNubWjR4RSogik5IhNE5h4cKQBlbMGFB5vSa9N0b2gPjdzWaUyPGk6uHvdtZIMld8mojj1EcTwf7zAd2UevpJ5XtfHudEDYc2+PC1/rLh6o6GZrJoXNk2GnfYrta3S/hZG6cxgvbwHd6U3054aGsaBNgYIvKUcHS94cyRrXA2PeQqPM3ud09gZC64nF3qjgfC7ppNNr2QxyAtme0FrwOCu/TafSxaZ0EUgcyW8FwN9sLlPSI/T9L1nbmutru7U2GOVssh02p0U/ufGLa77I6XpnysZMzUPbtdlnZdUHSnRzPkknMji0tuvIrKyj6ZrdMC2DUNA5r5TYmV360F2jmAHLSvF08epk6fIWSD0Gn3M7+V7jGTP0uyUj1C0gnsuXR6KeHR6mBzMuHto8lPG4tmsZpNvQGt8uqvzWTG/hdbopKoPY20pNNqh08ROhfu9Uu47UjX9PdpooZGGR5vIOdq16ZXr4fX6rKys7LH3AUaaT1+o6K+Q0NP5Wt2vL+txSAGnMF2PhY6dnpdcYzgNeQFPwOjp9O67NzguS6e7/qupfxTXlZaLUxafqs8kz9oJdmr7q+nHd+OmH0iN1fmit/2cb/nvPwE/wBo302BucklPoMkUWlf6krGlz+C4A8LPr22XW6dgNgt8+Sp+x+rq00XTZo42AQvk2gGuSV6VNFACqXJF03SwStlij2uGAQ4rrHws1qETnlP8rWZCoEqBjnCDnHCBzaRz8KhV7sFUR4RTQPClps/CDygqCQpUBhRQBYsfoqaCfITaFQpBy9Q0xl0xLPrYdzV5rZf8YNUPpLQ54+Dhy+gApq8pnTpI+oFwYDp32DngFa8azY5XN/6c8MNnTTWD8H/AIW3UYIjpINVFG0WffXe1p0/STMdqYJo37JGEbj3rhXpYXy9ImglY9r2XQI/Na1MR1COKHT6WfTN2tBv9c/6KdTPGOtwzQva5slXtPHZaRg6joD2EEOiz+i5dVFH/Zmn1MbA17XbXkdykK7+tzSRaZpicW26iQuaF8+l1EFyulimaCS4fSuzXx/iemOc2vpD1nFrRpOm6d5YH527b4+6zPi36y12ung1pjY6mCiRXC6Oo65+lhglgLXCTm/suDUPj/tLVeqSPUjoGrzQpJ7zN0Nu426GSvyWs+Jrvi6lNHqY4tZC1gkra5p8pO6u5uokiGmc8scR7T28rilMz5tE/WUI6Gws8LQGaDrU508fqPJPt+EyG16uj1A1QLjG5haaIctyxhfvc1u7zSjSuklhDpojE+zbVTpGMID3NBPFmrWK2yfo9PI+zBGTfNUuj8NCIDCI2hjsENxaGU59NIJHbwtiAP6KDzndF0bv3HD7OKc/R9PKWbnSANaGij4Xo7SW80lRuuflXamR5+l6RFptQJWSyED90ruDKFd1RHhMigmjMtpMYKrhI/KgnBPhOgjn7IAsoEc/0TGDwqwntwK5VHjnwmL4VbQmBeeFFDMY8qqJshDQCrAQDL7p7s4TpFDhBTTmrTIpwJKQFEUFZFtzSBGiM8LKaJszDEY2lnJG3C3q2pEFjbCDNoZDGyNrKAwQuR3S9K6Yy7CCTZAOP0XaeLPKgWTXdUxm2CNmpdM0f3jsG+KWR6ewxSxtfQlOQRwbtdYjr+pTFN8kpqY4tToZJtLp4muaXQ2ATi1Mmk1TOoO1UDWFxFUT8UvRYdxqqVVnHCumMdLLqHNP4mJrDdCu64usdOfqnevDbnNFFvn7L0zjFKhkXwpuUx4/SOmzM1DJ3Ex1yCclY9XbrNJrXTerJsefY4HA+F7oOwjb2WxIcKeAR4pXr3qc+nk9D/GmOR87nGIj2CQ5J/ouB/V9fDPI2QtDhYLS3hfTbbrdSwl0ennmbJLEx7hwSEnl79menL0fU6nVQl+oZwfa6q3L0SMIaAMYAHYIcQMcrNaJt1lKrOU2kgUp3ZxlAwMooVdowQjb7aCIVhO6Qxm7CbhXBQeRE4SRh7DYcLCsNI5K83o2ppxgcect/ovXI+FbMJdS0HgqgmAMBa7RSislQHk5V7APlV6fgIJ/JaMYCMhYO1EMbnte/aYxbrHA8rRuohFXKwFwBHu7HhBTQQaKtzfacYQMuORj5WgBqiEHI9pAx/wmz2tsDlaEXYUA4wEABfKKGaTBO7CbSA7IQQ1pbyhznCqWhAv58JFnusm0Ex3us91oWktvCAA3IV7RSCGszfK32hZtBur7rUc+UEOblJN12cI7WoDhSQnR5zlFHj+Komu6ALsqzgJcIJyqPwkPsqANoAEjITI35wk7HwPhK0R8Sx7mPD24Le9L6XRzjVadj2d+R4K+Yo3hej0bUmGcxuNMeavwV08prHjce5tIQ0kYWl2E6BGFzdEi1YJGE2jKoNo3SDzerwn0fxDRZa0sePLT/RcEDBNLDp3n/NhIYT+o/Q2vow2z8I9CIua4xtLm/SayPsrPLEsfMGVznah5wXMDJPh3n9W/xXRqZp4Y6ike31gyWM3+Th+pXtO6dppPVLov80U8gkWpn6Tp54IYre30foIOQr1E5rj6ZO/V6udrnEtLWuAP7uM/xWB6hNA8+o6N2yTYY6pxHkL04umO082om00u18wwC2w02uPWdMnfJMWeifWA3E2CHDuE2GURavUv1MsTYYz6bqPvo0ujTalupdKNha6J20glch0EsOrM0un/ABLSxv0uohwAspwSv0uu1Mk0EwjlIc0hm6vPCXCa6tPqYtU31WWA3m8UiLW6aaTZHK1zj28rg6dNFC3VaeZwYXPOzcCLC54SwaXRg0JWaiiO4ymGvdZIx9Bj2OHw4LUHC+c9J5ZM5rGgMnr1b9zc8ALolY6R+vldJJcIBYQ4ik5Ontx8rXIOAvCdrZ9H6E5cZGzRfQTw7yva0bNQzStOqfvkqzgAD4UsxZdWRZSqj4XjQddeYJ3yxNuMAsAsbhdLuj6gJtaNL6RDvTDy6+MXSc2Gx2bfsgD+CHWAKCTT3UVJFOQKHCo5yosk4CBgd0NyED5KuqGERH3ChxC0rB7UsXnNIPjCMcqdxYSQB/RUbHKRquF3cn0nRtZ+Ng2uzKwe4efld4AvK+P0k02mmEunJD25W7Or9QaP87cP/IArnfH+Nzy/r6wAAWqAJXzcf7QawfXDG8DmgQuiP9pQCPW0hHna+1Oa11Hv4HyqbS8mP9odC76zKz7tuv0XTF1bQyj26ll/OP5qZV2PQAsoodllFPHKLjkY/wCzgVtxkhQG1wWMrTutbtceSofZBJKisaNAIIpoqlQALTaQG5Bm9odyAVn+HjL95jYXA3u2i107P7u/lIDCo45OnaSTLosk2QCRZRN02Obe5j5IhJQkaw4cuwtwqbxym1MjzHdHZM9+6Qken6cQI/y6XbCzWMhZE4wyNEZa51kEnt/oumIAla7SRQTaZHzOo6NqBodK1sdyNLmyBrhwTYXTEfwvWNXPqIZtjqYxzYyRQ/4XtUS7KLyr0nLP6vNHyKTLaGOE6s2ThN2aCio20CpAolWSeD2SBQTts8J8BUPNoIAu0EuqlzuGbvC1eWuvacrIMJcBYRHxri4uG47q+b/JSTniimHAci/zUWu7kCtDK5+0nadooYCHRx/hmyCX3kkFlcKLwPhBQDqOPujkVtF3yp5TsUoLEDi15DTTPqI7JNbTrAxwQDymD7S2gRzaGiyBx/ogGNDS4BxYHCifhWybURm4tRM0dhvKg2PGeyt4oMALTbbtv8ig6G9X6lHW3Ulw8OAK64P2h1Yd/iQxzK/dZk/xXmADcA3v5VGJxFtBLQLLq4UyLtfUabquh1NVL6ZPaT2/7LqY+KQkNlY7NWHL4uhsNkfZNrqacuxxXCnMXqvt2s2tILr/ADUfFr4+PUSNsmWUYxTitBrtU0YnkB7Enspwvb60GwgfSvlR1XWf/MPkloVM63rxjeyvlqnC9vqouVveLXyUX7RayP6oon/kQupn7Uh2JdI4H/wenNXqPovb2U8cLyIv2k0JHu9Vn3bf8l1M6v0+Rtt1LB/7Y/mplNjrAsqtv8FnFPDK3+7lY/8A9XArXyRworM0e3CC20zRdaYq8IJ28ILfIKv80iN3fCDBzLd4XJLq2aZk0hG5sQr7u7Bb9RmOnibHGLmkw1o5JXz3V5g1zdGx25sP1uH7zzyfy4WvGazbjyO5Cs7RAMu3l307cAfdQ0kGxWPK2nnk1O2mBrI201rBhoXVyYG+DdhaPglja1z2EBw3NPkKLwb5PdX6znNqS303a3cT7fsgkmwLsu7lMcJbTt3C6HJ+Vb/RLWBjnB9e8u4RSvwcIuh91IrbkHPCYJJ23QQUSqL9xsNAxwP5qCBeCnuIcCMEdwoHdFbRyxtjLZIN7ncP3EUsCT7twtxF2eyTXVdi0F/uk1YGLVUNm7cCboDuos9+3K2d6ToIjA15laCZbFjnCDMm85pDsNadwN9geEMk2H1PaXA/SW4SDrabAPg+EGk07tTK6RwAc6rDRQUtH2GLyiNzGSW8bh4BpBII9rCLOL8IKBskbbQ01kAGuCey1jbpjYfM9pDLHsxu8LnJLiA0ZOAEFANOC0cLR2la7ReqJACx5b6Z+3ISm2MqNhLto9x8lQ6qBJ93iv0QQIwMglasm1UVCKeVhPYONKtobG1xkb7gbA5CzfQ9rR90HS3rHUoSWmbdtwQ5oK6Yv2k1rBukhic3i8hea4l20GrGMBKjdUbPZMi7Xtx/tUwAetpXi/8AteCunS/tJoZ5Q15fDfBkGP1C+cY1zjTcZHJoWsiwb6q65U5h1X1mn9Jsmo6hrZgKaWxNa7IxyPlfKk24m7+SqLW7DIHjeXG2VwPKg0TfCsmJbrE3e3nPZM2328eVLSA4EixfCp7gXe1oaB4VQhto7rJ7UgAnhLHZMOIaQDg8qgIrBIPwOydNGSbzwO6QNNJoeFRGyQBwsjkFAbgbFGv3RfCCa5/igbe5N9hSA5zJA795pvOcqKr1HFoZY2g3Xyqa5rmuptULOcKZ5nzymSQguPJAofot4BEyGZro/VdRpwfQCCGxMMBe57Q7dQo3Y/2Wde3cTWa/JaQ6ySOJ0YDSHeRwFjbnE7rJ8FAzhUC4Da0kX88/dJv0kDGLKTvAJIHBIpBTgDVHlBIvGOylriD8JkguOKBPA7IG1pc6gCcXhDXFpsE+E3NqzeB3H8km1uFmvlAx8f8AK0YQZGi6s8+FADXSVvDQT9RQX3w2gBX5+UFvDQdoNgYLq7qd1vv81PkcqpHb3WQ1oAAwoLEZk3FodjNAE191Az/utIZXxPJY9zTVW08/dZmgDi74N8IGcGgcpytex+197hzaknaRtcCebCbsklpLhVmxSDSHVOgjlYGhzZW0Qf4Fc4PdMmimS1ziQKaeBaoZLmHDgLF4KThwMWewSeCxxY4EFvYiikG2Cb4CIx+Lu8pVSdlttIa4kVfNLVrdOdMS57/XGA0DBVGbnAtac7gKPj4SrufF4UKy8uyTwKCAIOMc8IIIcbwRym5oDWHfuJHH/blThBoN3pbttNJrd/okaDjtsjtaIYXTyBjKursmgB5Sbx8KDRkRkZKQ9rdjdxaTk/ZSxxYbCCQCdvuvglJA2VYvCf0u4II7eFLhTWnOf0VG2uIOSO4KKQ45KOEWKGc1SMd0FkRei2i71LzZxX9VPIzhJuMg0eQiyTuObPfugtkpYx7QGkPFGxdfZINOwusc1V5QXNv2jBAu/Kkm67VjCChwgm0gCTWFTfbRLbb3QVGA5zWl4aCat3AU3RzlI4xhNgD3G3UasfPwgCb/ADQCL8fdI1jN+UcHGEF1bSedv8khkgUTfAU2W3RNEUfkJgiqrN3aDXWGB09wMdG0gWx2aPdZGzmx+qV2OM+UkRcksk7973F7q5PKm8Eef4IBLTaROUGCE2Oa0G2BxPF9kUNm6wCDVdyqGNtG73dqV6eH15NhkbGOdzzQWbXfUKGe57JvkLmMYeG8ICqLhj2/KpgdNK1jGFznYAHdSx5YSRVkVnshhcHDYaPFoLkjkgeWOBa6qIRtLXU7BBypH/60/JPPKB2LOOf4LbT6Z2o2sjc3e40G91g3LgCQPk8KmyOjcSxxB4sIB7HRPLHiiD5SqyK7pDK0m9EOqEvcKyXgA2oJdY9hPByAgAucGsFkpwyugmZIAC5hBAPCl7i97nHlxs4QF8A8BM0T7SXCr+yXZMYaRmz2+EDAJFjJ8BSQavtdJtLmutpN/CD9qHhB0vfpvwDWsb/iDIS4/HYLmu0hzSd2K8IGTgYPyt9PrHQQyxt4fkGsg/dYOkdta0klreAey31wgbqiNL/lUKzdYygxcW2doIB4s2i27W03I5s8pE3j5Wsm0NY9hAdw5ncHyis7xd58JE2STn7pj28i9w5SIrlEPv8AKQruMKmtIjLw4Cj3wfyUchAxRxYFDui/bWObtMutmym471lTmvugxNWaFDtaAcGwl3yi+wOFQ+OUAiiCLJ4PhNm10lyvIHJIF2pCBirzwnfwEjhHA+6Cq9gOcmuF2S6Aw6CPVPkH959LRyuJjXPcGtyTwFRJqrQDvNmygiu9pE2cm0woHyqIvJOVLGlxpovum2iCXOqhgVygP5o5QCDzhL7IDsnfnhLsqjaXzMY2gXGhZwgAOwpNoc4YugtNTpZNI/ZLturtrrCzjkfC8PjNOHBQKiWkjhMN3Gm+M2UnOL3lzjZdyU2tJDq7cj4QaMgdqJ2sD2AvNbnOwPupkidE8sJ4wfuOVDfbnmkOFXdc8IDG2yc+EybAFCx37pE2boD7ILS11OBHfhAyc1d13SQcEhpx5SvCCht2ncLxjKHuJO4irGMKa8hMEXniq+yASBF5JA70mQ4MBIO0nB+VWxn4cPDzvunNrj5QciPslaYVD+6rdYA2gV3HJUoCCtx2be12gC0v5p+3aNpN90FAt2jHB57lPY5zS81VqAaFLRrh6ThZ3E4FdkGusdpjIwaVhawNAJJ5PlYqRVZVNFkEC77fKB3tOEzQaKNnuPCkNcTQyVTm7XAMIffFKAFd+O5pALm5GLwldtIKSCg0ucGis+TSk3dFOyCCDkIGSLNfKBklxs8pWtIoWvEhdKxoYLBP7x8BZBBpFGZ5msDmtLsW40AnLG+F5ifVtJ4WVX91bNpe0OJGclUBdXZdOl07DrWxas+m2rOcnGAuZwv3WTXJKbTvvc4UBWfHwiJc4A+0fr3VSTPlIMhJNAWfAU0PyQ5xc4kmyooGBaOQUXfNkqvVqIMDWjn3dygJpTK4OqqAHPK0i075owWkOAslrTkDzSjTmL1gJy5sebLeU4JnaaXfGSCPGLCqNp26d2nb6GXg5HdcoG4bWiyflXG2TUz0wW9xJ5pZHBpBgmKo5oj+KSEVQyQLr5QDRxlIkbePdd3fbwn2QCaX2RaChyrc9wI2kg0QVkE77lAwqDiLpJwLTR5S7fKCgSLpDSQbBr5SAs0jIOED7Ug8pv242Xxm/KV3k8oGSjgg2D9kvlHCg3h051Hqbclrdyx4Q1xYbaSFUE5glDw1rqBFOFhUKqAPZJ31E3fyggjkUgisGvyUFxPa11yAuFHANdkGyMDAyoNVkfZNriGkE0DyqAEdwgltYGUu+EyBRz/ugOEkybyeUe3aDndfHwgVLSJsbo5N7iHgDYB+8bWfZFIGQWvo20hKm7bvPhDiXeTXlI8oP//Z",
    website: "https://www.bellobox.nl/",
    facebook: "https://www.facebook.com/share/1K8QMuGmKJ/?mibextid=wwXIfr",
    instagram: "https://instagram.com/belloboxnl?exln=c2J3OHl6MnJwMjdy",
    whatsapp: "085 773 3688",
    bijdrage:
      "Bellobox ondersteunt Stichting Bulldog Steunfonds Nederland als bedrijfsvriend en draagt met betrokkenheid bij aan ons werk voor bulldogs en hun baasjes."
  },
  {
    slug: "stellas-pupcakes",
    naam: "Stella's Pupcakes",
    korteOmschrijving:
      "Stella's Pupcakes uit Nevele-Deinze maakt gepersonaliseerde hondentaarten, verse pupcakes en andere verwennerijen voor honden. Daarnaast vind je er handgemaakte dogwear, bandana's, speeltjes, ligmatjes, slaapzakken en hondenkussens op maat.",
    verhaal: [
      "Stella's Pupcakes draait helemaal om het verwennen van honden met producten die met veel liefde en aandacht worden gemaakt. De gepersonaliseerde hondentaarten en pupcakes worden huisbereid met dagverse producten en zijn volgens de webshop gluten-, suiker- en lactosevrij.",
      "Naast het lekkers voor honden heeft Stella's Pupcakes ook een uitgebreid aanbod handgemaakte accessoires. Denk aan bandana's en sliders, hondenkleding, speeltjes, ligmatjes, zachte slaapzakken en hondenkussens. Veel producten kunnen worden aangepast aan de maat en wensen van de hond.",
      "Ook bij allergieën of bepaalde voorkeuren wordt meegedacht. Bij de pupcakes geeft Stella's Pupcakes aan dat er rekening kan worden gehouden met allergieën en smaakvoorkeuren, waardoor de persoonlijke aanpak duidelijk centraal staat.",
      "Wij zijn blij dat Stella's Pupcakes zich als bedrijfsvriend aan Stichting Bulldog Steunfonds Nederland verbindt. Hun liefde voor honden en persoonlijke manier van werken sluiten mooi aan bij waar onze stichting voor staat."
    ],
    logo: "https://www.google.com/s2/favicons?domain=stellaspupcakes.be&sz=256",
    afbeelding: "https://stellaspupcakes.be/wp-content/uploads/2022/12/WhatsApp-Image-2022-11-29-at-16.08.34-1.jpeg",
    website: "https://stellaspupcakes.be/",
    facebook: "https://www.facebook.com/share/19dAL4m1Dk/",
    plaats: "Nevele - Deinze, België",
    bijdrage:
      "Stella's Pupcakes ondersteunt Stichting Bulldog Steunfonds Nederland als bedrijfsvriend en helpt daarmee onze stichting en het werk voor bulldogs en hun baasjes zichtbaar te maken."
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


export function whatsappLink(value?: string) {
  if (!value) return undefined;
  let nummer = value.trim().replace(/[^\d+]/g, "");
  if (nummer.startsWith("00")) nummer = "+" + nummer.slice(2);
  nummer = nummer.replace(/\D/g, "");
  if (nummer.startsWith("0")) nummer = "31" + nummer.slice(1);
  if (!nummer) return undefined;
  return `https://wa.me/${nummer}`;
}

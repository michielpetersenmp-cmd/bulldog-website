import { getSupabaseAdmin } from "@/lib/supabase";

export type BoekConfig = {
  titel: string;
  subtitel: string;
  auteur: string;
  jaar: string;
  cover: string;
  intro: string[];
  doelgroep: string;
  homepageTekst: string;
};

export const standaardBoekConfig: BoekConfig = {
  titel: "Leven met een Bulldog",
  subtitel: "Een eerlijke en persoonlijke gids over karakter, verzorging, gezondheid en het leven samen.",
  auteur: "Michiel Petersen",
  jaar: "2026",
  cover: "/boeken/leven-met-een-bulldog-cover.jpg",
  intro: [
    "Dit boek is ontstaan uit jaren leven met Bulldogs. Niet om te vertellen dat iedereen een Bulldog moet nemen, maar om een eerlijk beeld te geven van de liefde, humor, zorgen en verantwoordelijkheid die bij deze bijzondere honden horen.",
    "Vanuit mijn eigen ervaringen met Molly, Tara, Binky, Sjors en Carlos vertel ik over vijf totaal verschillende karakters. Juist daardoor laat het boek zien dat er niet zoiets bestaat als één standaard Bulldog: iedere hond is een individu met een eigen gebruiksaanwijzing.",
    "Je leest niet alleen de mooie en grappige kanten, maar ook over gezondheid, verzorging, kosten, opvoeding, warmte, alleen thuis zijn en de moeilijke momenten die soms bij het leven met een hond horen."
  ],
  doelgroep: "Voor mensen die al met een Bulldog leven, voor wie erover denkt er één in huis te nemen en voor iedereen die beter wil begrijpen wat deze honden zo bijzonder maakt. Het boek probeert niets mooier te maken dan het is, maar wil ook niemand afschrikken. Het doel is vooral dat je bewuster kijkt naar de hond voor je.",
  homepageTekst: "Mijn persoonlijke en praktische boek over karakter, verzorging, gezondheid en het leven met Bulldogs. Met de verhalen en lessen van Molly, Tara, Binky, Sjors en Carlos."
};

export async function getBoekConfig(): Promise<BoekConfig> {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("site_config")
      .select("value")
      .eq("key", "boek")
      .maybeSingle();

    if (error || !data?.value) return standaardBoekConfig;
    return { ...standaardBoekConfig, ...(data.value as Partial<BoekConfig>) };
  } catch {
    return standaardBoekConfig;
  }
}

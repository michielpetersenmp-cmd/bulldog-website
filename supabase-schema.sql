-- ============================================
-- Stichting Bulldog Steunfonds Nederland
-- Supabase SQL Schema
-- Voer dit uit in: Supabase > SQL Editor
-- ============================================

-- Posts tabel (blogs én updates)
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  image_url text,
  category text not null check (category in ('blog', 'update')),
  tags text[] default '{}',
  published boolean default false,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index voor snelle queries
create index if not exists posts_category_idx on posts(category);
create index if not exists posts_published_idx on posts(published);
create index if not exists posts_slug_idx on posts(slug);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();

-- Row Level Security
alter table posts enable row level security;

-- Iedereen mag gepubliceerde posts lezen
create policy "Gepubliceerde posts zijn publiek leesbaar"
  on posts for select
  using (published = true);

-- Alleen ingelogde admins mogen alles (lezen/schrijven)
create policy "Admins mogen alles"
  on posts for all
  using (auth.role() = 'authenticated');

-- ============================================
-- Storage bucket voor afbeeldingen
-- ============================================
-- Maak een bucket aan via: Supabase > Storage > New bucket
-- Naam: "post-images"
-- Public: JA (zodat afbeeldingen publiek toegankelijk zijn)

-- Storage policy (voer uit na het aanmaken van de bucket):
create policy "Post afbeeldingen zijn publiek"
  on storage.objects for select
  using (bucket_id = 'post-images');

create policy "Admins mogen afbeeldingen uploaden"
  on storage.objects for insert
  with check (bucket_id = 'post-images' and auth.role() = 'authenticated');

create policy "Admins mogen afbeeldingen verwijderen"
  on storage.objects for delete
  using (bucket_id = 'post-images' and auth.role() = 'authenticated');

-- ============================================
-- Voorbeelddata (optioneel)
-- ============================================
insert into posts (slug, title, excerpt, content, category, published, featured) values
(
  'bulldog-zorg-wat-iedere-eigenaar-moet-weten',
  'Bulldog zorg: wat iedere eigenaar moet weten',
  'Bulldogs zijn bijzonder, lief en uniek — maar vragen ook om bijzondere aandacht en zorg.',
  '# Bulldog zorg: wat iedere eigenaar moet weten

Bulldogs zijn bijzondere honden. Ze zijn lief, grappig en ontzettend trouw. Maar ze vragen ook om extra aandacht als het gaat om hun gezondheid.

## Luchtwegen

Door hun platte snuit (brachycefalie) hebben bulldogs moeite met ademen, zeker bij warm weer of inspanning. Zorg dat uw bulldog altijd toegang heeft tot schaduw en vers water.

## Gewicht

Bulldogs hebben de neiging om zwaar te worden. Extra gewicht belast hun luchtwegen en gewrichten nog meer. Houd hun gewicht goed in de gaten en bespreek het juiste voer met uw dierenarts.

## Huidplooien

De huidplooien rond de neus en in de nek moeten regelmatig schoongemaakt worden om infecties te voorkomen. Een zachte doek of speciaal reinigingsdoekje werkt goed.

## Regelmatige controles

Laat uw bulldog minstens één keer per jaar controleren door een dierenarts die ervaring heeft met brachycefale rassen. Vroege signalering van problemen maakt een groot verschil.

Heeft u vragen of loopt u tegen hoge dierenartskosten aan? Neem contact op met onze stichting.',
  'blog',
  true,
  true
),
(
  'viervoetersdag-wij-zijn-erbij',
  'Viervoetersdag – wij zijn erbij',
  'Een mooie dag voor dierenliefhebbers, ontmoeting en steun voor onze stichting.',
  '# Viervoetersdag – wij zijn erbij

We zijn ontzettend blij te kunnen aankondigen dat Stichting Bulldog Steunfonds Nederland aanwezig zal zijn op de Viervoetersdag!

## Wat is de Viervoetersdag?

De Viervoetersdag is een jaarlijks evenement voor dierenliefhebbers in Nederland. Er zijn stands, demonstraties, en natuurlijk heel veel lieve viervoeters.

## Kom langs bij onze stand

U kunt ons vinden bij onze stand waar we meer vertellen over het werk van de stichting. We hebben ook producten uit onze shop mee en nemen graag de tijd om met u te praten.

Heeft u een bulldog? Breng ze gerust mee! We horen graag uw verhaal.',
  'update',
  true,
  false
);

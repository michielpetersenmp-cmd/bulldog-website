# Stichting Bulldog Steunfonds Nederland — Website

Officiële website voor [stichtingbulldogsteunfondsnederland.nl](https://stichtingbulldogsteunfondsnederland.nl).

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database/Storage**: Supabase
- **Hosting**: Vercel
- **Fonts**: Playfair Display (headings) + Nunito (body)

## Snel starten

### 1. Repository clonen

```bash
git clone https://github.com/jouw-org/bulldog-website.git
cd bulldog-website
npm install
```

### 2. Omgevingsvariabelen instellen

```bash
cp .env.local.example .env.local
```

Vul de Supabase-waarden in via [app.supabase.com](https://app.supabase.com).

### 3. Lokaal draaien

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pagina's

| Route | Pagina |
|-------|--------|
| `/` | Homepage |
| `/over-ons` | Over ons |
| `/aanvragen` | Aanvragen (verwijzing naar portaal) |
| `/doneren` | Doneren |
| `/contact` | Contact |
| `/privacyverklaring` | Privacyverklaring |

## Aanvraag portaal

Het aanvraagportaal draait apart op:  
👉 [https://bulldog-steunfonds-portaal.vercel.app](https://bulldog-steunfonds-portaal.vercel.app)

## Deployen naar Vercel

### Via Vercel Dashboard (aanbevolen)

1. Push code naar GitHub
2. Ga naar [vercel.com](https://vercel.com) → New Project
3. Selecteer je GitHub repository
4. Voeg environment variables toe (zie `.env.local.example`)
5. Deploy!

### Via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

## Stijlgids

| Token | Waarde |
|-------|--------|
| Primaire kleur | `#1a3a5c` |
| Accentkleur | `#f0a500` |
| Achtergrond | `#f8f8f6` |
| Display font | Playfair Display |
| Body font | Nunito |

## Contactgegevens stichting

- **KvK**: 99058731
- **E-mail**: info@stichtingbulldogsteunfondsnederland.nl

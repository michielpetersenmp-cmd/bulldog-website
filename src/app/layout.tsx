import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stichtingbulldogsteunfondsnederland.nl"),
  title: {
    default: "Stichting Bulldog Steunfonds Nederland",
    template: "%s | Stichting Bulldog Steunfonds Nederland",
  },
  description:
    "Financiële steun voor noodzakelijke operaties van bulldogs in Nederland, inclusief bijbehorende onderzoeken en nazorg.",
  keywords: [
    "bulldog",
    "steunfonds",
    "bulldog operatie",
    "hulp operatie bulldog",
    "dierenartskosten bulldog",
    "financiële hulp dierenarts hond",
    "medische hulp bulldog",
    "stichting bulldog",
    "doneren bulldogs",
    "bulldogs",
  ],
  authors: [{ name: "Stichting Bulldog Steunfonds Nederland" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://stichtingbulldogsteunfondsnederland.nl",
    siteName: "Stichting Bulldog Steunfonds Nederland",
    title: "Stichting Bulldog Steunfonds Nederland",
    description:
      "Financiële steun voor noodzakelijke operaties van bulldogs in Nederland.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Stichting Bulldog Steunfonds Nederland",
    url: "https://stichtingbulldogsteunfondsnederland.nl",
    logo: "https://stichtingbulldogsteunfondsnederland.nl/logo.png",
    email: "info@stichtingbulldogsteunfondsnederland.nl",
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    description:
      "Stichting die bulldogeigenaren in Nederland ondersteunt bij noodzakelijke operaties en direct samenhangende onderzoeken, medicatie en nazorg.",
  };

  return (
    <html lang="nl" className={`${nunito.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans bg-bg text-gray-800 antialiased">
   <HeaderWrapper />
<main>{children}</main>
<FooterWrapper />
<AnalyticsConsent />
      </body>
    </html>
  );
}

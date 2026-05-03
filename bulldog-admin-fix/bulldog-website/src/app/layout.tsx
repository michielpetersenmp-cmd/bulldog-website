import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
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
  title: {
    default: "Stichting Bulldog Steunfonds Nederland",
    template: "%s | Stichting Bulldog Steunfonds Nederland",
  },
  description:
    "Financiële steun voor eigenaren van buldoggen die veterinaire kosten niet kunnen betalen. Samen zorgen we voor onze vierpootige vrienden.",
  keywords: ["bulldog", "steunfonds", "veterinaire kosten", "stichting", "doneren", "buldoggen"],
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
      "Financiële steun voor eigenaren van buldoggen die veterinaire kosten niet kunnen betalen.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${nunito.variable} ${playfair.variable}`}>
      <body className="font-sans bg-bg text-gray-800 antialiased">
        <HeaderWrapper />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://stichtingbulldogsteunfondsnederland.nl",
    siteName: "Stichting Bulldog Steunfonds Nederland",
    title: "Stichting Bulldog Steunfonds Nederland",
    description:
      "Financiële steun voor eigenaren van buldoggen die veterinaire kosten niet kunnen betalen.",
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

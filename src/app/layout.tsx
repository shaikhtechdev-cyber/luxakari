import type { Metadata } from "next";
import localFont from "next/font/local";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

// Brand typefaces (Brand Identity Book §04): Cinzel for display, Montserrat for text.
// Self-hosted (SIL Open Font License, Latin variable fonts from Google Fonts) so the
// build never downloads from Google — next/font/google intermittently crashed the
// Vercel build ("Cannot read properties of null (reading '1')").
const cinzel = localFont({
  src: "./fonts/cinzel-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-cinzel",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const montserrat = localFont({
  src: "./fonts/montserrat-latin.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Luxakari Hospitality Group — Redefining Urban Living Through Hospitality",
  description:
    "Luxakari merges premium hospitality standards with sophisticated residential living. We partner with landlords and developers to transform assets into thriving community-centric destinations — unlocking investment and premium hospitality across Makkah, Madinah and the region.",
  keywords: [
    "Luxakari",
    "hospitality",
    "serviced residences",
    "Makkah",
    "Madinah",
    "KSA",
    "Riyadh",
    "KAFD",
    "luxury apartments",
    "concierge",
  ],
  openGraph: {
    title: "Luxakari Hospitality Group",
    description:
      "Premium hospitality standards with sophisticated residential living — from Makkah and Madinah to KSA, UAE and beyond.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable}`}>
      <body className="font-body antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

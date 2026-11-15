import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

// Brand typefaces (Brand Identity Book §04): Cinzel for display, Montserrat for text.
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
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

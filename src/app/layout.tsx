import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
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
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body className="font-body antialiased">
        <div className="noise-overlay" />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

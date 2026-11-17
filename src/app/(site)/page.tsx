import Hero from "@/components/Hero";
import StaySearch from "@/components/sections/StaySearch";
import HolyCities from "@/components/sections/HolyCities";
import About from "@/components/sections/About";
import Solutions from "@/components/sections/Solutions";
import Residences from "@/components/sections/Residences";
import Leadership from "@/components/sections/Leadership";
import Divisions from "@/components/sections/Divisions";
import InstagramFeed from "@/components/sections/InstagramFeed";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Booking from "@/components/sections/Booking";

// Rebuild the page at most hourly so the Instagram feed stays current.
export const revalidate = 3600;

export default function Home() {
  return (
    <main>
      <Hero />
      <StaySearch />
      <HolyCities />
      <About />
      <Solutions />
      <Residences />
      <Leadership />
      <Divisions />
      <CTA />
      <FAQ />
      <InstagramFeed />
      <Booking />
    </main>
  );
}

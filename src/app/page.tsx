import Hero from "@/components/Hero";
import HolyCities from "@/components/sections/HolyCities";
import About from "@/components/sections/About";
import Solutions from "@/components/sections/Solutions";
import Residences from "@/components/sections/Residences";
import Leadership from "@/components/sections/Leadership";
import Divisions from "@/components/sections/Divisions";
import CTA from "@/components/sections/CTA";
import Booking from "@/components/sections/Booking";

export default function Home() {
  return (
    <main>
      <Hero />
      <HolyCities />
      <About />
      <Solutions />
      <Residences />
      <Leadership />
      <Divisions />
      <CTA />
      <Booking />
    </main>
  );
}

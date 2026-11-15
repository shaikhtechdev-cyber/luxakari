"use client";

import SplitText from "@/components/SplitText";
import SplitFeature from "@/components/SplitFeature";
import Reveal from "@/components/Reveal";
import { media } from "@/lib/media";

const GLOBAL_POINTS = [
  "Benchmarked against Four Seasons, Mandarin Oriental and Waldorf Astoria — extended with butler-trained staff and a 24/7 personalised concierge designed around the modern guest.",
  "Proven expertise in property enhancement: from renovation and upgrades to premium furnishings and curated amenities.",
  "Culturally attuned to Middle Eastern values and taste, ensuring offerings resonate in KSA, UAE and beyond.",
  "Dedicated to eco-conscious practices and sustainable operations.",
];

export default function About() {
  return (
    <section id="about" className="relative">
      {/* The shift + lifestyle */}
      <div className="mx-auto max-w-[1400px] space-y-24 px-5 py-24 lg:space-y-28 lg:px-10 lg:py-32">
        <SplitFeature
          image={media("/images/shift-chauffeur.jpg")}
          alt="A Luxakari chauffeur opening the car door for a guest"
        >
          <span className="section-label font-display">The Shift</span>
          <SplitText
            as="h2"
            text="Today's Tenants Expect More Than Just A Home..."
            className="font-heading text-3xl font-semibold leading-[1.12] text-wine sm:text-4xl lg:text-[2.75rem]"
          />
        </SplitFeature>

        <SplitFeature
          image={media("/images/lifestyle-pool.jpg")}
          alt="A rooftop pool at sunset with a view of Masjid an-Nabawi"
          reverse
        >
          <span className="section-label font-display">Lifestyle</span>
          <SplitText
            as="h2"
            text="They Seek Lifestyle Experiences"
            className="font-heading text-3xl font-semibold leading-[1.12] text-copper sm:text-4xl lg:text-[2.75rem]"
          />
          <ul className="mt-7 space-y-4">
            {[
              "Rising demand for elevated amenities, personalized services and community-oriented living.",
              "Hospitality-inspired residential offerings command premium rents and higher occupancy rates.",
              "Tenants increasingly value cultural sensitivity, wellness features, experiential offerings and accessibility.",
            ].map((t, i) => (
              <Reveal as="li" index={i} key={t} className="flex items-start gap-4 text-warmbrown">
                <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-copper" />
                <span className="font-body text-base leading-relaxed">{t}</span>
              </Reveal>
            ))}
          </ul>
        </SplitFeature>
      </div>

      {/* Global standard — full-bleed reception photo, content over the plain wall on the right */}
      <div className="relative overflow-hidden">
        <div className="relative aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto">
          <img
            src={media("/images/global-standard.jpg")}
            alt="A Luxakari host welcoming guests at reception"
            className="h-full w-full object-cover object-left"
          />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-cream/50 lg:block" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-24">
          <div className="lg:ml-auto lg:w-[52%]">
            <span className="section-label font-display">Our Standard</span>
            <h2 className="font-heading text-3xl font-semibold leading-[1.12] text-wine sm:text-4xl lg:text-[2.6rem]">
              A Global Standard In Hospitality-Infused Residential Living
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {GLOBAL_POINTS.map((point, i) => (
                <Reveal
                  as="li"
                  index={i}
                  key={point}
                  className="rounded-2xl border border-white/60 bg-white/75 p-6 font-body text-sm leading-relaxed text-warmbrown shadow-[0_10px_30px_-18px_rgba(58,10,18,0.35)] backdrop-blur-md"
                >
                  <span className="mb-2 block font-display text-sm font-bold tracking-[0.1em] text-copper">
                    0{i + 1}
                  </span>
                  {point}
                </Reveal>
              ))}
            </ul>
            <Reveal index={4} className="mt-8">
              <a href="#hubspot-form" className="btn-cream btn-shine">
                Book Now
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

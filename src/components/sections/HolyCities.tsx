"use client";

import Reveal from "@/components/Reveal";
import { media } from "@/lib/media";

const BANNER_COPY = [
  "Two billion souls hold Makkah and Madinah in their hearts. For generations, the dream of belonging to these blessed cities remained just that - a dream.",
  "Luxakari is the key. We are unlocking investment opportunities and premium hospitality experiences in the holy cities and across the region. Our geography is broad but our focus is singular. Every door we open brings the Ummah closer to home.",
];

const PBUH = () => <span className="honorific">{"\uFDFA"}</span>;

const CITIES = [
  {
    id: "madinah",
    name: "Madinah",
    tag: "The City of the Prophet",
    image: media("/images/madinah.jpg"),
    paragraphs: [
      <>
        Madinah does not receive visitors. It welcomes them home. This is the city of the Prophet{" "}
        <PBUH />, which opened its doors to the first hijrah and has never closed them since. Here
        the heart settles, the soul is nourished, and the believer is restored.
      </>,
      <>
        Luxakari gives that welcome an address: apartments, villas, and premium hospitality near
        the Prophet&apos;s Mosque <PBUH />. Every new door we open brings you closer to home.
      </>,
    ],
  },
  {
    id: "makkah",
    name: "Makkah",
    tag: "The Centre of the Muslim World",
    image: media("/images/makkah.jpg"),
    paragraphs: [
      "Stand in the Haram and you feel it - a circular energy, the Ummah in constant motion around a single centre. This is gravity of the heart.",
      "Luxakari invites you into this circle of trust - apartments, villas and premium hospitality within reach of the Haram, connected to the Kaaba, to the Ummah, at the centre of the Muslim world.",
    ],
  },
];

export default function HolyCities() {
  return (
    <>
      {/* About Luxakari Arabia — full-bleed banner */}
      <section id="about-arabia" className="relative overflow-hidden py-20 lg:py-24">
        <div className="absolute inset-0 -z-10">
          <img src={media("/images/holy-banner.jpg")} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-wine-cta/95 via-wine-dark/90 to-wine-dark/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-wine-cta/60 via-transparent to-wine-cta/60" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="max-w-2xl">
            <span className="section-label text-peach">About</span>
            <h2 className="font-heading text-3xl font-medium leading-[1.15] text-peach sm:text-4xl lg:text-5xl">
              About Luxakari Arabia
            </h2>
            <div className="divider-gold mt-6 w-32 opacity-80" />
            <div className="mt-8 space-y-5">
              {BANNER_COPY.map((p, i) => (
                <Reveal
                  as="p"
                  index={i}
                  key={p}
                  className="font-body text-base leading-relaxed text-cream/90 lg:text-lg"
                >
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Madinah & Makkah */}
      <section id="holy-cities" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid gap-7 md:grid-cols-2">
            {CITIES.map((city, i) => (
              <Reveal
                index={i}
                key={city.id}
                id={`holy-cities-${city.id}`}
                className="glass-card group overflow-hidden rounded-none"
              >
                <div className="relative h-72 overflow-hidden lg:h-80">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-cta via-wine-cta/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="font-display text-[10px] uppercase tracking-[0.35em] text-champagne">
                      {city.tag}
                    </p>
                    <h3 className="mt-2 font-heading text-3xl font-medium text-cream lg:text-4xl">
                      {city.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 p-7 lg:p-9">
                  {city.paragraphs.map((p, pi) => (
                    <p key={pi} className="font-body text-base leading-relaxed text-wine/80">
                      {p}
                    </p>
                  ))}
                  <div className="divider-gold w-20" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

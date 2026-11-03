"use client";

import {
  Wrench,
  Sofa,
  ConciergeBell,
  ClipboardCheck,
  Users,
  HeartHandshake,
  Leaf,
  Sparkles,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SplitText from "@/components/SplitText";
import ServiceCard from "@/components/ServiceCard";
import SplitFeature from "@/components/SplitFeature";
import Reveal from "@/components/Reveal";
import { media } from "@/lib/media";

const ONE_STOP = [
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Renovation & Upgrade",
    text: "Tailored improvements to optimize space, aesthetics and functionality.",
  },
  {
    icon: <Sofa className="h-5 w-5" />,
    title: "Furnishings & Fixtures",
    text: "Thoughtful, high-end interiors for turnkey luxury experiences.",
  },
  {
    icon: <ConciergeBell className="h-5 w-5" />,
    title: "Amenities & Services",
    text: "Concierge, fitness, wellness, F&B partnerships, co-working lounge and community events.",
  },
  {
    icon: <ClipboardCheck className="h-5 w-5" />,
    title: "Ongoing Management",
    text: "Professional property management, tenant engagement, maintenance and sustainability.",
  },
];

const COMMUNITY = [
  "Vibrant communal spaces and shared experiences that build genuine neighbor bonds.",
  "Gatherings and events that celebrate local heritage, arts and living tradition.",
  "Personalized service - from housekeeping to wellness, anticipating comfort before it is asked for.",
  "Educational and spiritually enriching programs that nourish the mind and the heart.",
];

const COMMUNITY_LEAD =
  "Residents don't simply occupy a home with us. They live within a community shaped by shared culture, hospitality, and values.";

const RETURNS = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Increased Revenue",
    text: "Enhanced property offerings justify higher rents and attract top-tier tenants.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Higher Occupancy",
    text: "Exceptional resident experience leads to improved retention and reduced vacancies.",
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Brand Differentiation",
    text: "Luxakari affiliation elevates your building's prestige and market positioning.",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Long-Term Stability",
    text: "Satisfied, engaged communities translate into consistent cash flow and portfolio growth.",
  },
];

export default function Solutions() {
  return (
    <>
      {/* One-stop solution */}
      <section className="relative py-24 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <SectionHeading
            label="Services"
            title="One-Stop Solution For Elevated, Worry-Free Building Management"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ONE_STOP.map((s, i) => (
              <ServiceCard key={s.title} index={i} icon={s.icon} title={s.title} text={s.text} />
            ))}
          </div>
        </div>
      </section>

      {/* Creating communities */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                label="Community"
                title="Creating Communities Not Just Buildings"
              />
              <Reveal index={0}>
                <p className="-mt-4 mb-8 font-body text-lg leading-relaxed text-gold-dark">
                  {COMMUNITY_LEAD}
                </p>
              </Reveal>
              <ul className="space-y-4">
                {COMMUNITY.map((point, i) => (
                  <Reveal
                    as="li"
                    index={i + 1}
                    key={point}
                    className="flex items-start gap-4 font-body text-base leading-relaxed text-wine/75"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    {point}
                  </Reveal>
                ))}
              </ul>
              <Reveal index={4} className="mt-10">
                <a href="#hubspot-form" className="btn-cream btn-shine">
                  Book Now
                </a>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { src: media("/images/creating-left.jpg"), alt: "Community life" },
                { src: media("/images/creating-right.jpg"), alt: "Shared experiences" },
              ].map((img, i) => (
                <Reveal index={i} key={img.src}>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-wine/10">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine-cta/60 to-transparent" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Respecting local values — full-bleed photo, dark overlay, peach text */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        <div className="absolute inset-0 -z-10">
          <img src={media("/images/respecting.jpg")} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-wine-cta/95 via-wine-dark/90 to-wine-dark/60" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="max-w-2xl">
            <span className="section-label text-peach">Heritage</span>
            <h2 className="font-display text-3xl font-bold uppercase leading-[1.15] text-peach sm:text-4xl lg:text-5xl">
              Respecting Local Values And Traditions
            </h2>
            <div className="divider-gold mt-6 w-32 opacity-80" />
            <ul className="mt-9 space-y-5">
              {[
                "Design elements and community programming reflect Middle Eastern aesthetics and social customs.",
                "Staff trained in cultural awareness and hospitality protocols that respect local traditions.",
                "Premium amenities balanced with culturally appropriate furnishings — familiar yet elevated environment.",
              ].map((t, i) => (
                <Reveal
                  as="li"
                  index={i}
                  key={t}
                  className="flex items-start gap-4 font-body text-base leading-relaxed text-cream/85"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-peach shadow-[0_0_10px_#FFCDA5]" />
                  {t}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Living lightly — cream section, image occupying right half */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="section-label">Sustainability</span>
              <h2 className="font-display text-3xl font-bold uppercase leading-[1.15] text-wine sm:text-4xl lg:text-5xl">
                Living Lightly On The Planet
              </h2>
              <div className="divider-gold mt-6 w-32" />
              <p className="mt-6 max-w-xl font-body text-lg italic leading-relaxed text-gold-dark">
                Our eco-conscious approach resonates with modern tenants and future-proofs your
                property investment.
              </p>
              <ul className="mt-7 max-w-xl space-y-4">
                {[
                  "Sustainable materials, energy-efficient systems and responsible sourcing integrated into renovations and operations.",
                  "Recycling, waste reduction and green building practices reduce long-term costs and environmental impact.",
                  "Position your property as forward-thinking and socially responsible.",
                ].map((t, i) => (
                  <Reveal
                    as="li"
                    index={i}
                    key={t}
                    className="flex items-start gap-3.5 font-body text-base leading-relaxed text-wine/75"
                  >
                    <Leaf className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    {t}
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal index={1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-wine/10">
                <img
                  src={media("/images/living.jpg")}
                  alt="Sustainable living"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Concierge */}
      <section className="relative py-24 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <SplitFeature image={media("/images/elevating.jpg")} alt="Concierge services">
            <span className="section-label">Concierge</span>
            <SplitText
              as="h2"
              text="Elevating Everyday Living Through Personalized Care"
              className="font-display text-3xl font-bold uppercase leading-[1.15] text-wine sm:text-4xl lg:text-[2.5rem]"
            />
            <p className="mt-4 font-body text-base leading-relaxed text-wine/70">
              Exceptional concierge services that redefine convenience and elevate lifestyles for
              residents and executives alike.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Tailored Solutions", "Bespoke services designed to meet individual needs, from securing exclusive reservations to managing daily errands."],
                ["Corporate Concierge", "Streamlined solutions for businesses, offering VIP services, travel arrangements and event coordination to enhance employee satisfaction and productivity."],
                ["Private Lifestyle Services", "Access to exclusive experiences, luxury travel planning, personal shopping and wellness services tailored to elite clientele."],
                ["Seamless Support", "24/7 assistance available via dedicated concierges, ensuring prompt and reliable service at all times."],
                ["Global Network", "Exclusive partnerships with top-tier brands and service providers, offering access to rare and coveted opportunities."],
                ["Resident Benefits", "Concierge services that enrich community living by organizing events, facilitating connections and promoting a sense of belonging."],
              ].map(([title, text], i) => (
                <Reveal
                  index={i}
                  key={title}
                  className="rounded-xl border border-wine/10 bg-white p-5 transition-all duration-400 hover:border-gold/50"
                >
                  <h4 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-gold-dark">
                    {title}
                  </h4>
                  <p className="mt-2 font-body text-sm leading-relaxed text-wine/70">{text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal index={6} className="mt-9">
              <a href="#hubspot-form" className="btn-cream btn-shine">
                Book Now
              </a>
            </Reveal>
          </SplitFeature>
        </div>
      </section>

      {/* Returns */}
      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(114,55,64,0.10)_0%,transparent_45%)]" />
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <SectionHeading
            label="Returns"
            title="Luxakari Solutions Directly Boost Returns And Create Lasting Asset Value"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RETURNS.map((r, i) => (
              <ServiceCard key={r.title} index={i} icon={r.icon} title={r.title} text={r.text} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

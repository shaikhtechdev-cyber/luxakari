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
  Landmark,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";

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

const VALUES = [
  {
    icon: <Users className="h-6 w-6" />,
    label: "Community",
    title: "Communities, Not Just Buildings",
    text: "Shared spaces, gatherings and personal service that turn residents into neighbours.",
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    label: "Heritage",
    title: "Respecting Local Values",
    text: "Design, programming and staff training that honour Middle Eastern customs and traditions.",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    label: "Sustainability",
    title: "Living Lightly",
    text: "Sustainable materials, efficient systems and less waste, lowering long-term costs.",
  },
];

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

      {/* Community · Heritage · Sustainability — short boxes, no photos */}
      <section className="relative py-24 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <SectionHeading label="What We Stand For" title="Community, Heritage And Sustainability" />
          <div className="grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.label} index={i} className="glass-card p-7">
                <span className="text-copper">{v.icon}</span>
                <span className="mt-5 block font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-dustyrose">
                  {v.label}
                </span>
                <h3 className="mt-2 font-heading text-2xl font-semibold leading-snug text-wine">{v.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-warmbrown">{v.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal index={3} className="mt-10">
            <a href="#hubspot-form" className="btn-cream btn-shine">
              Book Now
            </a>
          </Reveal>
        </div>
      </section>

      {/* Returns */}
      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(64,18,21,0.10)_0%,transparent_45%)]" />
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

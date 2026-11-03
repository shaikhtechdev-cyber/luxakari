"use client";

import { Users, Handshake, GraduationCap, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SplitFeature from "@/components/SplitFeature";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { media } from "@/lib/media";

const LEADERSHIP = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Executive Team",
    text: "Leaders with luxury hospitality, real estate, design and sustainability backgrounds.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "On-Site Managers",
    text: "Managers trained in world-class customer service protocols.",
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    title: "Dedicated Officers",
    text: "Sustainability officers and lifestyle advisors supporting every community.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Global Network",
    text: "A network of trusted vendors and service providers worldwide.",
  },
];

const PARTNER = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Hospitality Advisory & Deal Sourcing",
    text: "Advisory services for investors looking to expand or enter the hospitality sector — market analysis, location scouting, brand selection and investment structuring.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Development & Operational Expertise",
    text: "Guidance on all phases of hotel development, from concept creation and feasibility studies to construction and pre-opening planning.",
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    title: "Ongoing Management",
    text: "Full-scale operations management for hotels and serviced apartment projects, ensuring efficiency, quality service and profitability.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Value Maximization",
    text: "Custom strategies to optimize returns and enhance ROI through targeted marketing, revenue management and brand partnerships.",
  },
];

const TAILORED = [
  "Collaborative planning sessions to align on target tenant profiles, aesthetic direction and service level.",
  "Phased renovation and upgrade schedules to minimize disruption.",
  "Transparent reporting and performance metrics to track success.",
  "Ongoing strategic advisement to evolve the property as market needs change.",
];

export default function Leadership() {
  return (
    <>
      {/* Tailored approach */}
      <section className="relative py-24 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="glass-card relative overflow-hidden rounded-[2rem] px-7 py-14 lg:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#BC6D1F]/20 blur-[80px]" />
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <span className="section-label font-display">Approach</span>
                <h2 className="font-display text-3xl font-bold uppercase leading-[1.15] text-wine sm:text-4xl">
                  A Tailored Approach For Every Property
                </h2>
                <p className="mt-4 font-body text-lg leading-relaxed text-gold-dark">
                  Flexible arrangements aligned with your vision, goals and financial parameters.
                </p>
              </div>
              <ul className="space-y-4">
                {TAILORED.map((t, i) => (
                  <Reveal
                    as="li"
                    index={i}
                    key={t}
                    className="flex items-start gap-4 font-body text-base leading-relaxed text-wine/85"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    {t}
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal index={4} className="mt-10 text-center lg:text-left">
              <a href="#hubspot-form" className="btn-cream btn-shine">
                Book Now
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Partnering */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <SplitFeature image={media("/images/partner.jpg")} alt="Partnering with investors" reverse>
            <span className="section-label font-display">Investors</span>
            <h2 className="font-display text-3xl font-bold uppercase leading-[1.15] text-wine sm:text-4xl lg:text-[2.5rem]">
              Partnering With Investors To Develop And Manage Hospitality Assets
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PARTNER.map((p, i) => (
                <Reveal
                  index={i}
                  key={p.title}
                  className="rounded-xl border border-wine/15 bg-white p-5 transition-all duration-400 hover:border-gold/40"
                >
                  <p className="text-gold">{p.icon}</p>
                  <h4 className="mt-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-wine">
                    {p.title}
                  </h4>
                  <p className="mt-2 font-body text-sm leading-relaxed text-wine/70">{p.text}</p>
                </Reveal>
              ))}
            </div>
          </SplitFeature>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(188,109,31,0.08)_0%,transparent_45%)]" />
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <SectionHeading
                label="Team"
                title="Expert Leadership & Professional Management"
              />
              <p className="-mt-6 mb-8 font-body text-lg leading-relaxed text-gold-dark">
                Our seasoned professionals ensure flawless execution and consistent excellence.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {LEADERSHIP.map((l, i) => (
                  <ServiceCard key={l.title} index={i} icon={l.icon} title={l.title} text={l.text} />
                ))}
              </div>
            </div>
            <div className="group relative order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-wine/15">
                <img
                  src={media("/images/expert.jpg")}
                  alt="Expert leadership"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream/70 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

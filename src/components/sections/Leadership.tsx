"use client";

import { Users, Handshake, GraduationCap, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";

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
          <div className="glass-card relative overflow-hidden rounded-none px-7 py-14 lg:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C98A6B]/20 blur-[80px]" />
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <span className="section-label font-display">Approach</span>
                <h2 className="font-heading text-3xl font-medium leading-[1.15] text-wine sm:text-4xl">
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
          <SectionHeading label="Investors" title="Partnering With Investors To Develop And Manage Hospitality Assets" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNER.map((p, i) => (
              <ServiceCard key={p.title} index={i} icon={p.icon} title={p.title} text={p.text} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative overflow-hidden py-24 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <SectionHeading label="Team" title="Expert Leadership & Professional Management" />
          <p className="-mt-6 mb-10 max-w-2xl font-body text-lg leading-relaxed text-warmbrown">
            Our seasoned professionals ensure flawless execution and consistent excellence.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((l, i) => (
              <ServiceCard key={l.title} index={i} icon={l.icon} title={l.title} text={l.text} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

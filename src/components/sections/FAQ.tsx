"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Where are Luxakari residences located?",
    a: "All of our residences are in Madinah, within the Haram Boundary: KEC Madinah in the Al Alyaa project at Knowledge Economic City, Ayn Al Khaif, Al Qasr and Project 12.",
  },
  {
    q: "How do I book a stay?",
    a: "Search for your dates in the Stay section and press Book Now on a residence, or fill in the booking form further down this page. Our reservations team then contacts you to confirm availability and your rate.",
  },
  {
    q: "Can I stay for a few nights as well as for months?",
    a: "Yes. Our residences are managed for short- to long-term stays, and Al Qasr for short- to mid-term stays. Minimum stay varies by property and season.",
  },
  {
    q: "How much does a stay cost?",
    a: "Rates depend on the residence, the season and the length of your stay, so we quote them on request. Our reservations team confirms the final price before you commit.",
  },
  {
    q: "What is included in a serviced residence?",
    a: "Every residence is fully furnished with quality finishes and includes housekeeping, maintenance, and Luxakari's concierge and guest services.",
  },
  {
    q: "How do I get to Masjid an-Nabawi?",
    a: "KEC Madinah is about 7 minutes from Masjid an-Nabawi. Ayn Al Khaif and Al Qasr residents have a private shuttle service to all five daily prayers.",
  },
  {
    q: "Can you arrange airport transfers?",
    a: "Yes. Lux Drive, our chauffeur service in Madinah, offers airport transfers, private chauffeur services and city-to-city travel. Mention it when you book, or contact our team.",
  },
  {
    q: "What is the Owner Stay Program?",
    a: "It lets owners use their residence personally while Luxakari manages it for rental income the rest of the time.",
  },
  {
    q: "I'm interested in investing. Who do I speak to?",
    a: "Send us a message through the contact form at the bottom of this page and our team will get back to you about available residences and our management model.",
  },
];

// FAQPage structured data so search engines can show these answers directly.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
        <div>
          <SectionHeading label="FAQ" title="Frequently Asked Questions" />
          <p className="max-w-sm font-body text-base leading-relaxed text-wine/75">
            Can&apos;t find what you&apos;re looking for? Our team is happy to help.
          </p>
          <a href="#contact" className="btn-outline mt-8 inline-flex">
            Contact Us
          </a>
        </div>

        <ul className="border-t border-copper/30">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-copper/30">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-body text-base font-semibold text-wine transition-colors hover:text-copper lg:text-lg"
                  >
                    {item.q}
                    <Plus
                      className={`h-5 w-5 shrink-0 text-copper transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-10 font-body text-base leading-relaxed text-wine/80">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

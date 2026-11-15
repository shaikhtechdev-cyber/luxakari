import Image from "next/image";
import { ArrowUp, Linkedin, Instagram, Facebook, Youtube, Music2, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import { media } from "@/lib/media";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#lux-residences" },
  { name: "Divisions", href: "#divisions" },
  { name: "Booking", href: "#hubspot-form" },
  { name: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/company/luxakari/" },
  { icon: <Instagram className="h-4 w-4" />, href: "https://www.instagram.com/luxakari/" },
  { icon: <Music2 className="h-4 w-4" />, href: "https://www.tiktok.com/@luxakarihospitalitygroup" },
  { icon: <Send className="h-4 w-4" />, href: "https://www.snapchat.com/add/luxakari" },
  { icon: <Facebook className="h-4 w-4" />, href: "https://www.facebook.com/luxakarihospitalitygroup" },
  { icon: <Youtube className="h-4 w-4" />, href: "https://www.youtube.com/@Luxakari" },
];

export default function Footer() {
  return (
    <footer id="luxa-footer" className="relative overflow-hidden border-t border-wine/15 pb-10 pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(64,18,21,0.10)_0%,transparent_45%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <Reveal index={0}>
            <Image
              src={media("/images/logo-horizontal.png")}
              alt="Luxakari Hospitality Group"
              width={1152}
              height={484}
              className="h-24 w-auto"
            />
            <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-wine/70">
              Luxakari merges premium hospitality standards with sophisticated residential living —
              redefining urban living through hospitality.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-wine/20 text-wine/75 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-wine hover:text-cream"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal index={1}>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-gold-dark">
              Navigate
            </h4>
            <ul className="mt-6 space-y-3">
              {LINKS.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 font-body text-sm text-wine/70 transition-colors hover:text-gold"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={2}>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-gold-dark">
              Residences
            </h4>
            <ul className="mt-6 space-y-3">
              {[
                ["KEC Madinah", "#lux-residences-kec-madinah"],
                ["Ayn Al Khaif", "#lux-residences-ayn-al-khaif"],
                ["Al Qasr", "#lux-residences-al-qasr"],
                ["Lux Drive", "#lux-drive"],
                ["Lux Design", "#lux-design"],
                ["Hospitality Technology", "#hospitality-technology"],
              ].map(([name, href]) => (
                <li key={name}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 font-body text-sm text-wine/70 transition-colors hover:text-gold"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="divider-gold my-12" />

        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="font-body text-sm text-wine/70">
            Copyright ©️ {new Date().getFullYear()} Luxakari Hospitality Group. All rights reserved.
          </p>
          <a
            href="#hero"
            className="group flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.3em] text-wine/70 transition-colors hover:text-gold"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-wine/25 transition-all duration-300 group-hover:border-wine group-hover:bg-wine group-hover:text-cream">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { media } from "@/lib/media";
import AccountMenu from "./AccountMenu";

interface MenuLink {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  href: string;
  children?: MenuLink[];
}

const MENU: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  {
    name: "Suites",
    href: "/#hubspot-form",
    children: [
      { name: "Booking.com", href: "https://www.booking.com/hotel/sa/kafd-one-bedroom-apartment.html" },
      { name: "Airbnb", href: "https://www.airbnb.com/l/eoiRbrRy" },
      { name: "Agoda", href: "https://www.agoda.com/kafd-two-bedroom-apartment-h76369691/hotel/riyadh-sa.html" },
    ],
  },
  {
    name: "Portfolio",
    href: "/#lux-residences",
    children: [
      { name: "KEC Madinah", href: "/#lux-residences-kec-madinah" },
      { name: "Ayn Al Khaif", href: "/#lux-residences-ayn-al-khaif" },
      { name: "Al Qasr", href: "/#lux-residences-al-qasr" },
    ],
  },
  { name: "Booking", href: "/#hubspot-form" },
  { name: "Luxdrive", href: "/#lux-drive" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-wine-cta via-wine-dark to-wine-cta"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled ? "bg-wine-cta/95 shadow-[0_6px_24px_-12px_rgba(58,10,18,0.6)] backdrop-blur-md" : ""
          }`}
        >
          <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 lg:px-10">
            {/* Brand §02: full lockup only where it can be ≥160px wide; smaller
                screens use the key emblem with the Cinzel text wordmark. */}
            <Link href="/" aria-label="Luxakari Hospitality Group — home" className="flex items-center">
              <Image
                src={media("/images/logo-horizontal.png")}
                alt="Luxakari Hospitality Group"
                width={1152}
                height={484}
                priority
                className="hidden h-[68px] w-auto lg:block"
              />
              <span className="flex items-center gap-3 lg:hidden">
                <Image
                  src={media("/images/logo-emblem.png")}
                  alt=""
                  width={248}
                  height={525}
                  priority
                  className="h-11 w-auto"
                />
                <span className="font-heading text-lg font-medium tracking-[0.3em] text-champagne">LUXAKARI</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 xl:flex">
              {MENU.map((item) => (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.children ? item.name : null)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                      openDropdown === item.name
                        ? "text-champagne"
                        : "text-cream hover:text-champagne"
                    }`}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-300 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full pt-3"
                      >
                        <div className="min-w-[230px] rounded-none border border-cream/10 bg-wine-cta p-2 shadow-2xl">
                          {item.children.map((child, ci) => (
                            <motion.a
                              key={child.name}
                              href={child.href}
                              target={child.href.startsWith("http") ? "_blank" : undefined}
                              rel={child.href.startsWith("http") ? "noreferrer" : undefined}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 + ci * 0.05 }}
                              className="group flex items-center justify-between gap-3 rounded-none px-4 py-2.5 font-body text-sm text-cream/80 transition-all duration-300 hover:bg-champagne/10 hover:pl-5 hover:text-champagne"
                            >
                              {child.name}
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <AccountMenu />
              <a href="/#hubspot-form" className="btn-cream btn-shine hidden !px-7 !py-3 sm:inline-flex">
                Book Now
              </a>
              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="rounded-full border border-cream/30 p-2.5 text-cream transition-colors hover:border-champagne hover:text-champagne xl:hidden"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-wine-cta via-wine-dark to-wine-cta backdrop-blur-xl xl:hidden"
          >
            <motion.nav
              className="flex h-full flex-col gap-2 overflow-y-auto px-6 pb-16 pt-28"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {MENU.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="border-b border-cream/15 py-3"
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-heading text-lg font-semibold tracking-[0.2em] text-cream"
                  >
                    {item.name}
                  </a>
                  {item.children && (
                    <div className="mt-2 flex flex-col gap-1.5 pl-4">
                      {item.children.map((c) => (
                        <a
                          key={c.name}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="font-body text-sm text-cream/70 transition-colors hover:text-champagne"
                        >
                          {c.name}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                className="border-b border-cream/15 py-3"
              >
                <AccountMenu variant="mobile" onNavigate={() => setMobileOpen(false)} />
              </motion.div>
              <motion.a
                href="/#hubspot-form"
                onClick={() => setMobileOpen(false)}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="btn-cream btn-shine mt-8 self-start"
              >
                Book Now
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Luxakari Brand Identity Book v1.1 §03 — three core colours
        // (Deep Maroon #3A0A12, Rose Gold #C98A6B, Cream #EDE8DC) plus
        // supporting colours, each with one job. The older token names below
        // are kept so existing classes pick up the brand values.
        maroon: {
          DEFAULT: "#3A0A12", // Deep Maroon — grounds, covers, header bands
          ink: "#401215", //      headings and strong text on Cream
          raised: "#4D1820", //   highlighted cards on Deep Maroon
          line: "#6B3840", //     divider lines on Deep Maroon
        },
        rosegold: "#C98A6B", //   accents, rules, eyebrows on maroon (never text on Cream)
        ivory: "#F6F2EA", //      cards and alternate pages on Cream
        dustyrose: "#8F4650", //  eyebrows, labels, footers on Cream
        copper: "#9A5A3E", //     large numerals and fine rules on Cream
        warmbrown: "#5A4240", //  body text on Cream
        taupe: "#7A625C", //      captions and page numbers on Cream
        sand: "#D9C9BD", //       body text on Deep Maroon
        rose: "#B76E79", //       decorative accents only, never text

        wine: {
          darkest: "#3A0A12",
          deepest: "#3A0A12",
          dark: "#3A0A12",
          cta: "#3A0A12",
          DEFAULT: "#401215",
          soft: "#8F4650",
        },
        cream: {
          DEFAULT: "#EDE8DC",
          soft: "#F6F2EA",
          deep: "#D9C9BD",
        },
        champagne: "#C98A6B",
        peach: "#C98A6B",
        gold: {
          DEFAULT: "#9A5A3E",
          dark: "#8F4650",
        },
      },
      fontFamily: {
        // §04 Typography: Cinzel for headings/numerals, Montserrat for everything else.
        heading: ["var(--font-cinzel)", "Georgia", "serif"],
        body: ["var(--font-montserrat)", "Arial", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.35em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-24px) rotate(4deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "pulse-ring": "pulse-ring 2.5s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

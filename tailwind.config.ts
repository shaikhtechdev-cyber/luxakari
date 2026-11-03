import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Authentic Luxakari palette (Elementor global colors):
        //   primary/secondary/text = #723740
        //   accent                 = #BC6D1F
        //   cream (7c16097)       = #EEE8DF  -> main page background
        //   dark  (6bf0f89)       = #3F1315  -> nav + dark buttons
        //   white (2ee3c54)       = #FFFFFF  -> "Book Now" buttons
        wine: {
          darkest: "#330102",
          dark: "#3F1315",
          cta: "#430000",
          DEFAULT: "#723740",
          soft: "#8A4353",
        },
        cream: {
          DEFAULT: "#EEE8DF",
          soft: "#FFFCF6",
          deep: "#E3DBCE",
        },
        champagne: "#FCCAA5",
        peach: "#FFCDA5",
        gold: {
          DEFAULT: "#BC6D1F",
          dark: "#8F5416",
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "ui-sans-serif", "sans-serif"],
        body: ["var(--font-lato)", "ui-sans-serif", "sans-serif"],
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

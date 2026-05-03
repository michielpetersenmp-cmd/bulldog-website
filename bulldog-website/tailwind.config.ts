import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a3a5c",
          light: "#24537f",
          dark: "#122940",
        },
        accent: {
          DEFAULT: "#f0a500",
          light: "#f7c04a",
          dark: "#c98b00",
        },
        bg: "#f8f8f6",
        surface: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(26,58,92,0.08)",
        card: "0 2px 12px rgba(26,58,92,0.10)",
        hover: "0 8px 32px rgba(26,58,92,0.14)",
      },
    },
  },
  plugins: [],
};
export default config;

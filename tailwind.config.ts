import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-alt": "rgb(var(--color-surface-alt) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-muted": "rgb(var(--color-accent-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 6vw, 5.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 5vw, 4.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.75rem, 3.5vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        eyebrow: [
          "0.75rem",
          { lineHeight: "1", letterSpacing: "0.18em" },
        ],
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 200ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

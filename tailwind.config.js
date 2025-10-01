import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      "light",
      {
        light: {
          "color-scheme": "light",
          "primary": "oklch(49.12% 0.3096 275.75)",
          "secondary": "oklch(69.71% 0.329 342.55)",
          "accent": "oklch(76.76% 0.184 183.61)",
          "neutral": "oklch(32.46% 0.02 197.137)",
          "base-100": "oklch(100% 0 0)",
          "base-200": "oklch(96.14% 0 0)",
          "base-300": "oklch(94.51% 0 0)",
          "base-content": "oklch(0% 0 0)",
          "info": "oklch(70.76% 0.221 198.61)",
          "success": "oklch(64.8% 0.150 160)",
          "warning": "oklch(84.71% 0.199 83.87)",
          "error": "oklch(71.76% 0.221 22.18)",
        },
        dark: {
          "color-scheme": "dark",
          "primary": "oklch(0% 0 0)",
          "primary-content": "oklch(96% 0.018 272.314)",
          "secondary": "oklch(0% 0 0)",
          "secondary-content": "oklch(100% 0 0)",
          "accent": "oklch(92% 0.013 255.508)",
          "accent-content": "oklch(97% 0.013 17.38)",
          "neutral": "oklch(37% 0.01 67.558)",
          "neutral-content": "oklch(98% 0.001 106.423)",
          "base-100": "oklch(14% 0.004 49.25)",
          "base-200": "oklch(21% 0.006 56.043)",
          "base-300": "oklch(26% 0.007 34.298)",
          "base-content": "oklch(97% 0.001 106.424)",
          "info": "oklch(98% 0.003 247.858)",
          "info-content": "oklch(30% 0.056 229.695)",
          "success": "oklch(76% 0.177 163.223)",
          "success-content": "oklch(26% 0.051 172.552)",
          "warning": "oklch(89% 0.196 126.665)",
          "warning-content": "oklch(27% 0.077 45.635)",
          "error": "oklch(71% 0.202 349.761)",
          "error-content": "oklch(28% 0.109 3.907)",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": "1rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        }
      }
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};

export default config;

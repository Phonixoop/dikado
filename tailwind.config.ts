import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const colors = require("tailwindcss/colors");
function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue: any }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        iransans: "Iransans",
      },
      textColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      backgroundColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      borderColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      boxShadowColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      fill: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      stroke: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      ringColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      ringOffsetColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      accentColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      gradientColorStops: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      patterns: {
        colors: {
          primary: withOpacity("--primary"),
          secondary: withOpacity("--secondary"),
          primbuttn: withOpacity("--primbuttn"),
          secbuttn: withOpacity("--secbuttn"),
          accent: withOpacity("--accent"),
          ...colors,
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },

          to: { height: "0" },
        },
        move: {
          to: {
            strokeDashoffset: "1000",
          },
        },

        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        aurora: "aurora 60s linear infinite",
      },
      screens: {
        mobileMax: { max: "500px" },
        // => @media (min-width: 640px) { ... }

        laptopMax: { max: "1279px" },
        // => @media (min-width: 1024px) { ... }

        desktopMax: { max: "1280px" },
        // => @media (min-width: 1280px) { ... }

        // --------------------Min--------------------------

        mobileMin: { min: "500px" },
        // => @media (min-width: 640px) { ... }

        laptopMin: { min: "1279px" },
        // => @media (min-width: 1024px) { ... }

        desktopMin: { min: "1280px" },
        // => @media (min-width: 1280px) { ... }

        max2xl: { max: "1536px" },
      },
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            //@ts-ignore
            muted: withOpacity("--secondary"), // custom
            //@ts-ignore
            subtle: withOpacity("--secbuttn"), // gray-800
            //@ts-ignore
            DEFAULT: withOpacity("--secondary"), // gray-900
            emphasis: "#d1d5db", // gray-300
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            //@ts-ignore
            subtle: withOpacity("--accent"), // gray-600 // icons
            //@ts-ignore
            DEFAULT: withOpacity("--primary"), // gray-500 // bg
            //@ts-ignore
            emphasis: withOpacity("--primary"), // gray-200 // text
            strong: "#f9fafb", // gray-50
            //@ts-ignore
            inverted: withOpacity("--secondary"), // black
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229", // custom
            muted: "#172554", // blue-950
            subtle: "#1e40af", // blue-800
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#60a5fa", // blue-400
            inverted: "#030712", // gray-950
          },
          background: {
            //@ts-ignore
            muted: withOpacity("--secondary"), // custom
            //@ts-ignore
            subtle: withOpacity("--secbuttn"), // gray-800
            //@ts-ignore
            DEFAULT: withOpacity("--secondary"), // gray-900
            emphasis: "#d1d5db", // gray-300
          },
          border: {
            DEFAULT: "#1f2937", // gray-800
          },
          ring: {
            DEFAULT: "#1f2937", // gray-800
          },
          content: {
            //@ts-ignore
            subtle: withOpacity("--accent"), // gray-600 // icons
            //@ts-ignore
            DEFAULT: withOpacity("--primary"), // gray-500 // bg
            //@ts-ignore
            emphasis: withOpacity("--primary"), // gray-200 // text
            strong: "#f9fafb", // gray-50
            //@ts-ignore
            inverted: withOpacity("--secondary"), // black
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        // "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@headlessui/tailwindcss"),
    require("tailwindcss-bg-patterns"),
    addVariablesForColors,
    function ({
      matchUtilities,
      addUtilities,
      theme,
    }: {
      matchUtilities: any;
      addUtilities: any;
      theme: any;
    }) {
      matchUtilities({
        "ss-text": (value: any) => {
          const rows: any = [];
          const rowItems = value.split("/");
          rowItems.forEach((item: any) => {
            const length = Number(item.trim());
            // Unicode escape sequences joined by full-width spaces
            rows.push(
              Array.from({ length })
                .map((_) => `\\3000`)
                .join(""),
            );
          });
          // Unicode escape sequences joined by newlines
          const content = rows.join(`\\A`);
          return {
            "&:empty:before": {
              "--tw-content": `"${content}"`,
            },
          };
        },
      });
      addUtilities({
        '[class*="ss-text-"]': {
          "&:empty:before": {
            content: "var(--tw-content)",
            "background-color": "rgba(var(--primary),0.5)",
            "white-space": "break-spaces",
            "word-break": "break-all",
            "border-radius": "10px",
            "box-decoration-break": "clone",
            "-webkit-box-decoration-break": "clone",
          },
          "&.truncate:empty:before": {
            "white-space": "normal",
          },
        },
        ".ss-object:empty": {
          "background-color": "rgba(var(--primary),0.5)",
        },
      });
    },
  ],
} satisfies Config;

export default config;
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

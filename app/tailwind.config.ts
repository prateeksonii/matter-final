import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", ...fontFamily.sans],
      },
      colors: {
        shark: {
          "50": "#f4f6f7",
          "100": "#e3e8ea",
          "200": "#cad3d7",
          "300": "#a4b3bc",
          "400": "#788c98",
          "500": "#5d717d",
          "600": "#4f5e6b",
          "700": "#455059",
          "800": "#3d454d",
          "900": "#363c43",
          "950": "#262b31",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;

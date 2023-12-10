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
        sans: ["Manrope", ...fontFamily.sans],
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
        tumbleweed: {
          "50": "#fbf6f1",
          "100": "#f5eadf",
          "200": "#ead2be",
          "300": "#d9ad8c",
          "400": "#cd8f6a",
          "500": "#c2734d",
          "600": "#b46042",
          "700": "#964b38",
          "800": "#793e33",
          "900": "#62362c",
          "950": "#351915",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
export default config;

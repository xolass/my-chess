import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "white-cell": "url('../../assets/whiteCell.png')",
        "black-cell": "url('../../assets/blackCell.png')",
      },
      colors: {
        "legal-move-green": "var(--legal-move-green)",
        "pre-move-gray": "var(--pre-move-gray)",
      },
    },
  },
  plugins: [],
};
export default config;

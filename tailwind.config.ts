import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      clipPath: {
        diagonal: "polygon(0% 0%, 100% 0%, 0% 100%)",
      },
      backgroundImage: {
        "white-cell": "url('../../assets/images/whiteCell.png')",
        "black-cell": "url('../../assets/images/blackCell.png')",
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

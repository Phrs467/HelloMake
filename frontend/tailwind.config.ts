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
        softPink: "#FFF0F5", // Lavender Blush - Fundo super claro e feminino
        blushPink: "#FFC0CB", // Rosa clássico
        rosePrimary: "#F06292", // Rosa vibrante principal
        hotPink: "#E91E63", // Destaques e Botões de conversão
        vibrantPink: "#D81B60", // Foco extremo e alto contraste
        gold: "#D4AF37", // Estrelas e detalhes
        offWhite: "#FFFFFF",
        charcoal: "#4A4A4A", // Texto escuro, não tão preto
        softGray: "#F5F5F5",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

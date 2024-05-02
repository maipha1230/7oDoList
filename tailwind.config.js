/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F6F193",
        secondary: "#F6F193",
        third: "#F6F193",
        fourth: "#F2C18D",
      },
      fontFamily: {
        sans: ["Chakra Petch", "sans-serif"],
      },
      keyframes: {
        blinkingBg: {
          "0%, 100%": { backgroundColor: "#ef4444" },
          "50%": { backgroundColor: "#fee2e2" },
        },
      },
      animation: {
        blinkingBg: "blinkingBg 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

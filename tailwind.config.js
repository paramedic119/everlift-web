/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,ts,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#0D0D10",
        surface: "#161620",
        surface2: "#1E1E2C",
        bdr: "#2A2A3A",
        accent: "#FFE000",
        accent2: "#FF5A36",
        success: "#00E87A",
        text1: "#F0F0F8",
        text2: "#6C6C90",
        upper: "#FF7043",
        lower: "#42A5F5",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

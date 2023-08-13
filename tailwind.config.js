/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}", // New pattern for files inside docs/assets
  ],
  darkMode: "class",

  theme: {
    extend: {
  
      colors: {
        base: "#141D2F",
        baseLight: "#e9e9e9",
        secondary: "#1D2A47",
        secondaryLight: "#ffff",
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

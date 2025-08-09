/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#391809", // brown
        secondary:"#774723", //rust
        accent: "#b99268",//black
        background: "#fbf5e9", //cream white
      },
    },
  },
  plugins: [],
};

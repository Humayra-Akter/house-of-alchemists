// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a", // Indigo-800
        secondary: "#0ea5e9", // Sky-500
        accent: "#f59e0b", // Amber-500
        background: "#0b1020", // Deep navy
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 25px) scale(0.97)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        hue: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
      animation: {
        gradient: "gradient 14s ease infinite",
        blob: "blob 12s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        hue: "hue 18s linear infinite",
      },
    },
  },
  plugins: [],
};

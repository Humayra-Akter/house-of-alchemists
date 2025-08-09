/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Scientific blue (main brand & actions)
        secondary: "#06B6D4", // Cyan accent (chemistry / water element feel)
        accent: "#10B981", // Emerald green (success / freshness)
        background: "#F9FAFB", // Very light gray (modern app background)
      },
    },
  },
  plugins: [],
};

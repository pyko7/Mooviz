/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          "0%, 25%": { opacity: "1" },
          "75%, 100%": { opacity: "0" },
        },
        animation: {
          fadeInOut: "fadeInOut 1s ease-in-out infinite",
        },
      },
    },
    screens: {
      xl: { max: "1199px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "576px" },
      // => @media (max-width: 576px) { ... }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

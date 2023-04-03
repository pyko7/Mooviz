/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        horizontalCardsShadow:
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
      },
      backgroundImage: {
        gradientBlackSm:
          "linear-gradient(-90deg,rgba(255, 255, 255, 0) 55%, rgba(0, 0, 0, 1) 100%)",
        gradientBlackMd:
          "linear-gradient(-90deg,rgba(255, 255, 255, 0) 20%, rgba(0, 0, 0, 1) 100%)",
        gradientBlackBottom:
          "linear-gradient(rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 100%)",
        gradientBlackLgBottom:
          "linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 80%)",
        gradientBlackTop:
          "linear-gradient(0deg,rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 100%)",
        gradientDarkNeutralBottom:
          "linear-gradient(rgba(38, 38, 38, 0) 60%, rgba(38, 38, 38, 1) 100%)",
      },
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
      xl: { max: "1200px" },
      // => @media (max-width: 1200px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      sm: { max: "576px" },
      // => @media (max-width: 576px) { ... }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

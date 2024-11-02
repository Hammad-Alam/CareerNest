/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["__Poppins_7df6af, __Poppins_Fallback_7df6af;"],
    },
    screens: {
      msm: "320px",
      xsm: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      xxxl: "1536px",
    },
    extend: {},
  },
  plugins: [],
};

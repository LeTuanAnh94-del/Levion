/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constant/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "5.5xl": ["56px", "72px"],
        "4.5xl": ["40px", "48px"],
        "3.5xl": ["32px", "40px"],
      },
      colors: {
        grey_darkest: "#140B25",
        grey_darker: "#281C42",
        grey_dark: "#362355",
        grey: "#554766",
        grey_lightest: "#F2EBFD",
        grey_lightest: "#CAC1D8",
        grey_light: "#9387A8",
        primary: "#9453FF",
        yellow: "#FFF539",
        aqua: "#31FFFF",
        orange: "#FCA50B",
        warning: "#BB222A",
        success: "#38B520",
        pink: "#F7F5FA",
      },
      boxShadow: {
        xl: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "levion-background": "url('/public/images/BackgroundLevion.png')",
      },
    },
  },
  plugins: [],
};

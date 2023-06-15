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
      colors: {
        grey: "#554766",
        white: "#FFFFFF",
        primary: "#9453FF",
        warning: "#BB222A",
        success: "#38B520",
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

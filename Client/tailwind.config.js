/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#18191B",
        interactive: "#2E3135",
        border: "#363A3F",
        solid: "#696E77",
        text: "#EDEEF0",

        interactiveOpacity: "rgb(46, 49, 53, 0.2)",
      },
    },
  },
  baseUrl: ".",
  paths: {
    "@/*": ["./src/*"],
  },
  plugins: [],
};

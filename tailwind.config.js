/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      oswald: "Oswald,sans-serif",
      urbanist: "Urbanist, sans-serif",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "theme-primary": "#3CB371",
        "theme-secondary": "#7EB693",
        "theme-yellow": "#EFD372",
        "theme-deep-blue": "#525C60",
        "theme-light-green": "#EFF6F1",
        "theme-white": "#F9F8F8",
        "theme-light-gray": "#D4D4D4",
        "theme-deep-gray": "#525C60",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

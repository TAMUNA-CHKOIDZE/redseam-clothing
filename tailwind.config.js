/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "dark-blue": "var(--color-dark-blue)",
        "dark-blue-light": "var(--color-dark-blue-light)",
        white: "var(--color-white)",
        "gray-dark": "var(--color-dark-gary)",
        "gray-light": "var(--color-gray-light)",
        "gray-lightest": "var(--color-gray-lightest)",
        "purple-light": "var(--color-purple-light)",
        "pink-light": "var(--color-pink-light)",
        "yellow-light": "var(--color-yellow-light)",
      },
      fontFamily: {
        base: ["var(--font-family-base)"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGray: "rgb(235, 235, 235)",
        baseGray: "#d1d5db",
        darkGray: "#9ca3af",
      },
    },
  },
  plugins: [],
};

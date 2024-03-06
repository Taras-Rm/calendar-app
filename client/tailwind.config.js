/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGray: "#e5e7eb",
        baseGray: "#d1d5db",
        darkGray: "#9ca3af",
      },
    },
  },
  plugins: [],
};

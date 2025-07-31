// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // This can be empty for v4 as the theme is in your CSS
  theme: {
    extend: {},
  },
  plugins: [],
}
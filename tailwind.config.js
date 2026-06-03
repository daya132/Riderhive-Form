/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E9AE0',
          dark: '#0D7AB8',
          light: '#E6F4FC',
        }
      }
    },
  },
  plugins: [],
}

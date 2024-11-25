/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBrown: {
          light: '#E5D3B3',
          DEFAULT: '#D2B48C',
          dark: '#B99976',
          darkest: '#664229',
        },
      },
    },
  },
  plugins: [],
}
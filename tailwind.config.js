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
        customBackground: '#F6F4E8'
      },
      animation: {
        "fade-in-up": "fade-in-up 1s ease-out",
        "fade-in-delay": "fade-in-up 1.5s ease-out",
        "fade-in-delay-3": "fade-in-up 3s ease-out",
        "scale-up": "scale-up 1.2s ease-out",
        typing: "typing 3.5s steps(40, end) forwards",
        "blink-caret": "blink-caret 0.75s step-end infinite",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "blink-caret": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "orange" },
        },
      },
    },
  },
  plugins: [],
}

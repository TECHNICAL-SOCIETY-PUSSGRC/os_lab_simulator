/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shine: "shine 1s",
        line: "line 1s",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
        line: {
          "0%": { marginLeft: "50%", width: 0 },
          "100%": { marginLeft: 0, width: "100%" },
        }
      },
      backgroundColor: {
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
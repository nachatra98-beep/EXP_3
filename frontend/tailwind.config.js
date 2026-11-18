/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cit: {
          navy: '#0b1e3f',
          dark: '#081730',
          blue: '#1657c9',
          lightBlue: '#eef5fc',
          iceBlue: '#dbeafe',
          gold: '#e0a927',
          goldLight: '#fde68a',
          card: '#ffffff',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

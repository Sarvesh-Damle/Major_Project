/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        black: 'var(--black)',
        blue: 'var(--blue)',
        lightBlue: 'var(--lightBlue)',
        shadow: 'var(--shadow)',
        'gradient-white-blue': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(136, 160, 255, 0.46) 217.91%)',
      },
      backgroundImage: {
        'blue-gradient': 'var(--blue-gradient)',
        'orange-gradient': 'var(--orange-gradient)',
      }
    },
  },
  plugins: [],
}
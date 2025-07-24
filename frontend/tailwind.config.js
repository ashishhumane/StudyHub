/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studyhub: {
          primary: '#819a91',
          accent: '#a7c1a8',
          card: '#d1d8be',
          base: '#eeefe0',
        }
      },
      fontFamily: {
        title: ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}


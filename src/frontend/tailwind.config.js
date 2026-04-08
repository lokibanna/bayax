/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        fontOne: ['fontOne', 'sans-serif']
      },
      colors: {
        customBlue: {
          150: 'rgba(40, 0, 100, 0.15)', // 15% opacity for #030080
        },
        customBackground: {
          984: 'rgba(3, 0, 38, 0.984)', // 98.4% opacity for #030026
        }
      },
    },
  },
  plugins: [],
}


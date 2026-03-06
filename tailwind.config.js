const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.green,
        accent: colors.pink,
        background: colors.white,
        text: colors.gray[800],
      },
      fontFamily: {
        sans: ['Inter', ' sans-serif'],
        serif: ['Merriweather', ' serif'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [],
};
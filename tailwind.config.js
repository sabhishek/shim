/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D71E2B', // Wells Fargo red
          hover: '#B71824'
        },
        secondary: {
          DEFAULT: '#ECAA00', // Wells Fargo gold
          hover: '#D99E00'
        },
        neutral: {
          DEFAULT: '#333333', // Dark gray for text
          light: '#666666', // Medium gray for secondary text
          lighter: '#F6F6F6' // Light gray for backgrounds
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#F0F0F0'
        }
      }
    },
  },
  plugins: [],
};
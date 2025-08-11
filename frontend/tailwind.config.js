/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Font
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        serif: ['Libre Baskerville', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};

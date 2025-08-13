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
      // colors: {
      //   // Primary color for buttons and links - Rose Gold
      //   primary: '#B76E79',
      //   // Background color for the app - Ivory white
      //   background: '#FAF7F2',
      //   // Color for text - Deep Expresso
      //   text_color: '#38250e',
      //   // Secondary color - Soft Pink
      //   secondary: '#F4D3D7',
      //   // Accent color - Champagne Gold
      //   accent: '#D4AF37',
      // },
    },
  },
  plugins: [],
};

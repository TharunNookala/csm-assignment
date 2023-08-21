/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-image': "url('https://storage.pizzapizza.ca/phx2/ppl_images/category/en/2x/create_your_own_5.png')",
      })
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('current', '&.active');
    })
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#ec4899',
        'brand-rose': '#ef4444',
      },
    },
  },
  plugins: [],
}

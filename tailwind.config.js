/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#142c4a',      // כחול כהה - צבע ראשי
        'brand-brown': '#856644',     // בני חם - צבע משני
        'brand-light-blue': '#dae8f6', // כחול בהיר - אקסנט
        'brand-cream': '#fff9ef',     // קריים בהיר
        'brand-off-white': '#ffffb',  // לבן כריים
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-prompt)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        'gold': {
          50: '#fbf8ea',
          100: '#f5efc6',
          200: '#ede095',
          300: '#e4cd5f',
          400: '#dec03d',
          500: '#cfa625',
          600: '#b2841b', // สีหลักปุ่มจอง
          700: '#8f6418',
          800: '#76501a',
          900: '#65431b',
        }
      }
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ffe5e7',
          100: '#ffb3b8',
          200: '#ff808a',
          300: '#ff4d5b',
          400: '#ff1a2d',
          500: '#e60014',
          600: '#b40010',
          700: '#82000b',
          800: '#500007',
          900: '#200003'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: [],
}

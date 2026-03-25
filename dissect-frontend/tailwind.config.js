/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5ECD7',
        crimson: {
          DEFAULT: '#B5293A',
          dark: '#8B1A28',
        },
        border: '#E8D5B5',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B6B6B',
        'steel-blue': '#2D4A8A',
        'forest-green': '#2A7A4B',
        'purple': '#6B3A8A',
        'gold': '#C9973A',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

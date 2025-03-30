/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'claude-primary': '#5A67D8', // Example primary color
        'claude-secondary': '#4C51BF', // Example secondary color
        'claude-accent': '#C3DAFE', // Example accent color
        'claude-dark': '#2D3748', // Example dark shade
        'claude-light': '#F7FAFC', // Example light shade
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} 
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'claude-primary': '#4F46E5',
        'claude-secondary': '#4338CA',
        'claude-dark': '#1E1B4B',
        'claude-light': '#EEF2FF',
        'claude-accent': '#7C3AED',
      },
    },
  },
  plugins: [],
}

export default config 
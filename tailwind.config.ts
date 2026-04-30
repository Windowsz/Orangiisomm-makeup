import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blush:     '#FAD4E0',
          rose:      '#E8A0B0',
          petal:     '#F7E8EE',
          gold:      '#C9A96E',
          goldLight: '#E8D5B0',
          goldDark:  '#A07840',
          crimson:   '#C0392B',
          cream:     '#FFF8F9',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':     'fadeIn 0.3s ease-in-out',
        'scale-up':    'scaleUp 0.25s ease-out',
        'slide-left':  'slideLeft 0.2s ease-out',
        'slide-right': 'slideRight 0.2s ease-out',
      },
      keyframes: {
        fadeIn:     { '0%': { opacity: '0' },                              '100%': { opacity: '1' } },
        scaleUp:    { '0%': { transform: 'scale(0.95)', opacity: '0' },    '100%': { transform: 'scale(1)',   opacity: '1' } },
        slideLeft:  { '0%': { transform: 'translateX(20px)',  opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        slideRight: { '0%': { transform: 'translateX(-20px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}

export default config

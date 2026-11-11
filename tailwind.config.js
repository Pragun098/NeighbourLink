/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1F3A3D',
          light: '#2E5055',
          dark: '#142729',
          muted: '#4B676A',
          faint: 'rgba(31, 58, 61, 0.08)',
        },
        terracotta: {
          DEFAULT: '#B94A31',
          light: '#CD5B42',
          dark: '#933520',
          faint: 'rgba(185, 74, 49, 0.1)',
        },
        amber: {
          DEFAULT: '#EBA43B',
          light: '#F4BA62',
          dark: '#CF8B26',
          glow: '#FFE3A8',
          faint: 'rgba(235, 164, 59, 0.15)',
        },
        sage: {
          DEFAULT: '#8DAE98',
          light: '#A5C2AE',
          dark: '#6F917B',
          faint: 'rgba(141, 174, 152, 0.15)',
        },
        paper: {
          DEFAULT: '#FAF4E9',
          warm: '#F4EDE0',
          card: '#FFFDF8',
          deep: '#EBE2D0',
        },
      },
      fontFamily: {
        serif: ['Caladea', 'Cambria', 'Georgia', 'serif'],
        sans: ['Carlito', 'Calibri', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'chip': '8px',
      },
      boxShadow: {
        'lamp': '0 0 35px rgba(235, 164, 59, 0.45)',
        'lamp-lg': '0 0 60px rgba(235, 164, 59, 0.65)',
        'paper': '0 2px 10px rgba(31, 58, 61, 0.06)',
        'board': '0 8px 30px rgba(20, 39, 41, 0.25)',
      },
    },
  },
  plugins: [],
}

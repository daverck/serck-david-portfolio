/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488', // Accent couleur de son CV
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        primary: {
          DEFAULT: '#1e3a8a', // Bleu profond de son CV
          dark: '#172554',
          light: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float-slow': 'floatSlow 14s ease-in-out infinite',
        'float-reverse': 'floatReverse 16s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(50px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-35px, 45px) scale(0.94)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-55px, 40px) scale(1.07)' },
          '66%': { transform: 'translate(45px, -50px) scale(0.93)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(0.94) translate(0px, 0px)' },
          '50%': { opacity: '1', transform: 'scale(1.06) translate(-30px, -25px)' },
        },
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },
      animation: {
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-success': 'pulseSuccess 0.8s ease-in-out',
        'shake-error': 'shakeError 0.5s ease-in-out',
        'celebration': 'celebration 1s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSuccess: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)' },
          '100%': { transform: 'scale(1)' },
        },
        shakeError: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        celebration: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.1) rotate(5deg)' },
          '50%': { transform: 'scale(1.2) rotate(-5deg)' },
          '75%': { transform: 'scale(1.1) rotate(3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#070b17', // Kept for legacy if any, but adding new ones
        primary: '#2563EB',
        secondary: '#7C3AED',
        accent: '#06B6D4',
        background: '#0F172A',
        card: '#1E293B',
        textColor: '#F8FAFC',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444'
      },
      boxShadow: {
        glow: '0 0 40px rgba(99, 102, 241, 0.25)',
        'glow-primary': '0 0 40px rgba(37, 99, 235, 0.35)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#070b17', 
        primary: '#FFFFFF',     // White
        secondary: '#A1A1AA',   // Zinc 400
        accent: '#6366F1',      // Indigo 500
        background: '#09090B',  // Zinc 950
        card: '#18181B',        // Zinc 900
        textColor: '#FAFAFA',   // Zinc 50
        success: '#10B981',     // Emerald 500
        warning: '#F59E0B',     // Amber 500
        error: '#EF4444'        // Red 500
      },
      boxShadow: {
        glow: '0 0 40px rgba(99, 102, 241, 0.15)',
        'glow-primary': '0 0 40px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}

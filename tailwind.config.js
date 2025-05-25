/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1e25',
        card: '#22262d',
        border: '#2a2e35',
        primary: {
          DEFAULT: '#12c9b9',
          foreground: '#ffffff', // Assuming white text on primary color
        },
        // Add other colors if needed, e.g., for text
        text: {
          DEFAULT: '#ffffff', // Default text color (white)
          secondary: '#a0aec0', // Lighter gray for secondary text
        },
        positive: '#48bb78', // Green for positive values
        negative: '#f56565', // Red for negative values
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // Scan all files in the app directory
    './components/**/*.{js,ts,jsx,tsx}',  // Scan all files in the components directory
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#1E40AF',
          700: '#1E3A8A',
        },
        yellow: {
          400: '#FBBF24',
          500: '#F59E0B',
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
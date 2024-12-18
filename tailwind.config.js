/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        indigo: {
          100: "#e0e7ff",
          900: "#312e81",
        },
        primary: {
          DEFAULT: 'hsl(240 5.9% 10%)',
          foreground: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
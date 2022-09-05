module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Exo\\ 2', 'sans-serif'],
      },
      screens: {
        '3xl': '1792px',
        '4xl': '2048px',
      },
    },
  },
  plugins: [],
};

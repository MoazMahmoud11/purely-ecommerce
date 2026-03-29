import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */


export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#18181b",
      },
    },
  },
  plugins: [
    forms, [forms], // ← Use the imported module
  ],
};
/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', , './src/**/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "bg-color": "#101210",
      "primary-color": "#926AF4",
      "text-color": "#F2F2F2",
      'danger': '#ef4444',
      'warning': '#FF8C00'
    },
  },
};

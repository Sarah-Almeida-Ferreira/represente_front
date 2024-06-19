/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: ["btn", "primary", "secondary"],
  theme: {
    extend: {},
    colors: {
      dark: "#101210",
      primary: "#926AF4",
      secondary: "#F2F2F2",
      danger: "#EF4444",
      warning: "#FF8C00",
      success: "#22C55E",
      transparent: "transparent",
    },
  },
};

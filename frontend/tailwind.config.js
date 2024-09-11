import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      "3xl": "1900px",
    },
    colors: {
      black: "#000000",
      white: "#f5f5f5",
      accentOne: "#2563eb",
      accentTwo: "#fef08a",
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "black": "#000000",
          "white": "#f5f5f5",
          "accent": "#2563eb",
          "accentTwo": "#fef08a",
        },
      },
    ],
  },
  plugins: [daisyui],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#14171A",
        accent: "#657786",
        background: "#E1E8ED",
        border: "#AAB8C2",
      },
      spacing: {
        88: "22rem",
      },
      keyframes: {
        draw: {
          "0%": { strokeDasharray: "1, 300", strokeDashoffset: "0" },
          "50%": { strokeDasharray: "120, 300", strokeDashoffset: "-58" },
          "100%": { strokeDasharray: "120, 300", strokeDashoffset: "-175" },
        },
      },
      animation: {
        draw: "draw 0.7s linear infinite",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

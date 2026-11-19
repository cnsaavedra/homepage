/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      title: `2.6rem`,
      paragraph: `1.2rem`,
    },
    extend: {
      colors: {
        primary: {
          500: "#FF6363",
          800: "#FF1313",
        },
        archive: {
          bg: "#F7F8FA",
          ink: "#0F141C",
          slate: "#5A6578",
          muted: "#94A0B8",
          line: "#E2E6EE",
          cyan: "#00C8FF",
          vermilion: "#FF334B",
          amber: "#FFB800",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        jp: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};

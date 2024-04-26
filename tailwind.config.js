/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit-minmax": "repeat(auto-fit, minmax(150px, 1fr))",
      },
      width: {
        "px-960": "960px",
      },
    },
  },
  plugins: [],
};

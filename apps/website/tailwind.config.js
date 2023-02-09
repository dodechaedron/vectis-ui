/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      cursor: {
        round: `url('data:image/svg+xml;base64,${btoa(
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#566fa1"/></svg>'
        )}'), auto`,
      },
      colors: {
        "kashmir-blue": {
          50: "#f5f6fa",
          100: "#eaecf4",
          200: "#d0d7e7",
          300: "#a7b5d2",
          400: "#778db9",
          500: "#566fa1",
          600: "#475d90",
          700: "#37476d",
          800: "#303d5c",
          900: "#2c364e",
        }
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

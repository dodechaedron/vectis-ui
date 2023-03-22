
const tailwindConfig = {
    content: ['./**/*.{js,jsx,ts,tsx}', './*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
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
            },
          },
        },
    }
  }
  
  module.exports = tailwindConfig
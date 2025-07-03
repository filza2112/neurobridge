// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your New Color Palette
        'background': '#FFFFFF', 
        'background-alt': '#EAF4F4',
        'accent': '#CCE3DE',  
        'text-secondary': '#A4C3B2', 
        'primary': '#6B9080', 
      },
      fontFamily: {
        mullish: ["Mulish", "sans-serif"],
      },
    },
  },
  plugins: [],
}
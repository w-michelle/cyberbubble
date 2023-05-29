/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "600px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      boxShadow: {
        custom: "0px 8px 15px 1px #121212;",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-quicksand)"],
      },
      colors: {
        green: "hsl(126, 20%, 56%, 1)",
        red: "hsl(360, 66%, 57%, 1)",
        white: "hsla(0, 5%, 95%, 1)",
        glass: "hsl(0,0%,45%,0.2)",
        glass2: "hsl(0,0%,21%,0.17)",
        darker: "hsl(69, 9%, 15%)",
        grey: "hsl(213, 5%, 39%)",
        darkgrey: "rgba(255, 255, 255, 0.05)",
        lightgrey: "hsl(0, 0%, 64%, 0.22)",
        black: "hsl(225, 6%, 13%)",
        black2: "hsla(0, 0%, 13%, 1)",
        darkblue: "hsla(225, 28%, 14%, 1)",
        greyBlue: "#3d5257",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base", // only generate global styles
      strategy: "class", // only generate classes
    }),
  ],
};

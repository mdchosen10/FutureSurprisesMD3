import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primaryViolet: "#643e74",
        primaryBlack: "#2C2434",
      },
      fontFamily: {
        mainHeading: ["var(--font-mainHeading)"],
        mainText: ["var(--font-mainText)"],
        Sedgwick: ["var(--font-Sedgwick)"],
      },
      screens: {
        "3xl": "1440px",
        phone: "400px",
      },
    },
    // screens:{
    //   'sm': '640px',
    //   'md': '768px',
    //   'lg': '1024px',
    //   'xl': '1280px',
    //   '2xl': '1536px',
    // }
  },
  plugins: [require("flowbite/plugin")],
};
export default config;

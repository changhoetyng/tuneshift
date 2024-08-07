import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionDelay: {
        "4000": "4000ms",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        default: ["Helvetica", "Arial", "sans-serif"],
        display: ["Tiny5", "sans-serif"],

      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUpLess: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutUp: {
          "0%": { opacity: "1", transform: "translateY(0px)" },
          "100%": { opacity: "0", transform: "translateY(40px)" },
        },
        fadeOutUpLess: {
          "0%": { opacity: "1", transform: "translateY(0px)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
        fadeInOut: {
          '0%' : { opacity: "0.5", filter: 'grayscale(0%) brightness(100%)', transform: "translateY(0px)" },
          '10%' : { opacity: "1", filter: 'grayscale(0%) brightness(400%)' },
          '15%' : { opacity: "1", filter: 'grayscale(0%) brightness(400%)' , transform: "translateY(-5px)" },
          '25%' : { opacity: "0.5", filter: 'grayscale(0%) brightness(100%)' , transform: "translateY(0px)" },
          '100%': { opacity: "0.5", filter: 'grayscale(0%) brightness(100%)' },
        },
        fadeInOutSpecial: {
          '0%' : { opacity: "0.5", filter: 'grayscale(100%) brightness(250%)', transform: "translateY(0px)"  }, 
          '10%' : { opacity: "1", filter: 'grayscale(0%) brightness(100%)' },
          '15%' : { opacity: "1", filter: 'grayscale(0%) brightness(100%)', transform: "translateY(-5px)" },
          '25%' : { opacity: "0.5", filter: 'grayscale(100%) brightness(250%)', transform: "translateY(0px)" }, 
          '100%' : { opacity: "0.5", filter: 'grayscale(100%) brightness(250%)' }, 
        },
        popIn:{
          "0%": { transform: "scale(0)", opacity: "0" },
          "40%": { opacity: "0" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        popOut:{
          "0%": { opacity: "1", transform: "scale(1)" },
          "40%": { opacity: "0" },
          "100%": { transform: "scale(0)", opacity: "0"  },
        },
        popInto:{
          "0%": { opacity: "0", transform: "scale(1) translateY(40px)", filter: "blur(10px)", fontSize: "2px", fontWeight: "100" },
          "40%": { transform: "scale(1) translateY(5px)", opacity: "0.6" , filter: "blur(3px)", fontSize: "80px", fontWeight: "200"},
          "80%": { transform: "scale(1) translateY(0px)", opacity: "1" , filter: "blur(0px)", fontSize: "80px", fontWeight: "400" },
          "100%": { transform: "scale(1) translateY(0px)", fontSize: "80px", fontWeight: "400" }
        },
        popIntoMobile:{
          "0%": { opacity: "0", transform: "scale(1) translateY(40px)", fontSize: "55px", fontWeight: "100" },
          "40%": { transform: "scale(1) translateY(5px)", opacity: "0" , fontSize: "55px", fontWeight: "200"},
          "70%": { opacity: "0.2"},
          "80%": { transform: "scale(1) translateY(0px)", opacity: "1" , fontSize: "55px", fontWeight: "400" },
          "100%": { transform: "scale(1) translateY(0px)", fontSize: "60px", fontWeight: "400" }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeInUp: "fadeInUp 0.6s ease-in forwards",
        fadeInUpFast: "fadeInUpLess 0.3s ease-in-out forwards",
        fadeOutUp: "fadeOutUp 0.6s ease-in forwards",
        fadeOutUpFast: "fadeOutUpLess 0.3s ease-in-out forwards",
        popIn: "popIn 0.3s ease-in-out forwards",
        popOut: "popOut 0.3s ease-in-out forwards",
        popIntoLong: "popInto 0.9s ease-in-out forwards",
        popIntoMobileLong: "popIntoMobile 0.4s ease-in-out forwards",
        fadeInOut1: 'fadeInOutSpecial 2s infinite 0.5s',
        fadeInOut2: 'fadeInOut 2s infinite 1s',
        fadeInOut3: 'fadeInOut 2s infinite 1.5s',
        fadeInOut4: 'fadeInOutSpecial 2s infinite 2s',
      },
    },
    dropShadow: {
      '3xl': '0 0 35px rgba(0, 0, 0, 0.25)',
      '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
      ],
      'w-3xl': '0 0 35px rgba(255, 255, 255, 0.1)',
      'w-4xl': [
          '0 35px 35px rgba(255, 255, 255, 0.25)',
          '0 45px 65px rgba(255, 255, 255, 0.15)'
      ],
      'p-3xl': '0 0 35px rgba(255, 100, 255, 0.1)',
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

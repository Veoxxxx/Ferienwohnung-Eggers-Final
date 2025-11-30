import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "surface-luxury": "hsl(var(--surface-luxury))",
                "surface-strong": "hsl(var(--surface-strong))",
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
                // Quiet Luxury Color Palette
                luxury: {
                    sand: {
                        DEFAULT: "hsl(var(--luxury-sand-default))",
                        50: "hsl(var(--luxury-sand-50))",
                        100: "hsl(var(--luxury-sand-100))",
                        200: "hsl(var(--luxury-sand-200))",
                        300: "hsl(var(--luxury-sand-300))",
                        400: "hsl(var(--luxury-sand-400))",
                        500: "hsl(var(--luxury-sand-500))",
                        600: "hsl(var(--luxury-sand-600))",
                        700: "hsl(var(--luxury-sand-700))",
                        800: "hsl(var(--luxury-sand-800))",
                        900: "hsl(var(--luxury-sand-900))",
                    },
                    navy: {
                        DEFAULT: "hsl(var(--luxury-navy-default))",
                        50: "hsl(var(--luxury-navy-50))",
                        100: "hsl(var(--luxury-navy-100))",
                        200: "hsl(var(--luxury-navy-200))",
                        300: "hsl(var(--luxury-navy-300))",
                        400: "hsl(var(--luxury-navy-400))",
                        500: "hsl(var(--luxury-navy-500))",
                        600: "hsl(var(--luxury-navy-600))",
                        700: "hsl(var(--luxury-navy-700))",
                        800: "hsl(var(--luxury-navy-800))",
                        900: "hsl(var(--luxury-navy-900))",
                        950: "hsl(var(--luxury-navy-950))",
                    },
                    gold: {
                        DEFAULT: "hsl(var(--luxury-gold-default))",
                        50: "hsl(var(--luxury-gold-50))",
                        100: "hsl(var(--luxury-gold-100))",
                        200: "hsl(var(--luxury-gold-200))",
                        300: "hsl(var(--luxury-gold-300))",
                        400: "hsl(var(--luxury-gold-400))",
                        500: "hsl(var(--luxury-gold-500))",
                        600: "hsl(var(--luxury-gold-600))",
                        700: "hsl(var(--luxury-gold-700))",
                        800: "hsl(var(--luxury-gold-800))",
                        900: "hsl(var(--luxury-gold-900))",
                    },
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                serif: ["var(--font-playfair)", "Georgia", "serif"],
            },
            spacing: {
                "18": "4.5rem",
                "88": "22rem",
                "128": "32rem",
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-in-out",
                "slide-up": "slideUp 0.7s ease-out",
                "slide-in": "slideIn 0.5s ease-out",
                "slow-zoom": "slowZoom 20s linear infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideIn: {
                    "0%": { opacity: "0", transform: "translateX(-20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                slowZoom: {
                    "0%": { transform: "scale(1)" },
                    "100%": { transform: "scale(1.1)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;

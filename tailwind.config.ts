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
                        50: "#fdfcfb",
                        100: "#f9f6f1",
                        200: "#f3ede3",
                        300: "#e8ddc8",
                        400: "#d9c8a8",
                        500: "#c4ad86",
                        600: "#a88f68",
                        700: "#8a7455",
                        800: "#6e5c46",
                        900: "#574a39",
                    },
                    navy: {
                        50: "#f0f4f8",
                        100: "#d9e2ec",
                        200: "#bcccdc",
                        300: "#9fb3c8",
                        400: "#829ab1",
                        500: "#627d98",
                        600: "#486581",
                        700: "#334e68",
                        800: "#243b53",
                        900: "#102a43",
                        950: "#0a1929",
                    },
                    gold: {
                        50: "#fffbeb",
                        100: "#fef3c7",
                        200: "#fde68a",
                        300: "#fcd34d",
                        400: "#fbbf24",
                        500: "#f59e0b",
                        600: "#d97706",
                        700: "#b45309",
                        800: "#92400e",
                        900: "#78350f",
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

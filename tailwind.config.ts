import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Base palette (dark theme)
                bg: "#0a0a0a", // Deep Dark Base
                text: "#F8FAFC",
                muted: "#94A3B8",
                // Accent colors
                "accent-orange": "#F97316",
                "accent-purple": "#8B5CF6",
                // Glass colors (matching globals)
                glass: "rgba(255, 255, 255, 0.03)",
                "glass-border": "rgba(255, 255, 255, 0.08)",
                "glass-highlight": "rgba(255, 255, 255, 0.1)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            backdropBlur: {
                glass: "14px",
            },
            boxShadow: {
                glass: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                "glass-hover": "0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            },
            fontSize: {
                // Responsive hero title
                "hero-title": "clamp(3rem, 10vw, 8.75rem)",
                "hero-subtitle": "clamp(1rem, 2vw, 1.375rem)",
            },
            animation: {
                "blob-drift": "blobDrift 30s ease-in-out infinite",
                "blob-drift-reverse": "blobDriftReverse 35s ease-in-out infinite",
                "border-spin": "border-spin 7s linear infinite",
                "gradient-x": "gradient-x 3s ease infinite",
            },
            keyframes: {
                blobDrift: {
                    "0%, 100%": { transform: "translate(0, 0) scale(1)" },
                    "33%": { transform: "translate(30px, -20px) scale(1.05)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
                },
                blobDriftReverse: {
                    "0%, 100%": { transform: "translate(0, 0) scale(1)" },
                    "33%": { transform: "translate(-25px, 15px) scale(0.97)" },
                    "66%": { transform: "translate(15px, -25px) scale(1.03)" },
                },
                "border-spin": {
                    "100%": { transform: "rotate(-360deg)" },
                },
                "gradient-x": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
            },
        },
    },
    plugins: [],
};
export default config;

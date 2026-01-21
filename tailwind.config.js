import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                bengali: ['"Noto Sans Bengali"', '"Tiro Bangla"', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: "#f0f4ff",
                    100: "#e0e7ff",
                    200: "#c7d2fe",
                    300: "#a5b4fc",
                    400: "#818cf8",
                    500: "#6366f1",
                    600: "#4f46e5",
                    700: "#4338ca",
                    800: "#3730a3",
                    900: "#312e81",
                },
                secondary: {
                    50: "#fef2f2",
                    100: "#fee2e2",
                    200: "#fecaca",
                    300: "#fca5a5",
                    400: "#f87171",
                    500: "#ef4444",
                    600: "#dc2626",
                    700: "#b91c1c",
                    800: "#991b1b",
                    900: "#7f1d1d",
                },
                accent: {
                    50: "#ecfdf5",
                    100: "#d1fae5",
                    200: "#a7f3d0",
                    300: "#6ee7b7",
                    400: "#34d399",
                    500: "#10b981",
                    600: "#059669",
                    700: "#047857",
                    800: "#065f46",
                    900: "#064e3b",
                },
            },
            animation: {
                "float": "float 3s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "gradient": "gradient 3s ease infinite",
            },
            keyframes: {
                "float": {
                    "0%, 100%": { "transform": "translateY(0px)" },
                    "50%": { "transform": "translateY(-20px)" }
                },
                "pulse-glow": {
                    "0%, 100%": { "boxShadow": "0 0 20px rgba(102, 126, 234, 0.5)" },
                    "50%": { "boxShadow": "0 0 40px rgba(102, 126, 234, 0.8)" }
                },
                "gradient": {
                    "0%, 100%": { "backgroundPosition": "0% 50%" },
                    "50%": { "backgroundPosition": "100% 50%" }
                }
            },
            backgroundSize: {
                "gradient-animate": "200% 200%"
            }
        },
    },

    plugins: [forms],
};

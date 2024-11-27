/** @type {import('tailwindcss').Config} */
import { addDynamicIconSelectors } from "@iconify/tailwind";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
    content: [
        "./src/**/*.{html,css,js}",
        "./views/**/*.ejs",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#f0f9ff",
                    100: "#e0f2fe",
                    200: "#bae6fd",
                    300: "#7dd3fc",
                    400: "#38bdf8",
                    500: "#0ea5e9",
                    600: "#0284c7",
                    700: "#0369a1",
                    800: "#075985",
                    900: "#0c4a6e",
                },
                secondary: {
                    DEFAULT: "#64748b",
                    dark: "#334155",
                },
                success: "#22c55e",
                warning: "#f59e0b",
                error: "#ef4444",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                title: ["Poppins", "sans-serif"],
            },
            spacing: {
                modal: "32rem",
            },
            borderRadius: {
                modal: "0.5rem",
            },
        },
    },
    plugins: [addDynamicIconSelectors(), forms, typography, aspectRatio],
};

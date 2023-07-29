/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#4CE1D7",
                light: {
                    text: "#070811",
                    background: "#E1EFE7",
                    secondary: "#CFE6F6",
                    accent: "#0E3553",
                },

                dark: {
                    text: "#e8e6fe",
                    background: "#0B0D22",
                    secondary: "#071926",
                },
            },
            boxShadow: {
                primary: "0 20px 60px -10px #d21e32",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
            animation: {
                "fade-in": "fade-in ease-in-out 300ms",
            },

            fontFamily: {
                "nunito-bold": ["Nunito-Bold", "system-ui"],
            },
        },
    },
    plugins: [],
};

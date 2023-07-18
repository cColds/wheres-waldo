/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                light: {
                    text: "#050505",
                    background: "#fafafa",
                    primary: "#f82e1b",
                    secondary: "#d1cdfe",
                },

                dark: {
                    text: "#e8e6fe",
                    background: "#010005",
                    primary: "#f82e1b",
                    secondary: "#05012d",
                    accent: "#07f21b",
                },
            },
        },
    },
    plugins: [],
};

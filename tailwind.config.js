/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#f82e1b",
                light: {
                    text: "#050505",
                    background: "#fafafa",
                    secondary: "#d1cdfe",
                },

                dark: {
                    text: "#e8e6fe",
                    background: "#010005",
                    secondary: "#05012d",
                },
            },
        },
    },
    plugins: [],
};

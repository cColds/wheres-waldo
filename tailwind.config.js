/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#d21e32",
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
            boxShadow: {
                primary: "0 20px 60px -10px #d21e32",
            },
        },
    },
    plugins: [],
};

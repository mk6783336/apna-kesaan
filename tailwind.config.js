/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./navigation/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#4C7C29', // Lush Green
                secondary: '#D1FAE5', // Light Green
                dark: '#1F2937', // Charcoal
            },
        },
    },
    plugins: [],
};

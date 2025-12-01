/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./navigation/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                emerald: {
                    500: '#10B981', // Primary
                },
                cyan: {
                    500: '#06B6D4', // Secondary
                },
                charcoal: {
                    900: '#111827', // Dark Mode Background
                }
            },
            fontFamily: {
                montserrat: ['Montserrat_700Bold'],
                hind: ['Hind_400Regular'],
            }
        },
    },
    plugins: [],
}

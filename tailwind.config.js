const { fontFamily } = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                primary: ["var(--inter-font)", ...fontFamily.sans],
                serif: ["var(--lora-font)", ...fontFamily.serif],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: [
            "dark",
            "emerald",
            "light",
            "garden",
            "fantasy",
            "autumn",
            "pastel",
            "lemonade",
            "cupcake",
        ],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
    },
}

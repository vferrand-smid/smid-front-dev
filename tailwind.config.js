/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            zIndex: {
                '12': '12',
            },
            colors: {
                'gris': "#1e1e1e",
                'primary': "#2FC977",
            },

            fontFamily: {
                sans: ['Georama', 'sans-serif'],
            },
        },

    },
    plugins: [],
};

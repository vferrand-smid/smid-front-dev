/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
           /* screens: {
                'max-w-900': { max: '900px' }, // Ajoute un breakpoint jusqu'à 900px
            },*/
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
            backgroundImage: {
                'hero-pattern': "url('/images/Bloc1/background.png')",
            },
        },

    },
    plugins: [],
};

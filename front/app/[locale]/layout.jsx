import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    title: "Smartphone iD",
    description: "Smartphone iD",
};

export default function RootLayout({children, params}) {
    const locale = params?.locale || 'fr-FR';
    return (

        <html lang={locale}>

        <body>

        <main>

            <Navbar/>

            {children}


            <footer>
                <Footer/>
            </footer>
        </main>

        </body>
        </html>
    );
};
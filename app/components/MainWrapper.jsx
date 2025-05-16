'use client';

import { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import SmartBanner from './SmartBanner';

export const MainWrapper = ({ children, translations, locale }) => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    return (
        <>
            <SmartBanner onVisibilityChange={setIsBannerVisible} />
            <Navbar translations={translations.NavBar} locale={locale} />
            <main className={`${isBannerVisible ? 'pt-20 md:pt-0' : ''}`}>{children}</main>
            <Footer translations={translations} locale={locale} />
        </>
    );
};

export default MainWrapper;

'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
//import Loading from './loading';
import getPages from '../lib/pageQueries';
import Bloc1 from '../components/Bloc1';
import Bloc2 from '../components/Bloc2';
import Bloc3_carousel from '../components/Bloc3_carousel';
import Bloc4Temoignages from '../components/Bloc4_temoignages';
import Bloc5Services from '../components/Bloc5_services';
import Bloc6Documents from '../components/Bloc6_documents';
import Bloc7Solution from '../components/Bloc7_solution';
import Bloc8Tuto from '../components/Bloc8_tuto';
import Bloc9Accordeon from '../components/Bloc9_accordeon';
import Bloc10 from '../components/Bloc10';
import Bloc11 from '../components/Bloc11';

import nextToGraphQLLocales from '../lib/locales';

console.log('React version:', React.version);
console.log('ReactDOM version:', require('react-dom').version);

const PageList = () => {
    const pathname = usePathname();
    const locale = pathname.split('/')[1]; // Récupère la locale à partir du chemin de l'URL

    const [pages, setPages] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!locale) return;

        const fetchPages = async () => {
            //setLoading(true);
            setError(null);

            try {
                const graphQLLocale = nextToGraphQLLocales[locale];
                if (!graphQLLocale) {
                    throw new Error(`Invalid locale: ${locale}`);
                }

                const fetchedPages = await getPages(locale);
                if (fetchedPages.length === 0) {
                    throw new Error('No pages found for this locale');
                }

                setPages(fetchedPages);
            } catch (err) {
                setError(err.message);
            }

            //setLoading(false);
        };

        fetchPages();
    }, [locale]);

    /*if (loading) {
        return <Loading />;
    }*/

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="">
            {pages.map((page) => (
                <div className="pageDaccueil" key={page.uri}>
                    <section className="bloc1">
                        <Bloc1 page={page} />
                    </section>
                    <section className="bloc2">
                        <Bloc2 page={page} />
                    </section>
                    <section className="bloc3">
                        <Bloc3_carousel page={page} />
                    </section>
                    <section className="bloc4">
                        <Bloc4Temoignages page={page} />
                    </section>
                    <section className="bloc5s">
                        <Bloc5Services page={page} />
                    </section>
                    <section className="bloc6">
                        <Bloc6Documents page={page} />
                    </section>
                    <section className="bloc7">
                        <Bloc7Solution page={page} />
                    </section>
                    <section className="bloc8">
                        <Bloc8Tuto page={page} />
                    </section>
                    <section className="bloc9">
                        <Bloc9Accordeon page={page} />
                    </section>
                    <section className="bloc11">
                        <Bloc11 page={page} />
                    </section>
                </div>
            ))}
        </div>
    );
};

export default PageList;
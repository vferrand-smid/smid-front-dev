'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { Suspense } from 'react';
// import ErrorBoundary from './components/ErrorBoundary';
import Loading from '../app/loading';
import getPages from '../app/lib/pageQueries';
import Bloc1 from '../app/components/Bloc1';
import Bloc2 from '../app/components/Bloc2';
import Bloc3_carousel from '../app/components/Bloc3_carousel';
import Temoignages from '../app/components/Bloc4_temoignages';
import Bloc5Services from '../app/components/Bloc5_services';
import Bloc6Documents from '../app/components/Bloc6_documents';
import Bloc7Solution from '../app/components/Bloc7_solution';
import Bloc8Tuto from '../app/components/Bloc8_tuto';
import Bloc9Accordeon from '../app/components/Bloc9_accordeon';
import Bloc10 from '../app/components/Bloc10';
import Bloc11 from '../app/components/Bloc11';

import nextToGraphQLLocales from '../app/lib/locales';



const PageList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const locale = searchParams.get('locale') || 'fr-FR'; // Default to 'fr-FR' if no locale is specified

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('PageList useEffect called with locale:', locale);
        if (!locale) return;

        const fetchPages = async () => {
            setLoading(true);
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

            setLoading(false);
        };

        fetchPages();
    }, [locale]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    /*if (pages.length === 0) {
        return <div>No pages available</div>;
    }*/

    const page = pages[0];
    const backgroundImageUrl = page?.pageDAccueilBloc1?.background?.node?.mediaItemUrl;

    return (
            <div className="">
                <p className="hidden">Router locale: {locale}</p>
                <p className="hidden">GraphQL Locale: {nextToGraphQLLocales[locale]}</p>
                {pages.map((page) => (
                    <div className="pageDaccueil" key={page.uri}>
                        <section className="bloc1">
                            <Bloc1 page={page}/>
                        </section>
                        <section className="bloc2">
                            <Bloc2 page={page}/>
                        </section>
                        <section className="bloc3">
                            <Bloc3_carousel page={page}/>
                        </section>
                        <section className="bloc4">
                            <Temoignages page={page}/>
                        </section>
                        <section className="bloc5s">
                            <Bloc5Services page={page}/>
                        </section>
                        <section className="bloc6">
                            <Bloc6Documents page={page}/>
                        </section>
                        <section className="bloc7">
                            <Bloc7Solution page={page}/>
                        </section>
                        <section className="bloc8">
                            <Bloc8Tuto page={page}/>
                        </section>
                        <section className="bloc9">
                            <Bloc9Accordeon page={page}/>
                        </section>
                        <section className="bloc10">
                            <Bloc10 page={page}/>
                        </section>
                        <section className="bloc11">
                            <Bloc11 page={page}/>
                        </section>
                    </div>
                ))}
            </div>
    );
};

export default function Page() {
    console.log('Rendering Page component with Suspense and ErrorBoundary');
    return (
        // <ErrorBoundary>
        //    <React.Suspense fallback={<div>Loading...</div>}>
            <PageList />
         //   </React.Suspense>
       // </ErrorBoundary>
    );
}
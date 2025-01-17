// app/[locale]/blog/page.jsx
"use client"

import { client } from '../../lib/sanityClient';
import { useEffect, useState } from 'react';
import React from "react";
import { PortableText } from '@portabletext/react';
import { defineQuery } from "next-sanity";
import { draftMode } from "next/headers";
import { sanityFetch } from '@/sanity/live'


export default async function Blog({ params }) {
    // Utilisation de React.use() pour déballer params et accéder à locale
    const { locale } = React.use(params);  // Déréférencer la Promise `params`
    console.log(params);
    const [articles, setArticles] = useState([]);
    const { isEnabled } = await draftMode();


    useEffect(() => {
        const fetchArticles = async () => {
            if (!locale) return;

            const query = defineQuery(`*[_type == "post" && locale == $locale] {
        title,
        slug,
        body,
        links,
        publishedAt,
        image { 
          asset->{
            _id,
            url
          }
           }
      }`);

            const fetchedArticles = await client.fetch(query, { locale });
            setArticles(fetchedArticles);
        };

        fetchArticles();
    }, [locale]);  // Le useEffect se réexécute si la locale change

    const { data } = await sanityFetch({
        query,
        params,
  });

    return (
        <div>
            <h1>Blog</h1>
            <ul>
                {data.length > 0 ? (
                    data.map((data) => (
                        <li key={data.slug}>
                            <h2>{data.title}</h2>
                            <p>{new Date(data.publishedAt).toLocaleDateString()}</p>
                            {data.image && <img src={data.image.asset.url} alt={data.title}/>}

                            {/* Rendre les liens séparément */}
                            {data.links && article.links.length > 0 && (
                                <div>
                                    <h3>Related Links:</h3>
                                    <ul>
                                        {data.links.map((link, index) => (
                                            <li key={index}>
                                                <a href={link} target="_blank" rel="noopener noreferrer">
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div>
                                <PortableText value={data.body}/>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No articles found for this locale.</p>
                )}
            </ul>
        </div>
    );
}

// app/[locale]/blog/[slug]/page.jsx
export const dynamic = 'force-dynamic';
import { getCanonicalLocale } from '@/utils/getCanonicalLocale';
import { PortableText } from '@portabletext/react';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { previewClient, sanityClient } from '../../../lib/sanity/client';
import { urlFor } from '../../../lib/sanity/imageUrl';

export async function generateStaticParams() {
    const pages = await sanityClient.fetch(`*[_type == "page" && !trashed]{ "slug": slug.current, locale }`);
    return pages.map(({ slug, locale }) => ({ slug, locale }));
}

export default async function BlogPostPage({ params }) {
    const rawLocale = params?.locale || 'fr-FR';
    const locale = await getCanonicalLocale(rawLocale);

    const { slug } = params;
    const { isEnabled } = await draftMode();

    console.log('🧩 slug actuel :', params.slug);

    const client = isEnabled ? previewClient : sanityClient;

    console.log('🔍 Requête avec slug et locale:', { slug, locale });

    const post = await client.fetch(
        `*[
              _type == "page" && 
              slug.current == $slug &&
              locale == $locale &&
              (!defined(status) || status == "publish")
            ][0] {
              title,
              slug,
              content,
              featuredMedia
            }`,
        { slug, locale }
    );

    console.log('🧾 Post récupéré depuis Sanity:', post);
    console.log('contenu', post.content);
    console.log('titre', post.title);

    if (!post) {
        console.warn('⚠️ Aucun post trouvé pour :', { slug, locale });
        return notFound();
    }

    if (!post.content) {
        console.warn('⚠️ Article trouvé mais sans contenu :', post);
        return <article className='p-10 text-center text-red-500'>Contenu vide pour cet article.</article>;
    }

    return (
        <article className='mx-auto px-4 py-8'>
            {/* Affiche le contenu enrichi */}
            <PortableText
                value={post.content}
                components={{
                    types: {
                        image: ({ value }) => {
                            if (!value?.asset?._ref) return null;

                            return (
                                <img
                                    src={urlFor(value).width(800).quality(80).url()}
                                    alt={value.alt || ''}
                                    className='mx-auto my-6 w-full max-w-3xl rounded-lg'
                                />
                            );
                        },
                    },
                    block: {
                        h1: ({ children }) => <h1 className='my-6 text-3xl font-bold'>{children}</h1>,
                        h2: ({ children }) => <h2 className='my-5 text-2xl font-bold'>{children}</h2>,
                        h3: ({ children }) => <h3 className='my-4 text-xl font-semibold'>{children}</h3>,
                        normal: ({ children }) => <p className='my-4 leading-relaxed'>{children}</p>,
                        blockquote: ({ children }) => (
                            <blockquote className='my-4 border-l-4 pl-4 italic text-gray-600'>{children}</blockquote>
                        ),
                    },
                    list: {
                        bullet: ({ children }) => <ul className='my-2 ml-6 list-disc'>{children}</ul>,
                        number: ({ children }) => <ol className='my-2 ml-6 list-decimal'>{children}</ol>,
                    },
                    listItem: {
                        bullet: ({ children }) => <li className='mb-1'>{children}</li>,
                        number: ({ children }) => <li className='mb-1'>{children}</li>,
                    },
                    marks: {
                        link: ({ children, value }) => (
                            <a href={value.href} className='text-blue-600 underline' target='_blank' rel='noopener noreferrer'>
                                {children}
                            </a>
                        ),
                    },
                }}
            />
        </article>
    );
}

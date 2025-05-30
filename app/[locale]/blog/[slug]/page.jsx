// app/[locale]/blog/[slug]/page.jsx
export const dynamic = 'force-dynamic';
import ClientPortableText from '@/app/components/ClientPortableText';
import { getCanonicalLocale } from '@/utils/getCanonicalLocale';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { previewClient, sanityClient } from '../../../lib/sanity/client';

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
        <article className='mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-8 sm:px-6 md:px-10 lg:grid-cols-3 lg:px-8 xl:px-32'>
            <div className='text-justify lg:col-span-2'>
                <h1 className='text-h1 mb-8 text-[56px] leading-none'>{post.title}</h1>
                <ClientPortableText content={post.content} />
            </div>

            <aside className='lg:col-span-1'>
                <div className='sticky top-32 mx-auto w-full max-w-[320px] rounded-xl border p-4 shadow'>
                    Widget à venir
                    <ul>
                        <li>
                            <a href='#'>
                                <span>Table des matières</span>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <span>Table des matières</span>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <span>Table des matières</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </article>
    );
}

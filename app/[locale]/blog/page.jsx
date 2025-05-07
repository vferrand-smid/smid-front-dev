// app/[locale]/blog/page.jsx
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { sanityClient } from '../../lib/sanity/client';

export default async function BlogLandingPage({ params }) {
    const { locale } = params;

    const posts = await sanityClient.fetch(
        `*[
        _type == "page" && 
        locale == $locale &&
        !trashed && 
        status == "publish"
    ] | order(date desc){
      title,
      slug,
      excerpt,
      featuredMedia
    }`,
        { locale }
    );

    return (
        <main className='mx-auto max-w-5xl p-4'>
            <h1 className='mb-8 text-3xl font-bold'>Nos articles</h1>
            <ul className='grid gap-6 md:grid-cols-2'>
                {posts.map((post) => (
                    <li key={post.slug.current} className='rounded border p-4 shadow'>
                        <Link href={`/${params.locale}/blog/${post.slug.current}`}>
                            <div className='space-y-2'>
                                {post.featuredMedia?.asset?.url && (
                                    <img src={post.featuredMedia.asset.url} alt={post.title} className='h-auto w-full rounded' />
                                )}
                                <h2 className='text-xl font-semibold'>{post.title}</h2>
                                {post.excerpt && (
                                    <div className='text-sm text-gray-600'>
                                        {/* Affiche le premier bloc texte de l’excerpt */}
                                        {post.excerpt[0]?.children?.[0]?.text}
                                    </div>
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}

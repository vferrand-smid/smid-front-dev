import { sanityClient } from '@/app/lib/sanity/client';
import { getCanonicalLocale } from '@/utils/getCanonicalLocale';
import Link from 'next/link';

export default async function BlogLandingPage(props) {
    const { params } = props;
    const locale = params?.locale || 'fr-FR'; // 👈 sécurité anti-erreur
    const canonicalLocale = await getCanonicalLocale(locale);

    console.log('🌍 Locale finale envoyée à getTranslations:', canonicalLocale);
    const posts = await sanityClient.fetch(
        `*[
      _type == "page" && 
      locale == $locale &&
       (!defined(status) || status == "publish") 
    ] | order(date desc){
      title,
      slug,
      excerpt,
      featuredMedia
    }`,
        { locale: canonicalLocale }
    );
    console.log('📦 Nombre de posts trouvés:', posts.length);
    console.log('🧪 Premier post:', posts[0]);
    console.log(posts.map((p) => p.slug));

    return (
        <main className='mx-auto max-w-5xl p-4'>
            <h1 className='mb-8 text-3xl font-bold'>Nos articles</h1>
            {posts.length === 0 && <p>Aucun article disponible pour cette langue.</p>}
            <ul className='grid gap-6 md:grid-cols-2'>
                {posts.map((post) => (
                    <li key={post.slug.current} className='rounded border p-4 shadow'>
                        <Link target='_blank' href={`/${params.locale}/blog/${post.slug.current}`}>
                            <div className='space-y-2'>
                                {post.featuredMedia?.asset?.url && (
                                    <img src={post.featuredMedia.asset.url} alt={post.title} className='h-auto w-full rounded' />
                                )}
                                <h2 className='text-xl font-semibold'>{post.title}</h2>
                                {post.excerpt && <div className='text-sm text-gray-600'>{post.excerpt[0]?.children?.[0]?.text}</div>}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}

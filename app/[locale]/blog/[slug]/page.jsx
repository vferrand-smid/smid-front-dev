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

  const client = isEnabled ? previewClient : sanityClient;

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

  if (!post) {
    return notFound();
  }

  if (!post.content) {
    return (
      <article className="p-10 text-center text-red-500">
        Contenu vide pour cet article.
      </article>
    );
  }

    return (
        <article className='mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-8 sm:px-6 md:px-10 lg:grid-cols-3 lg:px-8 xl:px-32'>
            <div className='text-justify lg:col-span-2'>
                <h1 className='text-h1 mb-8 text-[56px] leading-none'>{post.title}</h1>
                <ClientPortableText content={post.content} />
            </div>


    {/* Bandeau à droite */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl shadow-xl border border-gray-200 p-6 bg-white text-center">
              <h2 className="text-green-600 text-lg font-semibold mb-2">
                Téléchargez notre application gratuitement !
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Réalisez vos photos d'identité en ligne depuis votre smartphone
                et recevez-les par email et/ou par courrier.
              </p>
              <img
                src="/images/app-banner-fr.png"
                alt="Application smartphone photo d'identité"
                className="mx-auto mb-4 rounded-lg shadow-sm"
              />
              <div className="flex justify-center gap-2 mt-4">
                <img
                  src="/images/General/Download_on_the_App_Store_Badge_FR_blk_100517.webp"
                  alt="Télécharger sur l'App Store"
                  className="h-10"
                />
                <img
                  src="/images/General/google-play-badge.webp"
                  alt="Disponible sur Google Play"
                  className="h-10"
                />
              </div>
            </div>
          </aside>

        </article>
    );
}


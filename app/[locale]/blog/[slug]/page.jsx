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
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contenu principal centré */}
          <article className="w-full lg:flex-1 max-w-3xl mx-auto">
            <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-center text-gray-900">
              {post.title}
            </h1>

            <PortableText
              value={post.content}
              components={{
                types: {
                  image: ({ value }) => {
                    if (!value?.asset?._ref) return null;
                    return (
                      <div className="my-8 overflow-hidden rounded-xl shadow-md">
                        <img
                          src={urlFor(value).width(1200).quality(80).url()}
                          alt={value.alt || ''}
                          className="w-full object-cover"
                        />
                      </div>
                    );
                  },
                },
                block: {
                  h1: ({ children }) => (
                    <h1 className="mt-10 mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-10 mb-4 text-3xl font-bold text-gray-800">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-8 mb-2 text-2xl font-semibold text-gray-700">
                      {children}
                    </h3>
                  ),
                  normal: ({ children }) => (
                    <p className="mb-6 text-lg leading-relaxed text-gray-700">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 border-l-4 border-green-500 pl-6 italic text-gray-600">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="my-6 list-disc pl-6 text-gray-700">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="my-6 list-decimal pl-6 text-gray-700">{children}</ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <li className="mb-1">{children}</li>,
                  number: ({ children }) => <li className="mb-1">{children}</li>,
                },
                marks: {
                  link: ({ children, value }) => (
                    <a
                      href={value.href}
                      className="text-green-600 underline hover:text-green-800 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </article>

          {/* Bandeau à droite */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
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
        </div>
      </div>
    </section>
  );
}


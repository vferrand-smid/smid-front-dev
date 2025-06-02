'use client';

import { urlFor } from '@/app/lib/sanity/imageUrl';
import { PortableText } from '@portabletext/react';

export default function ClientPortableText({ content }) {
    return (
        <PortableText
            value={content}
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
                    h1: ({ children }) => <h1 className='my-6 text-3xl text-h1'>{children}</h1>,
                    h2: ({ children, value }) => {
                        const isTOC = typeof children?.[0] === 'string' && children[0].toLowerCase().includes('table des matières');
                        const text = children?.[0] || '';
                        const slug = typeof text === 'string' ? text.toLowerCase().replace(/[^\w]+/g, '-') : '';
                        return (
                            <h2 id={slug} className={`my-5 scroll-mt-30 text-h1 ${isTOC ? 'text-[17px] font-semibold' : 'text-[34px]'}`}>
                                {children}
                            </h2>
                        );
                    },
                    h3: ({ children, value }) => {
                        const text = children?.[0] || '';
                        const slug = typeof text === 'string' ? text.toLowerCase().replace(/[^\w]+/g, '-') : '';
                        return (
                            <h3 id={slug} className='my-5 scroll-mt-30 text-2xl text-h1'>
                                {children}
                            </h3>
                        );
                    },
                    normal: ({ children }) => <p className='my-4 break-all leading-relaxed'>{children}</p>,
                },
                list: {
                    bullet: ({ children }) => <ul className='my-2 ml-6 list-disc'>{children}</ul>,
                    number: ({ children }) => <ol className='my-2 ml-6 list-decimal'>{children}</ol>,
                },
                listItem: {
                    bullet: ({ children }) => <li className=''>{children}</li>,
                    number: ({ children }) => <li className=''>{children}</li>,
                },
                marks: {
                    link: ({ children, value }) => {
                        const href = value?.href || '#';
                        const isAnchor = value.href?.startsWith('#');

                        const handleClick = (e) => {
                            if (isAnchor) {
                                e.preventDefault();
                                const target = document.querySelector(href);
                                if (target) {
                                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }
                        };

                        return (
                            <a
                                href={href}
                                onClick={handleClick}
                                className={`text-blue-600 ${isAnchor ? 'no-underline' : 'underline'} hover:text-blue-800`}
                                target={isAnchor ? undefined : '_blank'}
                                rel={isAnchor ? undefined : 'noopener noreferrer'}
                            >
                                {children}
                            </a>
                        );
                    },
                },
            }}
        />
    );
}

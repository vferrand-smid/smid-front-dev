import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './config';

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
});

export const previewClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN, // à générer dans Sanity
    perspective: 'previewDrafts',
});

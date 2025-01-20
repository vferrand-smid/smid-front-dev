// lib/sanity.js
import {createClient} from '@sanity/client';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,                  // Utilisez le CDN pour de meilleures performances
    token: process.env.SANITY_VIEWER_TOKEN,
    stega: {
      studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    },
  });

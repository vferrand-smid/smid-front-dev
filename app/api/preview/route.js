// app/api/preview/route.ts

import { draftMode } from 'next/headers';

export async function GET() {
    draftMode().enable();
    return new Response('Preview mode enabled');
}

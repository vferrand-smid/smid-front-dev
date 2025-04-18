import {sanityClient} from './sanityClient';

export const fetchPages = async () => {
    const query = `*[_type == "page"]{ 
    title, 
    slug, 
    content, 
    images[] {
      asset->{
        url
      }
    }
  }`;
    return await sanityClient.fetch(query);
};

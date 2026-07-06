import { readStore } from '../lib/store';
import { getPublishedPosts } from '../lib/blog';

const SITE_URL = 'https://zeemaa.com';

export default async function sitemap() {
  const store = await readStore();

  const blogPosts = store.pages?.blog
    ? getPublishedPosts(store).map(post => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.datePublished,
        changeFrequency: 'monthly',
        priority: 0.6,
      }))
    : [];

  const corePages = [
    { url: SITE_URL,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/industries`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/profile`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`,     lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`,   lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const conditionalPages = [
    store.pages?.gallery     && { url: `${SITE_URL}/gallery`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    store.pages?.caseStudies && { url: `${SITE_URL}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    store.pages?.blog        && { url: `${SITE_URL}/blog`,         lastModified: new Date(), changeFrequency: 'daily',   priority: 0.7 },
    store.pages?.compare     && { url: `${SITE_URL}/compare`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ].filter(Boolean);

  return [...corePages, ...conditionalPages, ...blogPosts];
}

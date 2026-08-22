import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/markdown';

const BASE_URL = 'https://alazlab.com';
const locales = ['tr', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    entries.push(
      { url: `${BASE_URL}/${lang}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
      { url: `${BASE_URL}/${lang}/hakkimda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${BASE_URL}/${lang}/muhendislik`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
      { url: `${BASE_URL}/${lang}/lab`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
      { url: `${BASE_URL}/${lang}/gtab`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
      { url: `${BASE_URL}/${lang}/gtab/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 }
    );

    for (const p of projects) {
      entries.push({
        url: `${BASE_URL}/${lang}/proje/${p.slug}`,
        lastModified: p.date ? new Date(p.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}

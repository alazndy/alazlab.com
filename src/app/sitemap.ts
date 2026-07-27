import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/markdown';

const BASE_URL = 'https://alazlab.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();

  const projectUrls: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${BASE_URL}/proje/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: BASE_URL,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/hakkimda`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/muhendislik`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/lab`,                  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/gtab`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/gtab/privacy-policy`,  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    ...projectUrls,
  ];
}

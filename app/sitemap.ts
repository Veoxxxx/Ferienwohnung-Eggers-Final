import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';
import { routing } from '@/i18n/routing';

// Seiten mit ihrer Priorität und Änderungshäufigkeit
const pages: {
    path: keyof typeof routing.pathnames;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/ausstattung', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/galerie', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/lage', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/preise', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/buchen', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/ueber-uns', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/kontakt', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/agb', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;
    const entries: MetadataRoute.Sitemap = [];

    for (const page of pages) {
        const pathConfig = routing.pathnames[page.path];

        // Deutsche Version (ohne Präfix, da defaultLocale)
        const dePath = typeof pathConfig === 'string' ? pathConfig : pathConfig.de;
        entries.push({
            url: `${baseUrl}${dePath}`,
            lastModified: new Date(),
            changeFrequency: page.changeFrequency,
            priority: page.priority,
            alternates: {
                languages: {
                    de: `${baseUrl}${dePath}`,
                    en: `${baseUrl}/en${typeof pathConfig === 'string' ? pathConfig : pathConfig.en}`,
                },
            },
        });

        // Englische Version (mit /en Präfix)
        const enPath = typeof pathConfig === 'string' ? pathConfig : pathConfig.en;
        entries.push({
            url: `${baseUrl}/en${enPath}`,
            lastModified: new Date(),
            changeFrequency: page.changeFrequency,
            priority: page.priority * 0.9, // Englische Version leicht niedrigere Priorität
            alternates: {
                languages: {
                    de: `${baseUrl}${dePath}`,
                    en: `${baseUrl}/en${enPath}`,
                },
            },
        });
    }

    return entries;
}


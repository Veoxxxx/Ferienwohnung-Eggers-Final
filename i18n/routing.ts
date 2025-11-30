import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['de', 'en'],
    defaultLocale: 'de',
    localePrefix: 'as-needed', // Only show locale prefix for non-default locale
    pathnames: {
        '/': '/',
        '/ausstattung': {
            de: '/ausstattung',
            en: '/amenities',
        },
        '/galerie': {
            de: '/galerie',
            en: '/gallery',
        },
        '/lage': {
            de: '/lage',
            en: '/location',
        },
        '/preise': {
            de: '/preise',
            en: '/prices',
        },
        '/ueber-uns': {
            de: '/ueber-uns',
            en: '/about',
        },
        '/kontakt': {
            de: '/kontakt',
            en: '/contact',
        },
        '/buchen': {
            de: '/buchen',
            en: '/booking',
        },
        '/impressum': {
            de: '/impressum',
            en: '/imprint',
        },
        '/datenschutz': {
            de: '/datenschutz',
            en: '/privacy',
        },
        '/agb': {
            de: '/agb',
            en: '/terms',
        },
    },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);


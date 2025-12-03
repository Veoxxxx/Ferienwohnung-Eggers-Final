/**
 * Content Store - JSON-basierte Datenverwaltung
 * 
 * Verwaltet die Inhalte der Website aus data/content.json
 * Wird vom Admin-Dashboard zum Lesen und Schreiben verwendet
 */

import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'content.json');

// Type Definitionen
export interface Review {
    id: string;
    name: string;
    date: string;
    text: string;
    rating: number;
}

export interface GalleryImage {
    src: string;
    alt: string;
    span: string;
}

export interface GalleryCategory {
    id: string;
    title: string;
    description: string;
    images: GalleryImage[];
}

export interface FeatureItem {
    iconName: string;
    title: string;
    desc: string;
}

export interface SiteContent {
    general: {
        brandName: string;
        description: string;
        address: { 
            street: string; 
            zipCity: string; 
            mapsLink: string;
        };
        contact: { 
            phone: string; 
            phoneRaw: string; 
            email: string;
        };
        socials: { 
            instagram: string; 
            facebook: string;
        };
        metadata: { 
            icon: string;
        };
    };
    navigation: Array<{ href: string; label: string }>;
    pages: {
        home: {
            hero: {
                headline: string;
                subheadline: string;
                primaryCta: string;
                secondaryCta: string;
                backgroundImage: string;
            };
            intro: {
                image: string;
                quote: string;
                headline: string;
                text: string;
                features: string[];
            };
            features: {
                headline: string;
                subheadline: string;
                items: FeatureItem[];
            };
            testimonials: {
                headline: string;
                subheadline: string;
                reviews: Review[];
            };
        };
        gallery: {
            hero: { 
                headline: string; 
                text: string; 
                backgroundImage: string;
            };
            categories: GalleryCategory[];
        };
    };
    footer: {
        legalLinks: Array<{ href: string; label: string }>;
        copyrightText: string;
    };
    booking: {
        prices: {
            basePricePerNight: number;
            cleaningFee: number;
            dogFee: number;
            cityTaxPerAdultPerNight: number;
            minimumStay: number;
        };
        seasonal: {
            high: { start: string; end: string; multiplier: number };
            low: { start: string; end: string; multiplier: number };
        };
    };
    theme: {
        colors: { 
            light: Record<string, string>; 
            dark: Record<string, string>;
        };
        borderRadius: string;
        gradient: { start: string; end: string };
        palette: Record<string, Record<string, Record<string, string>>>;
    };
}

/**
 * Liest den gesamten Content aus der JSON-Datei
 */
export async function getContent(): Promise<SiteContent> {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading content:', error);
        throw new Error('Could not read content file');
    }
}

/**
 * Schreibt den gesamten Content in die JSON-Datei
 */
export async function updateContent(content: SiteContent): Promise<void> {
    try {
        await fs.writeFile(DATA_PATH, JSON.stringify(content, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing content:', error);
        throw new Error('Could not write content file');
    }
}

/**
 * Aktualisiert einen bestimmten Bereich des Contents
 */
export async function updateSection<K extends keyof SiteContent>(
    section: K,
    data: SiteContent[K]
): Promise<void> {
    const content = await getContent();
    content[section] = data;
    await updateContent(content);
}

/**
 * Aktualisiert einen verschachtelten Pfad im Content
 * z.B. "pages.home.testimonials.reviews"
 */
export async function updateNestedPath(
    path: string,
    data: unknown
): Promise<void> {
    const content = await getContent();
    const keys = path.split('.');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = content;
    for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = data;
    
    await updateContent(content);
}

/**
 * Liest einen verschachtelten Pfad aus dem Content
 */
export async function getNestedPath(path: string): Promise<unknown> {
    const content = await getContent();
    const keys = path.split('.');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = content;
    for (const key of keys) {
        obj = obj?.[key];
    }
    
    return obj;
}

/**
 * Synchrone Version für Client-Komponenten (verwendet fetch)
 * Wird vom Frontend verwendet
 */
export const contentApi = {
    async get(section?: string) {
        const url = section 
            ? `/api/admin/content?section=${encodeURIComponent(section)}`
            : '/api/admin/content';
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch content');
        return res.json();
    },
    
    async update(section: string, data: unknown) {
        const res = await fetch('/api/admin/content', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ section, data }),
        });
        if (!res.ok) throw new Error('Failed to update content');
        return res.json();
    },
    
    async updatePath(path: string, data: unknown) {
        const res = await fetch('/api/admin/content', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path, data }),
        });
        if (!res.ok) throw new Error('Failed to update content');
        return res.json();
    }
};


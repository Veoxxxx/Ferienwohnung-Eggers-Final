# Ferienwohnung Eggers - Technische Dokumentation

## Inhaltsverzeichnis

1. [Projektübersicht](#1-projektübersicht)
2. [Technischer Stack](#2-technischer-stack)
3. [Architektur & Projektstruktur](#3-architektur--projektstruktur)
4. [Internationalisierung (i18n)](#4-internationalisierung-i18n)
5. [Routing & Navigation](#5-routing--navigation)
6. [Buchungssystem](#6-buchungssystem)
7. [SEO & Metadaten](#7-seo--metadaten)
8. [Design System](#8-design-system)
9. [Content-Management](#9-content-management)
10. [API-Referenz](#10-api-referenz)
11. [Komponenten-Bibliothek](#11-komponenten-bibliothek)
12. [Konfiguration & Deployment](#12-konfiguration--deployment)
13. [Entwickler-Workflow](#13-entwickler-workflow)

---

## 1. Projektübersicht

Dieses Projekt ist ein moderner, leistungsfähiger Webauftritt für die "Ferienwohnung Eggers" in Cuxhaven Sahlenburg. Die Anwendung wurde als **Multi-Page Application** mit **Next.js 14 (App Router)** entwickelt und legt besonderen Wert auf Performance, SEO, Barrierefreiheit und ein hochwertiges "Quiet Luxury" Design.

### Kernfunktionen

- ✅ **Vollständige Mehrsprachigkeit** (Deutsch/Englisch) mit `next-intl`
- ✅ **Buchungssystem** mit interaktivem Kalender, Preisberechnung und Saisonpreisen
- ✅ **Channel Manager Integration** (vorbereitet für Booking.com, Airbnb)
- ✅ **SEO-Optimierung** mit Sitemap, robots.txt und JSON-LD Schema
- ✅ **"Quiet Luxury" Design** mit Dark Mode
- ✅ **Barrierefreiheit** (WCAG 2.1 AA konform)
- ✅ **DSGVO-konforme Architektur**

---

## 2. Technischer Stack

### Core Frameworks

| Paket | Version | Beschreibung |
|-------|---------|--------------|
| Next.js | 14.x | App Router, Server Components, API Routes |
| React | 18.x | UI Library mit Server Components |
| TypeScript | 5.x | Typensicherheit im gesamten Projekt |
| next-intl | 4.x | Internationalisierung und Übersetzungen |

### Styling & UI

| Paket | Beschreibung |
|-------|--------------|
| Tailwind CSS | Utility-first CSS Framework |
| Framer Motion | Animationen und Transitions |
| Lucide React | Icon Set |
| clsx / tailwind-merge | Dynamisches Klassen-Handling |

### Utilities

| Paket | Beschreibung |
|-------|--------------|
| date-fns | Datumsmanipulation und -formatierung |
| ESLint | Code Quality und Linting |

---

## 3. Architektur & Projektstruktur

Die Struktur folgt den Best Practices des Next.js App Routers mit i18n-Support.

```
/
├── app/                         # App Router Pages & API
│   ├── [locale]/               # Dynamisches Locale-Segment
│   │   ├── layout.tsx          # Root Layout mit Providers
│   │   ├── page.tsx            # Homepage
│   │   ├── ausstattung/        # /ausstattung (DE) | /en/amenities (EN)
│   │   ├── galerie/            # /galerie (DE) | /en/gallery (EN)
│   │   ├── lage/               # /lage (DE) | /en/location (EN)
│   │   ├── preise/             # /preise (DE) | /en/prices (EN)
│   │   ├── buchen/             # /buchen (DE) | /en/booking (EN)
│   │   ├── ueber-uns/          # /ueber-uns (DE) | /en/about (EN)
│   │   ├── kontakt/            # /kontakt (DE) | /en/contact (EN)
│   │   ├── impressum/          # Rechtliche Seiten
│   │   ├── datenschutz/
│   │   └── agb/
│   ├── api/                    # Server-side API Endpoints
│   │   ├── bookings/           # POST: Buchung anlegen, GET: Buchungen abrufen
│   │   └── channel-manager/    # Sync Endpoints für externe Plattformen
│   ├── globals.css             # Globale Styles, CSS Variables, Tailwind
│   ├── robots.ts               # Dynamische robots.txt Generation
│   └── sitemap.ts              # Dynamische Sitemap Generation
│
├── components/                  # React Komponenten
│   ├── booking/                # Buchungsspezifische Komponenten
│   │   ├── booking-wizard.tsx  # Mehrstufiger Buchungsassistent
│   │   └── price-summary.tsx   # Preisübersicht mit Saisonberechnung
│   ├── sections/               # Seitenabschnitte
│   │   ├── Testimonials.tsx    # Gästebewertungen
│   │   └── HeroParallax.tsx    # Hero-Sektion mit Parallax-Effekt
│   ├── ui/                     # Wiederverwendbare UI-Elemente
│   │   ├── animated-section.tsx
│   │   └── hover-card.tsx
│   ├── booking-calendar.tsx    # Interaktiver Kalender
│   ├── booking-form.tsx        # Buchungsformular
│   ├── button.tsx              # Button-Komponente
│   ├── card.tsx                # Card-Komponente
│   ├── cookie-banner.tsx       # DSGVO Cookie-Banner
│   ├── dark-mode-provider.tsx  # Theme Context Provider
│   ├── footer.tsx              # Footer mit Navigation
│   ├── language-switcher.tsx   # Sprachumschalter DE/EN
│   ├── navigation.tsx          # Responsive Header-Navigation
│   └── theme-registry.tsx      # CSS Variables für Theme
│
├── i18n/                       # Internationalisierung
│   ├── routing.ts              # Locale-Routing Konfiguration
│   └── request.ts              # Server-side Locale Detection
│
├── lib/                        # Business Logic & Utilities
│   ├── booking-store.ts        # Buchungs-Datenspeicher (Server, In-Memory)
│   ├── booking-client-store.ts # Client-Store mit LocalStorage-Persistenz
│   ├── channel-manager.ts      # Channel Manager Interface
│   ├── content.ts              # Zentrale Inhalts-Konfiguration
│   ├── metadata.ts             # SEO Metadata & JSON-LD Schema
│   ├── pricing.ts              # Preisberechnungslogik
│   └── utils.ts                # Allgemeine Helper (cn, etc.)
│
├── messages/                   # Übersetzungsdateien
│   ├── de.json                 # Deutsche Übersetzungen
│   └── en.json                 # Englische Übersetzungen
│
├── public/                     # Statische Assets
│   ├── icon.svg               # Favicon
│   └── images/                # Bilder (Platzhalter)
│       ├── interior/          # Innenaufnahmen
│       └── surroundings/      # Umgebungsbilder
│
├── middleware.ts               # i18n Routing Middleware
├── tailwind.config.ts          # Design System Konfiguration
├── next.config.js              # Next.js Konfiguration
└── package.json
```

---

## 4. Internationalisierung (i18n)

Das Projekt verwendet **next-intl** für vollständige Mehrsprachigkeit mit Deutsch als Standardsprache.

### Konfiguration

**`i18n/routing.ts`** - Definiert verfügbare Sprachen und URL-Pfade:

```typescript
export const routing = defineRouting({
    locales: ['de', 'en'],
    defaultLocale: 'de',
    localePrefix: 'as-needed', // Nur /en/ Präfix für Englisch
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
        // ... weitere Pfade
    },
});
```

**`i18n/request.ts`** - Server-side Locale Detection:

```typescript
export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(locales, requested) ? requested : defaultLocale;
    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
```

**`middleware.ts`** - Routing Middleware:

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/([\\w-]+)?/users/(.+)'],
};
```

### Übersetzungsdateien

Übersetzungen sind in `messages/de.json` und `messages/en.json` organisiert:

```json
{
  "Navigation": {
    "home": "Start",
    "amenities": "Ausstattung",
    "gallery": "Galerie"
  },
  "Hero": {
    "headline": "Ruhe. Natur. Nordsee.",
    "subheadline": "Ihr privater Rückzugsort..."
  },
  "Booking": {
    "meta": { "title": "Buchungsanfrage" },
    "calendar": { "title": "Verfügbarkeit prüfen" }
  }
}
```

### Verwendung in Komponenten

```typescript
// Client Component
'use client';
import { useTranslations } from 'next-intl';

export function MyComponent() {
    const t = useTranslations('Navigation');
    return <span>{t('home')}</span>;
}

// Lokalisierte Links
import { Link } from '@/i18n/routing';
<Link href="/ausstattung">...</Link> // Automatisch /ausstattung oder /en/amenities
```

### URL-Struktur

| Deutsch (Standard) | Englisch |
|-------------------|----------|
| `/` | `/en` |
| `/ausstattung` | `/en/amenities` |
| `/galerie` | `/en/gallery` |
| `/lage` | `/en/location` |
| `/preise` | `/en/prices` |
| `/buchen` | `/en/booking` |
| `/ueber-uns` | `/en/about` |
| `/kontakt` | `/en/contact` |
| `/impressum` | `/en/imprint` |
| `/datenschutz` | `/en/privacy` |
| `/agb` | `/en/terms` |

---

## 5. Routing & Navigation

### App Router Struktur

Das Routing basiert auf dem Next.js 14 App Router mit dynamischem `[locale]` Segment:

```
app/
├── [locale]/           # Dynamisches Locale-Segment
│   ├── layout.tsx      # Gemeinsames Layout für alle Seiten
│   ├── page.tsx        # Homepage (/, /en)
│   └── ausstattung/
│       └── page.tsx    # /ausstattung, /en/amenities
```

### Navigation Komponente

Die Navigation (`components/navigation.tsx`) bietet:

- **Responsive Design**: Desktop-Navigation und Mobile-Hamburger-Menü
- **Scroll-Effekt**: Transparenter Header wird bei Scroll solide
- **Aktive Seite**: Animierte Unterstreichung mit Framer Motion
- **Theme Toggle**: Dark/Light Mode Umschaltung
- **Sprachumschaltung**: DE/EN Toggle

```typescript
const navigationKeys = [
    { href: "/", labelKey: "home" },
    { href: "/ausstattung", labelKey: "amenities" },
    { href: "/galerie", labelKey: "gallery" },
    { href: "/lage", labelKey: "location" },
    { href: "/preise", labelKey: "prices" },
    { href: "/ueber-uns", labelKey: "about" },
    { href: "/kontakt", labelKey: "contact" },
    { href: "/buchen", labelKey: "booking" },
];
```

---

## 6. Buchungssystem

Das Buchungssystem ist modular aufgebaut und trennt UI, Logik und Datenspeicherung.

### 6.1 Architektur-Übersicht

```
┌─────────────────────────────────────────────────────────────┐
│                    Buchungs-Frontend                         │
│  ┌──────────────────┐  ┌─────────────────────────────────┐  │
│  │ booking-calendar │  │ booking-form / booking-wizard   │  │
│  │  - Datumsauswahl │  │  - Gastdaten                    │  │
│  │  - Verfügbarkeit │  │  - Validierung                  │  │
│  └────────┬─────────┘  └───────────────┬─────────────────┘  │
│           │                            │                     │
│           └──────────┬─────────────────┘                     │
│                      ▼                                       │
│           ┌──────────────────┐                              │
│           │  price-summary   │                              │
│           │  - Preisübersicht│                              │
│           │  - Saisonpreise  │                              │
│           └────────┬─────────┘                              │
└────────────────────┼────────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer                                 │
│           ┌──────────────────────────┐                      │
│           │ POST /api/bookings       │                      │
│           │ GET  /api/bookings       │                      │
│           │ GET  /api/channel-manager│                      │
│           └────────────┬─────────────┘                      │
└────────────────────────┼────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Business Logic                               │
│  ┌─────────────────┐  ┌──────────────────────────────────┐  │
│  │ booking-store   │  │ channel-manager                  │  │
│  │ - In-Memory     │  │ - Externe Verfügbarkeit         │  │
│  │ - Konfliktprüf. │  │ - Mock-Daten (Produktion: API)  │  │
│  └─────────────────┘  └──────────────────────────────────┘  │
│           ┌──────────────────┐                              │
│           │    pricing.ts    │                              │
│           │ - Saisonpreise   │                              │
│           │ - Kurtaxe        │                              │
│           │ - Gebühren       │                              │
│           └──────────────────┘                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Preiskonfiguration (`lib/content.ts`)

Alle Preise und Konditionen sind zentral konfigurierbar:

```typescript
booking: {
    prices: {
        basePricePerNight: 85,           // Basispreis pro Nacht (€)
        cleaningFee: 85,                 // Endreinigung (€)
        dogFee: 25,                      // Hundepauschale (€)
        cityTaxPerAdultPerNight: 4.10,   // Kurtaxe p.P./Nacht (€)
        minimumStay: 3                   // Mindestaufenthalt (Nächte)
    },
    seasonal: {
        high: {
            start: "06-15",              // Hauptsaison Start (MM-TT)
            end: "09-15",                // Hauptsaison Ende
            multiplier: 1.3              // +30% Aufschlag
        },
        low: {
            start: "11-01",              // Nebensaison Start
            end: "02-28",                // Nebensaison Ende
            multiplier: 0.85             // -15% Nachlass
        }
    }
}
```

### 6.3 Preisberechnung (`lib/pricing.ts`)

Die Preisberechnung berücksichtigt:

- **Saisonale Preise**: Automatische Erkennung von Haupt-/Nebensaison
- **Kurtaxe**: Berechnung pro Erwachsenem pro Nacht
- **Zusatzgebühren**: Endreinigung, Hundegebühr
- **Mindestaufenthalt**: Validierung von 3 Nächten

```typescript
interface BookingPriceBreakdown {
    nights: number;
    basePricePerNight: number;
    baseTotal: number;
    cleaningFee: number;
    dogFee: number;
    cityTax: number;
    subtotal: number;
    total: number;
    seasonType?: "high" | "low" | "normal";
}

// Beispiel-Aufruf:
const breakdown = calculateBookingPrice({
    checkIn: new Date('2025-07-15'),
    checkOut: new Date('2025-07-20'),
    adults: 2,
    children: 1,
    hasDog: true
});
// Ergebnis: 5 Nächte × €110.50 (Hochsaison) + €85 Reinigung + €25 Hund + €41 Kurtaxe
```

### 6.4 Booking Store (`lib/booking-store.ts`)

Der In-Memory Store speichert Buchungsanfragen serverseitig:

> **Neu:** Für Client-seitige Persistenz steht `lib/booking-client-store.ts` zur Verfügung.

#### Client-Store mit LocalStorage (`lib/booking-client-store.ts`)

```typescript
// Hook für persistente Buchungsentwürfe
const { draft, updateDraft, clearDraft, isHydrated } = useBookingDraft();

// Hook für abgeschlossene Anfragen (lokal gespeichert)
const { bookings, addSubmittedBooking } = useSubmittedBookings();
```

**Features:**
- Überlebt Page Reload und Browser-Sessions
- Automatische Hydration beim Laden
- Maximal 10 gespeicherte Buchungsanfragen
- TypeScript-strict Interfaces

#### Server-Store (In-Memory)

```typescript
interface BookingRequest {
    id: string;
    checkIn: Date;
    checkOut: Date;
    guestCount: number;
    adults: number;
    children: number;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    dogsIncluded: boolean;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

// Verfügbare Methoden:
BookingStore.createBookingRequest(data)     // Neue Anfrage erstellen
BookingStore.getAllBookingRequests()        // Alle Anfragen abrufen
BookingStore.getBookingRequestById(id)      // Einzelne Anfrage
BookingStore.updateBookingStatus(id, status) // Status aktualisieren
BookingStore.hasConflict(checkIn, checkOut) // Konfliktprüfung
```

### 6.5 Channel Manager (`lib/channel-manager.ts`)

Vorbereitet für Integration mit externen Buchungsplattformen:

```typescript
// Verfügbarkeitsdaten abrufen (aktuell Mock)
const availability = await fetchExternalAvailability(startDate, endDate);

// Lokale und externe Daten zusammenführen
const merged = mergeAvailabilityData(localData, externalData);

// Zeitraum-Verfügbarkeit prüfen
const isAvailable = isDateRangeAvailable(checkIn, checkOut, availabilityData);
```

**Für Produktion**: Ersetzen Sie die Mock-Implementierung durch echte API-Calls:

```typescript
// Beispiel für echte API-Integration:
const response = await fetch(`${process.env.CHANNEL_MANAGER_API_URL}/availability`, {
    headers: {
        'Authorization': `Bearer ${process.env.CHANNEL_MANAGER_API_KEY}`
    },
    body: JSON.stringify({ startDate, endDate })
});
```

---

## 7. SEO & Metadaten

### 7.1 Dynamische Sitemap (`app/sitemap.ts`)

Generiert automatisch eine XML-Sitemap mit allen Seiten in beiden Sprachen:

```typescript
// Seiten-Konfiguration mit Prioritäten
const pages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/ausstattung', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/buchen', priority: 0.9, changeFrequency: 'weekly' },
    // ...
];

// Generierte URLs:
// - https://www.ferienwohnung-eggers.de/ (priority: 1.0)
// - https://www.ferienwohnung-eggers.de/en (priority: 0.9)
// - https://www.ferienwohnung-eggers.de/ausstattung
// - https://www.ferienwohnung-eggers.de/en/amenities
// ...
```

### 7.2 Robots.txt (`app/robots.ts`)

Dynamisch generierte robots.txt:

```typescript
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
```

### 7.3 JSON-LD Schema (`lib/metadata.ts`)

Strukturierte Daten für VacationRental:

```typescript
export function generateVacationRentalSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "VacationRental",
        name: "Ferienwohnung Eggers",
        description: "...",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Nordheimstraße 150",
            addressLocality: "Cuxhaven Sahlenburg",
            postalCode: "27476",
            addressCountry: "Deutschland",
        },
        numberOfRooms: 3,
        floorSize: { "@type": "QuantitativeValue", value: 62, unitCode: "MTK" },
        occupancy: { "@type": "QuantitativeValue", maxValue: 6 },
        petsAllowed: true,
        amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Kostenloser Parkplatz" },
            { "@type": "LocationFeatureSpecification", name: "WLAN" },
            // ...
        ],
        geo: {
            "@type": "GeoCoordinates",
            latitude: "53.8667",
            longitude: "8.6167",
        },
    };
}
```

### 7.4 Seitenspezifische Metadaten

Jede Seite definiert eigene Metadaten über Übersetzungsdateien:

```json
{
  "Amenities": {
    "meta": {
      "title": "Ausstattung",
      "description": "Komplette Ausstattung der Ferienwohnung Eggers..."
    }
  }
}
```

---

## 8. Design System

### 8.1 "Quiet Luxury" Konzept

Das Design zielt auf eine hochwertige, beruhigende Ästhetik ab:

- **Farbpalette**: Gedämpfte, natürliche Töne (Navy, Sand, Gold)
- **Typografie**: Klassische Serif-Überschriften mit `tracking-wide`, moderne Sans-Serif für Fließtext
- **Animationen**: Subtile, elegante Transitions mit Framer Motion
- **Layout**: Großzügige Weißräume, klare Struktur
- **Texturen**: Subtile "Noise"-Textur für Papier/Stoff-Effekt
- **Glass-Effekte**: Frosted Glass Panels mit Backdrop-Blur

### 8.1.1 Utility-Klassen für Luxury-Design

```css
/* Subtile Noise-Textur (Papier/Stoff-Effekt) */
.texture-noise { ... }

/* Glass-Panel mit Frosted-Glass-Effekt */
.glass-panel {
    @apply bg-luxury-sand-50/80 dark:bg-luxury-navy-900/80 
           backdrop-blur-md 
           border border-white/20 dark:border-white/10
           shadow-xl rounded-xl;
}

/* Kombinierte Textured Backgrounds */
.bg-textured-sand { @apply bg-luxury-sand-50 texture-noise; }
.bg-textured-navy { @apply bg-luxury-navy-900 texture-noise; }
```

### 8.2 Farbpalette (`tailwind.config.ts`)

```typescript
colors: {
    luxury: {
        sand: {
            DEFAULT: "#c4ad86",
            50: "#fdfcfb",    // Hintergrund Light Mode
            100: "#f9f6f1",
            // ... bis 900
        },
        navy: {
            DEFAULT: "#334e68",
            700: "#334e68",
            800: "#243b53",
            900: "#102a43",   // Hintergrund Dark Mode
            950: "#0a1929",
        },
        gold: {
            DEFAULT: "#f59e0b",
            400: "#fbbf24",   // Highlights, CTAs
        },
    },
}
```

### 8.3 CSS Variables (`app/globals.css`)

Theme-Variablen für Light/Dark Mode:

```css
:root {
    --background: 38 25% 98%;          /* luxury-sand-50 */
    --foreground: 216 42% 13%;         /* luxury-navy-900 */
    --primary: 216 42% 13%;
    --primary-foreground: 210 40% 98%;
    --muted: 30 15% 89%;
    --muted-foreground: 215 16% 47%;
    --surface-luxury: 38 25% 98%;
    --surface-strong: 209 61% 16%;
    /* ... */
}

.dark {
    --background: 219 50% 8%;          /* luxury-navy-950 */
    --foreground: 35 16% 93%;          /* luxury-sand-100 */
    /* ... */
}
```

### 8.4 Typografie

```typescript
// tailwind.config.ts
fontFamily: {
    sans: ["var(--font-inter)", "system-ui", "sans-serif"],
    serif: ["var(--font-playfair)", "Georgia", "serif"],
}

// Verwendung:
// font-sans  → Inter (Fließtext)
// font-serif → Playfair Display (Überschriften)
```

### 8.5 Dark Mode

Der Dark Mode wird über den `DarkModeProvider` gesteuert:

```typescript
// components/dark-mode-provider.tsx
export function useTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return { theme, toggleTheme };
}

// Automatische Erkennung der Systempräferenz
// Speicherung in localStorage
```

### 8.6 Animationen

Vordefinierte Tailwind-Animationen:

```typescript
animation: {
    "fade-in": "fadeIn 0.6s ease-in-out",
    "slide-up": "slideUp 0.7s ease-out",
    "slide-in": "slideIn 0.5s ease-out",
    "slow-zoom": "slowZoom 20s linear infinite",
}
```

---

## 9. Content-Management

### 9.1 Zentrale Content-Konfiguration (`lib/content.ts`)

Alle Inhalte, die nicht übersetzt werden müssen, sind zentral konfigurierbar:

```typescript
export const siteContent = {
    general: {
        brandName: "Ferienwohnung Eggers",
        address: {
            street: "Nordheimstraße 150",
            zipCity: "27476 Cuxhaven Sahlenburg",
            mapsLink: "https://maps.google.com/?q=..."
        },
        contact: {
            phone: "+49 (0) 4721 123 456",
            email: "info@ferienwohnung-eggers.de"
        },
    },
    navigation: [...],
    pages: {
        home: {
            hero: { ... },
            intro: { ... },
            features: { ... },
            testimonials: { ... }
        },
        gallery: {
            categories: [
                {
                    id: "living",
                    title: "Wohnen & Leben",
                    images: [
                        { src: "/images/...", alt: "...", span: "md:col-span-2" }
                    ]
                }
            ]
        }
    },
    booking: { prices: {...}, seasonal: {...} },
    theme: { colors: {...}, palette: {...} }
};
```

### 9.2 Übersetzbare Inhalte (`messages/*.json`)

Alle textuellen Inhalte mit Sprachvarianten:

| Namespace | Beschreibung |
|-----------|--------------|
| `Navigation` | Menüpunkte |
| `Hero` | Hero-Sektion der Startseite |
| `Intro` | Einführungstext |
| `Features` | Feature-Highlights |
| `Testimonials` | Gästebewertungen |
| `Amenities` | Ausstattungsseite |
| `Gallery` | Galerie-Seite |
| `Location` | Lage-Seite |
| `Prices` | Preise-Seite |
| `Booking` | Buchungsseite |
| `Contact` | Kontaktseite |
| `About` | Über uns |
| `Imprint` | Impressum |
| `Privacy` | Datenschutz |
| `Terms` | AGB |
| `BookingForm` | Buchungsformular |
| `PriceSummary` | Preisübersicht |
| `Calendar` | Kalender |
| `CookieBanner` | Cookie-Hinweis |

---

## 10. API-Referenz

### 10.1 Buchungen API

**`POST /api/bookings`** - Neue Buchungsanfrage erstellen

Request Body:
```json
{
    "checkIn": "2025-07-15",
    "checkOut": "2025-07-20",
    "guestCount": 3,
    "adults": 2,
    "children": 1,
    "name": "Max Mustermann",
    "email": "max@example.com",
    "phone": "+49 123 456789",
    "message": "Optional: Besondere Wünsche",
    "dogsIncluded": true
}
```

Erfolgsantwort (201):
```json
{
    "success": true,
    "message": "Buchungsanfrage erfolgreich gesendet",
    "bookingId": "req-1701234567890-abc123"
}
```

Fehlerantworten:
- `400`: Fehlende erforderliche Felder
- `409`: Zeitraum bereits gebucht
- `500`: Server-Fehler

**`GET /api/bookings`** - Alle Buchungsanfragen abrufen

Erfolgsantwort (200):
```json
{
    "success": true,
    "data": [
        {
            "id": "req-...",
            "checkIn": "2025-07-15T00:00:00.000Z",
            "checkOut": "2025-07-20T00:00:00.000Z",
            "status": "pending",
            // ...
        }
    ]
}
```

### 10.2 Channel Manager API

**`GET /api/channel-manager`** - Externe Verfügbarkeitsdaten

Query Parameter:
- `startDate`: ISO-Datum (YYYY-MM-DD)
- `endDate`: ISO-Datum (YYYY-MM-DD)

---

## 11. Komponenten-Bibliothek

### 11.1 UI-Komponenten

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| `Button` | `components/button.tsx` | Primärer CTA-Button |
| `Card` | `components/card.tsx` | Content-Card mit Icon |
| `AnimatedSection` | `components/ui/animated-section.tsx` | Scroll-Animation Wrapper |
| `HoverCard` | `components/ui/hover-card.tsx` | Hover-Effekt Card |

### 11.2 Layout-Komponenten

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| `Navigation` | `components/navigation.tsx` | Responsive Header |
| `Footer` | `components/footer.tsx` | Footer mit Links |
| `ThemeRegistry` | `components/theme-registry.tsx` | CSS Variables Injection |
| `DarkModeProvider` | `components/dark-mode-provider.tsx` | Theme Context |
| `CookieBanner` | `components/cookie-banner.tsx` | DSGVO Cookie-Hinweis |
| `LanguageSwitcher` | `components/language-switcher.tsx` | Sprachumschaltung |

### 11.3 Buchungs-Komponenten

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| `BookingCalendar` | `components/booking-calendar.tsx` | Interaktiver Kalender |
| `BookingForm` | `components/booking-form.tsx` | Buchungsformular |
| `BookingWizard` | `components/booking/booking-wizard.tsx` | 4-Schritte Buchungsassistent mit Gold-Akzenten |
| `PriceSummary` | `components/booking/price-summary.tsx` | Preisübersicht |

#### BookingWizard Features

Der Buchungsassistent bietet:

- **4-Schritte Prozess**: Daten wählen → Gastdaten → Übersicht → Bestätigung
- **Visueller Stepper**: Icons (Calendar, User, ClipboardCheck, PartyPopper)
- **Gold-Akzente**: Aktiver Step in `luxury-gold-500`
- **Animierte Fortschrittslinien**: Framer Motion Übergänge
- **Glass-Panel Styling**: Frosted-Glass Container
- **Custom Easing**: Luxuriöses Übergangsgefühl

### 11.4 Section-Komponenten

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| `HeroParallax` | `components/sections/HeroParallax.tsx` | Hero mit Parallax-Scroll-Effekt |
| `Testimonials` | `components/sections/Testimonials.tsx` | Gästebewertungen |

#### HeroParallax Features

```typescript
// Verwendung
<HeroParallax
    backgroundImage="/images/hero.png"
    altText="Beschreibung"
    headline="Überschrift"
    subheadline="Unterüberschrift"
    primaryCta="Button Text"
    primaryCtaHref="/buchen"
    secondaryCta="Zweiter Button"
    secondaryCtaHref="/galerie"
/>
```

**Features:**
- **Parallax-Effekt**: Bild wandert langsamer (30%) als Text (15%)
- **Fade-out**: Content verschwindet beim Scrollen
- **LCP-optimiert**: `priority={true}`, `quality={90}`
- **Animierter Scroll-Indicator**: Bounce-Animation

### 11.5 Helper-Funktionen (`lib/utils.ts`)

```typescript
// Klassen-Merge für Tailwind
import { cn } from "@/lib/utils";
cn("base-class", condition && "conditional-class", "always-class")
```

---

## 12. Konfiguration & Deployment

### 12.1 Umgebungsvariablen (`.env`)

```bash
# Basis-URL der Seite (für SEO/OpenGraph/Sitemap)
NEXT_PUBLIC_SITE_URL=https://www.ferienwohnung-eggers.de

# Channel Manager API (optional, für Produktion)
CHANNEL_MANAGER_API_URL=https://api.your-channel-manager.com/v1
CHANNEL_MANAGER_API_KEY=your-api-key-here
OTA_BOOKING_ID=your-booking-com-property-id

# Kontakt-Email für Anfragen
CONTACT_EMAIL=info@ferienwohnung-eggers.de
```

### 12.2 Produktions-Checkliste

Vor dem Go-Live müssen folgende Schritte durchgeführt werden:

| Aufgabe | Priorität | Status |
|---------|-----------|--------|
| **Datenbank anbinden** | Kritisch | ⬜ |
| Ersetzen Sie `lib/booking-store.ts` durch eine echte Datenbankanbindung (z.B. Prisma mit PostgreSQL) | | |
| **Rechtstexte prüfen** | Kritisch | ⬜ |
| Impressum, Datenschutz und AGB rechtlich prüfen lassen | | |
| **Echte Bilder** | Hoch | ⬜ |
| Platzhalterbilder in `public/images/` durch echte Fotos ersetzen | | |
| **Email-Versand** | Hoch | ⬜ |
| E-Mail-Versand in `app/api/bookings/route.ts` implementieren (z.B. Resend, SendGrid) | | |
| **Channel Manager** | Mittel | ⬜ |
| Mock-Implementierung durch echte API ersetzen | | |
| **Kontaktdaten** | Hoch | ⬜ |
| Telefonnummer und E-Mail in `lib/content.ts` anpassen | | |
| **Analytics** | Optional | ⬜ |
| Datenschutzkonforme Analytics einbinden | | |

### 12.3 Build & Deployment

```bash
# Development
npm run dev

# Production Build
npm run build

# Production Server
npm start

# Linting
npm run lint
```

---

## 13. Entwickler-Workflow

### 13.1 Neue Seite erstellen

1. **Ordner anlegen**: `app/[locale]/neue-seite/page.tsx`
2. **Routing konfigurieren**: Pfad in `i18n/routing.ts` hinzufügen
3. **Übersetzungen**: Texte in `messages/de.json` und `messages/en.json`
4. **Navigation**: Optional in `components/navigation.tsx` verlinken
5. **Sitemap**: Automatisch durch `app/sitemap.ts` indiziert

### 13.2 Neue Komponente erstellen

```typescript
// components/my-component.tsx
'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface MyComponentProps {
    className?: string;
}

export function MyComponent({ className }: MyComponentProps) {
    const t = useTranslations('MyComponent');
    
    return (
        <div className={cn("base-styles", className)}>
            {t('title')}
        </div>
    );
}
```

### 13.3 Preise anpassen

Ändern Sie die Werte in `lib/content.ts`:

```typescript
booking: {
    prices: {
        basePricePerNight: 95,  // Neuer Preis
        // ...
    }
}
```

### 13.4 Übersetzung hinzufügen

1. **Schlüssel definieren** in `messages/de.json`:
   ```json
   { "NewSection": { "title": "Neuer Titel" } }
   ```

2. **Englische Version** in `messages/en.json`:
   ```json
   { "NewSection": { "title": "New Title" } }
   ```

3. **In Komponente verwenden**:
   ```typescript
   const t = useTranslations('NewSection');
   return <h1>{t('title')}</h1>;
   ```

### 13.5 Debugging

```bash
# TypeScript Fehler prüfen
npx tsc --noEmit

# Linting
npm run lint

# Build-Fehler identifizieren
npm run build
```

---

## Changelog

| Datum | Version | Änderungen |
|-------|---------|------------|
| 30.11.2025 | 2.1 | Design-Verfeinerung: Glass-Panel, Noise-Textur, Gold-Hover, HeroParallax, 4-Step Wizard, LocalStorage Persistenz |
| 30.11.2025 | 2.0 | Umfassende Dokumentationserweiterung: i18n, SEO, API, Komponenten |
| 29.11.2025 | 1.0 | Initiale Dokumentation |

---

*Dokumentation erstellt für Ferienwohnung Eggers - Next.js 14, React 18, TypeScript, Tailwind CSS, next-intl*

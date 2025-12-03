# Technische Dokumentation

> Umfassende Entwickler-Dokumentation für den Webauftritt **Ferienwohnung Eggers**

---

## Inhaltsverzeichnis

1. [Projektübersicht](#1-projektübersicht)
2. [Tech-Stack](#2-tech-stack)
3. [Architektur](#3-architektur)
4. [Admin-Dashboard](#4-admin-dashboard)
5. [Internationalisierung](#5-internationalisierung)
6. [Buchungssystem](#6-buchungssystem)
7. [Design-System](#7-design-system)
8. [API-Referenz](#8-api-referenz)
9. [Komponenten](#9-komponenten)
10. [SEO & Performance](#10-seo--performance)
11. [Deployment](#11-deployment)
12. [Entwickler-Guide](#12-entwickler-guide)

---

## 1. Projektübersicht

Multi-Page Webauftritt für eine Ferienwohnung in Cuxhaven Sahlenburg mit integriertem Buchungssystem.

### Kernfunktionen

- ✅ Mehrsprachigkeit (DE/EN) mit lokalisierten URLs
- ✅ Buchungssystem mit Kalender und Preisberechnung
- ✅ **Admin-Dashboard** für Content-Verwaltung
- ✅ Channel Manager Schnittstelle (vorbereitet)
- ✅ "Quiet Luxury" Design mit Dark Mode
- ✅ SEO-optimiert mit JSON-LD Schema
- ✅ Barrierefreiheit (WCAG 2.1 AA)
- ✅ DSGVO-konforme Architektur

---

## 2. Tech-Stack

### Core

| Paket | Version | Zweck |
|-------|---------|-------|
| Next.js | 14.x | App Router, Server Components |
| React | 18.x | UI-Library |
| TypeScript | 5.x | Typensicherheit |
| next-intl | 4.x | Internationalisierung |

### Styling & UI

| Paket | Zweck |
|-------|-------|
| Tailwind CSS | Utility-first Styling |
| Framer Motion | Animationen |
| Lucide React | Icons |
| clsx + tailwind-merge | Dynamische Klassen |
| jose | JWT-Authentifizierung |

### Utilities

| Paket | Zweck |
|-------|-------|
| date-fns | Datumsformatierung |
| ESLint | Code-Qualität |

---

## 3. Architektur

### Verzeichnisstruktur

```
app/
├── [locale]/                 # Dynamisches Locale-Segment
│   ├── layout.tsx            # Root-Layout mit Providers
│   ├── page.tsx              # Startseite
│   ├── ausstattung/          # → /ausstattung | /en/amenities
│   ├── galerie/              # → /galerie | /en/gallery
│   ├── lage/                 # → /lage | /en/location
│   ├── preise/               # → /preise | /en/prices
│   ├── buchen/               # → /buchen | /en/booking
│   ├── ueber-uns/            # → /ueber-uns | /en/about
│   ├── kontakt/              # → /kontakt | /en/contact
│   ├── impressum/            # Rechtliche Seiten
│   ├── datenschutz/
│   └── agb/
├── admin/                    # Admin-Dashboard
│   ├── layout.tsx            # Admin-Layout mit Auth
│   ├── page.tsx              # Dashboard-Übersicht
│   ├── buchungen/            # Buchungsverwaltung
│   ├── preise/               # Preise-Editor
│   ├── bewertungen/          # Testimonials
│   ├── galerie/              # Galerie-Verwaltung
│   ├── einstellungen/        # Kontakt, Inhalte, Design
│   └── login/                # Login-Seite
├── api/
│   ├── bookings/             # Buchungs-API
│   ├── channel-manager/      # Verfügbarkeits-API
│   └── admin/                # Admin-APIs
│       ├── auth/             # Login/Logout
│       ├── content/          # Content CRUD
│       └── bookings/         # Buchungsverwaltung
├── globals.css               # Globale Styles
├── robots.ts                 # robots.txt Generator
└── sitemap.ts                # Sitemap Generator

components/
├── booking/
│   ├── booking-wizard.tsx    # 4-Schritte Buchungsassistent
│   └── price-summary.tsx     # Preisübersicht
├── sections/
│   ├── HeroParallax.tsx      # Hero mit Parallax-Effekt
│   └── Testimonials.tsx      # Gästebewertungen
├── ui/
│   ├── animated-section.tsx  # Scroll-Animationen
│   └── hover-card.tsx        # Hover-Effekt Karten
├── booking-calendar.tsx      # Kalender-Komponente
├── booking-form.tsx          # Buchungsformular
├── navigation.tsx            # Header-Navigation
├── footer.tsx                # Footer
├── language-switcher.tsx     # DE/EN Toggle
├── dark-mode-provider.tsx    # Theme-Provider
└── cookie-banner.tsx         # DSGVO Cookie-Banner

i18n/
├── routing.ts                # Lokalisierte Pfade
└── request.ts                # Server-side Locale Detection

lib/
├── booking-store.ts          # Server-Store (In-Memory)
├── booking-client-store.ts   # Client-Store (LocalStorage)
├── channel-manager.ts        # Channel Manager Interface
├── content.ts                # Zentrale Konfiguration (statisch)
├── content-store.ts          # JSON-Datenverwaltung (Admin)
├── auth.ts                   # Admin-Authentifizierung (JWT)
├── metadata.ts               # SEO & JSON-LD
├── pricing.ts                # Preisberechnung
└── utils.ts                  # Helpers

data/
└── content.json              # Bearbeitbare Inhalte (via Dashboard)

messages/
├── de.json                   # Deutsche Texte
└── en.json                   # Englische Texte
```

---

## 4. Admin-Dashboard

Das integrierte Admin-Dashboard ermöglicht die Verwaltung aller Website-Inhalte ohne Code-Änderungen.

### Zugang

| | |
|---|---|
| **URL** | `http://localhost:3000/admin` |
| **Standard-Passwort** | `admin2024` |

### Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN FRONTEND                          │
│  Dashboard  │  Buchungen  │  Preise  │  Bewertungen  │ ... │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                              │
│   /api/admin/auth    /api/admin/content   /api/admin/...   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATA LAYER                                │
│   lib/auth.ts (JWT)   │   lib/content-store.ts (JSON)      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   data/content.json                         │
│   Alle bearbeitbaren Inhalte der Website                    │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard-Bereiche

| Bereich | Pfad | Beschreibung |
|---------|------|--------------|
| Übersicht | `/admin` | Live-Statistiken, offene Anfragen |
| Buchungen | `/admin/buchungen` | Anfragen bestätigen/ablehnen |
| Preise | `/admin/preise` | Basis-, Saison-, Zusatzpreise |
| Bewertungen | `/admin/bewertungen` | Testimonials CRUD |
| Galerie | `/admin/galerie` | Kategorien und Bilder |
| Einstellungen | `/admin/einstellungen` | Kontakt, Inhalte, Design |

### Authentifizierung

JWT-basiert über `lib/auth.ts`:

```typescript
// Umgebungsvariablen
ADMIN_PASSWORD=admin2024           # Login-Passwort
ADMIN_SECRET=your-secret-key       # JWT-Signierung

// Session-Cookie
Name: admin-session
Max-Age: 24h
HttpOnly: true
```

### Content-Verwaltung

Alle bearbeitbaren Inhalte werden in `data/content.json` gespeichert:

```json
{
  "general": { ... },      // Kontaktdaten, Markenname
  "pages": {
    "home": { ... },       // Hero, Intro, Features, Testimonials
    "gallery": { ... }     // Galerie-Kategorien
  },
  "booking": {
    "prices": { ... },     // Preise
    "seasonal": { ... }    // Saisonzeiten
  },
  "theme": {
    "colors": {
      "light": { ... },    // Light Mode Farben
      "dark": { ... }      // Dark Mode Farben
    }
  }
}
```

### Design-Editor

Unter **Einstellungen → Design & Farben** können angepasst werden:

- **Hauptfarben**: Hintergrund, Text, Primär, Sekundär, Akzent
- **Erweiterte Farben**: Karten, Fehler, Oberflächen, Gradienten
- **Design-Parameter**: Border-Radius
- **Modi**: Separate Einstellungen für Light/Dark Mode

---

## 5. Internationalisierung

### Konfiguration

**`i18n/routing.ts`** — Lokalisierte Pfade:

```typescript
export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
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
    // ...
  },
});
```

**`middleware.ts`** — Routing-Middleware:

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/([\\w-]+)?/users/(.+)'],
};
```

### Verwendung

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
<Link href="/ausstattung">...</Link> // → /ausstattung oder /en/amenities
```

### Übersetzungsstruktur

```json
{
  "Navigation": {
    "home": "Start",
    "amenities": "Ausstattung"
  },
  "Hero": {
    "headline": "Ruhe. Natur. Nordsee.",
    "subheadline": "Ihr privater Rückzugsort..."
  },
  "Booking": {
    "calendar": { "title": "Verfügbarkeit prüfen" }
  }
}
```

---

## 6. Buchungssystem

### Architektur

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                             │
│  booking-calendar  →  booking-wizard  →  price-summary  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      API LAYER                           │
│   POST /api/bookings     GET /api/channel-manager        │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC                         │
│   booking-store  │  pricing.ts  │  channel-manager       │
└─────────────────────────────────────────────────────────┘
```

### Preiskonfiguration

Alle Preise in `lib/content.ts`:

```typescript
booking: {
  prices: {
    basePricePerNight: 85,         // Basispreis pro Nacht
    cleaningFee: 85,               // Endreinigung
    dogFee: 25,                    // Hundepauschale
    cityTaxPerAdultPerNight: 4.10, // Kurtaxe pro Erwachsenem
    minimumStay: 3                 // Mindestaufenthalt
  },
  seasonal: {
    high: {
      start: "06-15",
      end: "09-15",
      multiplier: 1.3              // +30% Hauptsaison
    },
    low: {
      start: "11-01",
      end: "02-28",
      multiplier: 0.85             // -15% Nebensaison
    }
  }
}
```

### Preisberechnung

```typescript
import { calculateBookingPrice } from '@/lib/pricing';

const breakdown = calculateBookingPrice({
  checkIn: new Date('2025-07-15'),
  checkOut: new Date('2025-07-20'),
  adults: 2,
  children: 1,
  hasDog: true
});

// Ergebnis:
// 5 Nächte × €110.50 (Hochsaison)
// + €85 Reinigung
// + €25 Hund
// + €41 Kurtaxe
// = Gesamtpreis
```

### Client-Store (LocalStorage)

```typescript
import { useBookingDraft, useSubmittedBookings } from '@/lib/booking-client-store';

// Buchungsentwurf (überlebt Page Reload)
const { draft, updateDraft, clearDraft, isHydrated } = useBookingDraft();

// Abgeschlossene Anfragen
const { bookings, addSubmittedBooking } = useSubmittedBookings();
```

### Server-Store

```typescript
import { BookingStore } from '@/lib/booking-store';

// Neue Anfrage erstellen
BookingStore.createBookingRequest(data);

// Alle Anfragen abrufen
BookingStore.getAllBookingRequests();

// Konfliktprüfung
BookingStore.hasConflict(checkIn, checkOut);
```

> ⚠️ **Produktion:** Der In-Memory Store muss durch eine echte Datenbank ersetzt werden.

---

## 7. Design-System

### Konzept: "Quiet Luxury"

- Gedämpfte, natürliche Farbpalette
- Großzügige Weißräume
- Subtile Noise-Texturen
- Elegante Animationen
- Glass-Effekte mit Backdrop-Blur

### Farbpalette

```typescript
// tailwind.config.ts
colors: {
  luxury: {
    sand: {
      DEFAULT: "#c4ad86",
      50: "#fdfcfb",     // Light Mode Hintergrund
      // ... 100-900
    },
    navy: {
      DEFAULT: "#334e68",
      900: "#102a43",    // Dark Mode Hintergrund
      950: "#0a1929",
    },
    gold: {
      DEFAULT: "#f59e0b",
      400: "#fbbf24",    // Highlights, CTAs
    },
  },
}
```

### CSS Variables

```css
:root {
  --background: 38 25% 98%;       /* Sand */
  --foreground: 216 42% 13%;      /* Navy */
  --primary: 216 42% 13%;
}

.dark {
  --background: 219 50% 8%;       /* Navy */
  --foreground: 35 16% 93%;       /* Sand */
}
```

### Utility-Klassen

```css
/* Glass-Effekt */
.glass-panel {
  @apply bg-luxury-sand-50/80 dark:bg-luxury-navy-900/80 
         backdrop-blur-md 
         border border-white/20 dark:border-white/10
         shadow-xl rounded-xl;
}

/* Noise-Textur */
.texture-noise { /* SVG-basierte Papier-Textur */ }

/* Kombiniert */
.bg-textured-sand { @apply bg-luxury-sand-50 texture-noise; }
.bg-textured-navy { @apply bg-luxury-navy-900 texture-noise; }
```

### Typografie

```typescript
fontFamily: {
  sans: ["var(--font-inter)", "system-ui", "sans-serif"],
  serif: ["var(--font-playfair)", "Georgia", "serif"],
}
```

| Klasse | Font | Verwendung |
|--------|------|------------|
| `font-serif` | Playfair Display | Überschriften |
| `font-sans` | Inter | Fließtext |

### Animationen

```typescript
animation: {
  "fade-in": "fadeIn 0.6s ease-in-out",
  "slide-up": "slideUp 0.7s ease-out",
  "slow-zoom": "slowZoom 20s linear infinite",
}
```

---

## 8. API-Referenz

### POST `/api/bookings`

Neue Buchungsanfrage erstellen.

**Request:**

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
  "message": "Besondere Wünsche",
  "dogsIncluded": true
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Buchungsanfrage erfolgreich gesendet",
  "bookingId": "req-1701234567890-abc123"
}
```

**Fehler:**

| Code | Bedeutung |
|------|-----------|
| 400 | Fehlende Pflichtfelder |
| 409 | Zeitraum bereits gebucht |
| 500 | Server-Fehler |

### GET `/api/bookings`

Alle Buchungsanfragen abrufen.

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "req-...",
      "checkIn": "2025-07-15T00:00:00.000Z",
      "checkOut": "2025-07-20T00:00:00.000Z",
      "status": "pending"
    }
  ]
}
```

### GET `/api/channel-manager`

Verfügbarkeitsdaten abrufen.

**Query-Parameter:**

| Parameter | Typ | Beschreibung |
|-----------|-----|--------------|
| `startDate` | string | Start (YYYY-MM-DD) |
| `endDate` | string | Ende (YYYY-MM-DD) |

### Admin-APIs

#### POST `/api/admin/auth`

Login mit Passwort.

**Request:**
```json
{ "password": "admin2024" }
```

**Response (200):**
```json
{ "success": true, "message": "Erfolgreich angemeldet" }
```

#### GET `/api/admin/content`

Content abrufen (optional mit `section` Parameter).

**Query-Parameter:**

| Parameter | Beschreibung |
|-----------|--------------|
| `section` | Pfad zum Abschnitt, z.B. `booking.prices` |

#### PUT `/api/admin/content`

Content aktualisieren.

**Request:**
```json
{
  "section": "booking",
  "data": { "prices": { ... } }
}
```

---

## 9. Komponenten

### Layout-Komponenten

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| Navigation | `navigation.tsx` | Responsive Header mit Scroll-Effekt |
| Footer | `footer.tsx` | Footer mit Links |
| DarkModeProvider | `dark-mode-provider.tsx` | Theme-Context |
| CookieBanner | `cookie-banner.tsx` | DSGVO-Banner |
| LanguageSwitcher | `language-switcher.tsx` | DE/EN Toggle |

### Buchungs-Komponenten

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| BookingWizard | `booking/booking-wizard.tsx` | 4-Schritte Assistent |
| PriceSummary | `booking/price-summary.tsx` | Preisübersicht |
| BookingCalendar | `booking-calendar.tsx` | Kalender |
| BookingForm | `booking-form.tsx` | Formular |

### Section-Komponenten

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| HeroParallax | `sections/HeroParallax.tsx` | Parallax-Hero |
| Testimonials | `sections/Testimonials.tsx` | Bewertungen |

### UI-Komponenten

| Komponente | Datei | Beschreibung |
|------------|-------|--------------|
| Button | `button.tsx` | CTA-Button |
| Card | `card.tsx` | Content-Card |
| AnimatedSection | `ui/animated-section.tsx` | Scroll-Animation |
| HoverCard | `ui/hover-card.tsx` | Hover-Effekt |

### HeroParallax

```tsx
<HeroParallax
  backgroundImage="/images/hero.png"
  altText="Beschreibung"
  headline="Überschrift"
  subheadline="Unterüberschrift"
  primaryCta="Button"
  primaryCtaHref="/buchen"
/>
```

**Features:**
- Parallax-Effekt (Bild 30%, Text 15%)
- Fade-out beim Scrollen
- LCP-optimiert (`priority={true}`)
- Animierter Scroll-Indicator

---

## 10. SEO & Performance

### Sitemap

Automatische Generierung in `app/sitemap.ts`:

```typescript
const pages = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/buchen', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/ausstattung', priority: 0.8, changeFrequency: 'monthly' },
];
```

### robots.txt

Dynamisch generiert in `app/robots.ts`:

```typescript
rules: [
  { userAgent: '*', allow: '/', disallow: ['/api/'] },
],
sitemap: `${siteUrl}/sitemap.xml`,
```

### JSON-LD Schema

VacationRental Schema in `lib/metadata.ts`:

```typescript
{
  "@context": "https://schema.org",
  "@type": "VacationRental",
  "name": "Ferienwohnung Eggers",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nordheimstraße 150",
    "addressLocality": "Cuxhaven Sahlenburg",
    "postalCode": "27476",
    "addressCountry": "Deutschland"
  },
  "numberOfRooms": 3,
  "petsAllowed": true,
  "amenityFeature": [...]
}
```

### Performance-Optimierung

- [x] Next.js Image Optimization
- [x] Server Components wo möglich
- [ ] WebP-Bilder verwenden
- [ ] Lighthouse-Audit durchführen

---

## 11. Deployment

### Umgebungsvariablen

```env
# Pflicht
NEXT_PUBLIC_SITE_URL=https://www.ferienwohnung-eggers.de
CONTACT_EMAIL=info@ferienwohnung-eggers.de

# Admin-Dashboard
ADMIN_PASSWORD=sicheres-passwort-hier
ADMIN_SECRET=langer-zufaelliger-string-fuer-jwt

# Optional (Produktion)
CHANNEL_MANAGER_API_URL=https://api.channel-manager.com/v1
CHANNEL_MANAGER_API_KEY=your-api-key
OTA_BOOKING_ID=your-property-id
```

### Build-Befehle

```bash
npm run build   # Production Build
npm start       # Production Server
```

### Produktions-Checkliste

| Aufgabe | Priorität |
|---------|-----------|
| Admin-Passwort ändern | 🔴 Kritisch |
| Datenbank anbinden | 🔴 Kritisch |
| Rechtstexte prüfen lassen | 🔴 Kritisch |
| Echte Bilder hochladen | 🟡 Hoch |
| E-Mail-Versand implementieren | 🟡 Hoch |
| Kontaktdaten im Admin aktualisieren | 🟡 Hoch |
| Channel Manager integrieren | 🟢 Mittel |
| Analytics einrichten | ⚪ Optional |

---

## 12. Entwickler-Guide

### Neue Seite erstellen

1. Ordner anlegen: `app/[locale]/neue-seite/page.tsx`
2. Pfad in `i18n/routing.ts` hinzufügen
3. Texte in `messages/de.json` und `messages/en.json`
4. Optional: In Navigation verlinken

### Neue Komponente

```tsx
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

### Übersetzung hinzufügen

1. Schlüssel in `messages/de.json`:
   ```json
   { "NewSection": { "title": "Neuer Titel" } }
   ```

2. Englisch in `messages/en.json`:
   ```json
   { "NewSection": { "title": "New Title" } }
   ```

3. Verwenden:
   ```tsx
   const t = useTranslations('NewSection');
   return <h1>{t('title')}</h1>;
   ```

### Debugging

```bash
npx tsc --noEmit    # TypeScript prüfen
npm run lint        # ESLint
npm run build       # Build-Fehler finden
```

---

## Changelog

| Version | Datum | Änderungen |
|---------|-------|------------|
| 3.0 | 02.12.2025 | **Admin-Dashboard**: Buchungen, Preise, Bewertungen, Galerie, Design-Editor |
| 2.1 | 30.11.2025 | Glass-Panel, Noise-Textur, BookingWizard, LocalStorage |
| 2.0 | 30.11.2025 | Dokumentation erweitert |
| 1.0 | 29.11.2025 | Initial Release |

---

<p align="center">
  <sub>Ferienwohnung Eggers • Next.js 14 • React 18 • TypeScript • Tailwind CSS</sub>
</p>

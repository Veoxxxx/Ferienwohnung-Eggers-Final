# Ferienwohnung Eggers - High-End Webauftritt

Moderner, produktionsreifer Multi-Page Webauftritt für die Ferienwohnung Eggers in Cuxhaven Sahlenburg mit eigenem Buchungssystem, Channel Manager Vorbereitung und "Quiet Luxury" Design.

## Features

### Core
- ✅ **Next.js 14** mit App Router und TypeScript
- ✅ **Vollständige Mehrsprachigkeit** (DE/EN) mit next-intl
- ✅ **10+ Seiten** mit SEO-Optimierung und lokalisierten URLs
- ✅ **JSON-LD Schema** für VacationRental

### Buchungssystem
- ✅ **Interaktiver Kalender** mit Verfügbarkeitsanzeige
- ✅ **4-Schritte Buchungsassistent** mit visuellen Icons und Gold-Akzenten
- ✅ **LocalStorage Persistenz** für Formulardaten (überlebt Page Reload)
- ✅ **Saisonale Preisberechnung** mit Kurtaxe
- ✅ **Channel Manager Integration** (vorbereitet für Booking.com, Airbnb)

### Design & UX
- ✅ **"Quiet Luxury" Design** mit Tailwind CSS
- ✅ **Glass-Panel Effekte** mit Backdrop-Blur
- ✅ **Subtile Noise-Texturen** für Papier/Stoff-Feeling
- ✅ **Parallax Hero-Sektion** mit Framer Motion
- ✅ **Gold-Akzente** für Hover-Effekte und aktive Elemente
- ✅ **Dark Mode** mit Systempräferenz-Erkennung
- ✅ **Responsive Design** für alle Geräte
- ✅ **Framer Motion** Animationen

### Technisch
- ✅ **Barrierefreiheit** (WCAG 2.1 AA konform)
- ✅ **DSGVO-bewusste Architektur**
- ✅ **TypeScript-strict** im gesamten Projekt

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Production Server starten
npm start
```

Die Anwendung läuft standardmäßig auf **<http://localhost:3000>**

## Seitenstruktur

| Deutsch | Englisch | Beschreibung |
|---------|----------|--------------|
| `/` | `/en` | Startseite mit Parallax-Hero |
| `/ausstattung` | `/en/amenities` | Detaillierte Ausstattung |
| `/galerie` | `/en/gallery` | Bildergalerie |
| `/lage` | `/en/location` | Lage & Anreise |
| `/preise` | `/en/prices` | Preisübersicht |
| `/ueber-uns` | `/en/about` | Über die Gastgeber |
| `/kontakt` | `/en/contact` | Kontaktformular |
| `/buchen` | `/en/booking` | Buchungsassistent |
| `/impressum` | `/en/imprint` | Impressum (Mustertext) |
| `/datenschutz` | `/en/privacy` | Datenschutz (Mustertext) |
| `/agb` | `/en/terms` | AGB (Mustertext) |

## Umgebungsvariablen

Kopieren Sie `.env.example` nach `.env` und passen Sie die Werte an:

```bash
# Channel Manager API Konfiguration
CHANNEL_MANAGER_API_URL=https://api.your-channel-manager.com/v1
CHANNEL_MANAGER_API_KEY=your-api-key-here
OTA_BOOKING_ID=your-booking-com-property-id

# Kontakt E-Mail
CONTACT_EMAIL=info@ferienwohnung-eggers.de

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.ferienwohnung-eggers.de
```

## Bilder ersetzen

Aktuell sind 2 generierte Platzhalterbilder vorhanden:

- `/public/images/hero-living-room.jpg`
- `/public/images/kitchen-dining.jpg`

**Ersetzen Sie diese durch echte Fotos der Ferienwohnung:**

Empfohlene zusätzliche Bilder:

- `bedroom-main.jpg` - Hauptschlafzimmer
- `bedroom-second.jpg` - Zweites Schlafzimmer
- `bathroom-modern.jpg` - Badezimmer
- `terrace-outdoor.jpg` - Terrasse
- `building-exterior.jpg` - Gebäudeaußenansicht
- `wadden-sea-beach.jpg` - Wattenmeer/Strand
- `sahlenburg-nature.jpg` - Umgebung

Aktualisieren Sie nach dem Hinzufügen neuer Bilder die Bildergalerie in `/app/galerie/page.tsx`.

## Channel Manager Integration

Die Channel Manager Integration ist vorbereitet mit:

- Abstraktionsschicht in `/lib/channel-manager.ts`
- Mock-Daten für Verfügbarkeiten
- API Route `/api/channel-manager/route.ts`

**Für Produktion:**

1. Fügen Sie echte API-Credentials in `.env` hinzu
2. Ersetzen Sie die Mock-Implementierung in `lib/channel-manager.ts`
3. Testen Sie die Integration gründlich

## Buchungssystem

Das Buchungssystem nutzt:

- In-Memory Store (`lib/booking-store.ts`) - **Muss ersetzt werden!**
- API Route `/api/bookings/route.ts`
- Interaktiver Kalender mit Verfügbarkeitsanzeige
- 3-Tage Mindestaufenthalt Validierung
- Kurtaxe-Berechnung

**Für Produktion:**

- Ersetzen Sie den In-Memory Store durch eine echte Datenbank (PostgreSQL, MongoDB, etc.)
- Implementieren Sie E-Mail-Benachrichtigungen
- Fügen Sie Zahlungsintegration hinzu (optional)

## Rechtliche Texte

**WICHTIG:** Die Seiten Impressum, Datenschutz und AGB enthalten nur Mustertexte!

Vor dem Produktivbetrieb MÜSSEN diese durch einen Rechtsanwalt oder Datenschutzexperten geprüft und angepasst werden.

## Design-System

### Farben

- **Navy** (`luxury-navy-*`): Hauptfarbe für Text und Hintergründe
- **Sand** (`luxury-sand-*`): Warme Akzente und Light-Mode Hintergrund
- **Gold** (`luxury-gold-*`): Highlights, CTAs und Hover-Effekte

### Schriften

- **Playfair Display**: Überschriften (serif, `tracking-wide`)
- **Inter**: Fließtext (sans-serif)

### Utility-Klassen

```css
.glass-panel    /* Frosted-Glass-Effekt mit Blur */
.texture-noise  /* Subtile Papier/Stoff-Textur */
.bg-textured-sand  /* Sand-Hintergrund mit Textur */
.bg-textured-navy  /* Navy-Hintergrund mit Textur */
```

### Dark Mode

Der Dark Mode wird automatisch basierend auf der Systempräferenz aktiviert und kann vom Nutzer umgeschaltet werden. Die Einstellung wird im localStorage gespeichert.

## Performance-Optimierung

Empfohlene Schritte vor Produktivstart:

1. Bilder optimieren (WebP-Format, responsive Größen)
2. Lighthouse-Audit durchführen
3. Lazy Loading für Bilder prüfen
4. Bundle-Größe analysieren mit `npm run build`

## SEO

Jede Seite hat:

- Individuelle Title und Meta Description
- OpenGraph Metadaten
- Strukturierte Daten (JSON-LD)
- Semantisches HTML

## Barrierefreiheit

- Tastaturnavigation vollständig unterstützt
- Ausreichende Farbkontraste (WCAG AA)
- Semantisches HTML mit ARIA-Labels
- Screen Reader getestet
- Fokus-Indikatoren sichtbar

## Projektstruktur

```
├── app/                        # Next.js App Router
│   ├── [locale]/              # Dynamisches Locale-Segment (DE/EN)
│   │   ├── layout.tsx         # Root Layout mit Providers
│   │   ├── page.tsx           # Homepage mit HeroParallax
│   │   ├── ausstattung/       # Ausstattungsseite
│   │   ├── buchen/            # Buchungsseite
│   │   └── ...                # Weitere Seiten
│   ├── api/                   # API Routes
│   │   ├── bookings/          # Buchungs-API
│   │   └── channel-manager/   # Channel Manager API
│   └── globals.css            # Globale Styles + Utility-Klassen
├── components/
│   ├── booking/               # Buchungs-Komponenten
│   │   ├── booking-wizard.tsx # 4-Schritte Assistent
│   │   └── price-summary.tsx  # Preisübersicht
│   ├── sections/              # Seitenabschnitte
│   │   ├── HeroParallax.tsx   # Hero mit Parallax-Effekt
│   │   └── Testimonials.tsx   # Gästebewertungen
│   ├── ui/                    # UI-Komponenten
│   ├── navigation.tsx         # Header mit Gold-Hover
│   ├── language-switcher.tsx  # DE|EN Umschalter
│   └── ...                    # Weitere Komponenten
├── i18n/                      # Internationalisierung
│   ├── routing.ts             # Lokalisierte Pfade
│   └── request.ts             # Locale Detection
├── lib/
│   ├── booking-store.ts       # Server-Store (In-Memory)
│   ├── booking-client-store.ts # Client-Store (LocalStorage)
│   ├── pricing.ts             # Preisberechnung
│   └── ...                    # Weitere Utilities
├── messages/                  # Übersetzungen
│   ├── de.json                # Deutsche Texte
│   └── en.json                # Englische Texte
├── public/images/             # Statische Bilder
├── tailwind.config.ts         # Design System
└── middleware.ts              # i18n Routing

```

## Kontakt & Support

Bei Fragen zur technischen Umsetzung:

- E-Mail: [Ihre Entwickler-E-Mail]
- Repository: [Falls vorhanden]

## Lizenz

Privates Projekt - Alle Rechte vorbehalten.

---

**Erstellt mit Next.js 14, React 18, TypeScript, Tailwind CSS, next-intl und Framer Motion**

---

*Letzte Aktualisierung: 30.11.2025 - v2.1*

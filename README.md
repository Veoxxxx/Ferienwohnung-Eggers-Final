# Ferienwohnung Eggers - High-End Webauftritt

Moderner, produktionsreifer Multi-Page Webauftritt für die Ferienwohnung Eggers in Cuxhaven Sahlenburg mit eigenem Buchungssystem, Channel Manager Vorbereitung und "Quiet Luxury" Design.

## Features

- ✅ **Next.js 14** mit App Router und TypeScript
- ✅ **10 Seiten** mit vollständigen deutschen Texten und SEO-Optimierung
- ✅ **Buchungssystem** mit interaktivem Kalender und 3-Tage Mindestaufenthalt Validierung
- ✅ **Channel Manager Integration** mit Mock-Daten (bereit für echte API-Anbindung)
- ✅ **"Quiet Luxury" Design** mit Tailwind CSS
- ✅ **Dark Mode** mit lokaler Speicherung
- ✅ **Barrierefreiheit** (WCAG 2.1 AA konform)
- ✅ **DSGVO-bewusste Architektur**
- ✅ **Responsive Design** für alle Geräte
- ✅ **Framer Motion** Animationen
- ✅ **JSON-LD Schema** für VacationRental

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

- **/** - Startseite mit Hero, Highlights und wichtigem Hinweis (keine Waschmaschine)
- **/ausstattung** - Detaillierte Ausstattung nach Räumen
- **/galerie** - Bildergalerie (aktuell mit 2 generierten Bildern)
- **/lage** - Lageninformationen, Entfernungen und Anreise
- **/preise** - Preisübersicht und Konditionen
- **/kontakt** - Kontaktinformationen und Kontaktformular
- **/buchen** - Buchungsseite mit Kalender und Buchungsformular
- **/impressum** - Impressum (Mustertext)
- **/datenschutz** - Datenschutzerklärung (Mustertext)
- **/agb** - AGB (Mustertext)

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

- **Navy**: Hauptfarbe für Text und wichtige Elemente  
- **Sand/Gold**: Akzentfarbe für Buttons und Highlights
- **Slate**: Neutrale Grautöne für Secondary Content

### Schriften

- **Playfair Display**: Überschriften (serif)
- **Inter**: Fließtext (sans-serif)

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
├── app/                    # Next.js App Router Pages
│   ├── api/               # API Routes (Bookings, Channel Manager)
│   ├── [page]/            # Einzelne Seiten
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global Styles
├── components/            # React Components
│   ├── navigation.tsx     # Header Navigation 
│   ├── footer.tsx         # Footer
│   ├── booking-calendar.tsx
│   ├── booking-form.tsx
│   ├── button.tsx
│   ├── card.tsx
│   └── dark-mode-provider.tsx
├── lib/                   # Utilities & Logic
│   ├── channel-manager.ts # Channel Manager Integration
│   ├── booking-store.ts   # Booking Data Store
│   ├── metadata.ts        # SEO Metadata Helpers
│   └── utils.ts           # Helper Functions
├── public/               # Static Assets
│   └── images/           # Images
├── tailwind.config.ts    # Tailwind Configuration
├── next.config.js        # Next.js Configuration
└── package.json          # Dependencies

```

## Kontakt & Support

Bei Fragen zur technischen Umsetzung:

- E-Mail: [Ihre Entwickler-E-Mail]
- Repository: [Falls vorhanden]

## Lizenz

Privates Projekt - Alle Rechte vorbehalten.

---

**Erstellt mit Next.js 14, React 18, TypeScript und Tailwind CSS**

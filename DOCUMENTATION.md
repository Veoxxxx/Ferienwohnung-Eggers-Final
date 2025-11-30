# Ferienwohnung Eggers - Technische Dokumentation

## 1. Projektübersicht

Dieses Projekt ist ein moderner, leistungsfähiger Webauftritt für die "Ferienwohnung Eggers" in Cuxhaven Sahlenburg. Die Anwendung wurde als **Multi-Page Application** mit **Next.js 14 (App Router)** entwickelt und legt besonderen Wert auf Performance, SEO, Barrierefreiheit und ein hochwertiges "Quiet Luxury" Design.

Zentrale Funktionen umfassen ein vollständiges Buchungssystem mit Verfügbarkeitsprüfung, Preisberechnung (inkl. saisonaler Preise und Kurtaxe) sowie eine vorbereitete Channel Manager Integration.

## 2. Technischer Stack

### Core Frameworks
- **Next.js 14**: App Router, Server Components, API Routes
- **React 18**: UI Library
- **TypeScript**: Typensicherheit im gesamten Projekt

### Styling & UI
- **Tailwind CSS**: Utility-first CSS Framework
- **Framer Motion**: Animationen und Transitions
- **Lucide React**: Icon Set
- **CLSX / Tailwind Merge**: Dynamisches Klassen-Handling

### Utilities
- **date-fns**: Datumsmanipulation
- **ESLint / Prettier**: Code Quality Tools

## 3. Architektur & Projektstruktur

Die Struktur folgt den Best Practices des Next.js App Routers.

```
/
├── app/                    # App Router Pages & API
│   ├── api/               # Server-side API Endpoints
│   │   ├── bookings/      # POST: Buchung anlegen, GET: Buchungen abrufen
│   │   └── channel-manager/ # Sync Endpoints
│   ├── [page]/            # Route Segmente (z.B. /buchen, /lage)
│   ├── layout.tsx         # Root Layout (HTML, Body, Header, Footer)
│   ├── page.tsx           # Homepage
│   └── globals.css        # Globale Styles & Tailwind Directives
├── components/            # React Komponenten
│   ├── booking/           # Buchungsspezifische Komponenten (Wizard, Kalender)
│   ├── ui/                # Wiederverwendbare UI-Elemente (Button, Card)
│   └── ...                # Layout Komponenten (Footer, Navigation)
├── lib/                   # Business Logic & Utilities
│   ├── booking-store.ts   # State Management (aktuell In-Memory Mock)
│   ├── channel-manager.ts # Channel Manager Interface & Mock
│   ├── content.ts         # Zentrale Konfiguration (Inhalte, Preise, Saisons)
│   ├── pricing.ts         # Preisberechnungslogik
│   └── utils.ts           # Allgemeine Helper
├── public/                # Statische Assets (Bilder)
└── tailwind.config.ts     # Design System Konfiguration
```

## 4. Kernfunktionen & Implementierung

### 4.1 Buchungssystem

Das Buchungssystem ist modular aufgebaut und trennt UI, Logik und Datenspeicherung.

- **Frontend (`components/booking-form.tsx` & `components/booking/price-summary.tsx`)**:
  - Modernes, übersichtliches UI im "Quiet Luxury" Design.
  - Dunkle Farbpalette (`luxury-navy`) für wichtige Informationsblöcke zur besseren Lesbarkeit und Wertigkeit.
  - Dynamische Anzeige von Verfügbarkeiten, Preisen und Konditionen.

- **Konfiguration (`lib/content.ts`)**:
  - Zentrale Verwaltung aller Buchungsparameter.
  - **Preise**: Basispreis, Reinigungsgebühr, Hundegebühr, Kurtaxe.
  - **Saisons**: Definition von Haupt- und Nebensaisonzeiten und Preismultiplikatoren.
  - Ermöglicht einfache Anpassungen ohne Code-Änderungen in der Logik.

- **Preislogik (`lib/pricing.ts`)**:
  - Greift auf `lib/content.ts` zurück.
  - Berechnet Endpreise basierend auf Saison, Personenanzahl und Zusatzleistungen.

- **Backend (`app/api/bookings/route.ts`)**:
  - Validiert eingehende Buchungsanfragen erneut serverseitig.
  - Prüft auf Überschneidungen mit bestehenden Buchungen (`BookingStore.hasConflict`).
  - Speichert die Buchung (aktuell im In-Memory Store).

### 4.2 Design System ("Quiet Luxury")

Das Design ist in `tailwind.config.ts` zentral definiert und zielt auf eine hochwertige, beruhigende Ästhetik ab.

- **Farbpalette**:
  - `luxury-navy`: Primärfarbe für Texte, Footer, Navigation und wichtige UI-Elemente (Seriosität, Ruhe). Wird verstärkt auch als Hintergrund für Informationsboxen genutzt (hoher Kontrast zu weißer Schrift).
  - `luxury-sand`: Akzentfarbe und weiche Hintergründe (Wärme, Strand-Bezug).
  - `luxury-gold`: Highlights und Call-to-Actions.
- **Typografie**:
  - Überschriften: `Playfair Display` (Serif, klassisch).
  - Fließtext: `Inter` (Sans-Serif, modern, gut lesbar).
- **UI-Komponenten**:
  - **Buchungskalender**: Modernes Design mit Navy-Blau für Auswahl und hellen Blautönen für Zeiträume.
  - **Informationsboxen**: Transparente Layer auf dunklem Hintergrund (`bg-white/5` auf `bg-luxury-navy-900`) für moderne Eleganz.

## 5. Konfiguration & Deployment

### Umgebungsvariablen (`.env`)

Für den Produktionsbetrieb müssen folgende Variablen gesetzt werden:

```bash
# Basis-URL der Seite (für SEO/OpenGraph)
NEXT_PUBLIC_SITE_URL=https://www.ferienwohnung-eggers.de

# Channel Manager API (optional)
CHANNEL_MANAGER_API_URL=...
CHANNEL_MANAGER_API_KEY=...

# Kontakt-Email für Anfragen
CONTACT_EMAIL=info@ferienwohnung-eggers.de
```

*Hinweis: Preise werden primär über `lib/content.ts` konfiguriert, können aber optional auch über Environment Variables überschrieben werden (siehe `lib/pricing.ts`).*

### Produktions-Checkliste

Vor dem Go-Live müssen folgende Schritte durchgeführt werden:

1.  **Datenbank anbinden**: Ersetzen Sie `lib/booking-store.ts` durch eine echte Datenbankanbindung (z.B. Prisma mit PostgreSQL), da der In-Memory Store Daten bei Neustart verliert.
2.  **Rechtstexte**: Die Dateien in `app/agb`, `app/datenschutz` und `app/impressum` enthalten Platzhalter und müssen rechtlich geprüft werden.
3.  **Bilder**: Ersetzen Sie die generierten Platzhalterbilder in `public/images` durch echte Fotos der Wohnung.
4.  **Email-Versand**: Implementieren Sie den E-Mail-Versand in `app/api/bookings/route.ts` (z.B. mit Resend oder SendGrid).
5.  **SEO**: Überprüfen Sie die `metadata` Export in `app/layout.tsx` und den einzelnen Pages auf Korrektheit der Texte.

## 6. Wartung & Erweiterung

- **Preise & Inhalte ändern**: Passen Sie die Werte zentral in `lib/content.ts` an.
- **Neue Seiten**: Erstellen Sie einen neuen Ordner in `app/` mit einer `page.tsx`.
- **Komponenten**: Nutzen Sie die UI-Komponenten aus `components/ui` für ein konsistentes Design.

---
*Dokumentation aktualisiert am 29.11.2025*

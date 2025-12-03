<p align="center">
  <img src="public/icon.svg" width="80" alt="Ferienwohnung Eggers Logo">
</p>

<h1 align="center">Ferienwohnung Eggers</h1>

<p align="center">
  <strong>Premium-Webauftritt für eine Ferienwohnung an der Nordsee</strong><br>
  Modern • Mehrsprachig • Buchungssystem • Admin-Dashboard
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js 14">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
</p>

---

## ✨ Features

| Kategorie | Highlights |
|-----------|------------|
| **Frontend** | "Quiet Luxury" Design, Glass-Effekte, Parallax-Hero, Dark Mode |
| **Buchung** | 4-Schritte Wizard, Kalender, Saisonpreise, LocalStorage-Persistenz |
| **Admin** | Dashboard, Buchungsverwaltung, Preise, Bewertungen, Galerie, Design |
| **i18n** | Vollständig DE/EN, lokalisierte URLs, SEO-optimiert |
| **Tech** | App Router, Server Components, TypeScript-strict, WCAG 2.1 AA |

---

## 🚀 Schnellstart

```bash
# Repository klonen & installieren
git clone <repo-url>
cd ferienwohnung-eggers
npm install

# Development-Server starten
npm run dev
```

Öffne **http://localhost:3000** im Browser.

---

## 🔐 Admin-Dashboard

Das integrierte Admin-Dashboard ermöglicht die Verwaltung aller Inhalte ohne Code-Änderungen.

**URL:** `http://localhost:3000/admin`  
**Standard-Passwort:** `admin2024`

### Dashboard-Funktionen

| Bereich | Beschreibung |
|---------|--------------|
| **📊 Übersicht** | Live-Statistiken, offene Anfragen, nächste Anreise |
| **📅 Buchungen** | Anfragen bestätigen/ablehnen, Status verwalten |
| **💰 Preise** | Basispreis, Reinigung, Hund, Kurtaxe, Saisonzeiten |
| **⭐ Bewertungen** | Testimonials hinzufügen/bearbeiten |
| **🖼️ Galerie** | Kategorien und Bilder verwalten |
| **⚙️ Einstellungen** | Kontaktdaten, Seiteninhalte, Design & Farben |

### Passwort ändern

Erstellen Sie eine `.env.local` Datei:

```env
ADMIN_PASSWORD=IhrSicheresPasswort
ADMIN_SECRET=EinLangerZufälligerString
```

---

## 📁 Projektstruktur

```
├── app/
│   ├── [locale]/          # Seiten (DE/EN)
│   │   ├── page.tsx       # Startseite
│   │   ├── buchen/        # Buchungssystem
│   │   └── ...            # Weitere Seiten
│   ├── admin/             # Admin-Dashboard
│   │   ├── page.tsx       # Dashboard-Übersicht
│   │   ├── buchungen/     # Buchungsverwaltung
│   │   ├── preise/        # Preise-Editor
│   │   ├── bewertungen/   # Testimonials
│   │   ├── galerie/       # Galerie-Verwaltung
│   │   └── einstellungen/ # Kontakt, Inhalte, Design
│   └── api/               # Backend-Endpoints
│       ├── bookings/      # Buchungs-API
│       └── admin/         # Admin-APIs
│
├── components/            # React-Komponenten
├── data/
│   └── content.json       # Bearbeitbare Inhalte (via Dashboard)
│
├── lib/                   # Business-Logik
│   ├── content.ts         # Zentrale Konfiguration
│   ├── content-store.ts   # JSON-Datenverwaltung
│   ├── auth.ts            # Admin-Authentifizierung
│   ├── pricing.ts         # Preisberechnung
│   └── booking-store.ts   # Datenspeicher
│
├── messages/              # Übersetzungen
│   ├── de.json
│   └── en.json
│
└── public/images/         # Bilder
```

---

## 🌐 Seitenübersicht

| Seite | DE | EN |
|-------|----|----|
| Startseite | `/` | `/en` |
| Ausstattung | `/ausstattung` | `/en/amenities` |
| Galerie | `/galerie` | `/en/gallery` |
| Lage | `/lage` | `/en/location` |
| Preise | `/preise` | `/en/prices` |
| Über uns | `/ueber-uns` | `/en/about` |
| Kontakt | `/kontakt` | `/en/contact` |
| Buchung | `/buchen` | `/en/booking` |
| **Admin** | `/admin` | — |

---

## ⚙️ Konfiguration

### Umgebungsvariablen

Erstelle eine `.env.local`-Datei im Projektroot:

```env
# Website
NEXT_PUBLIC_SITE_URL=https://www.ferienwohnung-eggers.de

# Admin-Dashboard
ADMIN_PASSWORD=admin2024
ADMIN_SECRET=your-secret-key

# Channel Manager (optional)
CHANNEL_MANAGER_API_URL=https://api.channel-manager.com/v1
CHANNEL_MANAGER_API_KEY=your-api-key
```

### Preise anpassen

Preise können über das Admin-Dashboard unter **Preise** oder direkt in `data/content.json` angepasst werden:

```json
{
  "booking": {
    "prices": {
      "basePricePerNight": 85,
      "cleaningFee": 85,
      "dogFee": 25,
      "cityTaxPerAdultPerNight": 4.10,
      "minimumStay": 3
    }
  }
}
```

---

## 📦 Verfügbare Scripts

| Script | Beschreibung |
|--------|--------------|
| `npm run dev` | Development-Server starten |
| `npm run build` | Production-Build erstellen |
| `npm start` | Production-Server starten |
| `npm run lint` | ESLint ausführen |

---

## 🎨 Design-System

### Farbpalette

Farben können über das Admin-Dashboard unter **Einstellungen → Design & Farben** angepasst werden.

| Farbe | Verwendung |
|-------|------------|
| **Navy** `#102a43` | Primärfarbe, Dark Mode Hintergrund |
| **Sand** `#fdfcfb` | Light Mode Hintergrund |
| **Gold** `#f59e0b` | Akzente, CTAs, Hover-Effekte |

### Schriften

- **Playfair Display** — Überschriften (Serif)
- **Inter** — Fließtext (Sans-Serif)

---

## ⚠️ Vor Produktivbetrieb

> **Wichtig:** Diese Punkte müssen vor dem Go-Live erledigt werden!

- [ ] **Admin-Passwort** — Sicheres Passwort in `.env.local` setzen
- [ ] **Datenbank** — In-Memory Store durch echte DB ersetzen
- [ ] **Rechtstexte** — Impressum, Datenschutz, AGB prüfen lassen
- [ ] **Bilder** — Platzhalter durch echte Fotos ersetzen
- [ ] **E-Mail** — Benachrichtigungen implementieren
- [ ] **Kontakt** — Echte Telefonnummer/E-Mail eintragen

---

## 📄 Lizenz

Privates Projekt — Alle Rechte vorbehalten.

---

<p align="center">
  <sub>Entwickelt mit Next.js 14, React 18, TypeScript, Tailwind CSS & Framer Motion</sub>
</p>

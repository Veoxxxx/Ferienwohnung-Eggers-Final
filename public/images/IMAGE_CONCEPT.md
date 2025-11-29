# Bildkonzept Ferienwohnung Eggers

## Verzeichnisstruktur

```
public/images/
├── interior/          # Innenaufnahmen
│   ├── living-room-main.jpg
│   ├── living-room-detail.jpg
│   ├── kitchen-dining.jpg
│   ├── kitchen-equipment.jpg
│   ├── bedroom-1-main.jpg
│   ├── bedroom-2-kids.jpg
│   ├── bathroom-shower.jpg
│   └── entrance-hallway.jpg
├── exterior/          # Außenansichten
│   ├── building-front.jpg
│   ├── terrace-day.jpg
│   ├── terrace-evening.jpg
│   └── parking-area.jpg
├── surroundings/      # Umgebung
│   ├── beach-sunset.jpg
│   ├── wadden-sea-low-tide.jpg
│   ├── forest-path.jpg
│   ├── beach-chairs.jpg
│   └── dune-landscape.jpg
└── details/           # Stimmungsdetails
    ├── coffee-table.jpg
    ├── bed-pillows.jpg
    ├── kitchen-detail.jpg
    └── window-view.jpg
```

## Stilrichtlinien

### Fotografie-Stil

- **Beleuchtung**: Natürliches Licht, helle, freundliche Atmosphäre
- **Farben**: Warme, gedämpfte Töne (Sand, Weiß, Grau, Navy)
- **Perspektive**: Professionelle Interior-Fotografie
- **Keine**: Personen, Logos, Text im Bild

### Bildgrößen (für Optimierung)

- Hero-Bilder: 1920x1080px
- Galerie-Bilder: 1200x800px
- Detail-Bilder: 800x600px
- Thumbnails: 400x300px

## Alt-Text Richtlinien

### Format

`[Raum/Objekt] der Ferienwohnung Eggers [mit Beschreibung]`

### Beispiele

- Interior: "Wohnzimmer der Ferienwohnung Eggers mit Sofa und großem Fenster"
- Exterior: "Terrasse der Ferienwohnung Eggers mit Gartenmöbeln"
- Surroundings: "Strandabschnitt in Cuxhaven-Sahlenburg nahe der Ferienwohnung"
- Details: "Detailaufnahme des Essbereichs in der Ferienwohnung Eggers"

## Next.js Image Integration

### Verwendung

```tsx
import Image from 'next/image';

<Image
  src="/images/interior/living-room-main.jpg"
  alt="Wohnzimmer der Ferienwohnung Eggers mit Sofa und Fensterfront"
  width={1200}
  height={800}
  className="rounded-lg"
  priority={true} // nur für Hero-Bilder
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Priority-Regel

- `priority={true}`: Nur für Hero-Bilder above the fold
- Alle anderen: Lazy Loading (Standard)

## Bildverteilung pro Seite

### Startseite (/)

- Hero: surroundings/beach-sunset.jpg
- Intro: interior/living-room-main.jpg
- Teaser 1: surroundings/forest-path.jpg
- Teaser 2: interior/kitchen-dining.jpg

### Ausstattung (/ausstattung)

- Hero Background: interior/living-room-main.jpg (opacity)
- Wohnbereich: interior/living-room-main.jpg
- Küche: interior/kitchen-dining.jpg
- Schlafzimmer 1: interior/bedroom-1-main.jpg
- Schlafzimmer 2: interior/bedroom-2-kids.jpg
- Bad: interior/bathroom-shower.jpg
- Terrasse: exterior/terrace-day.jpg

### Galerie (/galerie)

- Hero Background: interior/living-room-detail.jpg (opacity)
- Kategorie "Wohnen": 3-4 Interior-Bilder
- Kategorie "Kochen": 3 Kitchen-Bilder
- Kategorie "Schlafen": 2 Bedroom-Bilder
- Kategorie "Umgebung": 4 Surroundings-Bilder

### Lage (/lage)

- Hero Background: surroundings/beach-sunset.jpg (opacity)
- Content: surroundings/wadden-sea-low-tide.jpg
- Content: surroundings/forest-path.jpg

### Preise (/preise)

- Dezentes Detail: details/coffee-table.jpg

### Kontakt (/kontakt)

- Hero Background: exterior/building-front.jpg (opacity)

### Buchen (/buchen)

- Dezentes Detail: details/bed-pillows.jpg

### Rechtliche Seiten (Impressum, Datenschutz, AGB)

- Hero Background: surroundings/wadden-sea-low-tide.jpg (opacity, sehr dezent)

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

## Nano Banana Pro Prompts (Quiet Luxury)

Nutzen Sie diese Prompts, um hochwertige Bilder im "Quiet Luxury" Stil zu generieren.

### Stil-Vorgaben
*Photorealistic, 8k, interior design photography, soft natural lighting, depth of field, color palette: navy blue, sand beige, warm gold accents, high quality textures, linen, velvet, oak wood.*

### Interior
1.  **Wohnzimmer (Main)**:
    `Luxury living room interior, coastal quiet luxury style, beige linen sofa, navy blue velvet throw pillows, light oak wood coffee table, large floor-to-ceiling windows with soft daylight, sheer white curtains, gold vase with dried pampas grass, architectural digest style, 8k photorealistic`

2.  **Küche & Essbereich**:
    `Modern open concept kitchen and dining area, matte sand-colored cabinets, white marble countertops, gold faucet and hardware, solid oak dining table with navy blue upholstered chairs, minimalist table setting, warm ambient lighting, 8k photorealistic`

3.  **Schlafzimmer (Main)**:
    `Serene master bedroom, hotel quality white bedding with navy blue wool throw blanket, tufted beige headboard, warm wood bedside tables, brass reading lamps, soft morning light, cozy atmosphere, high resolution 8k`

4.  **Badezimmer**:
    `Spa-like modern bathroom, beige natural stone tiles, walk-in glass shower, fluffy white towels stacked, gold fixtures, teak wood bath mat, bright and airy, soft lighting, 8k`

### Exterior & Umgebung
5.  **Hausansicht (Außen)**:
    `Modern coastal vacation home exterior, red brick facade typical for Northern Germany, dune grass in foreground, wooden terrace, golden hour sunset lighting, welcoming atmosphere, wide angle shot, 8k`

6.  **Strand & Umgebung**:
    `North Sea coast beach at sunset, wooden path leading through sand dunes, beach grass waving in wind, soft golden light, calm sea in background, peaceful atmosphere, nature photography, 8k`

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

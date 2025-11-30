export const siteContent = {
    general: {
        brandName: "Ferienwohnung Eggers",
        description: "Ihr privater Rückzugsort an der Nordsee. Genießen Sie Ruhe, Natur und Komfort in Sahlenburg.",
        address: {
            street: "Nordheimstraße 150",
            zipCity: "27476 Cuxhaven Sahlenburg",
            mapsLink: "https://maps.google.com/?q=Nordheimstraße+150+27476+Cuxhaven+Sahlenburg"
        },
        contact: {
            phone: "+49 (0) 4721 123 456",
            phoneRaw: "+4947211234567",
            email: "info@ferienwohnung-eggers.de"
        },
        socials: {
            instagram: "#",
            facebook: "#"
        },
        metadata: {
            icon: "/icon.svg",
        }
    },
    navigation: [
        { href: "/", label: "Start" },
        { href: "/ausstattung", label: "Ausstattung" },
        { href: "/galerie", label: "Galerie" },
        { href: "/lage", label: "Lage" },
        { href: "/preise", label: "Preise" },
        { href: "/ueber-uns", label: "Über uns" },
        { href: "/kontakt", label: "Kontakt" },
        { href: "/buchen", label: "Buchen" },
    ],
    pages: {
        home: {
            hero: {
                headline: "Ruhe. Natur. Nordsee.",
                subheadline: "Ihr privater Rückzugsort in Cuxhaven-Sahlenburg. 62 m² Erholung, nur 1000m vom Welterbe Wattenmeer.",
                primaryCta: "Verfügbarkeit prüfen",
                secondaryCta: "Rundgang starten",
                backgroundImage: "/images/hero_beach.png"
            },
            intro: {
                image: "/images/kitchen_detail.png",
                quote: "Ein Ort zum Ankommen und Wohlfühlen.",
                headline: "Willkommen bei Familie Eggers",
                text: "Entfliehen Sie dem Alltag in unserer liebevoll eingerichteten Ferienwohnung. In ruhiger Wohnlage gelegen, bietet unser Domizil den perfekten Ausgangspunkt für lange Wattwanderungen, Fahrradtouren durch den Wernerwald oder entspannte Tage am Strand.",
                features: [
                    "Großzügige 62 m² für bis zu 6 Personen",
                    "Barrierefreier Zugang & ebenerdige Dusche",
                    "Hunde sind herzlich willkommen"
                ]
            },
            features: {
                headline: "Das erwartet Sie",
                subheadline: "Wir haben an alles gedacht, damit Sie sich rundum wohlfühlen.",
                items: [
                    { iconName: "Waves", title: "Strandnah", desc: "Nur 1000m bis zum Sahlenburger Strand und Wattenmeer." },
                    { iconName: "Wifi", title: "Digital & Vernetzt", desc: "Kostenloses Highspeed-WLAN und Smart-TV für gemütliche Abende." },
                    { iconName: "Dog", title: "Hundefreundlich", desc: "Ihr Vierbeiner ist bei uns ein gern gesehener Gast." },
                    { iconName: "Coffee", title: "Vollausstattung", desc: "Moderne Küche mit allem, was Sie für die Selbstversorgung brauchen." },
                    { iconName: "MapPin", title: "Privater Parkplatz", desc: "Kostenfreier Stellplatz direkt am Haus für Ihre bequeme Anreise." },
                    { iconName: "Star", title: "Barrierefrei", desc: "Ebenerdiger Zugang und behindertengerechtes Badezimmer." },
                ]
            },
            testimonials: {
                headline: "Das sagen unsere Gäste",
                subheadline: "Echte Bewertungen von Google",
                reviews: [
                    {
                        name: "Sabine M.",
                        date: "August 2024",
                        text: "Eine wunderschöne Wohnung! Die Ruhe in Sahlenburg ist traumhaft und der Weg zum Strand ist ein schöner Spaziergang. Besonders toll fanden wir, dass unser Hund so willkommen war.",
                        rating: 5,
                    },
                    {
                        name: "Michael K.",
                        date: "Juli 2024",
                        text: "Top Ausstattung, es hat an nichts gefehlt. Die Terrasse ist super zum Frühstücken. Auch die Barrierefreiheit ist sehr gut gelöst. Wir kommen definitiv wieder!",
                        rating: 5,
                    },
                    {
                        name: "Familie Weber",
                        date: "Mai 2024",
                        text: "Sehr sauber und gemütlich eingerichtet. Der Kontakt zur Familie Eggers war total unkompliziert und herzlich. Preis-Leistung für Cuxhaven absolut fair.",
                        rating: 5,
                    }
                ]
            }
        },
        gallery: {
            hero: {
                headline: "Einblicke",
                text: "Lassen Sie sich inspirieren. Hier bekommen Sie einen Vorgeschmack auf Ihr Zuhause auf Zeit und die wunderschöne Umgebung von Cuxhaven-Sahlenburg.",
                backgroundImage: "/images/hero-living-room.png"
            },
            categories: [
                {
                    id: "living",
                    title: "Wohnen & Leben",
                    description: "Lichtdurchflutete Räume zum Entspannen",
                    images: [
                        {
                            src: "/images/interior/living_room_main.png",
                            alt: "Helles Wohnzimmer mit Sofa und Fensterfront",
                            span: "md:col-span-2 md:row-span-2"
                        },
                        {
                            src: "/images/kitchen1.png",
                            alt: "Moderner Essbereich mit offener Küche",
                            span: "md:col-span-1 md:row-span-1"
                        },
                        {
                            // Placeholder for future detail shot
                            src: "/images/kitchen.png",
                            alt: "Detailansicht Küche",
                            span: "md:col-span-1 md:row-span-1"
                        },
                    ]
                },
                {
                    id: "sleeping",
                    title: "Schlafen & Erholen",
                    description: "Ruhige Rückzugsorte für erholsamen Schlaf",
                    images: [
                        {
                            src: "/images/interior/living_room_main1.png",
                            alt: "Hauptschlafzimmer mit Boxspringbett",
                            span: "md:col-span-2 md:row-span-1"
                        },
                        {
                            src: "/images/interior/living-room-main2.png",
                            alt: "Zweites Schlafzimmer / Kinderzimmer",
                            span: "md:col-span-1 md:row-span-1"
                        },
                        {
                            src: "/images/badroom.png",
                            alt: "Modernes Badezimmer mit Dusche",
                            span: "md:col-span-1 md:row-span-1"
                        },
                    ]
                },
                {
                    id: "surroundings",
                    title: "Umgebung & Natur",
                    description: "Sahlenburg, Wernerwald und das Wattenmeer",
                    images: [
                        {
                            src: "/images/surroundings/beach-sunset.png",
                            alt: "Sonnenuntergang am Sahlenburger Strand",
                            span: "md:col-span-2 md:row-span-1"
                        },
                        {
                            src: "/images/surroundings/forest-path.png",
                            alt: "Spazierweg im Wernerwald",
                            span: "md:col-span-1 md:row-span-1"
                        },
                        {
                            src: "/images/surroundings/UNESCO_Wattenmeer.png",
                            alt: "Das UNESCO Weltnaturerbe Wattenmeer",
                            span: "md:col-span-1 md:row-span-1"
                        },
                    ]
                }
            ]
        }
    },
    footer: {
        legalLinks: [
            { href: "/impressum", label: "Impressum" },
            { href: "/datenschutz", label: "Datenschutz" },
            { href: "/agb", label: "AGB" },
        ],
        copyrightText: "Ferienwohnung Eggers. Alle Rechte vorbehalten."
    },
    booking: {
        prices: {
            basePricePerNight: 85,      // Basispreis pro Nacht in Euro
            cleaningFee: 85,            // Endreinigung in Euro
            dogFee: 25,                 // Gebühr für Hund (pauschal) in Euro
            cityTaxPerAdultPerNight: 4.10, // Kurtaxe pro Erwachsener/Nacht (gesetzlich)
            minimumStay: 3              // Mindestaufenthalt in Nächten
        },
        seasonal: {
            // Hauptsaison (Sommer)
            high: {
                start: "06-15",         // Format: MM-TT
                end: "09-15",
                multiplier: 1.3         // Preisaufschlag (1.3 = +30%)
            },
            // Nebensaison (Winter)
            low: {
                start: "11-01",
                end: "02-28",
                multiplier: 0.85        // Preisnachlass (0.85 = -15%)
            }
        }
    },
    theme: {
        // Farben können als Hex-Codes (#RRGGBB) angepasst werden
        colors: {
            light: {
                background: "#fdfcfb", // Warmes Weiß
                foreground: "#0f172a", // Dunkles Navy
                card: "#fcfbf8",
                cardForeground: "#0f172a",
                popover: "#fdfcfb",
                popoverForeground: "#0f172a",
                primary: "#0f172a",
                primaryForeground: "#f8fafc",
                secondary: "#efede8",
                secondaryForeground: "#0f172a",
                muted: "#e9e6e0",
                mutedForeground: "#475569", // Statt #64748b (Erhöht Kontrast auf ~6.5:1)
                accent: "#e5e0d8",
                accentForeground: "#0f172a",
                destructive: "#dc2626", // Statt #ef4444 (Erhöht Kontrast auf > 4.5:1)
                destructiveForeground: "#f8fafc",
                border: "#dedbd6",
                input: "#dedbd6",
                ring: "#0f172a",
                // Spezielle Farben
                surfaceLuxury: "#fdfcfb",
                surfaceStrong: "#102a43",
                gradientTop: "#fdfcfb",
                gradientBottom: "#e8ddc8", // Sand 300
            },
            dark: {
                background: "#0b1120", // Tiefes Navy
                foreground: "#f2f0eb", // Helles Sand
                card: "#0f1623",
                cardForeground: "#f2f0eb",
                popover: "#0b1120",
                popoverForeground: "#f2f0eb",
                primary: "#f2f0eb",
                primaryForeground: "#0f172a",
                secondary: "#19202e",
                secondaryForeground: "#f2f0eb",
                muted: "#1e2532",
                mutedForeground: "#b3b3b3",
                accent: "#212937",
                accentForeground: "#f2f0eb",
                destructive: "#cf3030",
                destructiveForeground: "#f2f0eb",
                border: "#222b3b",
                input: "#222b3b",
                ring: "#b3b3b3",
                // Spezielle Farben
                surfaceLuxury: "#102a43",
                surfaceStrong: "#0a1929",
                gradientTop: "#102a43",
                gradientBottom: "#050911",
            }
        },
        // Andere Design-Parameter
        borderRadius: "0.5rem",
        gradient: {
            start: "0%",
            end: "100%",
        },
        // Erweiterte Farbpalette (Luxury)
        palette: {
            luxury: {
                sand: {
                    DEFAULT: "#c4ad86",
                    50: "#fdfcfb",
                    100: "#f9f6f1",
                    200: "#f3ede3",
                    300: "#e8ddc8",
                    400: "#d9c8a8",
                    500: "#c4ad86",
                    600: "#a88f68",
                    700: "#8a7455",
                    800: "#6e5c46",
                    900: "#574a39",
                },
                navy: {
                    DEFAULT: "#334e68",
                    50: "#f0f4f8",
                    100: "#d9e2ec",
                    200: "#bcccdc",
                    300: "#9fb3c8",
                    400: "#829ab1",
                    500: "#627d98",
                    600: "#486581",
                    700: "#334e68",
                    800: "#243b53",
                    900: "#102a43",
                    950: "#0a1929",
                },
                gold: {
                    DEFAULT: "#f59e0b",
                    50: "#fffbeb",
                    100: "#fef3c7",
                    200: "#fde68a",
                    300: "#fcd34d",
                    400: "#fbbf24",
                    500: "#f59e0b",
                    600: "#d97706",
                    700: "#b45309",
                    800: "#92400e",
                    900: "#78350f",
                },
            }
        }
    }
};


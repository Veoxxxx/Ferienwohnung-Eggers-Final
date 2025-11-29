import { Metadata } from "next";

const siteConfig = {
    name: "Ferienwohnung Eggers",
    description:
        "Moderne Ferienwohnung in Cuxhaven Sahlenburg mit Platz für bis zu 6 Gäste. Ruhige Lage, etwa 1000 Meter zum Wattenmeer Strand. Hundefreundlich und weitgehend barrierefrei.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ferienwohnung-eggers.de",
    address: {
        street: "Nordheimstraße 150",
        city: "Cuxhaven Sahlenburg",
        postalCode: "27476",
        country: "Deutschland",
    },
};

export function generateMetadata({
    title,
    description,
    path = "/",
}: {
    title: string;
    description: string;
    path?: string;
}): Metadata {
    const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
    const url = `${siteConfig.url}${path}`;

    return {
        title: fullTitle,
        description,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: siteConfig.name,
            locale: "de_DE",
            type: "website",
            images: [
                {
                    url: `${siteConfig.url}/images/hero-living-room.jpg`,
                    width: 1200,
                    height: 630,
                    alt: "Ferienwohnung Eggers - Wohnzimmer",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
        },
    };
}

export function generateVacationRentalSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "VacationRental",
        name: siteConfig.name,
        description: siteConfig.description,
        address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            postalCode: siteConfig.address.postalCode,
            addressCountry: siteConfig.address.country,
        },
        numberOfRooms: 3,
        floorSize: {
            "@type": "QuantitativeValue",
            value: 62,
            unitCode: "MTK",
        },
        occupancy: {
            "@type": "QuantitativeValue",
            maxValue: 6,
        },
        petsAllowed: true,
        amenityFeature: [
            {
                "@type": "LocationFeatureSpecification",
                name: "Kostenloser Parkplatz",
            },
            {
                "@type": "LocationFeatureSpecification",
                name: "WLAN",
            },
            {
                "@type": "LocationFeatureSpecification",
                name: "TV",
            },
            {
                "@type": "LocationFeatureSpecification",
                name: "Voll ausgestattete Küche",
            },
            {
                "@type": "LocationFeatureSpecification",
                name: "Terrasse",
            },
        ],
        geo: {
            "@type": "GeoCoordinates",
            latitude: "53.8667",
            longitude: "8.6167",
        },
    };
}

export { siteConfig };

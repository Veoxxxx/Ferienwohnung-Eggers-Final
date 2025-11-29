import { generateMetadata as genMeta } from "@/lib/metadata";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata = genMeta({
    title: "Bildergalerie",
    description:
        "Entdecken Sie die Ferienwohnung Eggers in Bildern. Wohnzimmer, Schlafzimmer, Küche und die Umgebung von Cuxhaven-Sahlenburg.",
    path: "/galerie",
});

// Gallery data structure with real images
const galleryCategories = [
    {
        title: "Wohnen & Leben",
        description: "Lichtdurchflutete Räume zum Entspannen",
        images: [
            {
                src: "/images/interior/living-room-main.png",
                alt: "Helles Wohnzimmer der Ferienwohnung Eggers mit Sofa und großen Fenstern",
                span: "md:col-span-2 md:row-span-2"
            },
            {
                src: "/images/interior/living-room-main.png",
                alt: "Gemütlicher Wohnbereich mit Essbereich",
                span: "md:col-span-1 md:row-span-1"
            },
            {
                src: "/images/interior/living-room-main.png",
                alt: "Detailansicht des Wohnbereichs",
                span: "md:col-span-1 md:row-span-1"
            },
        ]
    },
    {
        title: "Schlafen & Erholen",
        description: "Ruhige Rückzugsorte für erholsamen Schlaf",
        images: [
            {
                src: "/images/interior/living-room-main.png",
                alt: "Hauptschlafzimmer mit Doppelbett",
                span: "md:col-span-2 md:row-span-1"
            },
            {
                src: "/images/interior/living-room-main.png",
                alt: "Zweites Schlafzimmer",
                span: "md:col-span-1 md:row-span-1"
            },
            {
                src: "/images/interior/living-room-main.png",
                alt: "Gemütliche Betten mit hochwertiger Bettwäsche",
                span: "md:col-span-1 md:row-span-1"
            },
        ]
    },
    {
        title: "Umgebung & Natur",
        description: "Sahlenburg, Wernerwald und das Wattenmeer",
        images: [
            {
                src: "/images/surroundings/beach-sunset.png",
                alt: "Strand bei Sonnenuntergang in Cuxhaven-Sahlenburg",
                span: "md:col-span-2 md:row-span-1"
            },
            {
                src: "/images/surroundings/forest-path.png",
                alt: "Waldweg im nahegelegenen Wernerwald",
                span: "md:col-span-1 md:row-span-1"
            },
            {
                src: "/images/surroundings/beach-sunset.png",
                alt: "Wattenmeer bei Ebbe",
                span: "md:col-span-1 md:row-span-1"
            },
        ]
    }
];

export default function GaleriePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-living-room.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Einblicke</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Lassen Sie sich inspirieren. Hier bekommen Sie einen Vorgeschmack auf Ihr Zuhause auf Zeit
                            und die wunderschöne Umgebung von Cuxhaven-Sahlenburg.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Gallery Sections */}
            <div className="bg-white dark:bg-luxury-navy-950 pb-24">
                {galleryCategories.map((category, categoryIndex) => (
                    <section key={categoryIndex} className="section-padding border-b border-luxury-navy-100 dark:border-luxury-navy-800 last:border-none">
                        <div className="container-custom">
                            <AnimatedSection className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-luxury-navy-900 dark:text-luxury-sand-100">
                                    {category.title}
                                </h2>
                                <p className="text-luxury-navy-600 dark:text-slate-400 text-lg">
                                    {category.description}
                                </p>
                            </AnimatedSection>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
                                {category.images.map((image, imageIndex) => (
                                    <AnimatedSection
                                        key={imageIndex}
                                        delay={imageIndex * 0.1}
                                        className={`relative group overflow-hidden rounded-lg shadow-md ${image.span} min-h-[250px]`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                            <p className="text-white font-medium text-sm">{image.alt}</p>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { MapPin, Navigation, Train, Car, Waves, TreePine, Utensils, Map } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata = genMeta({
    title: "Lage & Umgebung",
    description:
        "Ferienwohnung Eggers in Cuxhaven Sahlenburg: Ruhige Lage, etwa 1000 Meter zum Wattenmeer Strand. Anreise und Umgebung.",
    path: "/lage",
});

export default function LagePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/kitchen-dining.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Lage & Umgebung</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Zwischen Wald, Watt und Heide. Genießen Sie die Ruhe in Sahlenburg und die Nähe zum UNESCO-Weltnaturerbe Wattenmeer.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding">
                <div className="container-custom">

                    {/* Intro & Distances */}
                    <div className="grid lg:grid-cols-2 gap-16 mb-20">
                        <AnimatedSection>
                            <h2 className="text-3xl font-serif font-bold mb-6 text-luxury-navy-900 dark:text-luxury-sand-100">
                                Sahlenburg entdecken
                            </h2>
                            <div className="prose dark:prose-invert text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                <p className="mb-4">
                                    Sahlenburg ist der einzige Cuxhavener Kurteil, der Wald, Heide und Wattenmeer direkt miteinander verbindet.
                                    Hier finden Sie Erholung pur in einer einzigartigen Naturlandschaft.
                                </p>
                                <p className="mb-4">
                                    Unsere Ferienwohnung liegt in der Nordheimstraße 150, einer ruhigen Wohngegend. Von hier aus erreichen Sie
                                    den Strand und das Wattenmeer in wenigen Minuten – perfekt für lange Spaziergänge oder einen entspannten Strandtag.
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-luxury-sand-50 dark:bg-luxury-navy-900 rounded-lg">
                                    <Waves className="h-5 w-5 text-luxury-navy-500" />
                                    <span className="text-sm font-medium">1000m zum Strand</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-luxury-sand-50 dark:bg-luxury-navy-900 rounded-lg">
                                    <TreePine className="h-5 w-5 text-luxury-navy-500" />
                                    <span className="text-sm font-medium">Wernerwald nah</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-luxury-sand-50 dark:bg-luxury-navy-900 rounded-lg">
                                    <Utensils className="h-5 w-5 text-luxury-navy-500" />
                                    <span className="text-sm font-medium">800m zu Restaurants</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-luxury-sand-50 dark:bg-luxury-navy-900 rounded-lg">
                                    <Map className="h-5 w-5 text-luxury-navy-500" />
                                    <span className="text-sm font-medium">5km zum Zentrum</span>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="h-full border-none shadow-lg overflow-hidden relative min-h-[400px]">
                                {/* Google Maps Embed */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.5!2d8.6366!3d53.8808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b4419d5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sNordheimstra%C3%9Fe%20150%2C%2027476%20Cuxhaven!5e0!3m2!1sde!2sde!4v1234567890"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full min-h-[400px]"
                                    title="Karte: Ferienwohnung Eggers, Nordheimstraße 150, Cuxhaven-Sahlenburg"
                                />

                                {/* Overlay with address info */}
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-luxury-navy-900/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-luxury-navy-900 dark:text-luxury-sand-400 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="font-serif font-bold text-luxury-navy-900 dark:text-white">Nordheimstraße 150</p>
                                            <p className="text-sm text-luxury-navy-600 dark:text-slate-400">27476 Cuxhaven-Sahlenburg</p>
                                        </div>
                                        <a
                                            href="https://www.google.com/maps/dir/?api=1&destination=Nordheimstraße+150+27476+Cuxhaven"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-luxury-navy-900 dark:text-luxury-sand-400 underline hover:no-underline whitespace-nowrap"
                                        >
                                            Route planen
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Arrival */}
                    <AnimatedSection className="mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-8 text-center text-luxury-navy-900 dark:text-luxury-sand-100">
                            Ihre Anreise
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="border-none shadow-md bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Car className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle>Mit dem Auto</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400">
                                    <p className="mb-4">
                                        Über die A27 bis Cuxhaven, dann der Beschilderung Richtung Sahlenburg folgen.
                                        Ihr persönlicher Parkplatz befindet sich direkt am Haus.
                                    </p>
                                    <p className="text-sm font-medium">
                                        Navi: Nordheimstraße 150, 27476 Cuxhaven
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md bg-luxury-sand-50 dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Train className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle>Mit der Bahn</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400">
                                    <p className="mb-4">
                                        Bis Bahnhof Cuxhaven. Von dort mit dem Bus (Linie 1004) direkt nach Sahlenburg
                                        oder bequem mit dem Taxi (ca. 15 Min. Fahrt).
                                    </p>
                                    <p className="text-sm font-medium">
                                        Tipp: Wir helfen gerne bei der Organisation eines Taxis.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </AnimatedSection>

                </div>
            </section>
        </div>
    );
}

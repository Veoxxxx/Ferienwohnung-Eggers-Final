import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { ArrowRight, Check, MapPin, Star, Waves, Wifi, Dog, Coffee } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = genMeta({
    title: "Startseite",
    description:
        "Willkommen in der Ferienwohnung Eggers in Cuxhaven Sahlenburg. Genießen Sie Ruhe, Natur und Komfort in unserer 62qm Ferienwohnung nahe dem Wattenmeer.",
    path: "/",
});

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/surroundings/beach-sunset.png"
                        alt="Strand bei Sonnenuntergang in Cuxhaven-Sahlenburg"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-luxury-navy-950/40 z-10" />
                </div>

                {/* Hero Content */}
                <div className="container-custom relative z-20 text-center text-white">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
                            Ruhe. Natur. Nordsee.
                        </h1>
                        <p className="text-xl md:text-2xl text-luxury-sand-100 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                            Ihr privater Rückzugsort in Cuxhaven-Sahlenburg. <br className="hidden md:block" />
                            62 m² Erholung, nur 1000m vom Welterbe Wattenmeer.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/buchen">
                                <Button size="lg" className="min-w-[200px] text-lg">
                                    Verfügbarkeit prüfen
                                </Button>
                            </Link>
                            <Link href="/galerie">
                                <Button variant="outline" size="lg" className="min-w-[200px] text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-luxury-navy-900">
                                    Rundgang starten
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/80">
                    <ArrowRight className="h-6 w-6 rotate-90" />
                </div>
            </section>

            {/* Intro Section */}
            <section className="section-padding bg-white dark:bg-luxury-navy-950">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection>
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                                <Image
                                    src="/images/interior/living-room-main.png"
                                    alt="Helles Wohnzimmer der Ferienwohnung Eggers mit Sofa und großen Fenstern"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-luxury-sand-50 dark:bg-luxury-navy-800 p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                                <p className="font-serif text-lg text-luxury-navy-900 dark:text-luxury-sand-100 italic">
                                    "Ein Ort zum Ankommen und Wohlfühlen."
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <h2 className="text-4xl font-serif font-bold mb-6 text-luxury-navy-900 dark:text-luxury-sand-100">
                                Willkommen bei Familie Eggers
                            </h2>
                            <p className="text-lg text-luxury-navy-600 dark:text-slate-400 mb-6 leading-relaxed">
                                Entfliehen Sie dem Alltag in unserer liebevoll eingerichteten Ferienwohnung.
                                In ruhiger Wohnlage gelegen, bietet unser Domizil den perfekten Ausgangspunkt für
                                lange Wattwanderungen, Fahrradtouren durch den Wernerwald oder entspannte Tage am Strand.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-luxury-navy-700 dark:text-slate-300">
                                    <Check className="h-5 w-5 text-luxury-navy-500" />
                                    <span>Großzügige 62 m² für bis zu 6 Personen</span>
                                </li>
                                <li className="flex items-center gap-3 text-luxury-navy-700 dark:text-slate-300">
                                    <Check className="h-5 w-5 text-luxury-navy-500" />
                                    <span>Barrierefreier Zugang & ebenerdige Dusche</span>
                                </li>
                                <li className="flex items-center gap-3 text-luxury-navy-700 dark:text-slate-300">
                                    <Check className="h-5 w-5 text-luxury-navy-500" />
                                    <span>Hunde sind herzlich willkommen</span>
                                </li>
                            </ul>
                            <Link href="/ausstattung" className="text-luxury-navy-900 dark:text-luxury-sand-400 font-medium hover:underline inline-flex items-center gap-2">
                                Mehr zur Ausstattung <ArrowRight className="h-4 w-4" />
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-luxury-sand-50 dark:bg-luxury-navy-900">
                <div className="container-custom">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-luxury-navy-900 dark:text-luxury-sand-100">
                            Das erwartet Sie
                        </h2>
                        <p className="text-luxury-navy-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Wir haben an alles gedacht, damit Sie sich rundum wohlfühlen.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Waves, title: "Strandnah", desc: "Nur 1000m bis zum Sahlenburger Strand und Wattenmeer." },
                            { icon: Wifi, title: "Digital & Vernetzt", desc: "Kostenloses Highspeed-WLAN und Smart-TV für gemütliche Abende." },
                            { icon: Dog, title: "Hundefreundlich", desc: "Ihr Vierbeiner ist bei uns ein gern gesehener Gast." },
                            { icon: Coffee, title: "Vollausstattung", desc: "Moderne Küche mit allem, was Sie für die Selbstversorgung brauchen." },
                            { icon: MapPin, title: "Privater Parkplatz", desc: "Kostenfreier Stellplatz direkt am Haus für Ihre bequeme Anreise." },
                            { icon: Star, title: "Barrierefrei", desc: "Ebenerdiger Zugang und behindertengerechtes Badezimmer." },
                        ].map((feature, index) => (
                            <AnimatedSection key={index} delay={index * 0.1}>
                                <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-luxury-navy-950">
                                    <CardContent className="p-6">
                                        <feature.icon className="h-10 w-10 text-luxury-navy-900 dark:text-luxury-sand-400 mb-4" />
                                        <h3 className="font-serif font-bold text-xl mb-2 text-luxury-navy-900 dark:text-luxury-sand-100">
                                            {feature.title}
                                        </h3>
                                        <p className="text-luxury-navy-600 dark:text-slate-400">
                                            {feature.desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teaser Section */}
            <section className="section-padding bg-white dark:bg-luxury-navy-950">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-8">
                        <AnimatedSection>
                            <div className="group relative overflow-hidden rounded-xl aspect-[16/9]">
                                <Image
                                    src="/images/surroundings/forest-path.png"
                                    alt="Waldweg im Wernerwald nahe der Ferienwohnung Eggers"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <h3 className="text-2xl font-serif font-bold mb-2">Lage & Umgebung</h3>
                                    <p className="text-slate-200 mb-4">Entdecken Sie den Wernerwald und das Wattenmeer.</p>
                                    <Link href="/lage">
                                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                                            Mehr erfahren
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="group relative overflow-hidden rounded-xl aspect-[16/9]">
                                <Image
                                    src="/images/interior/kitchen-dining.png"
                                    alt="Moderne Küche mit Essbereich in der Ferienwohnung Eggers"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <h3 className="text-2xl font-serif font-bold mb-2">Preise & Konditionen</h3>
                                    <p className="text-slate-200 mb-4">Transparent und fair. Keine versteckten Kosten.</p>
                                    <Link href="/preise">
                                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                                            Zur Übersicht
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white text-center relative overflow-hidden">
                <Image
                    src="/images/surroundings/beach-sunset.png"
                    alt=""
                    fill
                    className="object-cover opacity-10"
                    sizes="100vw"
                />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                            Bereit für Ihre Auszeit?
                        </h2>
                        <p className="text-xl text-luxury-sand-100 mb-8 max-w-2xl mx-auto">
                            Sichern Sie sich jetzt Ihren Wunschtermin in der Ferienwohnung Eggers.
                        </p>
                        <Link href="/buchen">
                            <Button size="lg" className="bg-white text-luxury-navy-900 hover:bg-luxury-sand-100 text-lg px-8">
                                Jetzt anfragen
                            </Button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}

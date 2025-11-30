import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { Sofa, Bed, ChefHat, Bath, Trees, Home, Accessibility, AlertCircle, Wifi, Tv, Car, Coffee, Check } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata = genMeta({
    title: "Ausstattung",
    description:
        "Komplette Ausstattung der Ferienwohnung Eggers: Wohnbereich, zwei Schlafzimmer, moderne Küche, Bad und Terrasse. Weitgehend barrierefrei.",
    path: "/ausstattung",
});

export default function AusstattungPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-living-room.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Ausstattung</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Fühlen Sie sich wie zu Hause. Unsere 62 m² große Ferienwohnung bietet Ihnen allen Komfort,
                            den Sie für einen entspannten Urlaub an der Nordsee benötigen.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Quick Highlights */}
            <section className="py-12 border-b border-luxury-sand-100 dark:border-luxury-navy-800">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 px-4">
                        <AnimatedSection delay={0.1} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group cursor-default">
                            <div className="p-3 rounded-xl bg-luxury-sand-50 dark:bg-luxury-navy-900 group-hover:bg-luxury-sand-100 dark:group-hover:bg-luxury-navy-800 transition-colors duration-300">
                                <Wifi className="h-6 w-6 text-luxury-navy-800 dark:text-luxury-sand-400" />
                            </div>
                            <span className="font-serif text-lg text-luxury-navy-900 dark:text-slate-200 tracking-wide">Highspeed WLAN</span>
                        </AnimatedSection>

                        <div className="hidden md:block h-8 w-px bg-luxury-sand-200 dark:bg-luxury-navy-700" />
                        
                        <AnimatedSection delay={0.2} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group cursor-default">
                            <div className="p-3 rounded-xl bg-luxury-sand-50 dark:bg-luxury-navy-900 group-hover:bg-luxury-sand-100 dark:group-hover:bg-luxury-navy-800 transition-colors duration-300">
                                <Car className="h-6 w-6 text-luxury-navy-800 dark:text-luxury-sand-400" />
                            </div>
                            <span className="font-serif text-lg text-luxury-navy-900 dark:text-slate-200 tracking-wide">Privater Parkplatz</span>
                        </AnimatedSection>
                        
                        <div className="hidden md:block h-8 w-px bg-luxury-sand-200 dark:bg-luxury-navy-700" />

                        <AnimatedSection delay={0.3} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group cursor-default">
                            <div className="p-3 rounded-xl bg-luxury-sand-50 dark:bg-luxury-navy-900 group-hover:bg-luxury-sand-100 dark:group-hover:bg-luxury-navy-800 transition-colors duration-300">
                                <Coffee className="h-6 w-6 text-luxury-navy-800 dark:text-luxury-sand-400" />
                            </div>
                            <span className="font-serif text-lg text-luxury-navy-900 dark:text-slate-200 tracking-wide">Voll ausgestattete Küche</span>
                        </AnimatedSection>
                        
                        <div className="hidden md:block h-8 w-px bg-luxury-sand-200 dark:bg-luxury-navy-700" />

                        <AnimatedSection delay={0.4} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group cursor-default">
                            <div className="p-3 rounded-xl bg-luxury-sand-50 dark:bg-luxury-navy-900 group-hover:bg-luxury-sand-100 dark:group-hover:bg-luxury-navy-800 transition-colors duration-300">
                                <Tv className="h-6 w-6 text-luxury-navy-800 dark:text-luxury-sand-400" />
                            </div>
                            <span className="font-serif text-lg text-luxury-navy-900 dark:text-slate-200 tracking-wide">Smart TV</span>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Wohnbereich */}
                        <AnimatedSection>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Sofa className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Wohnbereich</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">Gemütlich & Modern</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Helle, freundliche Atmosphäre mit großen Fenstern</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Komfortable Sitzgruppe mit Sofa und Sesseln</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Flachbild-TV mit Kabelanschluss</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Großer Esstisch mit Platz für 6 Personen</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Küche */}
                        <AnimatedSection delay={0.1}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <ChefHat className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Küche</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">Für Selbstversorger</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Moderne Einbauküche mit Ceranfeld (4 Platten)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Backofen, Geschirrspüler, Kühlschrank mit Gefrierfach</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Kaffeemaschine, Wasserkocher, Toaster</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Vollständiges Geschirr- und Kochset</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Schlafzimmer 1 */}
                        <AnimatedSection delay={0.2}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Bed className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Hauptschlafzimmer</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">Barrierefrei & Ruhig</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Doppelbett (1,80 m x 2,00 m)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Großer Kleiderschrank und Nachttische</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Verdunklungsvorhänge für erholsamen Schlaf</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Barrierefreier Zugang</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Schlafzimmer 2 */}
                        <AnimatedSection delay={0.3}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Bed className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Zweites Schlafzimmer</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">Flexibel nutzbar</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">2 Einzelbetten oder Etagenbett (ideal für Kinder)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Eigener Kleiderschrank</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed text-amber-700 dark:text-amber-400 font-medium">Hinweis: Nicht barrierefrei zugänglich</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Bad */}
                        <AnimatedSection delay={0.4}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Bath className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Badezimmer</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">Hygienisch & Funktional</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Ebenerdige Dusche, WC, Waschbecken</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Handtücher inklusive</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-luxury-navy-400 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed font-medium">Keine Waschmaschine vorhanden</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Terrasse */}
                        <AnimatedSection delay={0.5}>
                            <Card className="h-full border border-luxury-sand-100 dark:border-luxury-navy-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-luxury-sand-50 dark:bg-luxury-navy-800 rounded-xl">
                                            <Trees className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Außenbereich</CardTitle>
                                            <CardDescription className="text-luxury-navy-500 dark:text-slate-400">Privatsphäre genießen</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4 text-luxury-navy-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Private Terrasse mit Gartenmöbeln</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Sonnenschirm vorhanden</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-luxury-navy-400 dark:text-luxury-sand-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">Kostenloser Parkplatz direkt am Haus</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>

                    {/* Accessibility Detail */}
                    <div className="mt-16">
                        <AnimatedSection>
                            <Card className="bg-luxury-sand-50 dark:bg-luxury-navy-800 border-none">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <Accessibility className="h-8 w-8 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="text-2xl font-serif">Informationen zur Barrierefreiheit</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-luxury-navy-700 dark:text-slate-300 leading-relaxed">
                                        Die Ferienwohnung Eggers ist weitgehend barrierefrei gestaltet. Der Zugang zur Wohnung ist ebenerdig
                                        und ohne Stufen möglich. Die Türen sind breit genug für Rollatoren und Rollstühle. Das Badezimmer
                                        verfügt über eine ebenerdige Dusche.
                                    </p>
                                    <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 inline-block">
                                        <p className="text-sm text-amber-900 dark:text-amber-100 flex gap-2">
                                            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                                            <span>
                                                <strong>Hinweis:</strong> Das zweite Schlafzimmer ist aufgrund der Raumaufteilung nicht barrierefrei zugänglich.
                                            </span>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}

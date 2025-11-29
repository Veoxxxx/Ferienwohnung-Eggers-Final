import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { Sofa, Bed, ChefHat, Bath, Trees, Home, Accessibility, AlertCircle, Wifi, Tv, Car, Coffee } from "lucide-react";
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
            <section className="py-12 bg-luxury-sand-50 dark:bg-luxury-navy-900 border-b border-luxury-navy-100 dark:border-luxury-navy-800">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <AnimatedSection delay={0.1} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white dark:bg-luxury-navy-800 flex items-center justify-center text-luxury-navy-900 dark:text-luxury-sand-400 shadow-sm">
                                <Wifi className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-luxury-navy-900 dark:text-slate-200">WLAN inklusive</span>
                        </AnimatedSection>
                        <AnimatedSection delay={0.2} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white dark:bg-luxury-navy-800 flex items-center justify-center text-luxury-navy-900 dark:text-luxury-sand-400 shadow-sm">
                                <Car className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-luxury-navy-900 dark:text-slate-200">Eigener Parkplatz</span>
                        </AnimatedSection>
                        <AnimatedSection delay={0.3} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white dark:bg-luxury-navy-800 flex items-center justify-center text-luxury-navy-900 dark:text-luxury-sand-400 shadow-sm">
                                <Coffee className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-luxury-navy-900 dark:text-slate-200">Voll ausgestattete Küche</span>
                        </AnimatedSection>
                        <AnimatedSection delay={0.4} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white dark:bg-luxury-navy-800 flex items-center justify-center text-luxury-navy-900 dark:text-luxury-sand-400 shadow-sm">
                                <Tv className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-luxury-navy-900 dark:text-slate-200">Smart TV</span>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding bg-white dark:bg-luxury-navy-950">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Wohnbereich */}
                        <AnimatedSection>
                            <Card className="h-full border-none shadow-lg bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-lg">
                                            <Sofa className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Wohnbereich</CardTitle>
                                            <CardDescription>Gemütlich & Modern</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-luxury-navy-600 dark:text-slate-400">
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Helle, freundliche Atmosphäre mit großen Fenstern
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Komfortable Sitzgruppe mit Sofa und Sesseln
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Flachbild-TV mit Kabelanschluss
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Großer Esstisch mit Platz für 6 Personen
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Küche */}
                        <AnimatedSection delay={0.1}>
                            <Card className="h-full border-none shadow-lg bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-lg">
                                            <ChefHat className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Küche</CardTitle>
                                            <CardDescription>Für Selbstversorger</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-luxury-navy-600 dark:text-slate-400">
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Moderne Einbauküche mit Ceranfeld (4 Platten)
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Backofen, Geschirrspüler, Kühlschrank mit Gefrierfach
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Kaffeemaschine, Wasserkocher, Toaster
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Vollständiges Geschirr- und Kochset
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Schlafzimmer 1 */}
                        <AnimatedSection delay={0.2}>
                            <Card className="h-full border-none shadow-lg bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-lg">
                                            <Bed className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Hauptschlafzimmer</CardTitle>
                                            <CardDescription>Barrierefrei & Ruhig</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-luxury-navy-600 dark:text-slate-400">
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Doppelbett (1,80 m x 2,00 m)
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Großer Kleiderschrank und Nachttische
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Verdunklungsvorhänge für erholsamen Schlaf
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Barrierefreier Zugang
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Schlafzimmer 2 */}
                        <AnimatedSection delay={0.3}>
                            <Card className="h-full border-none shadow-lg bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-lg">
                                            <Bed className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Zweites Schlafzimmer</CardTitle>
                                            <CardDescription>Flexibel nutzbar</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-luxury-navy-600 dark:text-slate-400">
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            2 Einzelbetten oder Etagenbett (ideal für Kinder)
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Eigener Kleiderschrank
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Hinweis: Nicht barrierefrei zugänglich
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Bad */}
                        <AnimatedSection delay={0.4}>
                            <Card className="h-full border-none shadow-lg bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-lg">
                                            <Bath className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Badezimmer</CardTitle>
                                            <CardDescription>Hygienisch & Funktional</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-luxury-navy-600 dark:text-slate-400">
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Ebenerdige Dusche, WC, Waschbecken
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Handtücher inklusive
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-luxury-navy-400 flex-shrink-0" />
                                            <span className="font-medium">Keine Waschmaschine vorhanden</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        {/* Terrasse */}
                        <AnimatedSection delay={0.5}>
                            <Card className="h-full border-none shadow-lg bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-luxury-sand-100 dark:bg-luxury-navy-800 rounded-lg">
                                            <Trees className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Außenbereich</CardTitle>
                                            <CardDescription>Privatsphäre genießen</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-luxury-navy-600 dark:text-slate-400">
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Private Terrasse mit Gartenmöbeln
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Sonnenschirm vorhanden
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400 mt-2 flex-shrink-0" />
                                            Kostenloser Parkplatz direkt am Haus
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
                                    <div className="bg-white dark:bg-luxury-navy-900 p-4 rounded-lg border border-luxury-navy-100 dark:border-luxury-navy-700 inline-block">
                                        <p className="text-sm text-luxury-navy-600 dark:text-slate-400">
                                            <strong>Hinweis:</strong> Das zweite Schlafzimmer ist aufgrund der Raumaufteilung nicht barrierefrei zugänglich.
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

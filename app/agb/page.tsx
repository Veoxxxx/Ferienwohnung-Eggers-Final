import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { AlertCircle, FileText, CheckCircle2, CreditCard, Clock, Home, ShieldAlert, Scale, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata = genMeta({
    title: "AGB",
    description: "Allgemeine Geschäftsbedingungen der Ferienwohnung Eggers.",
    path: "/agb",
});

export default function AGBPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('/images/hero-living-room.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">AGB</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Allgemeine Geschäftsbedingungen für die Anmietung der Ferienwohnung Eggers.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom max-w-4xl">

                    <AnimatedSection>
                        <div className="flex items-start gap-4 p-6 bg-luxury-sand-50 dark:bg-luxury-navy-900 border border-luxury-navy-100 dark:border-luxury-navy-800 rounded-lg mb-12">
                            <AlertCircle className="h-6 w-6 text-luxury-navy-600 dark:text-luxury-sand-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-serif font-bold text-lg text-luxury-navy-900 dark:text-luxury-sand-100 mb-2">Rechtlicher Hinweis</p>
                                <p className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    Diese AGB sind ein Muster und müssen vor Produktivbetrieb durch rechtlich geprüfte und individuell
                                    angepasste Geschäftsbedingungen ersetzt werden.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>

                    <div className="space-y-8">
                        <AnimatedSection delay={0.1}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <FileText className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">§ 1 Geltungsbereich</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p>
                                        Diese Allgemeinen Geschäftsbedingungen gelten für die Vermietung der Ferienwohnung Eggers,
                                        Nordheimstraße 150, 27476 Cuxhaven Sahlenburg. Mit der Buchung erkennt der Gast diese Bedingungen an.
                                    </p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <CheckCircle2 className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">§ 2 Buchung und Vertragsabschluss</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed space-y-3">
                                    <p>
                                        Die Buchungsanfrage des Gastes stellt ein Angebot zum Abschluss eines Mietvertrags dar.
                                        Der Vertrag kommt erst durch unsere schriftliche Buchungsbestätigung (per E-Mail) zustande.
                                    </p>
                                    <div className="inline-block px-3 py-1 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded border border-luxury-navy-100 dark:border-luxury-navy-800 text-sm font-medium">
                                        Mindestaufenthalt: 3 Nächte
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <CreditCard className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">§ 3 Preise und Zahlung</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed space-y-4">
                                    <div>
                                        <p className="font-medium text-luxury-navy-900 dark:text-slate-100 mb-2">Im Preis enthalten:</p>
                                        <ul className="grid sm:grid-cols-2 gap-2">
                                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400" />Bettwäsche & Handtücher</li>
                                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400" />Endreinigung</li>
                                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400" />Nebenkosten (Strom, Wasser)</li>
                                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-luxury-navy-400" />WLAN & Parkplatz</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded-lg">
                                        <p className="font-medium text-luxury-navy-900 dark:text-slate-100 mb-1">Zusätzlich vor Ort:</p>
                                        <p>Kurtaxe: € 4,10 pro Erwachsenen pro Tag (in bar)</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <ShieldAlert className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">§ 4 Stornierung</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p className="mb-3">Stornierungen müssen schriftlich (per E-Mail) erfolgen.</p>
                                    <ul className="space-y-2">
                                        <li className="flex justify-between border-b border-luxury-navy-100 dark:border-luxury-navy-800 pb-2">
                                            <span>Bis 60 Tage vor Anreise</span>
                                            <span className="font-medium text-luxury-navy-900 dark:text-slate-100">Kostenfrei</span>
                                        </li>
                                        <li className="flex justify-between border-b border-luxury-navy-100 dark:border-luxury-navy-800 pb-2">
                                            <span>59-30 Tage vor Anreise</span>
                                            <span className="font-medium text-luxury-navy-900 dark:text-slate-100">50% des Preises</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Ab 29 Tage vor Anreise</span>
                                            <span className="font-medium text-luxury-navy-900 dark:text-slate-100">100% des Preises</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.5}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Clock className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">§ 5 An- und Abreise</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-4 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded-lg text-center">
                                            <span className="block text-sm uppercase tracking-wider text-luxury-navy-500 mb-1">Check-in</span>
                                            <span className="block text-2xl font-serif font-bold text-luxury-navy-900 dark:text-slate-100">ab 15:00 Uhr</span>
                                        </div>
                                        <div className="p-4 bg-luxury-sand-50 dark:bg-luxury-navy-950 rounded-lg text-center">
                                            <span className="block text-sm uppercase tracking-wider text-luxury-navy-500 mb-1">Check-out</span>
                                            <span className="block text-2xl font-serif font-bold text-luxury-navy-900 dark:text-slate-100">bis 10:00 Uhr</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.6}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Home className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">§ 6 Nutzung & Hausregeln</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed space-y-2">
                                    <p>• Maximale Belegung: 6 Personen</p>
                                    <p>• Hunde sind herzlich willkommen</p>
                                    <p>• Nichtraucher-Wohnung (Rauchen nur auf der Terrasse)</p>
                                    <p>• Bitte nehmen Sie Rücksicht auf die Nachbarschaft (Ruhezeiten)</p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.7}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Scale className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">§ 7 Schlussbestimmungen</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p>
                                        Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                                        Es gilt deutsches Recht. Gerichtsstand ist Cuxhaven.
                                    </p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}

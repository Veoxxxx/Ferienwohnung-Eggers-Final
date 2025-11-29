import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { Euro, Info, Check, Sparkles, PawPrint, Clock, CreditCard, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/button";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata = genMeta({
    title: "Preise & Konditionen",
    description:
        "Transparente Preise für die Ferienwohnung Eggers. Mindestaufenthalt 3 Tage, Kurtaxe €4,10 pro Tag, keine Kaution.",
    path: "/preise",
});

export default function PreisePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/kitchen-dining.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Preise & Konditionen</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Transparenz ist uns wichtig. Hier finden Sie alle Informationen zu unseren Preisen,
                            damit Sie Ihren Urlaub entspannt planen können.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Pricing Components */}
            <section className="section-padding bg-white dark:bg-luxury-navy-950">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <AnimatedSection>
                            <h2 className="text-3xl font-serif font-bold mb-8 text-luxury-navy-900 dark:text-luxury-sand-100">
                                So setzt sich der Preis zusammen
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 flex items-center justify-center flex-shrink-0 text-luxury-navy-900 dark:text-luxury-sand-400">
                                        <Euro className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold mb-2">Übernachtungspreis</h3>
                                        <p className="text-luxury-navy-600 dark:text-slate-400">
                                            Der Basispreis gilt für die gesamte Wohnung pro Nacht bei einer Belegung bis zu 6 Personen.
                                            <br />
                                            <span className="text-sm font-medium mt-1 inline-block text-luxury-navy-500">ab €85,00 / Nacht (saisonabhängig)</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 flex items-center justify-center flex-shrink-0 text-luxury-navy-900 dark:text-luxury-sand-400">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold mb-2">Endreinigung</h3>
                                        <p className="text-luxury-navy-600 dark:text-slate-400">
                                            Für die professionelle Reinigung der Wohnung nach Ihrer Abreise berechnen wir eine einmalige Pauschale.
                                            <br />
                                            <span className="text-sm font-medium mt-1 inline-block text-luxury-navy-500">einmalig €75,00</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 flex items-center justify-center flex-shrink-0 text-luxury-navy-900 dark:text-luxury-sand-400">
                                        <PawPrint className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold mb-2">Hundepauschale (optional)</h3>
                                        <p className="text-luxury-navy-600 dark:text-slate-400">
                                            Ihr Vierbeiner ist herzlich willkommen. Für den erhöhten Reinigungsaufwand berechnen wir einen kleinen Aufpreis.
                                            <br />
                                            <span className="text-sm font-medium mt-1 inline-block text-luxury-navy-500">pauschal €25,00 pro Aufenthalt</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-luxury-sand-100 dark:bg-luxury-navy-800 flex items-center justify-center flex-shrink-0 text-luxury-navy-900 dark:text-luxury-sand-400">
                                        <Info className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold mb-2">Gästebeitrag (Kurtaxe)</h3>
                                        <p className="text-luxury-navy-600 dark:text-slate-400">
                                            Die Stadt Cuxhaven erhebt einen Gästebeitrag. Wir ziehen diesen ein und führen ihn an die Stadt ab.
                                            <br />
                                            <span className="text-sm font-medium mt-1 inline-block text-luxury-navy-500">€4,10 pro Erwachsener / Nacht</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="bg-luxury-sand-50 dark:bg-luxury-navy-900 border-none shadow-lg h-full">
                                <CardHeader>
                                    <CardTitle className="font-serif text-2xl">Beispielrechnung</CardTitle>
                                    <CardDescription>
                                        Für 2 Erwachsene, 5 Nächte in der Nebensaison
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-2 border-b border-luxury-navy-100 dark:border-luxury-navy-800">
                                            <span>5 Nächte × €85,00</span>
                                            <span className="font-medium">€425,00</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-luxury-navy-100 dark:border-luxury-navy-800">
                                            <span>Endreinigung</span>
                                            <span className="font-medium">€75,00</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-luxury-navy-100 dark:border-luxury-navy-800">
                                            <span>Kurtaxe (2 Pers. × 5 Tage)</span>
                                            <span className="font-medium">€41,00</span>
                                        </div>
                                        <div className="flex justify-between pt-4">
                                            <span className="font-serif font-bold text-xl">Gesamt</span>
                                            <span className="font-serif font-bold text-xl text-luxury-navy-900 dark:text-luxury-sand-400">€541,00</span>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-luxury-navy-200 dark:border-luxury-navy-700">
                                            <Link href="/buchen">
                                                <Button className="w-full" size="lg">
                                                    Eigenen Preis berechnen
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Conditions Grid */}
            <section className="section-padding bg-luxury-sand-50 dark:bg-luxury-navy-800">
                <div className="container-custom">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold mb-4">Wichtige Konditionen</h2>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8">
                        <AnimatedSection delay={0.1}>
                            <Card className="h-full border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="mb-2">Mindestaufenthalt</CardTitle>
                                    <CardDescription className="text-base text-luxury-navy-700 dark:text-slate-300">
                                        Um Ihnen eine entspannte An- und Abreise zu ermöglichen, beträgt der Mindestaufenthalt bei uns <strong>3 Nächte</strong>.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="h-full border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="mb-2">Zahlung</CardTitle>
                                    <CardDescription className="text-base text-luxury-navy-700 dark:text-slate-300">
                                        20% Anzahlung bei Buchung, Restzahlung 14 Tage vor Anreise. Wir akzeptieren Überweisung.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <Card className="h-full border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="mb-2">An- & Abreise</CardTitle>
                                    <CardDescription className="text-base text-luxury-navy-700 dark:text-slate-300">
                                        Check-in ab 15:00 Uhr.<br />
                                        Check-out bis 10:00 Uhr.<br />
                                        Kontaktlose Schlüsselübergabe möglich.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}

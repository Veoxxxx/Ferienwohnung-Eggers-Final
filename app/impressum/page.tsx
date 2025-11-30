import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { AlertCircle, Scale, Mail, Phone, FileText } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata = genMeta({
    title: "Impressum",
    description: "Impressum und Kontaktdaten der Ferienwohnung Eggers in Cuxhaven Sahlenburg.",
    path: "/impressum",
});

export default function ImpressumPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-luxury-navy-900 dark:bg-luxury-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('/images/hero-living-room.png')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <AnimatedSection>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Impressum</h1>
                        <p className="text-xl text-luxury-sand-100 max-w-2xl font-light leading-relaxed">
                            Rechtliche Angaben und Kontaktinformationen.
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
                                    Dieser Impressumstext ist ein Muster und muss vor Produktivbetrieb durch rechtlich geprüfte und aktuelle Angaben ersetzt werden.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>

                    <div className="grid gap-8">
                        <AnimatedSection delay={0.1}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Scale className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">Angaben gemäß § 5 TMG</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 leading-relaxed">
                                    <p className="font-bold text-luxury-navy-900 dark:text-slate-100 text-lg mb-2">Ferienwohnung Eggers</p>
                                    <p>[Vor- und Nachname des Betreibers]</p>
                                    <p>Nordheimstraße 150</p>
                                    <p>27476 Cuxhaven Sahlenburg</p>
                                    <p>Deutschland</p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Phone className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">Kontakt</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3 text-luxury-navy-600 dark:text-slate-400">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                                        <span className="font-medium min-w-[100px]">Telefon:</span>
                                        <a href="tel:+4947211234567" className="hover:text-luxury-navy-900 dark:hover:text-slate-200 transition-colors">
                                            +49 (0) 4721 123 456
                                        </a>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                                        <span className="font-medium min-w-[100px]">E-Mail:</span>
                                        <a href="mailto:info@ferienwohnung-eggers.de" className="hover:text-luxury-navy-900 dark:hover:text-slate-200 transition-colors underline hover:no-underline">
                                            info@ferienwohnung-eggers.de
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <FileText className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">Umsatzsteuer-ID & Verantwortlichkeit</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 text-luxury-navy-600 dark:text-slate-400">
                                    <div>
                                        <p className="font-medium text-luxury-navy-900 dark:text-slate-100 mb-1">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                                        <p>[Falls vorhanden, hier eintragen]</p>
                                    </div>
                                    <div className="pt-4 border-t border-luxury-navy-100 dark:border-luxury-navy-800">
                                        <p className="font-medium text-luxury-navy-900 dark:text-slate-100 mb-1">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</p>
                                        <p>[Vor- und Nachname]</p>
                                        <p>Nordheimstraße 150</p>
                                        <p>27476 Cuxhaven Sahlenburg</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4}>
                            <Card className="border-none shadow-md bg-white dark:bg-luxury-navy-900">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Scale className="h-6 w-6 text-luxury-navy-900 dark:text-luxury-sand-400" />
                                        <CardTitle className="font-serif text-xl">Streitschlichtung</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-luxury-navy-600 dark:text-slate-400 space-y-4 leading-relaxed">
                                    <p>
                                        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                                        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-luxury-navy-900 dark:text-slate-200">
                                            https://ec.europa.eu/consumers/odr/
                                        </a>
                                    </p>
                                    <p>
                                        Unsere E-Mail-Adresse finden Sie oben im Impressum.
                                    </p>
                                    <p>
                                        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                                        Verbraucherschlichtungsstelle teilzunehmen.
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
